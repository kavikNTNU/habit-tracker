function getJSON(url) {
  return fetch(url).then(function (response) {
    return response.json();
  });
}

function postJSON(url, data, method) {
  return fetch(url, {
    method: method || 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  }).then(function (response) {
    return response.json().then(function (body) {
      return { ok: response.ok, body: body };
    });
  });
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
  } else {
    document.documentElement.removeAttribute('data-theme');
  }
}

function updateThemeButtonLabel() {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  document.querySelector('#theme-toggle').textContent = isDark ? '☀️ Light mode' : '🌙 Dark mode';
}

applyTheme(localStorage.getItem('theme'));
updateThemeButtonLabel();

document.querySelector('#theme-toggle').addEventListener('click', function () {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  const newTheme = isDark ? 'light' : 'dark';

  applyTheme(newTheme);
  localStorage.setItem('theme', newTheme);
  updateThemeButtonLabel();
});

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

  const resourceLink = document.createElement('a');
  resourceLink.classList.add('resource-link');
  resourceLink.target = '_blank';
  resourceLink.rel = 'noopener noreferrer';
  li.appendChild(resourceLink);

  function updateResourceLink(url) {
    if (url) {
      resourceLink.href = url;
      resourceLink.textContent = '🔗 Link';
      resourceLink.classList.remove('hidden');
    } else {
      resourceLink.classList.add('hidden');
    }
  }

  updateResourceLink(habit.resource_url);

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

  const statsButton = document.createElement('button');
  statsButton.textContent = 'Stats';

  const statsContainer = document.createElement('div');
  statsContainer.classList.add('stats-container');

  statsButton.addEventListener('click', function () {
    if (statsContainer.children.length > 0) {
      statsContainer.innerHTML = '';
      return;
    }

    getJSON('/api/habits/' + habit.id + '/stats')
      .then(function (stats) {
        statsContainer.innerHTML = '';

        const summary = document.createElement('p');
        summary.classList.add('stats-summary');
        summary.textContent = stats.daysLogged + '/' + stats.totalDays + ' days — longest streak: ' + stats.longestStreak;
        statsContainer.appendChild(summary);

        const heatmap = document.createElement('div');
        heatmap.classList.add('heatmap');

        stats.heatmap.forEach(function (day) {
          const cell = document.createElement('div');
          cell.classList.add('heatmap-cell');

          if (day.done) {
            cell.classList.add('done');
          }

          cell.title = day.date;
          heatmap.appendChild(cell);
        });

        statsContainer.appendChild(heatmap);
      });
  });

  const editLinkButton = document.createElement('button');
  editLinkButton.textContent = 'Edit link';

  const linkFormContainer = document.createElement('div');
  linkFormContainer.classList.add('link-form-container');

  editLinkButton.addEventListener('click', function () {
    if (linkFormContainer.children.length > 0) {
      linkFormContainer.innerHTML = '';
      return;
    }

    const form = document.createElement('form');

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'https://...';
    input.value = habit.resource_url || '';

    const saveButton = document.createElement('button');
    saveButton.type = 'submit';
    saveButton.textContent = 'Save';

    form.appendChild(input);
    form.appendChild(saveButton);

    form.addEventListener('submit', function (event) {
      event.preventDefault();

      postJSON('/api/habits/' + habit.id, { resource_url: input.value }, 'PATCH')
        .then(function (result) {
          habit.resource_url = result.body.resource_url;
          updateResourceLink(habit.resource_url);
          linkFormContainer.innerHTML = '';
        });
    });

    linkFormContainer.appendChild(form);
  });

  li.appendChild(button);
  li.appendChild(historyButton);
  li.appendChild(historyList);
  li.appendChild(statsButton);
  li.appendChild(statsContainer);
  li.appendChild(editLinkButton);
  li.appendChild(linkFormContainer);
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
