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
});
