const cards = Array.from(document.querySelectorAll(".card img"));
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const prevBtn = document.querySelector(".lightbox-prev");
const nextBtn = document.querySelector(".lightbox-next");
let currentIndex = 0;

const getImgSrc = img => img.dataset.full || img.src;

const openLightbox = index => {
  currentIndex = index;
  lightboxImg.src = getImgSrc(cards[currentIndex]);
  lightbox.classList.add("active");
};

const closeLightbox = () => {
  lightbox.classList.remove("active");
};

const showNext = () => {
  currentIndex = (currentIndex + 1) % cards.length;
  lightboxImg.src = getImgSrc(cards[currentIndex]);
};

const showPrev = () => {
  currentIndex = (currentIndex - 1 + cards.length) % cards.length;
  lightboxImg.src = getImgSrc(cards[currentIndex]);
};

cards.forEach((img, index) => {
  img.addEventListener("click", () => openLightbox(index));
});

lightbox.addEventListener("click", event => {
  if (event.target === lightbox) {
    closeLightbox();
  }
});

prevBtn.addEventListener("click", event => {
  event.stopPropagation();
  showPrev();
});

nextBtn.addEventListener("click", event => {
  event.stopPropagation();
  showNext();
});

document.addEventListener("keydown", event => {
  if (!lightbox.classList.contains("active")) return;
  if (event.key === "ArrowLeft") showPrev();
  if (event.key === "ArrowRight") showNext();
  if (event.key === "Escape") closeLightbox();
});