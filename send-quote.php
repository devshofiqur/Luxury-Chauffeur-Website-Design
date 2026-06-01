<?php
/**
 * Elite Chauffeur — Quote Request Handler
 * File: php/send-quote.php
 */

header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');

// ── Configuration ──────────────────────────────────────────
define('TO_EMAIL',    'enquiries@yourdomain.com');   // ← Change to your email
define('FROM_EMAIL',  'noreply@yourdomain.com');      // ← Change to your sending address
define('COMPANY',     'Elite Chauffeur');

// ── Rate limiting (basic) ──────────────────────────────────
session_start();
$ip_key = 'rl_' . md5($_SERVER['REMOTE_ADDR']);
$now    = time();
$window = 3600; // 1 hour
$max    = 5;    // max 5 submissions per hour per IP

if (!isset($_SESSION[$ip_key])) {
    $_SESSION[$ip_key] = ['count' => 0, 'reset' => $now + $window];
}
if ($now > $_SESSION[$ip_key]['reset']) {
    $_SESSION[$ip_key] = ['count' => 0, 'reset' => $now + $window];
}
if ($_SESSION[$ip_key]['count'] >= $max) {
    echo json_encode(['success' => false, 'message' => 'Too many requests. Please try again later.']);
    exit;
}

// ── Only accept POST ───────────────────────────────────────
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit;
}

// ── Sanitize helper ────────────────────────────────────────
function clean(string $val): string {
    return htmlspecialchars(strip_tags(trim($val)), ENT_QUOTES, 'UTF-8');
}

// ── Gather & validate fields ───────────────────────────────
$name       = clean($_POST['name']       ?? '');
$email      = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone      = clean($_POST['phone']      ?? '');
$pickup     = clean($_POST['pickup']     ?? '');
$dropoff    = clean($_POST['dropoff']    ?? '');
$date       = clean($_POST['date']       ?? '');
$time       = clean($_POST['time']       ?? '');
$service    = clean($_POST['service']    ?? '');
$passengers = clean($_POST['passengers'] ?? '');
$details    = clean($_POST['details']    ?? '');

$errors = [];
if (empty($name))                          $errors[] = 'Full name is required.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'A valid email address is required.';
if (empty($phone))                         $errors[] = 'Phone number is required.';
if (empty($pickup))                        $errors[] = 'Pickup location is required.';
if (empty($dropoff))                       $errors[] = 'Drop-off location is required.';
if (empty($date))                          $errors[] = 'Travel date is required.';

