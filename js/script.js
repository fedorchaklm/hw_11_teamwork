window.addEventListener("scroll", function (e) {
  document.body.style.cssText = `--scrollTop: ${this.scrollY}px`;
});

const modalTrigger = document.querySelector("#open");
const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector("#close");

function openModal() {
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";
  clearInterval(modalTimerId);
}

function closeModal() {
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";
}
modalTrigger.addEventListener("click", openModal);

modalCloseBtn.addEventListener("click", closeModal);

modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", function (e) {
  if (e.code === "Escape" && modal.classList.contains("show")) {
    closeModal();
  }
});

const modalTimerId = setInterval(openModal, 3000);

const imgs = document.querySelectorAll(".slider .imgs img");
const next = document.querySelector(".slider .buttons .next");
const prev = document.querySelector(".slider .buttons .prev");

let current_slide = 0;

next.addEventListener("click", function () {
  imgs[current_slide].style.opacity = 0;
  if (current_slide == imgs.length - 1) {
    current_slide = 0;
  } else {
    current_slide++;
  }
  imgs[current_slide].style.opacity = 1;
});

prev.addEventListener("click", function () {
  imgs[current_slide].style.opacity = 0;
  if (current_slide == 0) {
    current_slide = imgs.length - 1;
  } else {
    current_slide--;
  }
  imgs[current_slide].style.opacity = 1;
});
