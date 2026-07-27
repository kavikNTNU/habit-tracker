fetch('/api/habits')
  .then(function (response) {
    return response.json();
  })
  .then(function (habits) {
    const list = document.querySelector('#habit-list');

    habits.forEach(function (habit) {
      const li = document.createElement('li');
      li.textContent = habit.name + ' ';

      const button = document.createElement('button');
      button.textContent = 'Mark done';
      button.dataset.habit = habit.name;

      button.addEventListener('click', function () {
        li.classList.toggle('done');

        fetch('/api/log', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ habit: habit.name })
        });
      });

      li.appendChild(button);
      list.appendChild(li);
    });
  });
