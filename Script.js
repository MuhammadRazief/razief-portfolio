const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle");
navClose = document.getElementById("nav-close");
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll(".nav__link");

function linkAction() {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
}
navLink.forEach((n) => n.addEventListener("click", linkAction));



window.addEventListener("scroll", function () {
    const header = document.getElementById("header");
    if (window.scrollY > 50) {
      header.classList.add("scroll-header");
    } else {
      header.classList.remove("scroll-header");
    }
  });

  window.addEventListener("scroll", function () {
    const header = document.getElementById("header");
    if (window.scrollY > 50) {
      header.classList.add("scroll-header", "scroll-header-active");
    } else {
      header.classList.remove("scroll-header", "scroll-header-active");
    }
  });
  const footerText = document.querySelector('.footer__text');

  // Membuat observer untuk footer text
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Tambahkan kelas 'footer__text--visible' ketika footer text muncul
        entry.target.classList.add('footer__text--visible');
      } else {
        // Hapus kelas saat footer text keluar dari viewport, agar animasi bisa diputar ulang
        entry.target.classList.remove('footer__text--visible');
      }
    });
  }, { threshold: 0.5 }); // 50% footer text terlihat sebelum animasi dimulai
  
  // Memulai pengamatan pada footer text
  observer.observe(footerText);
  const texts = [
    { text: "I'm Razief", color: "hsl(240, 69%, 61%)" }, // Biru
    { text: "I'm a Backend Developer", color: "hsl(0, 69%, 61%)" }, // Merah
    { text: "I Love Coding", color: "hsl(120, 69%, 61%)" } // Hijau
  ];
  let index = 0;
  let charIndex = 0;
  const typingSpeed = 100; // Kecepatan mengetik (ms)
  const erasingSpeed = 50; // Kecepatan menghapus (ms)
  const delayBetweenTexts = 2000; // Waktu jeda antar teks (ms)
  const dynamicText = document.getElementById("dynamic-text");



  function type() {
    if (charIndex < texts[index].text.length) {
      dynamicText.textContent += texts[index].text.charAt(charIndex);
      dynamicText.style.color = texts[index].color; // Ubah warna teks
      charIndex++;
      setTimeout(type, typingSpeed);
    } else {
      setTimeout(erase, delayBetweenTexts);
    }
  }


  function erase() {
    if (charIndex > 0) {
      dynamicText.textContent = texts[index].text.substring(0, charIndex - 1);
      charIndex--;
      setTimeout(erase, erasingSpeed);
    } else {
      index = (index + 1) % texts.length; // Pindah ke teks berikutnya
      setTimeout(type, typingSpeed);
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    type(); // Mulai animasi saat halaman dimuat
  });



  // contact.js
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!name || !email || !message) {
    document.getElementById("responseMsg").innerText = "Please fill in all fields.";
    return;
  }

  // Simulasi kirim data
  document.getElementById("responseMsg").innerText = "Message sent successfully!";
  this.reset();
});
