document.addEventListener('DOMContentLoaded', function () {
  var btn = document.getElementById('demo-btn');
  if (btn) {
    btn.addEventListener('click', function () {
      // Simple demo action for the blank site
      if (typeof window.alert === 'function') {
        alert('Hello from Guardian App!');
      } else {
        console.log('Hello from Guardian App!');
      }
    });
  }
  console.log('Guardian App: DOM loaded');

  // No page selector — navigation is handled with the top nav links.

  // Highlight active nav link
  var links = document.querySelectorAll('.nav-link');
  if (links && links.length) {
    var cur = location.pathname.split('/').pop() || 'index.html';
    links.forEach(function (l) {
      if (l.getAttribute('href') === cur) {
        l.classList.add('active');
      }
    });
  }
});
