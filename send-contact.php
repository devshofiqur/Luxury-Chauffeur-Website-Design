<?php
/**
 * Elite Chauffeur — Contact Form Handler
 * File: php/send-contact.php
 */

header('Content-Type: application/json');
header('X-Content-Type-Options: nosniff');

define('TO_EMAIL',   'enquiries@yourdomain.com');  // ← Change to your email
define('FROM_EMAIL', 'noreply@yourdomain.com');     // ← Change to your sending address
define('COMPANY',    'Elite Chauffeur');

session_start();
$ip_key = 'rl_contact_' . md5($_SERVER['REMOTE_ADDR']);
$now    = time();
if (!isset($_SESSION[$ip_key])) {
    $_SESSION[$ip_key] = ['count' => 0, 'reset' => $now + 3600];
}
if ($now > $_SESSION[$ip_key]['reset']) {
    $_SESSION[$ip_key] = ['count' => 0, 'reset' => $now + 3600];
}
if ($_SESSION[$ip_key]['count'] >= 5) {
    echo json_encode(['success' => false, 'message' => 'Too many requests. Please try again later.']);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit;
}

function clean(string $val): string {
    return htmlspecialchars(strip_tags(trim($val)), ENT_QUOTES, 'UTF-8');
}

$name    = clean($_POST['contact_name']    ?? '');
$email   = filter_var(trim($_POST['contact_email'] ?? ''), FILTER_SANITIZE_EMAIL);
$phone   = clean($_POST['contact_phone']   ?? '');
$subject = clean($_POST['contact_subject'] ?? 'General Enquiry');
$message = clean($_POST['contact_message'] ?? '');

$errors = [];
if (empty($name))                                       $errors[] = 'Name is required.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL))         $errors[] = 'A valid email is required.';
if (strlen($message) < 10)                             $errors[] = 'Please provide a message (minimum 10 characters).';

if (!empty($errors)) {
    echo json_encode(['success' => false, 'message' => implode(' ', $errors)]);
    exit;
}

if (!empty($_POST['website'])) {
    echo json_encode(['success' => true]);
    exit;
}

$emailSubject = COMPANY . ' — Contact: ' . $subject;

$body = "
<!DOCTYPE html>
<html>
<head><meta charset='UTF-8'><style>
  body{font-family:'Helvetica Neue',Arial,sans-serif;background:#f5f0e8;margin:0}
  .wrap{max-width:600px;margin:0 auto;background:#fff}
  .header{background:#0e0b06;padding:36px;text-align:center}
  .header h1{color:#c9a84c;font-size:22px;margin:0;letter-spacing:2px;text-transform:uppercase}
  .header p{color:rgba(255,255,255,.5);font-size:12px;margin:8px 0 0}
  .body{padding:40px}
  .field{margin-bottom:14px;display:flex}
  .fl{width:100px;font-size:12px;font-weight:700;color:#888;text-transform:uppercase;letter-spacing:1px;flex-shrink:0}
  .fv{font-size:14px;color:#1a1208}
  .msg-box{background:#f8f5f0;border-left:3px solid #c9a84c;padding:16px 20px;font-size:14px;color:#4a4035;line-height:1.7;margin-top:24px}
  .footer{background:#f8f5f0;padding:20px;text-align:center;font-size:11px;color:#888}
</style></head>
<body>
<div class='wrap'>
  <div class='header'>
    <h1>" . COMPANY . "</h1>
    <p>New Contact Message — " . date('d F Y, H:i') . "</p>
  </div>
  <div class='body'>
    <div class='field'><span class='fl'>Name</span><span class='fv'>{$name}</span></div>
    <div class='field'><span class='fl'>Email</span><span class='fv'>{$email}</span></div>
    <div class='field'><span class='fl'>Phone</span><span class='fv'>{$phone}</span></div>
    <div class='field'><span class='fl'>Subject</span><span class='fv'>{$subject}</span></div>
    <div class='msg-box'>{$message}</div>
  </div>
  <div class='footer'>" . COMPANY . " &mdash; Contact Enquiry</div>
</div>
</body></html>
";

$headers  = "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/html; charset=UTF-8\r\n";
$headers .= "From: " . COMPANY . " <" . FROM_EMAIL . ">\r\n";
$headers .= "Reply-To: {$name} <{$email}>\r\n";

if (mail(TO_EMAIL, $emailSubject, $body, $headers)) {
    $_SESSION[$ip_key]['count']++;
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'message' => 'Could not send message. Please call us directly.']);
}