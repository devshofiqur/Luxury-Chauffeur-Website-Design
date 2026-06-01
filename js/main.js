/* =========================================================
   ELITE CHAUFFEUR — main.js
   ========================================================= */

$(function () {

  /* ─── Theme Toggle ─────────────────────────────────────── */
  const themeBtn   = $('#theme-toggle');
  const savedTheme = localStorage.getItem('ec-theme') || 'light';
  $('html').attr('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeBtn.on('click', function () {
    const cur  = $('html').attr('data-theme');
    const next = cur === 'dark' ? 'light' : 'dark';
    $('html').attr('data-theme', next);
    localStorage.setItem('ec-theme', next);
    updateThemeIcon(next);
  });

  function updateThemeIcon(theme) {
    themeBtn.html(theme === 'dark' ? '&#9728;' : '&#9790;');
    themeBtn.attr('title', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
  }

  /* ─── Language Toggle ───────────────────────────────────── */
  const translations = {
    en: {
      nav_home: 'Home',
      nav_services: 'Services',
      nav_fleet: 'Our Fleet',
      nav_about: 'About',
      nav_contact: 'Contact',
      nav_quote: 'Get a Quote',
      hero_eyebrow: 'Premium Executive Transport',
      hero_title_1: 'Your Journey,',
      hero_title_2: 'Our Distinction.',
      hero_desc: 'Experience world-class chauffeur services tailored to the discerning professional. Reliable, discreet, and unfailingly elegant.',
      hero_btn1: 'Book Your Journey',
      hero_btn2: 'Explore Services',
      stat_1_label: 'Journeys Completed',
      stat_2_label: 'Corporate Clients',
      stat_3_label: 'Years Excellence',
      services_label: 'What We Offer',
      services_title: 'Exceptional Services,\nEvery Journey',
      services_sub: 'From intimate airport transfers to large-scale corporate events, we deliver an uncompromising standard of luxury and reliability.',
      why_label: 'Why Choose Us',
      why_title: 'The Benchmark of\nLuxury Transport',
      cta_title: 'Ready for an\nExtraordinary Experience?',
      cta_text: 'Reserve your journey today and let us redefine the way you travel.',
      contact_label: 'Get in Touch',
      contact_title: 'We Are Here\nFor You',
      footer_tagline: 'Setting the standard in premium executive chauffeur services across the country.',
      form_title: 'Request a Quote',
      form_sub: 'Complimentary & Confidential',
      step1: 'Personal',
      step2: 'Journey',
      step3: 'Details',
    },
    ar: {
      nav_home: 'الرئيسية',
      nav_services: 'الخدمات',
      nav_fleet: 'أسطولنا',
      nav_about: 'من نحن',
      nav_contact: 'اتصل بنا',
      nav_quote: 'احصل على عرض سعر',
      hero_eyebrow: 'خدمة نقل تنفيذية فاخرة',
      hero_title_1: 'رحلتك،',
      hero_title_2: 'تميُّزنا.',
      hero_desc: 'استمتع بخدمات السائق الشخصي على مستوى عالمي مصممة للمحترفين الراقيين. موثوقة، سرية، وأنيقة دائماً.',
      hero_btn1: 'احجز رحلتك',
      hero_btn2: 'استكشف الخدمات',
      stat_1_label: 'رحلة مكتملة',
      stat_2_label: 'عميل مؤسسي',
      stat_3_label: 'سنوات التميز',
      services_label: 'ما نقدمه',
      services_title: 'خدمات استثنائية،\nكل رحلة',
      services_sub: 'من التوصيل إلى المطار إلى الفعاليات المؤسسية الكبرى، نقدم معياراً لا يتنازل عن الرفاهية والموثوقية.',
      why_label: 'لماذا تختارنا',
      why_title: 'المعيار الذهبي\nفي النقل الفاخر',
      cta_title: 'هل أنت مستعد لتجربة\nاستثنائية؟',
      cta_text: 'احجز رحلتك اليوم ودعنا نعيد تعريف أسلوب سفرك.',
      contact_label: 'تواصل معنا',
      contact_title: 'نحن هنا\nمن أجلك',
      footer_tagline: 'نحدد معيار خدمات السائق التنفيذي الفاخرة في جميع أنحاء البلاد.',
      form_title: 'طلب عرض سعر',
      form_sub: 'مجاني وسري',
      step1: 'شخصي',
      step2: 'الرحلة',
      step3: 'التفاصيل',
    },
    fr: {
      nav_home: 'Accueil',
      nav_services: 'Services',
      nav_fleet: 'Notre Flotte',
      nav_about: 'À Propos',
      nav_contact: 'Contact',
      nav_quote: 'Devis Gratuit',
      hero_eyebrow: 'Transport Exécutif Premium',
      hero_title_1: 'Votre Voyage,',
      hero_title_2: 'Notre Excellence.',
      hero_desc: 'Découvrez des services de chauffeur de classe mondiale, conçus pour le professionnel exigeant. Fiable, discret et élégant.',
      hero_btn1: 'Réserver Maintenant',
      hero_btn2: 'Voir les Services',
      stat_1_label: 'Voyages Effectués',
      stat_2_label: 'Clients Entreprises',
      stat_3_label: 'Années d\'Excellence',
      services_label: 'Nos Offres',
      services_title: 'Services Exceptionnels,\nChaque Voyage',
      services_sub: 'Des transferts aéroport aux événements d\'entreprise, nous livrons un standard de luxe et de fiabilité inégalé.',
      why_label: 'Pourquoi Nous Choisir',
      why_title: 'Le Standard du\nTransport de Luxe',
      cta_title: 'Prêt pour une\nExpérience Extraordinaire ?',
      cta_text: 'Réservez votre voyage aujourd\'hui et laissez-nous redéfinir votre façon de voyager.',
      contact_label: 'Contactez-nous',
      contact_title: 'Nous Sommes Là\nPour Vous',
      footer_tagline: 'Établir le standard des services de chauffeur exécutif premium dans tout le pays.',
      form_title: 'Demande de Devis',
      form_sub: 'Gratuit & Confidentiel',
      step1: 'Personnel',
      step2: 'Voyage',
      step3: 'Détails',
    }
  };

  let currentLang = 'en';

  $('#lang-btn').on('click', function () {
    const langs = ['en', 'ar', 'fr'];
    const idx   = langs.indexOf(currentLang);
    currentLang = langs[(idx + 1) % langs.length];
    applyLang(currentLang);
    $(this).text(currentLang.toUpperCase());
    $('html').attr('dir', currentLang === 'ar' ? 'rtl' : 'ltr');
  });

  function applyLang(lang) {
    const t = translations[lang];
    if (!t) return;
    $('[data-i18n]').each(function () {
      const key = $(this).data('i18n');
      if (t[key] !== undefined) {
        if ($(this).is('input,textarea')) {
          $(this).attr('placeholder', t[key]);
        } else {
          $(this).html(t[key].replace(/\n/g, '<br>'));
        }
      }
    });
  }

  /* ─── Navbar ────────────────────────────────────────────── */
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 60) {
      $('#navbar').addClass('scrolled');
    } else {
      $('#navbar').removeClass('scrolled');
    }
  });

  // Hamburger
  $('#hamburger').on('click', function () {
    $(this).toggleClass('open');
    $('#nav-mobile').toggleClass('open');
  });

  // Nav links
  $(document).on('click', '.nav-link[data-page]', function (e) {
    e.preventDefault();
    const target = $(this).data('page');
    showPage(target);
    $('html, body').animate({ scrollTop: 0 }, 400);
    $('#hamburger').removeClass('open');
    $('#nav-mobile').removeClass('open');
  });

  /* ─── Page Router ───────────────────────────────────────── */
  function showPage(name) {
    $('.page').removeClass('active');
    $('#page-' + name).addClass('active');
    $('.nav-link').removeClass('active');
    $(`.nav-link[data-page="${name}"]`).addClass('active');
    window.scrollTo(0, 0);
    // Re-trigger animations
    triggerReveal();
  }

  /* ─── Scroll Reveal ─────────────────────────────────────── */
  function triggerReveal() {
    const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .stagger');
    const observer  = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));
  }
  triggerReveal();

  /* ─── Back to Top ───────────────────────────────────────── */
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 400) {
      $('#back-top').addClass('show');
    } else {
      $('#back-top').removeClass('show');
    }
  });

  $('#back-top').on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600, 'swing');
  });

  /* ─── Hero Multi-Step Form ──────────────────────────────── */
  initMultiStep({
    container: '#hero-form',
    steps: '.form-step',
    nextBtns: '.btn-step-next',
    prevBtns: '.btn-step-prev',
    progressDots: '.step-dot',
    progressLines: '.step-line',
    stepLabels: '.step-lbl',
    successEl: '#hero-form-success',
    formEl: '#hero-form-inner',
    submitBtn: '#hero-submit',
    onSubmit: function (data) {
      submitQuote(data, '#hero-form-alert', '#hero-form-success', '#hero-form-inner');
    }
  });

  /* ─── Quote Page Multi-Step Form ────────────────────────── */
  initMultiStep({
    container: '#quote-form',
    steps: '.q-step',
    nextBtns: '.btn-q-next',
    prevBtns: '.btn-q-prev',
    progressDots: '.q-dot',
    progressLines: '.q-line',
    stepLabels: '.q-lbl',
    successEl: '#quote-success',
    formEl: '#quote-form-inner',
    submitBtn: '#quote-submit',
    onSubmit: function (data) {
      submitQuote(data, '#quote-alert', '#quote-success', '#quote-form-inner');
    }
  });

  function initMultiStep(cfg) {
    const $container  = $(cfg.container);
    if (!$container.length) return;

    let current = 0;
    const $steps = $container.find(cfg.steps);
    const total  = $steps.length;

    function goTo(n) {
      $steps.removeClass('active');
      $($steps[n]).addClass('active');
      current = n;
      updateUI();
    }

    function updateUI() {
      $container.find(cfg.progressDots).each(function (i) {
        $(this).removeClass('active completed');
        if (i < current) $(this).addClass('completed').html('&#10003;');
        else if (i === current) $(this).addClass('active').text(i + 1);
        else $(this).text(i + 1);
      });
      $container.find(cfg.progressLines).each(function (i) {
        $(this).toggleClass('active', i < current);
      });
      $container.find(cfg.stepLabels).each(function (i) {
        $(this).toggleClass('active', i === current);
      });
    }

    $container.on('click', cfg.nextBtns, function () {
      if (validateStep($($steps[current]))) {
        if (current < total - 1) goTo(current + 1);
        else cfg.onSubmit(getFormData($container));
      }
    });

    $container.on('click', cfg.prevBtns, function () {
      if (current > 0) goTo(current - 1);
    });

    goTo(0);
  }

  function validateStep($step) {
    let valid = true;
    $step.find('[required]').each(function () {
      const $el  = $(this);
      const val  = $el.val().trim();
      const $err = $el.next('.error-msg');
      if (!val) {
        $el.addClass('error');
        $err.addClass('show');
        valid = false;
      } else if ($el.attr('type') === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        $el.addClass('error');
        $err.text('Please enter a valid email address.').addClass('show');
        valid = false;
      } else {
        $el.removeClass('error');
        $err.removeClass('show');
      }
    });
    return valid;
  }

  function getFormData($container) {
    const data = {};
    $container.find('input, textarea, select').each(function () {
      const name = $(this).attr('name');
      if (name) data[name] = $(this).val();
    });
    return data;
  }

  function submitQuote(data, alertEl, successEl, formEl) {
    const $alert   = $(alertEl);
    const $success = $(successEl);
    const $form    = $(formEl);

    $alert.removeClass('show alert-success alert-error');

    $.ajax({
      url: 'php/send-quote.php',
      method: 'POST',
      data: data,
      success: function (res) {
        try {
          const result = typeof res === 'string' ? JSON.parse(res) : res;
          if (result.success) {
            $form.hide();
            $success.show();
          } else {
            $alert.addClass('show alert-error').html('&#9888; ' + (result.message || 'An error occurred. Please try again.'));
          }
        } catch (e) {
          $alert.addClass('show alert-error').html('&#9888; Unexpected response. Please try again.');
        }
      },
      error: function () {
        $alert.addClass('show alert-error').html('&#9888; Unable to send. Please call us directly.');
      }
    });
  }

  /* ─── Contact Form ──────────────────────────────────────── */
  $('#contact-form').on('submit', function (e) {
    e.preventDefault();
    const $alert = $('#contact-alert');
    $alert.removeClass('show alert-success alert-error');

    $.ajax({
      url: 'php/send-contact.php',
      method: 'POST',
      data: $(this).serialize(),
      success: function (res) {
        try {
          const result = typeof res === 'string' ? JSON.parse(res) : res;
          if (result.success) {
            $alert.addClass('show alert-success').html('&#10003; Thank you! Your message has been sent. We will be in touch shortly.');
            $('#contact-form')[0].reset();
          } else {
            $alert.addClass('show alert-error').html('&#9888; ' + (result.message || 'Unable to send message. Please try again.'));
          }
        } catch (e) {
          $alert.addClass('show alert-error').html('&#9888; Unexpected response.');
        }
      },
      error: function () {
        $alert.addClass('show alert-error').html('&#9888; Unable to send. Please call us directly.');
      }
    });
  });

  /* ─── Testimonial Slider ────────────────────────────────── */
  let currentSlide = 0;
  const $track     = $('.testimonial-track');
  const totalSlides = $('.testimonial-card').length;

  function goSlide(n) {
    currentSlide = (n + totalSlides) % totalSlides;
    $track.css('transform', `translateX(-${currentSlide * 100}%)`);
    $('.slider-dot').removeClass('active');
    $(`.slider-dot[data-slide="${currentSlide}"]`).addClass('active');
  }

  $('.slider-next').on('click', () => goSlide(currentSlide + 1));
  $('.slider-prev').on('click', () => goSlide(currentSlide - 1));
  $(document).on('click', '.slider-dot', function () {
    goSlide(parseInt($(this).data('slide')));
  });

  // Auto-play
  let autoSlide = setInterval(() => goSlide(currentSlide + 1), 5500);
  $('.testimonial-slider').on('mouseenter', () => clearInterval(autoSlide));
  $('.testimonial-slider').on('mouseleave', () => {
    clearInterval(autoSlide);
    autoSlide = setInterval(() => goSlide(currentSlide + 1), 5500);
  });

  // Touch swipe
  let touchStartX = 0;
  document.querySelector('.testimonial-slider')?.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  });
  document.querySelector('.testimonial-slider')?.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) goSlide(currentSlide + (diff > 0 ? 1 : -1));
  });

  /* ─── Smooth Anchor Scroll ──────────────────────────────── */
  $(document).on('click', 'a[href^="#"]', function (e) {
    const target = $($(this).attr('href'));
    if (target.length) {
      e.preventDefault();
      $('html, body').animate({ scrollTop: target.offset().top - 80 }, 700);
    }
  });

  /* ─── Number Counter Animation ──────────────────────────── */
  function animateCounter($el) {
    const target = parseInt($el.data('target'));
    const suffix = $el.data('suffix') || '';
    $({ count: 0 }).animate({ count: target }, {
      duration: 2000,
      easing: 'swing',
      step: function () {
        $el.text(Math.ceil(this.count).toLocaleString() + suffix);
      },
      complete: function () {
        $el.text(target.toLocaleString() + suffix);
      }
    });
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const $el = $(entry.target);
        if (!$el.hasClass('counted')) {
          $el.addClass('counted');
          animateCounter($el);
        }
      }
    });
  }, { threshold: 0.5 });

  $('.counter').each(function () { counterObserver.observe(this); });

  /* ─── Service Card Hover Depth ──────────────────────────── */
  $('.service-card').on('mousemove', function (e) {
    const rect   = this.getBoundingClientRect();
    const x      = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const y      = ((e.clientY - rect.top)  / rect.height - 0.5) * 8;
    $(this).css('transform', `translateY(-8px) rotateY(${x}deg) rotateX(${-y}deg)`);
  }).on('mouseleave', function () {
    $(this).css('transform', '');
  });

  /* ─── Navbar link active on scroll ─────────────────────── */
  $(window).on('scroll', function () {
    const scrollY = $(this).scrollTop() + 100;
    ['services', 'fleet', 'why', 'testimonials', 'contact'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        const top    = $(el).offset().top;
        const bottom = top + $(el).outerHeight();
        if (scrollY >= top && scrollY < bottom) {
          $('.nav-link').removeClass('active');
          $(`.nav-link[href="#${id}"]`).addClass('active');
        }
      }
    });
  });

  /* ─── Fleet card tilt ───────────────────────────────────── */
  $('.fleet-card').on('mousemove', function (e) {
    const rect = this.getBoundingClientRect();
    const x    = ((e.clientX - rect.left) / rect.width  - 0.5) * 10;
    const y    = ((e.clientY - rect.top)  / rect.height - 0.5) * 10;
    $(this).css('transform', `perspective(600px) rotateY(${x}deg) rotateX(${-y}deg)`);
  }).on('mouseleave', function () {
    $(this).css('transform', '');
  });

});