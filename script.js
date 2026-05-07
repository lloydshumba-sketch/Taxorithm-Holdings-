const API_BASE_URL = "https://taxorithm-backend.onrender.com";

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
    procurement: "info@taxorithm.us",
    support: "support@taxorithm.us",
    partner: "lloyd.shumba@taxorithm.us",
    general: "info@taxorithm.us"
  };
