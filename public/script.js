function getJSON(url) {
  return fetch(url).then(function (response) {
    return response.json();
  });
}

function postJSON(url, data) {
  return fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(function (response) {
    return response.json().then(function (body) {
      return { ok: response.ok, body: body };
    });
  });
}

function renderHabit(habit) {
  const list = document.querySelector('#habit-list');
  const li = document.createElement('li');
  let text = habit.name;

  if (habit.streak > 0) {
    text = text + ' — streak: ' + habit.streak;
  }

  const nameSpan = document.createElement('span');
  nameSpan.classList.add('habit-name');
  nameSpan.textContent = text;
  li.appendChild(nameSpan);

  if (habit.done_today) {
    li.classList.add('done');
  }

  const button = document.createElement('button');
  button.textContent = 'Mark done';
  button.dataset.habit = habit.name;

  button.addEventListener('click', function () {
    li.classList.toggle('done');

    postJSON('/api/log', { habit: habit.name });
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

    getJSON('/api/habits/' + habit.id + '/history')
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
  getJSON('/api/habits').then(function (habits) {
    habits.forEach(renderHabit);
  });
}

function showApp() {
  document.querySelector('#auth-section').classList.add('hidden');
  document.querySelector('#app-section').classList.remove('hidden');
  loadHabits();

  getJSON('/api/me').then(function (user) {
    if (user.role === 'admin') {
      document.querySelector('#admin-section').classList.remove('hidden');
    }
  });
}

function tryAuth(url, username, password) {
  postJSON(url, { username: username, password: password }).then(function (result) {
    if (result.ok) {
      showApp();
    } else {
      document.querySelector('#auth-error').textContent = result.body.error;
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
  postJSON('/api/logout').then(function () {
    document.querySelector('#app-section').classList.add('hidden');
    document.querySelector('#habit-list').innerHTML = '';
    document.querySelector('#admin-section').classList.add('hidden');
    document.querySelector('#admin-stats-list').innerHTML = '';
    document.querySelector('#auth-section').classList.remove('hidden');
  });
});

document.querySelector('#admin-stats-button').addEventListener('click', function () {
  getJSON('/api/admin/stats').then(function (stats) {
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

  postJSON('/api/habits', { name: input.value }).then(function (result) {
    if (result.ok) {
      renderHabit(result.body);
      input.value = '';
      document.querySelector('#habit-error').textContent = '';
    } else {
      document.querySelector('#habit-error').textContent = result.body.error;
    }
  });
});
