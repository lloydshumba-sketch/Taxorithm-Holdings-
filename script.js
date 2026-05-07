const API_BASE_URL = "https://taxorithm-backend.onrender.com";

document.addEventListener("DOMContentLoaded", function () {
  // your menu code

  var serviceEmails = {
    registrations: "registrations@taxorithm.us",
    tax: "tax@taxorithm.us",
    accounts: "accounts@taxorithm.us",
    consulting: "consulting@taxorithm.us",
    training: "consulting@taxorithm.us",
    internalAudit: "consulting@taxorithm.us",
    forensics: "forensics@taxorithm.us",
    technology: "support@taxorithm.us",
    data: "consulting@taxorithm.us",
    procurement: "info@taxorithm.us",
    support: "support@taxorithm.us",
    partner: "lloyd.shumba@taxorithm.us",
    general: "info@taxorithm.us"
  };

  var contactForm = document.querySelector("form");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      var formData = new FormData(contactForm);

      var selectedService = formData.get("service") || "general";

      var payload = {
        name: formData.get("name") || "",
        email: formData.get("email") || "",
        phone: formData.get("phone") || "",
        service: selectedService,
        serviceEmail: serviceEmails[selectedService] || serviceEmails.general,
        message: formData.get("message") || ""
      };

      fetch(API_BASE_URL + "/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        alert("Thank you. Your enquiry has been received successfully.");
        contactForm.reset();
      })
      .catch(function (error) {
        console.error("Contact form error:", error);
        alert("Sorry, there was a problem submitting your enquiry. Please try again.");
      });
    });
  }
});
