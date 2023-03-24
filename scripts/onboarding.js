var slides = document.querySelectorAll('.slides img');
var currentSlide = 0;
var slideWidth = document.querySelector('.slides').offsetWidth;

function showSlide(n) { 
  if (n < 0 || n >= slides.length) {
    // se siamo alla fine delle slide, nascondiamo l'onboarding
    hideOnboarding();
    return;
  }
  slides[currentSlide].style.opacity = 0;
  currentSlide = n;
  slides[currentSlide].style.opacity = 1;
}

function nextSlide() {
  showSlide(currentSlide + 1);
}

function prevSlide() {
  if (currentSlide === 0) {
    // se siamo alla prima slide, non fare nulla
    return;
  }
  showSlide(currentSlide - 1);
}

function hideOnboarding() {
  var onboarding = document.querySelector('.onboarding');
  onboarding.style.opacity = 1;
  var fadeOutInterval = setInterval(function() {
    if (onboarding.style.opacity > 0) {
      onboarding.style.opacity -= 0.1;
    } else {
      clearInterval(fadeOutInterval);
      onboarding.style.display = 'none';
    }
  }, 50);
  document.cookie = 'onboardingShown=true; max-age=31536000';
}


if (document.cookie.indexOf('onboardingShown') === -1) {
  showSlide(0);

  var onboarding = document.querySelector('.onboarding');
  onboarding.addEventListener('click', function(event) {
    var x = event.clientX - onboarding.getBoundingClientRect().left;
    if (x < slideWidth / 2) {
      prevSlide();
    } else {
      nextSlide();
    }
  });

  var skipButton = document.createElement('h6');
  skipButton.textContent = 'Salta introduzione';
  skipButton.style.position = 'absolute';
  skipButton.style.bottom = '70px';
  skipButton.style.left = '50%';
  skipButton.style.transform = 'translateX(-50%)';
  skipButton.style.textDecoration = 'underline';
  skipButton.style.cursor = 'pointer';
  skipButton.style.color = 'var(--secondary-color)';
  skipButton.style.backgroundColor = 'var(--main-color)';
  skipButton.style.borderRadius = '10px';
  skipButton.style.padding = '15px';
  skipButton.addEventListener('click', hideOnboarding); 
  onboarding.appendChild(skipButton); 
} else {
  document.querySelector('.onboarding').style.display = 'none';
}

function initOnboarding() {
  var onboarding = document.querySelector('.onboarding');
  var slideIndex = 0;
  showSlide(slideIndex);
  onboarding.addEventListener('click', function(e) {
    e.stopPropagation();
    if (e.target.classList.contains('next')) {
      slideIndex++;
      showSlide(slideIndex);
    }
    if (e.target.classList.contains('prev')) {
      if (slideIndex > 0) {
        slideIndex--;
        showSlide(slideIndex);
      }
    }
  });
  var closeButton = document.querySelector('.close');
  closeButton.addEventListener('click', hideOnboarding);

  var slides = document.querySelectorAll('.slide');
  var firstSlide = slides[0];
  firstSlide.addEventListener('click', function(e) {
    e.stopPropagation(); 
  });
}
