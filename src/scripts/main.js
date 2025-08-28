import validator from "validator";
import { animate } from "animejs";

initAndStart();

function initAndStart() {
  

  storeAndWriteData();

  const inputEmail = document.getElementById("email");
  inputEmail.removeEventListener("blur", validation);
  inputEmail.addEventListener("blur", validation);

  const form = document.getElementById("form");
  form.removeEventListener("submit", handleSubmit);
  form.addEventListener("submit", handleSubmit);
}
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//
// store and retrieve data from local storage
function storeAndWriteData() {
  const inputEmail = document.getElementById("email");
  let storeEmail = localStorage.getItem("email") || "";

  if (storeEmail) {
    inputEmail.value = storeEmail.trim();
  }

  inputEmail.addEventListener("input", () => {
    localStorage.setItem("email", inputEmail.value.trim());
  });
}

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//
// email validation
function validation() {
  const inputEmail = document.getElementById("email");
  const errorEmail = document.getElementById("error-email");

  if (inputEmail.value === "") {
    errorEmail.textContent = "Please type email";
    inputEmail.classList.add("u-error");
    return false;
  } else if (!validator.isEmail(inputEmail.value)) {
    errorEmail.textContent = "Valid email required";
    inputEmail.classList.add("u-error");
    return false;
  } else {
    errorEmail.textContent = "";
    inputEmail.classList.remove("u-error");
    return true;
  }
}

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//
// submit logic
function handleSubmit(event) {
  event.preventDefault();
  const isValid = validation();

  if (isValid) {
    // dev check of sent data
    const form = document.getElementById("form");
    const formData = new FormData(form);
    for (const [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    showSuccess();
  }
}

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//
// success message logic
function showSuccess() {
  const userEmail = localStorage.getItem("email");
  const markup = document.getElementById("card-subscribe");
  let markupBackup = markup.innerHTML;

  markup.classList.remove("c-card");
  markup.classList.remove("u-flex:col");
  markup.classList.remove("u-gap:2.5rem");

  markup.innerHTML = `
    <article class="o-card_success">
      <div class="u-flex:col u-gap:2rem o-card_success:title">
        <img
            src="./assets/images/icon-success.svg"
            width="64"
            height="64"
            alt="Check"
          />
        <h2 class="f-preset_1">Thanks for subscribing!</h2>
        <p class="f-preset_2 f-width:40ch">A confirmation email has been sent to <strong class="f-preset_2 f-weight:700">${userEmail}</strong>. Please open it and click the button inside to confirm your subscription</p>
      </div>
      <button class="c-button" id="button-dismiss" type="button">Dismiss message</button>
    </article>
  `;

  // clone of container (to remove old listeners)
  const freshMarkup = markup.cloneNode(true);
  markup.parentNode.replaceChild(freshMarkup, markup);

  // listener on btn dismiss
  freshMarkup.addEventListener("click", (event) => {
    if (event.target.matches("#button-dismiss")) {
      freshMarkup.innerHTML = markupBackup;

      const markup = document.getElementById("card-subscribe");

      markup.classList.add("c-card");
      markup.classList.add("u-flex:col");
      markup.classList.add("u-gap:2.5rem");

      localStorage.removeItem("email");
      const form = document.getElementById("form");
      form.reset();
      initAndStart();
    }
  });
}
