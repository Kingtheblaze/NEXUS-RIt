// Show/hide login forms
const themeToggle = document.getElementById('theme-toggle');

themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', themeToggle.checked);
    localStorage.setItem('theme', themeToggle.checked ? 'dark' : 'light');
});

// Set the initial theme based on saved preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeToggle.checked = true;
}
document.getElementById('studentLoginBtn').addEventListener('click', () => {
    document.getElementById('mainScreen').classList.add('hidden');
    document.getElementById('studentLoginForm').classList.remove('hidden');
});

document.getElementById('teacherLoginBtn').addEventListener('click', () => {
    document.getElementById('mainScreen').classList.add('hidden');
    document.getElementById('teacherLoginForm').classList.remove('hidden');
});

document.getElementById('backToMain1').addEventListener('click', () => {
    document.getElementById('studentLoginForm').classList.add('hidden');
    document.getElementById('mainScreen').classList.remove('hidden');
});

document.getElementById('backToMain2').addEventListener('click', () => {
    document.getElementById('teacherLoginForm').classList.add('hidden');
    document.getElementById('mainScreen').classList.remove('hidden');
});

// Handle Student Login
document.getElementById('studentLoginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const usn = document.getElementById('studentUSN').value;
    const dob = document.getElementById('studentDOB').value;

    try {
        const response = await fetch('http://localhost:5500/login/student', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usn, dob })
        });

        const data = await response.json();

        if (data.success) {
            // Redirect to student dashboard
            window.location.href = '/student-dashboard.html';
        } else {
            // Show error message
            alert(data.message || 'Invalid credentials');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    }


});
// Existing functionality remains unchanged

// Ensure chatbot loads on all pages
window.botpressWebChat.onLoad(() => {
    console.log("Botpress Chatbot Loaded!");
    window.botpressWebChat.sendEvent({
        type: 'proactive-trigger',
        payload: { message: 'Hello! How can I assist you today?' }
    });
});

const apiKey = "ecb09b0167614812b1363264d4f455e0";
const url = `https://newsapi.org/v2/everything?q=keyword&apiKey=${apikey}`;

async function getWeather() {
    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error("Error fetching news data:", error);
    }
}

getNewsAPi();

function renderNews(articles) {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = ""; // Clear existing news
    articles.forEach((article) => {
        const newsItem = document.createElement("div");
        newsItem.className = "news-item";
        newsItem.innerHTML = `
        <h3>${article.title}</h3>
        <p>${article.description || "No description available."}</p>
        <a href="${article.url}" target="_blank">Read more</a>
      `;
        newsContainer.appendChild(newsItem);
    });
}

// Fetch news every 60 seconds (only set this interval once)
setInterval(fetchNews, 60000);

// Initial fetch call to populate news on page load
fetchNews();









// Handle Teacher Login
document.getElementById('teacherLoginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('teacherEmail').value;
    const password = document.getElementById('teacherPassword').value;

    try {
        const response = await fetch('http://localhost:5500/login/teacher', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();

        if (data.success) {
            window.location.href = '/teacher-dashboard.html';
        } else {
            alert('Invalid teacher credentials');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Something went wrong. Please try again.');
    }
});
