// Here is the purpose of this:
// - prevent the form from refreshing
// - validate that the email field is filled
// - show a success message under the form like: “Successfully subscribed!”
// - use a fake front-end newsletter submission with a success message

function handleNewsletterForm() {
  const newsletterForm = document.getElementById("newsletterForm");

  if (!newsletterForm) {
    return;
  }

  newsletterForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const emailInput = document.getElementById("newsletterEmail");
    const message = document.getElementById("newsletterMessage");
    const email = emailInput.value.trim();

    if (!email) {
      message.textContent = "Please enter your email.";
      message.className = "text-danger mb-0";
      return;
    }

    message.textContent = "Successfully subscribed!";
    message.className = "text-success mb-0";

    newsletterForm.reset();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  handleNewsletterForm();
});
