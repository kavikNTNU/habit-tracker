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

  const historyButton = document.createElement('button');
  historyButton.textContent = 'History';

  const historyList = document.createElement('ul');
  historyList.classList.add('history-list');

  historyButton.addEventListener('click', function () {
    if (historyList.children.length > 0) {
      historyList.innerHTML = '';
      return;
    }

    fetch('/api/habits/' + habit.id + '/history')
      .then(function (response) {
        return response.json();
      })
      .then(function (logs) {
        historyList.innerHTML = '';

        logs.forEach(function (log) {
          const item = document.createElement('li');
          item.textContent = log.log_date;
          historyList.appendChild(item);
        });
      });
  });

  li.appendChild(button);
  li.appendChild(historyButton);
  li.appendChild(historyList);
  list.appendChild(li);
}

function loadHabits() {
  fetch('/api/habits')
    .then(function (response) {
      return response.json();
    })
    .then(function (habits) {
      habits.forEach(renderHabit);
    });
}

function showApp() {
  document.querySelector('#auth-section').classList.add('hidden');
  document.querySelector('#app-section').classList.remove('hidden');
  loadHabits();

  fetch('/api/me')
    .then(function (response) {
      return response.json();
    })
    .then(function (user) {
      if (user.role === 'admin') {
        document.querySelector('#admin-section').classList.remove('hidden');
      }
    });
}

function tryAuth(url, username, password) {
  fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username: username, password: password })
  })
    .then(function (response) {
      if (response.ok) {
        showApp();
      } else {
        document.querySelector('#auth-error').textContent = 'Login or signup failed. Check your username and password.';
      }
    });
}

document.querySelector('#login-button').addEventListener('click', function () {
  tryAuth('/api/login', document.querySelector('#auth-username').value, document.querySelector('#auth-password').value);
});

document.querySelector('#signup-button').addEventListener('click', function () {
  tryAuth('/api/signup', document.querySelector('#auth-username').value, document.querySelector('#auth-password').value);
});

document.querySelector('#logout-button').addEventListener('click', function () {
  fetch('/api/logout', { method: 'POST' })
    .then(function () {
      document.querySelector('#app-section').classList.add('hidden');
      document.querySelector('#habit-list').innerHTML = '';
      document.querySelector('#admin-section').classList.add('hidden');
      document.querySelector('#admin-stats-list').innerHTML = '';
      document.querySelector('#auth-section').classList.remove('hidden');
    });
});

document.querySelector('#admin-stats-button').addEventListener('click', function () {
  fetch('/api/admin/stats')
    .then(function (response) {
      return response.json();
    })
    .then(function (stats) {
      const list = document.querySelector('#admin-stats-list');
      list.innerHTML = '';

      stats.forEach(function (stat) {
        const item = document.createElement('li');
        item.textContent = stat.username + ': ' + stat.habit_count + ' habits, ' + stat.total_logs + ' total logs';
        list.appendChild(item);
      });
    });
});

fetch('/api/me')
  .then(function (response) {
    if (response.ok) {
      showApp();
    } else {
      document.querySelector('#auth-section').classList.remove('hidden');
    }
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
