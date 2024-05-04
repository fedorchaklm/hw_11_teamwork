/* The code `window.addEventListener("scroll", function (e) {
  document.body.style.cssText = `--scrollTop: ${this.scrollY}px`;
});` is adding an event listener to the `window` object for the `scroll` event. When the user
scrolls the page, the provided function is executed. */
window.addEventListener("scroll", function (e) {
  document.body.style.cssText = `--scrollTop: ${this.scrollY}px`;
});

/* These lines of code are selecting specific elements from the HTML document using their IDs and
classes: */
const modalTrigger = document.querySelector("#open");
const modal = document.querySelector(".modal");
const modalCloseBtn = document.querySelector("#close");

/**
 * The function `openModal` adds a "show" class to the modal element, removes the "hide" class, and
 * sets the body's overflow style to "hidden".
 */
function openModal() {
  modal.classList.add("show");
  modal.classList.remove("hide");
  document.body.style.overflow = "hidden";
  clearInterval(modalTimerId);
}

/**
 * The function closeModal hides a modal by adding a "hide" class, removing the "show" class, and
 * resetting the body's overflow style.
 */
function closeModal() {
  modal.classList.add("hide");
  modal.classList.remove("show");
  document.body.style.overflow = "";
}
/* The code `modalTrigger.addEventListener("click", openModal);` is adding an event listener to the
`modalTrigger` element. When a click event occurs on the `modalTrigger` element (usually a button or
link), the `openModal` function is called, which shows the modal by adding the "show" class and
removing the "hide" class. This allows the user to open the modal by clicking on the designated
trigger element. */
modalTrigger.addEventListener("click", openModal);

modalCloseBtn.addEventListener("click", closeModal);

/* This code block is adding an event listener to the modal element. When a click event occurs within
the modal, the function checks if the target of the click event is the modal itself. If the click
event target is indeed the modal element, the `closeModal()` function is called, which hides the
modal by adding the "hide" class and removing the "show" class. This functionality allows the user
to close the modal by clicking outside of its content area. */
modal.addEventListener("click", function (e) {
  if (e.target === modal) {
    closeModal();
  }
});

/* This code block is adding an event listener to the `document` object for the `keydown` event. When a
key is pressed, the provided function is executed. */
document.addEventListener("keydown", function (e) {
  if (e.code === "Escape" && modal.classList.contains("show")) {
    closeModal();
  }
});

/* The code block you provided is setting up an interval using `setInterval` to call the `openModal`
function every 3000 milliseconds (3 seconds). This interval is stored in the `modalTimerId`
variable. */
const modalTimerId = setInterval(openModal, 3000);

const imgs = document.querySelectorAll(".slider .imgs img");
const next = document.querySelector(".slider .buttons .next");
const prev = document.querySelector(".slider .buttons .prev");

let current_slide = [...imgs].findIndex(img => img.classList.contains('current'));

/* The code block you provided is handling the functionality for the "Next" button in a slider. Here's
a breakdown of what it does: */
next.addEventListener("click", function () {
  imgs[current_slide].style.opacity = 0;
  if (current_slide == imgs.length - 1) {
    current_slide = 0;
  } else {
    current_slide++;
  }
  imgs[current_slide].style.opacity = 1;
});

/* The code block you provided is handling the functionality for the "Previous" button in a slider.
Here's a breakdown of what it does: */
prev.addEventListener("click", function () {
  imgs[current_slide].style.opacity = 0;
  if (current_slide == 0) {
    current_slide = imgs.length - 1;
  } else {
    current_slide--;
  }
  imgs[current_slide].style.opacity = 1;
});



/* The code block you provided is setting up a connection to the Telegram API for sending messages. */
const TelegramBotToken = '7078321427:AAHAwtID5m9wf-xgoA-SvZHFy3d7kkF6YmA';
const TelegramChatId = '@TheALLEYgroup';
const API = `https://api.telegram.org/bot${TelegramBotToken}/sendMessage`;

/**
 * The function `sendEmailTelegram` is an asynchronous function that handles form submission by sending
 * a message to a Telegram chat with the form data, displaying success or error messages, and resetting
 * the form.
 * @param event - The `event` parameter in the `sendEmailTelegram` function is an event object that
 * represents the event that triggered the function. In this case, it is likely an event object related
 * to a form submission, as the function is designed to send an email via Telegram when a form is
 * submitted. The
 */
async function sendEmailTelegram(event) {
  event.preventDefault();

  /* `const form = event.currentTarget;` is retrieving the element that triggered the event, which in
  this case is likely a form element. This line of code is assigning the current target of the event
  (in this case, the form that was submitted) to the variable `form`. This allows the code to access
  and work with the form element that was involved in the event, such as extracting form data for
  further processing. */
  const form = event.currentTarget;

  /* These lines of code are selecting specific elements from the HTML document using their classes. */
  const formBtn = document.querySelector('.btn');
  const formSendResult = document.querySelector('.form__send-result');
  formSendResult.textContent = '';

  /* The code `const { name, phone } = Object.fromEntries(new FormData(form).entries());` is extracting
  the form data for the `name` and `phone` fields from the submitted form. It uses the `FormData`
  constructor to create a new `FormData` object from the form element `form`, then converts the
  entries of the `FormData` object into an array of key-value pairs using `entries()`, and finally,
  it uses `Object.fromEntries()` to convert that array into an object with properties `name` and
  `phone`. */
  const { name, phone } = Object.fromEntries(new FormData(form).entries());
  const text = `Заявка від ${name},\n  ${phone}`;

  /* This code block is a try-catch-finally statement that handles the process of sending a message via
  the Telegram API when a form is submitted. Here's a breakdown of what each part of the code is
  doing: */
  try {
    /* The code snippet `formBtn.textContent = 'Відправка повідомлення'` is updating the text content of
    the `formBtn` element to indicate that a message is being sent. This change in text content serves
    as a visual feedback to the user that the message sending process is in progress. */
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

    /* This code snippet is part of a try-catch block that handles the response from sending a message via
    the Telegram API when a form is submitted. Here's a breakdown of what it does: */
    if (response.ok) {
      formSendResult.textContent = 'Дякуємо за запит, наші спеціалісти зв`яжутся з вами наближчим часом.';
      form.reset();
    }
    else {
      throw new Error(response.statusText);
    }
  } catch (error) {
    /* The code snippet `console.error(error); formSendResult.textContent = 'Вибачте сервіс тимчасово не
    працює, спробуйте будь-ласка пізніше'; formSendResult.style.color = 'red';` is handling the scenario
    where an error occurs during the process of sending a message via the Telegram API when a form is
    submitted. Here's a breakdown of what each part of the code is doing: */
    console.error(error);
    formSendResult.textContent = 'Вибачте сервіс тимчасово не працює, спробуйте будь-ласка пізніше';
    formSendResult.style.color = 'red'
  }
  finally {
    /* The code `formBtn.textContent = 'Перездвоніть мені';` is updating the text content of the `formBtn`
    element to display the text "Перездвоніть мені". This change in text content likely serves as a
    message to prompt the user to request a callback. */
    formBtn.textContent = 'Перездвоніть мені';
    setInterval(closeModal, 1500);
  }

}