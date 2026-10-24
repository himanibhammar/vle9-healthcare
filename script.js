/**
 * MediCare Secure - Frontend Interactions
 * Vanilla JavaScript implementation for the DevSecOps healthcare landing page demonstration.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elements
  const header = document.getElementById('site-header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinks = document.getElementById('nav-links');
  const lookupForm = document.getElementById('patient-lookup-form');
  const patientIdInput = document.getElementById('patient-id-input');
  const lookupResult = document.getElementById('lookup-result');
  const demoAlertText = document.getElementById('demo-alert-text');
  const navItems = document.querySelectorAll('.nav-link');

  /* ==========================================================================
     1. Sticky Header Shadow on Scroll
     ========================================================================== */
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Initial check

  /* ==========================================================================
     2. Mobile Navigation Toggle
     ========================================================================== */
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      const isExpanded = mobileToggle.getAttribute('aria-expanded') === 'true';
      mobileToggle.setAttribute('aria-expanded', String(!isExpanded));
      navLinks.classList.toggle('open');
    });

    // Close menu when clicking any nav item
    navItems.forEach((link) => {
      link.addEventListener('click', () => {
        if (navLinks.classList.contains('open')) {
          navLinks.classList.remove('open');
          mobileToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  /* ==========================================================================
     3. Active Link Highlighting on Scroll
     ========================================================================== */
  const sections = document.querySelectorAll('section[id], header[id]');

  const highlightNavOnScroll = () => {
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        navItems.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

  /* ==========================================================================
     4. Patient Lookup Demonstration Form
     ========================================================================== */
  if (lookupForm && patientIdInput && lookupResult && demoAlertText) {
    lookupForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const enteredId = patientIdInput.value.trim();

      if (!enteredId) {
        // Display validation feedback
        patientIdInput.focus();
        demoAlertText.textContent = 'Please enter a Patient ID to run the lookup simulation.';
        lookupResult.classList.remove('show');
        void lookupResult.offsetWidth; // Trigger reflow for animation restart
        lookupResult.classList.add('show');
        return;
      }

      // Safe text content insertion preventing XSS injection
      demoAlertText.textContent = `Demo only: Patient record lookup for "${enteredId}" is not connected yet.`;

      // Show result card with gentle animation
      lookupResult.classList.remove('show');
      void lookupResult.offsetWidth; // Restart CSS animation
      lookupResult.classList.add('show');

      // Accessibility focus announcement
      lookupResult.setAttribute('tabindex', '-1');
      lookupResult.focus({ preventScroll: true });
    });
  }
});
