document.addEventListener('DOMContentLoaded', function() {
  // Preloader
  const preloader = document.querySelector('.preloader');
  window.addEventListener('load', function() {
      preloader.style.opacity = '0';
      setTimeout(() => {
          preloader.style.display = 'none';
      }, 500);
  });

  // Mobile Navigation
  const hamburger = document.querySelector('.nav-hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  hamburger.addEventListener('click', function() {
      this.classList.toggle('active');
      navLinks.classList.toggle('active');
  });

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', function() {
          hamburger.classList.remove('active');
          navLinks.classList.remove('active');
      });
  });


  
  // Sticky Navigation
  window.addEventListener('scroll', function() {
      const nav = document.querySelector('.glass-nav');
      nav.classList.toggle('scrolled', window.scrollY > 50);
  });

  // Typing Animation
  const typingText = document.querySelector('.typing-text');
  const texts = ["Web Developer", "Backend Developer", "Creative Coder"];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isEnd = false;

  function type() {
      const currentText = texts[textIndex];
      const currentChar = currentText.substring(0, charIndex);
      typingText.textContent = currentChar;
      
      if (!isDeleting && charIndex < currentText.length) {
          charIndex++;
          setTimeout(type, 100);
      } else if (isDeleting && charIndex > 0) {
          charIndex--;
          setTimeout(type, 50);
      } else {
          isDeleting = !isDeleting;
          if (!isDeleting) {
              textIndex = (textIndex + 1) % texts.length;
          }
          setTimeout(type, 1000);
      }
  }

  setTimeout(type, 1000);

  // Animate elements on scroll
  const animateOnScroll = function() {
      const elements = document.querySelectorAll('.title-line, .section-header, .project-card, .about-image, .about-content, .skill-item, .info-item, .form-group');
      
      elements.forEach(element => {
          const elementPosition = element.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.2;
          
          if (elementPosition < screenPosition) {
              element.style.opacity = '1';
              element.style.transform = 'translateY(0)';
          }
      });
  };

  // Set initial state for animated elements
  document.querySelectorAll('.title-line').forEach((line, index) => {
      line.style.transitionDelay = `${index * 0.2}s`;
  });

  document.querySelectorAll('.project-card').forEach((card, index) => {
      card.style.transitionDelay = `${index * 0.1}s`;
  });

  window.addEventListener('scroll', animateOnScroll);
  animateOnScroll(); // Run once on load

  // Counter Animation
  const counters = document.querySelectorAll('.stat-number');
  const speed = 200;
  
  function animateCounters() {
      counters.forEach(counter => {
          const target = +counter.getAttribute('data-count');
          const count = +counter.innerText;
          const increment = target / speed;
          
          if (count < target) {
              counter.innerText = Math.ceil(count + increment);
              setTimeout(animateCounters, 1);
          } else {
              counter.innerText = target;
          }
      });
  }
  
  // Start counter when section is in view
  const aboutSection = document.querySelector('#about');
  const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
          animateCounters();
          observer.unobserve(aboutSection);
      }
  }, { threshold: 0.5 });
  
  observer.observe(aboutSection);

  // Skill Progress Bars
  const skills = [
      { name: 'HTML/CSS', level: 80 },
      { name: 'JavaScript', level: 70 },
      { name: 'React.js', level: 80 },
      { name: 'Vue.js', level: 90 },
      { name: 'Laravel', level: 95 },
      { name: 'Golang', level: 60 },
      { name: 'Mysql', level: 70 },
      { name: 'PostgreSql', level: 90 },
  ];

  const skillsList = document.querySelector('.skills-list');
  
  skills.forEach(skill => {
      const skillItem = document.createElement('div');
      skillItem.className = 'skill-item';
      skillItem.innerHTML = `
          <div class="skill-header">
              <div class="skill-icon">
                  <i class="fas fa-code"></i>
              </div>
              <div class="skill-name">${skill.name}</div>
          </div>
          <div class="skill-progress">
              <div class="skill-progress-bar" data-level="${skill.level}"></div>
          </div>
      `;
      skillsList.appendChild(skillItem);
  });

  // Animate skill bars when section is in view
  const skillsSection = document.querySelector('#skills');
  const skillsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
          document.querySelectorAll('.skill-progress-bar').forEach(bar => {
              const level = bar.getAttribute('data-level');
              bar.style.width = `${level}%`;
          });
          skillsObserver.unobserve(skillsSection);
      }
  }, { threshold: 0.5 });
  
  skillsObserver.observe(skillsSection);

  // Radar Chart for Skills
  const radarCtx = document.getElementById('skills-radar').getContext('2d');
  const radarChart = new Chart(radarCtx, {
      type: 'radar',
      data: {
          labels: ['HTML/CSS', 'JavaScript', 'React.js', 'Vue.js', 'Laravel', 'Golang', 'Mysql', 'PostgreSql'],
          datasets: [{
              label: 'Skill Level',
              data: [80, 70, 80, 90, 95, 60, 70, 90],
              backgroundColor: 'rgba(108, 99, 255, 0.2)',
              borderColor: 'rgba(108, 99, 255, 1)',
              borderWidth: 2,
              pointBackgroundColor: 'rgba(108, 99, 255, 1)',
              pointRadius: 4
          }]
      },
      options: {
          scales: {
              r: {
                  angleLines: {
                      display: true,
                      color: 'rgba(0, 0, 0, 0.1)'
                  },
                  suggestedMin: 0,
                  suggestedMax: 100,
                  ticks: {
                      display: false
                  }
              }
          },
          plugins: {
              legend: {
                  display: false
              }
          },
          elements: {
              line: {
                  tension: 0.1
              }
          }
      }
  });

  // Project Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectsGrid = document.querySelector('.projects-grid');
  
  // Sample projects data
  const projects = [
      {
          title: 'Online Garage Shop',
          description: 'A website for buying and selling workshop products with a simple interface and secure transactions..',
          image: 'bengkel.jpg',
          tags: ['fullstack'],
          link: '#'
      },
      {
          title: 'Website Growtopia',
          description: 'This website is created to introduce the Growtopia private server and how to play it easily.',
          image: 'growto.jpg',
          tags: ['frontend'],
          link: '#'
      },
      {
          title: 'Rent Car',
          description: 'A web-based car rental system that allows users to book, manage, and track vehicle rentals in real-time.',
          image: 'image.png',
          tags: ['fullstack'],
          link: '#'
      },
      {
          title: 'Website Development Services',
          description: 'A service website is an online platform for offering professional services.',
          image: 'WhatsApp Image 2025-05-19 at 23.30.32_b1d940fa.jpg',
          tags: ['frontend'],
          link: '#'
      },
      {
          title: 'Cashier App',
          description: 'A website application for managing sales, inventory product, and real-time reports.',
          image: 'kair.jpg',
          tags: ['fullstack'],
          link: '#'
      },
  ];

  // Load projects
  function loadProjects(filter = 'all') {
      projectsGrid.innerHTML = '';
      
      const filteredProjects = filter === 'all' 
          ? projects 
          : projects.filter(project => project.tags.includes(filter));
      
      filteredProjects.forEach(project => {
          const projectCard = document.createElement('div');
          projectCard.className = 'project-card';
          projectCard.innerHTML = `
              <div class="project-image">
                  <img src="${project.image}" alt="${project.title}">
                  <div class="project-overlay">
                      <h3>${project.title}</h3>
                      <p>${project.description}</p>
                      <a href="${project.link}" class="btn-secondary">View Project</a>
                  </div>
              </div>
              <div class="project-info">
                  <h3>${project.title}</h3>
                  <p>${project.description}</p>
                  <div class="project-tags">
                      ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
                  </div>
              </div>
          `;
          projectsGrid.appendChild(projectCard);
      });
  }

  // Initialize projects
  loadProjects();

  // Filter projects
  filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
          filterBtns.forEach(b => b.classList.remove('active'));
          this.classList.add('active');
          const filter = this.getAttribute('data-filter');
          loadProjects(filter);
      });
  });

  // Form Submission
  const contactForm = document.querySelector('.contact-form');
  const submitBtn = contactForm.querySelector('button[type="submit"]');
  


  // Smooth Scrolling for Anchor Links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
              window.scrollTo({
                  top: targetElement.offsetTop - 80,
                  behavior: 'smooth'
              });
          }
      });
  });

  // Initialize Particles.js
  if (typeof particlesJS !== 'undefined') {
      particlesJS('particles-js', {
          particles: {
              number: { value: 80, density: { enable: true, value_area: 800 } },
              color: { value: "#6c63ff" },
              shape: { type: "circle" },
              opacity: { value: 0.5, random: true },
              size: { value: 3, random: true },
              line_linked: { enable: true, distance: 150, color: "#6c63ff", opacity: 0.4, width: 1 },
              move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out" }
          },
          interactivity: {
              detect_on: "canvas",
              events: {
                  onhover: { enable: true, mode: "repulse" },
                  onclick: { enable: true, mode: "push" }
              }
          }
      });
  }

  // GSAP Animations
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Animate sections on scroll
      gsap.utils.toArray('section').forEach(section => {
          gsap.from(section, {
              scrollTrigger: {
                  trigger: section,
                  start: "top 80%",
                  toggleActions: "play none none none"
              },
              opacity: 0,
              y: 50,
              duration: 1
          });
      });
      
      // Parallax effect for hero
      gsap.to(".hero-content", {
          scrollTrigger: {
              trigger: ".hero",
              start: "top top",
              end: "bottom top",
              scrub: true
          },
          y: 100,
          opacity: 0
      });

      // Navigasi aktif
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (pageYOffset >= (sectionTop - 100)) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Smooth scrolling dengan memperhatikan class aktif
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    // Hapus class active dari semua link
    navLinks.forEach(link => link.classList.remove('active'));
    
    // Tambah class active ke link yang diklik
    this.classList.add('active');
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});
  }
});

