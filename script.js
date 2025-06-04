<script>
    function switchLanguage(lang) {
      document.querySelectorAll('[data-' + lang + ']').forEach(el => {
        el.textContent = el.getAttribute('data-' + lang);
      });
    }
    // Initialize default to Hindi
    window.onload = () => switchLanguage('hi');
  </script>
  <script src="https://kit.fontawesome.com/a076d05399.js" crossorigin="anonymous"></script>
