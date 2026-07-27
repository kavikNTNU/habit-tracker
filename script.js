const buttons = document.querySelectorAll('button');

buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    button.parentElement.classList.toggle('done');
  });
});
