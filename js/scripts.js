document.addEventListener('DOMContentLoaded', () => {
  // hãy bỏ hẳn dòng sessionStorage.removeItem('username');

  const overlay  = document.getElementById('overlay');
  const modal    = document.getElementById('login-modal');
  const btnOpen  = document.getElementById('nav-login');
  const btnClose = document.getElementById('close-modal');
  const btnLogin = document.getElementById('btn-login');

  // Nếu thiếu phần tử nào, log ra để debug
  if (!overlay || !modal || !btnOpen || !btnClose || !btnLogin) {
    console.error('Missing element:', { overlay, modal, btnOpen, btnClose, btnLogin });
    return;
  }

  // scroll navbar
  window.addEventListener('scroll', () => {
    document.querySelector('nav')
      .classList.toggle('scrolled', window.scrollY > 50);
  });

  // show / hide modal
  function showModal() {
    overlay.classList.remove('hidden');
    modal.classList.remove('hidden');
    setTimeout(() => modal.classList.add('show'), 20);
  }
  function hideModal() {
    modal.classList.remove('show');
    setTimeout(() => {
      modal.classList.add('hidden');
      overlay.classList.add('hidden');
    }, 400);
  }

  // cập nhật nav khi đã login
  function updateNav() {
    const user = sessionStorage.getItem('username');
    if (user) {
      btnOpen.textContent = user;
      btnOpen.href = '#';
    }
  }

  // bật modal khi click login (nếu chưa login)
  btnOpen.addEventListener('click', e => {
    if (!sessionStorage.getItem('username')) {
      e.preventDefault();
      showModal();
    }
  });

  btnClose.addEventListener('click', hideModal);
  overlay.addEventListener('click', hideModal);

  // toggle password
  document.querySelectorAll('.toggle-visibility').forEach(btn => {
    btn.addEventListener('click', () => {
      const inp = btn.previousElementSibling;
      if (inp.type === 'password') {
        inp.type = 'text';
        btn.textContent = '🙈';
      } else {
        inp.type = 'password';
        btn.textContent = '👁️';
      }
    });
  });

  // xử lý login
  btnLogin.addEventListener('click', () => {
    const user = document.getElementById('login-user').value.trim();
    const pass = document.getElementById('login-pass').value.trim();
    if (!user || !pass) {
      alert('Vui lòng nhập tên và mật khẩu.');
      return;
    }
    sessionStorage.setItem('username', user);
    hideModal();
    updateNav();
  });

  // gọi lần đầu khi load page
  updateNav();
});

// ===== About‑Us Carousel =====
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.about-slider');
  if (!slider) return;

  const slidesEl = slider.querySelector('.slides');
  const slides = Array.from(slidesEl.children);
  const dotsCon = slider.querySelector('.dots');
  let idx = 0, timer;

  // Khởi tạo dots
  dotsCon.innerHTML = '';
  slides.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.addEventListener('click', () => goTo(i));
    dotsCon.appendChild(btn);
  });
  const dots = Array.from(dotsCon.children);

  function goTo(i) {
    idx = (i + slides.length) % slides.length;
    slidesEl.style.transform = `translateX(-${idx * 100}%)`;
    dots.forEach((d, j) => d.classList.toggle('active', j === idx));
  }

  function next() {
    goTo(idx + 1);
  }

  // Bật autoplay
  goTo(0);
  timer = setInterval(next, 4000);

  // Dừng khi hover, tiếp tục khi mouse leave
  slider.addEventListener('mouseenter', () => clearInterval(timer));
  slider.addEventListener('mouseleave', () => timer = setInterval(next, 4000));

  // Prev/Next buttons
  slider.querySelector('.prev').addEventListener('click', () => {
    clearInterval(timer);
    goTo(idx - 1);
  });
  slider.querySelector('.next').addEventListener('click', () => {
    clearInterval(timer);
    goTo(idx + 1);
  });
});
