document.addEventListener("DOMContentLoaded", function () {
  var menuBtn = document.getElementById("menuBtn");
  var closeBtn = document.getElementById("closeBtn");
  var mobileMenu = document.getElementById("mobileMenu");
  var mobileLinks = document.querySelectorAll(".mobile-links a");

  function openMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.add("active");
    mobileMenu.setAttribute("aria-hidden", "false");
  }

  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove("active");
    mobileMenu.setAttribute("aria-hidden", "true");
  }

  if (menuBtn) menuBtn.addEventListener("click", openMenu);
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);
  mobileLinks.forEach(function (link) { link.addEventListener("click", closeMenu); });

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
    support: "support@taxorithm.us",
    partner: "lloyd.shumba@taxorithm.us",
    general: "info@taxorithm.us"
  };

  var form = document.getElementById("contactForm");
  var serviceSelect = document.getElementById("clientService");
  var targetEmail = document.getElementById("targetEmail");

  function updateTargetEmail() {
    if (!serviceSelect || !targetEmail) return;
    targetEmail.textContent = serviceEmails[serviceSelect.value] || "info@taxorithm.us";
  }

  if (serviceSelect) serviceSelect.addEventListener("change", updateTargetEmail);
  updateTargetEmail();

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var name = document.getElementById("clientName").value.trim();
      var email = document.getElementById("clientEmail").value.trim();
      var phone = document.getElementById("clientPhone").value.trim();
      var organisation = document.getElementById("clientOrganisation").value.trim();
      var message = document.getElementById("clientMessage").value.trim();
      var serviceText = serviceSelect.options[serviceSelect.selectedIndex].text;
      var destination = serviceEmails[serviceSelect.value] || "info@taxorithm.us";

      var subject = "Taxorithm Advisory enquiry - " + serviceText;
      var body = [
        "Full Name: " + name,
        "Email Address: " + email,
        "Phone / WhatsApp: " + phone,
        "Organisation: " + organisation,
        "Service Required: " + serviceText,
        "",
        "Message:",
        message
      ].join("\n");

      var mailto = "mailto:" + encodeURIComponent(destination)
        + "?subject=" + encodeURIComponent(subject)
        + "&body=" + encodeURIComponent(body);

      window.location.href = mailto;
    });
  }
});