// Certificates Section Functionality
document.addEventListener('DOMContentLoaded', function() {
  const certificatesScroller = document.querySelector('.certificates-scroller');
  const certificateItems = document.querySelectorAll('.certificate-item');
  const prevBtn = document.querySelector('.certificates-prev');
  const nextBtn = document.querySelector('.certificates-next');
  const dotsContainer = document.querySelector('.certificates-dots');
  
  // Create dots
  certificateItems.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => {
          scrollToCertificate(index);
      });
      dotsContainer.appendChild(dot);
  });
  
  const dots = document.querySelectorAll('.certificates-dots .dot');
  
  // Scroll to specific certificate
  function scrollToCertificate(index) {
      const itemWidth = certificateItems[0].offsetWidth + 30; // Include gap
      certificatesScroller.scrollTo({
          left: index * itemWidth,
          behavior: 'smooth'
      });
      updateDots(index);
  }
  
  // Update active dot
  function updateDots(activeIndex) {
      dots.forEach((dot, index) => {
          dot.classList.toggle('active', index === activeIndex);
      });
  }
  
  // Navigation buttons
  prevBtn.addEventListener('click', () => {
      certificatesScroller.scrollBy({
          left: -350,
          behavior: 'smooth'
      });
  });
  
  nextBtn.addEventListener('click', () => {
      certificatesScroller.scrollBy({
          left: 350,
          behavior: 'smooth'
      });
  });
  
  // Update dots on scroll
  certificatesScroller.addEventListener('scroll', () => {
      const scrollPosition = certificatesScroller.scrollLeft;
      const itemWidth = certificateItems[0].offsetWidth + 30;
      const activeIndex = Math.round(scrollPosition / itemWidth);
      updateDots(activeIndex);
  });
  
  // Animate certificates on scroll
  const animateCertificates = function() {
      certificateItems.forEach((item, index) => {
          const itemPosition = item.getBoundingClientRect().top;
          const screenPosition = window.innerHeight / 1.3;
          
          if (itemPosition < screenPosition) {
              setTimeout(() => {
                  item.classList.add('animate');
              }, index * 150);
          }
      });
  };
  
  // Initialize
  window.addEventListener('load', animateCertificates);
  window.addEventListener('scroll', animateCertificates);
  animateCertificates();
  
  // Enable horizontal scroll with mouse wheel
  certificatesScroller.addEventListener('wheel', (e) => {
      e.preventDefault();
      certificatesScroller.scrollLeft += e.deltaY;
  });
});