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

let current_slide = [...imgs].findIndex(img => img.classList.contains('current'));

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


// Send massege to Telegram
const TelegramBotToken = '7078321427:AAHAwtID5m9wf-xgoA-SvZHFy3d7kkF6YmA';
const TelegramChatId = '@TheALLEYgroup';
const API = `https://api.telegram.org/bot${TelegramBotToken}/sendMessage`;

async function sendEmailTelegram() {
  event.preventDefault();
  // return false

  const form = event.currentTarget;

  // Need sbumit
  const formBtn = document.querySelector('.btn');
  const formSendResult = document.querySelector('.form__send-result');
  formSendResult.textContent = '';

  const { name, phone } = Object.fromEntries(new FormData(form).entries());
  const text = `Заявка від ${name},\n  ${phone}`;

  try {
    formBtn.textContent = 'Відправка повідомлення'
    const response = await fetch(API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        chat_id: TelegramChatId,
        text
      })
    });

    if (response.ok) {
      formSendResult.textContent = 'Дякуємо за запит, наші спеціалісти зв`яжутся з вами наближчим часом.';
      form.reset();
    }
    else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    console.error(error);
    formSendResult.textContent = 'Вибачте сервіс тимчасово не працює, спробуйте будь-ласка пізніше';
    formSendResult.style.color = 'red'
  }
  finally {
    formBtn.textContent = 'Перездвоніть мені';
    setInterval(closeModal, 1500);
  }

}