//Display of a 'success' message and input fileds' validation :)

function handleContactForm() {
  const contactForm = document.getElementById("contactForm");

  if (!contactForm) {
    return;
  }

  contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const email = document.getElementById("contactEmail").value.trim();
    const messageText = document.getElementById("contactText").value.trim();
    const privacyPolicy = document.getElementById("privacyPolicy").checked;
    const contactMessage = document.getElementById("contactMessage");

    if (!email || !messageText) {
      contactMessage.textContent = "Please fill in all fields.";
      contactMessage.className = "mt-3 mb-0 text-danger";
      return;
    }

    if (!privacyPolicy) {
      contactMessage.textContent = "You must accept the Privacy Policy.";
      contactMessage.className = "mt-3 mb-0 text-danger";
      return;
    }

    contactMessage.textContent = "Your message was sent successfully!";
    contactMessage.className = "mt-3 mb-0 text-success";

    contactForm.reset();
  });
}

document.addEventListener("DOMContentLoaded", function () {
  handleContactForm();
});