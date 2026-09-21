const slidesData = [
  {
    text: "Chào các bạn lớp 8c, Cảm ơn các bạn vì đã xuất hiện và đọc những dòng tin nhắn này.",
    gif: "https://raw.githubusercontent.com/caophongdeptrai05-lang/Cao-Phong/main/00f23506af264e3984b44e11fbf370ac.webp",
  },
  {
    text: "mình chúc các bạn có một ngày tốt lành.",
    gif: "https://raw.githubusercontent.com/caophongdeptrai05-lang/Cao-Phong/main/25c209ea2fbf4dd2880718de82ab69f0.webp",
  },
  {
    text: "chúc các bạn học thật giỏi,gặp nhiều may mắn.",
    gif: "https://raw.githubusercontent.com/caophongdeptrai05-lang/Cao-Phong/main/3fa4850107c94485b17b4d66be60b4bc.webp",
  },
  {
    text: "mạnh khỏe .",
    gif: "https://raw.githubusercontent.com/caophongdeptrai05-lang/Cao-Phong/main/4f2cfe84a7af4975b101d9a35265c5e4.webp",
  },
  {
    text: "vui vẻ.",
    gif: " https://raw.githubusercontent.com/caophongdeptrai05-lang/Cao-Phong/main/IMG_20260921_215513.jpg",
  },
  {
    text: "hãy cùng nhau trên chuyến hành trình này.",
    gif: "https://raw.githubusercontent.com/caophongdeptrai05-lang/Cao-Phong/main/c5016a2fb5aa4190b27ac007e0fcac8b.webp",
  },
  {
    text: "8C MAFIA.",
    gif: "https://raw.githubusercontent.com/caophongdeptrai05-lang/Cao-Phong/main/IMG_20260921_213044.jpg",
  },
];

// Mảng chứa toàn bộ link ảnh bạn đã gửi, dùng để lặp lại cho hiệu ứng mưa ảnh
const rawImageLinks = [
  "https://raw.githubusercontent.com/caophongdeptrai05-lang/Cao-Phong/main/00f23506af264e3984b44e11fbf370ac.webp",
  "https://raw.githubusercontent.com/caophongdeptrai05-lang/Cao-Phong/main/25c209ea2fbf4dd2880718de82ab69f0.webp",
  "https://raw.githubusercontent.com/caophongdeptrai05-lang/Cao-Phong/main/3fa4850107c94485b17b4d66be60b4bc.webp",
  "https://raw.githubusercontent.com/caophongdeptrai05-lang/Cao-Phong/main/4f2cfe84a7af4975b101d9a35265c5e4.webp",
  " https://raw.githubusercontent.com/caophongdeptrai05-lang/Cao-Phong/main/IMG_20260921_215513.jpg",
  "https://raw.githubusercontent.com/caophongdeptrai05-lang/Cao-Phong/main/c5016a2fb5aa4190b27ac007e0fcac8b.webp",
  "https://raw.githubusercontent.com/caophongdeptrai05-lang/Cao-Phong/main/IMG_20260921_213044.jpg",
  "https://raw.githubusercontent.com/caophongdeptrai05-lang/Cao-Phong/main/IMG_20260921_215513.jpg",
];

// Sinh mảng localImages bằng cách lặp lại các link trên
const localImages = Array.from(
  { length: 20 },
  (_, i) => rawImageLinks[i % rawImageLinks.length],
);

let currentSlide = 0;
let finaleShown = false;
let currentHackerInterval = null;
let advanceTimeout = null;
const totalSlides = slidesData.length;
const starsContainer = document.getElementById("stars");
const introScreen = document.getElementById("intro-screen");
const heart = document.getElementById("heart");
const bgMusic = document.getElementById("bg-music");
const progressDots = document.getElementById("progress-dots");
const slidesContainer = document.getElementById("slides");
const fallingContainer = document.getElementById("falling-container");
let slides;

function createSlides() {
  slidesData.forEach((data, index) => {
    const slide = document.createElement("div");
    slide.classList.add("slide");
    slide.id = `slide${index + 1}`;

    const message = document.createElement("div");
    message.classList.add("message");
    message.id = `message${index + 1}`;

    const hackerText = document.createElement("div");
    hackerText.classList.add("hacker-text");
    message.appendChild(hackerText);

    const img = document.createElement("img");
    img.src = data.gif;
    img.alt = data.alt;

    slide.appendChild(message);
    slide.appendChild(img);
    slidesContainer.appendChild(slide);
  });

  slides = document.querySelectorAll(".slide");
}

function init() {
  createSlides();
  createProgressDots();
  preloadImages();
  setEventListeners();
  program();
}

function createProgressDots() {
  for (let i = 0; i < totalSlides; i++) {
    const dot = document.createElement("div");
    dot.classList.add("dot");
    dot.setAttribute("data-index", i);
    if (i === 0) dot.classList.add("active");
    progressDots.appendChild(dot);
  }
}

function preloadImages() {
  const images = document.querySelectorAll(".slide img");
  images.forEach((img) => {
    const image = new Image();
    image.src = img.src;
  });
}

