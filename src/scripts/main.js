import validator from "validator";

const cardSubscribe = document.getElementById("card-subscribe");
const cardSubscribeBackup = cardSubscribe.innerHTML;
let userEmail = "";

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//
// init form and start saving data to local storage
function initForm() {
  const emailInput = document.getElementById("email-input");
  const form = document.getElementById("form");

  emailInput.value = localStorage.getItem("email") || "";
  emailInput.addEventListener("input", (e) => {
    localStorage.setItem("email", e.target.value);
  });

  form.addEventListener("submit", handleSubmit);
}

initForm();

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//
// submit screen logic
function handleSubmit(e) {
  e.preventDefault();

  const emailInput = document.getElementById("email-input");
  const errorMessage = document.getElementById("email-error");

  if (!validator.isEmail(emailInput.value)) {
    errorMessage.textContent = "Valid email required";
    return;
  }

  errorMessage.textContent = "";
  localStorage.removeItem("email");
  userEmail = emailInput.value;

  cardSubscribe.innerHTML = `
    <article>
        <svg height="16" width="16">
            <use href="" />
        </svg>
        <h2>Thanks for subscribing!</h2>
        <p>A confirmation email has been sent to <span>${userEmail}</span>. Please open it and click the button inside to confirm your subscription.</p>
        <button id="dismiss-button" type="button">Dismiss message</button>
    </article>
    `;

  console.log(userEmail);
  // add animation here
}

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//
// success screen logic
cardSubscribe.addEventListener("click", (e) => {
  if (e.target.matches("#dismiss-button")) {
    cardSubscribe.innerHTML = cardSubscribeBackup;
    initForm();
    // add animation here
  }
});
