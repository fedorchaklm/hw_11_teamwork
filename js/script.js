const modalTrigger = document.querySelector("#open");
console.log(modalTrigger);
const modal = document.querySelector(".modal");
console.log(modal);
const modalCloseBtn = document.querySelector("#close");
console.log(modalCloseBtn);

modalTrigger.addEventListener("click", function () {
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";
});

function closeModal() {
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";
}

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
