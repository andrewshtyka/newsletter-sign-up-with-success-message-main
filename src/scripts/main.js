import validator from "validator";

const cardSubscribe = document.getElementById("card-subscribe");
const cardSubscribeBackup = cardSubscribe.innerHTML;
let userEmail = "";

cardSubscribe.addEventListener("submit", (e) => {
  e.preventDefault();

  const emailInput = e.target.querySelector("#email-input");
  const errorMessage = e.target.querySelector("#email-error");

  if (!validator.isEmail(emailInput.value)) {
    errorMessage.textContent = "Valid email required";
    return;
  }

  errorMessage.textContent = "";
  userEmail = emailInput.value;
  emailInput.value = "";

  cardSubscribe.innerHTML = `
    <article id="card-thanks">
        <svg height="16" width="16">
            <use href="" />
        </svg>
        <h2>Thanks for subscribing!</h2>
        <p>A confirmation email has been sent to <span>${userEmail}</span>. Please open it and click the button inside to confirm your subscription.</p>
        <button id="dismiss-button" type="button">Dismiss message</button>
    </article>
    `;

  // add animation here
});

cardSubscribe.addEventListener("click", (e) => {
  if (e.target.matches("#dismiss-button")) {
    cardSubscribe.innerHTML = cardSubscribeBackup;
    // add animation here
  }
});
