import validator from "validator";

const form = document.getElementById("form");
let userEmail = "";
const cardSubscribe = document.getElementById("card-subscribe");
const cardSubscribeBackup = cardSubscribe.innerHTML;

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//
// save to local storage
const emailInput = document.getElementById("email-input");
emailInput.value = localStorage.getItem("email") || "";
emailInput.addEventListener("input", (e) => {
  localStorage.setItem("email", e.target.value);
  console.log(e.target.value);
});

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//
// logic of submit & validation
function handleSubmit(e) {
  e.preventDefault();

  const emailInput = document.getElementById("email-input");
  const errorMessage = document.getElementById("email-error");

  if (!validator.isEmail(emailInput.value)) {
    errorMessage.textContent = "Valid email required";
    return;
  }

  errorMessage.textContent = "";
  userEmail = emailInput.value;
  localStorage.removeItem("email");
  emailInput.value = "";

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

  // add animation here
}

form.addEventListener("submit", handleSubmit);

//////////////////////////////////////////////////
//////////////////////////////////////////////////
//////////////////////////////////////////////////
//
// markup for success
cardSubscribe.addEventListener("click", (e) => {
  if (e.target.matches("#dismiss-button")) {
    cardSubscribe.innerHTML = cardSubscribeBackup;

    const emailInput = document.getElementById("email-input");
    emailInput.value = localStorage.getItem("email") || "";
    emailInput.addEventListener("input", (e) => {
      localStorage.setItem("email", e.target.value);
      console.log(e.target.value);
    });

    const form = document.getElementById("form");
    form.addEventListener("submit", handleSubmit);

    // add animation here
  }
});
