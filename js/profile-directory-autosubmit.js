(function (Drupal, once) {
  'use strict';

  Drupal.behaviors.glenvilleProfileAutosubmit = {
    attach(context) {
      // Limit to directory view if you like, e.g., ".view-id-profiles_directory".
      const forms = once('glenvilleProfileAutosubmit', '.views-exposed-form', context);
      forms.forEach((form) => {
        form.querySelectorAll('select').forEach((select) => {
          select.addEventListener('change', () => {
            // Prefer submitting the form; Views Ajax will intercept if enabled.
            if (typeof form.requestSubmit === 'function') {
              form.requestSubmit();
            } else {
              const submit =
                form.querySelector('[data-drupal-selector^="edit-submit-"]') ||
                form.querySelector('input[type="submit"], button[type="submit"]');
              if (submit) submit.click();
            }
          });
        });
      });
    }
  };
})(Drupal, once);
