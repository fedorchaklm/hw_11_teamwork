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
