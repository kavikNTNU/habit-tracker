const buttons = document.querySelectorAll('button');

buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    button.parentElement.classList.toggle('done');

    fetch('/api/log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ habit: button.dataset.habit })
    });
  });
});