if (!empty($errors)) {
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

// ── Honeypot check ─────────────────────────────────────────
if (!empty($_POST['website'])) {
    echo json_encode(['success' => true]); // Silent discard
    exit;
}

// ── Build email ────────────────────────────────────────────
$subject = COMPANY . ' — New Quote Request from ' . $name;

$body = "
<!DOCTYPE html>
<html>
<head>
<meta charset='UTF-8'>
<style>
  body { font-family: 'Helvetica Neue', Arial, sans-serif; margin: 0; padding: 0; background: #f5f0e8; }
  .wrap { max-width: 600px; margin: 0 auto; background: #fff; }
  .header { background: #0e0b06; padding: 36px; text-align: center; }
  .header h1 { color: #c9a84c; font-size: 22px; margin: 0; letter-spacing: 2px; text-transform: uppercase; }
  .header p { color: rgba(255,255,255,0.5); font-size: 12px; margin: 8px 0 0; letter-spacing: 1px; }
  .body { padding: 40px; }
  .section-title { font-size: 11px; font-weight: 700; letter-spacing: 2px; text-transform: uppercase; color: #c9a84c; margin: 32px 0 16px; border-bottom: 1px solid #f0e8d0; padding-bottom: 8px; }
  .field { margin-bottom: 14px; display: flex; }
  .field-label { width: 140px; font-size: 12px; font-weight: 600; color: #888; text-transform: uppercase; letter-spacing: 1px; flex-shrink: 0; }
  .field-value { font-size: 14px; color: #1a1208; }
  .details-box { background: #f8f5f0; border-left: 3px solid #c9a84c; padding: 16px 20px; font-size: 14px; color: #4a4035; line-height: 1.65; }
  .footer { background: #f8f5f0; padding: 24px; text-align: center; font-size: 11px; color: #888; letter-spacing: 1px; }
  .badge { display: inline-block; background: #c9a84c; color: #fff; font-size: 10px; font-weight: 700; letter-spacing: 1px; text-transform: uppercase; padding: 4px 12px; margin: 0 0 8px; }
</style>
</head>
<body>
<div class='wrap'>
  <div class='header'>
    <h1>" . COMPANY . "</h1>
    <p>New Quote Request — " . date('d F Y, H:i') . "</p>
  </div>
  <div class='body'>
    <div class='badge'>Client Information</div>
    <div class='section-title'>Personal Details</div>
    <div class='field'><span class='field-label'>Full Name</span><span class='field-value'>{$name}</span></div>
    <div class='field'><span class='field-label'>Email</span><span class='field-value'>{$email}</span></div>
    <div class='field'><span class='field-label'>Phone</span><span class='field-value'>{$phone}</span></div>

    <div class='section-title'>Journey Details</div>
    <div class='field'><span class='field-label'>Pickup</span><span class='field-value'>{$pickup}</span></div>
    <div class='field'><span class='field-label'>Drop-off</span><span class='field-value'>{$dropoff}</span></div>
    <div class='field'><span class='field-label'>Date</span><span class='field-value'>{$date}</span></div>
    <div class='field'><span class='field-label'>Time</span><span class='field-value'>{$time}</span></div>
    <div class='field'><span class='field-label'>Service Type</span><span class='field-value'>{$service}</span></div>
    <div class='field'><span class='field-label'>Passengers</span><span class='field-value'>{$passengers}</span></div>

    " . (!empty($details) ? "
    <div class='section-title'>Additional Details</div>
    <div class='details-box'>{$details}</div>
    " : "") . "
  </div>
  <div class='footer'>" . COMPANY . " &mdash; Confidential Client Enquiry</div>
</div>
</body>
</html>
";

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: " . COMPANY . " <" . FROM_EMAIL . ">\r\n";
$headers .= "Reply-To: {$name} <{$email}>\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// ── Send ───────────────────────────────────────────────────
if (mail(TO_EMAIL, $subject, $body, $headers)) {
    $_SESSION[$ip_key]['count']++;

    // Auto-reply to client
    $replySubject = 'Your Quote Request — ' . COMPANY;
    $replyBody = "
<!DOCTYPE html>
<html>
<head><meta charset='UTF-8'><style>
  body{font-family:'Helvetica Neue',Arial,sans-serif;background:#f5f0e8;margin:0;padding:0}
  .wrap{max-width:600px;margin:0 auto;background:#fff}
  .header{background:#0e0b06;padding:36px;text-align:center}
  .header h1{color:#c9a84c;font-size:22px;margin:0;letter-spacing:2px;text-transform:uppercase}
  .body{padding:40px}
  .body p{font-size:14px;color:#4a4035;line-height:1.8;margin-bottom:16px}
  .footer{background:#f8f5f0;padding:20px;text-align:center;font-size:11px;color:#888}
</style></head>
<body>
<div class='wrap'>
  <div class='header'><h1>" . COMPANY . "</h1></div>
  <div class='body'>
    <p>Dear {$name},</p>
    <p>Thank you for your enquiry with " . COMPANY . ". We have received your quote request and a member of our dedicated team will be in contact with you within the next 2 hours.</p>
    <p>In the meantime, should you require immediate assistance, please do not hesitate to call us directly.</p>
    <p>We look forward to serving you.</p>
    <p>Warm regards,<br><strong>" . COMPANY . " Reservations Team</strong></p>
  </div>
  <div class='footer'>&copy; " . date('Y') . " " . COMPANY . " — All rights reserved</div>
</div>
</body></html>
";
    $replyHeaders  = "MIME-Version: 1.0\r\n";
    $replyHeaders .= "Content-Type: text/html; charset=UTF-8\r\n";
    $replyHeaders .= "From: " . COMPANY . " <" . FROM_EMAIL . ">\r\n";
    mail($email, $replySubject, $replyBody, $replyHeaders);

    echo json_encode(['success' => true, 'message' => 'Your enquiry has been received.']);
} else {
    echo json_encode(['success' => false, 'message' => 'Mail could not be sent. Please try calling us directly.']);
}