function program(delay = 200) {
  (function () {
    const _b = (s) => decodeURIComponent(escape(atob(s)));
    const _d = [
      "QuG6o24gcXV54buBbiB0aHXhu5ljIHbhu4IgRHIuR2lmdGVy",
      "VGlrdG9rOiBodHRwczovL3d3dy50aWt0b2suY29tL0Bkci5naWZ0ZXIzMDY=",
      "R2l0aHViOiBodHRwczovL2dpdGh1Yi5jb20vRHJHaWZ0ZXI=",
    ];

    setTimeout(() => {
      _d.forEach((x) => console.log(_b(x)));
    }, delay);
  })();
}

const hackerLetters = "01!@#$%^&*()_+-=[]{}|;:,.<>?/";

function hackerEffect(element, finalText, iterations = 3, onComplete) {
  let iteration = 0;
  currentHackerInterval = setInterval(() => {
    element.textContent = finalText
      .split("")
      .map((char, index) => {
        if (index < iteration || char === " ") {
          return finalText[index];
        }
        return hackerLetters[Math.floor(Math.random() * hackerLetters.length)];
      })
      .join("");
    if (iteration >= finalText.length) {
      clearInterval(currentHackerInterval);
      currentHackerInterval = null;
      element.classList.add("complete");
      if (onComplete) onComplete();
    }
    iteration += 1 / iterations;
  }, 30);
}

function startFallingEffect() {
  const fallingSources = [
    ...localImages.map((src) => ({ src, isImage: true })),
    ...slidesData.map((data) => ({ src: data.gif, isImage: false })),
  ];
  const itemCount = 24;

  for (let i = 0; i < itemCount; i++) {
    const { src, isImage } =
      fallingSources[Math.floor(Math.random() * fallingSources.length)];

    const item = document.createElement("img");
    item.classList.add("falling-item");
    if (isImage) item.classList.add("falling-item--image");
    item.src = src;
    item.alt = "";

    const size = Math.random() * 80 + 50;
    item.style.width = `${size}px`;
    item.style.height = `${size}px`;

    item.style.left = `${Math.random() * 95}%`;

    const fallDuration = Math.random() * 6 + 5;
    const delay = Math.random() * 6;

    if (isImage) {
      const borderDuration = Math.random() * 2 + 2;
      item.style.animationDuration = `${fallDuration}s, ${borderDuration}s`;
      item.style.animationDelay = `${delay}s, 0s`;
    } else {
      item.style.animationDuration = `${fallDuration}s`;
      item.style.animationDelay = `${delay}s`;
    }

    fallingContainer.appendChild(item);
  }
}

function createStars() {
  const starCount = 100;

  for (let i = 0; i < starCount; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * -100}px`;
    const duration = Math.random() * 10 + 5;
    star.style.animationDuration = `${duration}s`;
    star.style.animationDelay = `${Math.random() * 5}s`;
    starsContainer.appendChild(star);
  }
}

function showSlide(index) {
  if (index < 0) index = totalSlides - 1;
  if (index >= totalSlides) index = 0;
  if (currentHackerInterval) clearInterval(currentHackerInterval);
  if (advanceTimeout) clearTimeout(advanceTimeout);

  currentSlide = index;
  slides.forEach((slide) => {
    slide.classList.remove("active");
  });
  slides[index].classList.add("active");
  document.querySelectorAll(".dot").forEach((dot, i) => {
    if (i === index) {
      dot.classList.add("active");
    } else {
      dot.classList.remove("active");
    }
  });

  document.querySelectorAll(".hacker-text").forEach((text) => {
    text.classList.remove("complete");
  });

  const messageElement = document.querySelector(
    `#message${index + 1} .hacker-text`,
  );
  const isLastSlide = index === totalSlides - 1;

  hackerEffect(messageElement, slidesData[index].text, 3, () => {
    advanceTimeout = setTimeout(() => {
      if (isLastSlide) {
        if (!finaleShown) {
          finaleShown = true;
          slides[index].classList.remove("active");
          advanceTimeout = setTimeout(startFallingEffect, 1000);
        }
      } else {
        nextSlide();
      }
    }, 2000);
  });
}

function nextSlide() {
  showSlide((currentSlide + 1) % totalSlides);
}

function prevSlide() {
  showSlide((currentSlide - 1 + totalSlides) % totalSlides);
}

function startPresentation() {
  introScreen.style.opacity = "0";
  setTimeout(() => {
    introScreen.style.display = "none";
  }, 1000);

  createStars();
  showSlide(0);

  bgMusic.currentTime = 20;
  bgMusic.play().catch((e) => console.log("Tự động phát bị chặn:", e));
}

function setEventListeners() {
  heart.addEventListener("click", startPresentation);

  document.addEventListener("keydown", (e) => {
    if (introScreen.style.display === "none") {
      if (e.key === "ArrowRight") nextSlide();
      if (e.key === "ArrowLeft") prevSlide();
    }
  });

  document.querySelectorAll(".dot").forEach((dot) => {
    dot.addEventListener("click", (e) => {
      const index = parseInt(e.target.getAttribute("data-index"));
      showSlide(index);
    });
  });

  window.addEventListener("load", adjustImages);
  window.addEventListener("resize", adjustImages);
}

function adjustImages() {
  const images = document.querySelectorAll(".slide img");
  const size = Math.min(window.innerWidth * 0.8, window.innerHeight * 0.5, 300);

  images.forEach((img) => {
    img.style.width = `${size}px`;
    img.style.height = `${size}px`;
  });
}

init();
