/**
* Template Name: iPortfolio
* Updated: May 30 2023 with Bootstrap v5.3.0
* Template URL: https://bootstrapmade.com/iportfolio-bootstrap-portfolio-websites-template/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos,
      behavior: 'smooth'
    })
  }

  /**
   * Back to top button
   */
  let backtotop = select('.back-to-top')
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add('active')
      } else {
        backtotop.classList.remove('active')
      }
    }
    window.addEventListener('load', toggleBacktotop)
    onscroll(document, toggleBacktotop)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('body').classList.toggle('mobile-nav-active')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let body = select('body')
      if (body.classList.contains('mobile-nav-active')) {
        body.classList.remove('mobile-nav-active')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Hero type effect
   */
  const typed = select('.typed')
  if (typed) {
    let typed_strings = typed.getAttribute('data-typed-items')
    typed_strings = typed_strings.split(',')
    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }

  /**
   * Skills animation
   */
  let skilsContent = select('.skills-content');
  if (skilsContent) {
    new Waypoint({
      element: skilsContent,
      offset: '80%',
      handler: function(direction) {
        let progress = select('.progress .progress-bar', true);
        progress.forEach((el) => {
          el.style.width = el.getAttribute('aria-valuenow') + '%'
        });
      }
    })
  }

  /**
   * Porfolio isotope and filter
   */
  window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
      let portfolioIsotope = new Isotope(portfolioContainer, {
        itemSelector: '.portfolio-item'
      });

      let portfolioFilters = select('#portfolio-flters li', true);

      on('click', '#portfolio-flters li', function(e) {
        e.preventDefault();
        portfolioFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        portfolioIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        portfolioIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Initiate portfolio lightbox 
   */
  const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
  });

  /**
   * Portfolio details slider
   */
  new Swiper('.portfolio-details-slider', {
    speed: 400,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    }
  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()

$(document).ready(function(){
  $('.faq-accordion .card-header').on('click', function(e){
    e.preventDefault();

    var $this = $(this);
    var $target = $($this.data('target'));

    if($target.hasClass('show')){
      $target.removeClass('show').slideUp();
    } else {
      $('.faq-accordion .collapse.show').removeClass('show').slideUp();
      $target.addClass('show').slideDown();
    }
  });
});

document.querySelectorAll('.play-btn').forEach(btn => {
  btn.addEventListener('click', function() {
      const video = this.parentElement.querySelector('video');
      video.play();
      this.style.display = 'none';
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const stars = document.querySelectorAll('.star');
  const ratingContainer = document.getElementById('rating-container');
  const thankYouMessage = document.getElementById('thank-you-message');
  let resetTimeout;

  stars.forEach(star => {
      star.addEventListener('click', function () {
          const rating = this.getAttribute('data-value');
          setRating(rating);
          sendRatingToTelegram(rating);
          clearTimeout(resetTimeout);
          resetTimeout = setTimeout(resetStars, 3000); // 3 sekunddan keyin yulduzlarni qayta tiklash
          showThankYouMessage();
      });
  });

  function setRating(rating) {
      stars.forEach(star => {
          if (star.getAttribute('data-value') <= rating) {
              star.classList.add('selected');
          } else {
              star.classList.remove('selected');
          }
      });
  }

  function resetStars() {
      stars.forEach(star => {
          star.classList.remove('selected');
      });
      hideThankYouMessage();
  }

  function showThankYouMessage() {
      thankYouMessage.classList.remove('hidden');
      setTimeout(hideThankYouMessage, 3000); // "Rahmat" xabari 3 sekunddan keyin yo'qoladi
  }

  function hideThankYouMessage() {
      thankYouMessage.classList.add('hidden');
  }

  function sendRatingToTelegram(rating) {
      const telegramBotToken = '7307334874:AAGH82bI1Nc0aBNFOiHz-3sOTfsXMrAnsLQ';
      const adminChatIds = ['5607700179', '6464610612']; // 2 ta adminlar chat ID larining ro'yxati
      const message = `Bizni ${rating} yulduz bilan baholashdi!`;

      adminChatIds.forEach(chatId => {
          fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                  chat_id: chatId,
                  text: message
              })
          })
          .then(response => response.json())
          .then(data => {
              console.log('Success:', data);
          })
          .catch((error) => {
              console.error('Error:', error);
          });
      });
  }

  // 3 sekunddan keyin baholash qismini ko'rsatish va 10 sekunddan keyin yo'q qilish
  setTimeout(() => {
      ratingContainer.classList.remove('hidden');
      setTimeout(() => {
          ratingContainer.style.opacity = '1';
          setTimeout(() => {
              ratingContainer.style.opacity = '0';
              setTimeout(() => {
                  ratingContainer.classList.add('hidden');
              }, 1000); // Opacity transition duration
          }, 10000); // 10 sekund ko'rinadi
      }, 100); // Opacity transition initial delay
  }, 3000);
});


