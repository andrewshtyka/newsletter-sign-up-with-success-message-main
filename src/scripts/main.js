import validator from "validator";

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

  markup.innerHTML = `
    <article>
      <svg width="64" height="64">
        <use href=""></use>
      </svg>
      <h2>Thanks for subscribing!</h2>
      <p>A confirmation email has been sent to <strong>${userEmail}</strong>. Please open it and click the button inside to confirm your subscription</p>
      <button id="button-dismiss" type="button">Dismiss message</button>
    </article>
  `;

  // clone of container (to remove old listeners)
  const freshMarkup = markup.cloneNode(true);
  markup.parentNode.replaceChild(freshMarkup, markup);

  // listener on btn dismiss
  freshMarkup.addEventListener("click", (event) => {
    if (event.target.matches("#button-dismiss")) {
      freshMarkup.innerHTML = markupBackup;

      localStorage.removeItem("email");
      const form = document.getElementById("form");
      form.reset();
      initAndStart();
    }
  });
}
