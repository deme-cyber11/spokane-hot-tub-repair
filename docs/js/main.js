/* === Spokane Hot Tub Repair — Main JS === */
(function(){
  'use strict';

  /* --- Sticky Header Scroll --- */
  const header = document.querySelector('.site-header');
  if(header){
    let last = 0;
    window.addEventListener('scroll', function(){
      const y = window.scrollY;
      if(y > 60) header.classList.add('scrolled');
      else header.classList.remove('scrolled');
      last = y;
    }, {passive:true});
  }

  /* --- Mobile Menu --- */
  const toggle = document.querySelector('.mobile-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileClose = document.querySelector('.mobile-close');
  if(toggle && mobileMenu){
    toggle.addEventListener('click', function(){
      mobileMenu.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    if(mobileClose){
      mobileClose.addEventListener('click', function(){
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    }
    mobileMenu.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(){
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  /* --- Before/After Slider (drag + touch) --- */
  document.querySelectorAll('.ba-slider').forEach(function(slider){
    const handle = slider.querySelector('.ba-handle');
    const after = slider.querySelector('.ba-after');
    if(!handle || !after) return;

    let dragging = false;

    function move(x){
      const rect = slider.getBoundingClientRect();
      let pct = ((x - rect.left) / rect.width) * 100;
      pct = Math.max(2, Math.min(98, pct));
      handle.style.left = pct + '%';
      after.style.clipPath = 'inset(0 0 0 ' + pct + '%)';
    }

    /* Mouse */
    slider.addEventListener('mousedown', function(e){
      e.preventDefault();
      dragging = true;
      move(e.clientX);
    });
    window.addEventListener('mousemove', function(e){
      if(dragging) move(e.clientX);
    });
    window.addEventListener('mouseup', function(){
      dragging = false;
    });

    /* Touch */
    slider.addEventListener('touchstart', function(e){
      dragging = true;
      move(e.touches[0].clientX);
    }, {passive:true});
    slider.addEventListener('touchmove', function(e){
      if(dragging){
        e.preventDefault();
        move(e.touches[0].clientX);
      }
    }, {passive:false});
    slider.addEventListener('touchend', function(){
      dragging = false;
    });
  });

  /* --- FAQ Accordion --- */
  document.querySelectorAll('.faq-q').forEach(function(btn){
    btn.addEventListener('click', function(){
      const item = btn.closest('.faq-item');
      const answer = item.querySelector('.faq-a');
      const inner = answer.querySelector('.faq-a-inner');
      const isOpen = item.classList.contains('active');

      /* close all */
      document.querySelectorAll('.faq-item.active').forEach(function(open){
        open.classList.remove('active');
        open.querySelector('.faq-a').style.maxHeight = '0';
      });

      if(!isOpen){
        item.classList.add('active');
        answer.style.maxHeight = inner.scrollHeight + 20 + 'px';
      }
    });
  });

  /* --- Contact Form (Web3Forms) --- */
  const form = document.getElementById('contact-form');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      const data = new FormData(form);
      fetch('https://api.web3forms.com/submit', {
        method:'POST',
        body:data
      }).then(function(r){ return r.json(); })
        .then(function(res){
          if(res.success){
            window.location.href = '/thank-you/';
          } else {
            alert('Something went wrong. Please call us instead.');
          }
        })
        .catch(function(){
          alert('Network error. Please call us instead.');
        });
    });
  }

})();
