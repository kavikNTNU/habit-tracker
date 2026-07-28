function renderHabit(habit) {
  const list = document.querySelector('#habit-list');
  const li = document.createElement('li');
  li.textContent = habit.name + ' ';

  if (habit.done_today) {
    li.classList.add('done');
  }

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
}

fetch('/api/habits')
  .then(function (response) {
    return response.json();
  })
  .then(function (habits) {
    habits.forEach(renderHabit);
  });

const form = document.querySelector('#add-habit-form');
const input = document.querySelector('#new-habit-name');

form.addEventListener('submit', function (event) {
  event.preventDefault();

  fetch('/api/habits', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: input.value })
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (habit) {
      renderHabit(habit);
      input.value = '';
    });
});
