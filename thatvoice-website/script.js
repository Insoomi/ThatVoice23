// THATVOICE website JavaScript
// This file controls the mobile menu, contact form, and current year.

// 1. Mobile navigation menu
const menuToggle = document.getElementById('menu-toggle');
const navigation = document.getElementById('primary-navigation');

if (menuToggle && navigation) {
  menuToggle.addEventListener('click', () => {
    const menuIsOpen = navigation.classList.toggle('is-open');
    menuToggle.setAttribute('aria-expanded', String(menuIsOpen));
    menuToggle.setAttribute('aria-label', menuIsOpen ? 'Close navigation menu' : 'Open navigation menu');
  });

  // Close the menu after a visitor selects a page section.
  navigation.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navigation.classList.remove('is-open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Open navigation menu');
    });
  });
}

// 2. Show the current year automatically in the footer.
const yearElement = document.getElementById('year');
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// 3. Contact form: prepare an email in the visitor's email application.
// This does not store information or send mail through a server.
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
      return;
    }

    const formData = new FormData(contactForm);
    const name = String(formData.get('name') || '').trim();
    const email = String(formData.get('email') || '').trim();
    const subject = String(formData.get('subject') || 'General enquiry').trim();
    const message = String(formData.get('message') || '').trim();

    const emailSubject = `THATVOICE website enquiry: ${subject}`;
    const emailBody = [
      `Name: ${name}`,
      `Reply email: ${email}`,
      `Topic: ${subject}`,
      '',
      'Message:',
      message
    ].join('\n');

    const mailtoLink = `mailto:thatvoice23@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;

    if (formStatus) {
      formStatus.textContent = 'Opening your email application. Please review the message and press Send there.';
    }

    window.location.href = mailtoLink;
  });
}
