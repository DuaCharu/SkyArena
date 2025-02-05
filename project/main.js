// DOM Elements
const loginBtn = document.getElementById('login-btn');
const loginModal = document.getElementById('login-modal');
const closeModal = document.querySelector('.close');
const loginForm = document.getElementById('login-form');
const chatInput = document.getElementById('chat-input');
const sendMessageBtn = document.getElementById('send-message');
const chatMessages = document.getElementById('chat-messages');
const onlineUsersList = document.getElementById('online-users-list');
const filterBtns = document.querySelectorAll('.filter-btn');
const storeGrid = document.querySelector('.store-grid');

// Sample Data
const games = [
    {
        id: 1,
        title: 'Cyber Warriors',
        category: 'action',
        price: 'Free',
        rating: 4.8,
        image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e'
    },
    {
        id: 2,
        title: 'Dragon Quest',
        category: 'rpg',
        price: '$29.99',
        rating: 4.9,
        image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f'
    },
    {
        id: 3,
        title: 'Space Command',
        category: 'strategy',
        price: '$19.99',
        rating: 4.7,
        image: 'https://images.unsplash.com/photo-1556438064-2d7646166914'
    }
];

const onlineUsers = [
    'DragonSlayer',
    'CyberNinja',
    'StarCommander',
    'QuestMaster',
    'PixelWarrior'
];

// Modal Functionality
loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'block';
});

closeModal.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
});

// Login Form
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Add login logic here
    loginModal.style.display = 'none';
});

// Chat Functionality
function addMessage(message, user = 'You') {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.innerHTML = `
        <span class="user">${user}:</span>
        <span class="text">${message}</span>
    `;
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

sendMessageBtn.addEventListener('click', () => {
    const message = chatInput.value.trim();
    if (message) {
        addMessage(message);
        chatInput.value = '';
        
        // Simulate response
        setTimeout(() => {
            const randomUser = onlineUsers[Math.floor(Math.random() * onlineUsers.length)];
            const responses = [
                'Nice game!',
                'Anyone up for a match?',
                'GG!',
                'Let\'s team up!'
            ];
            const randomResponse = responses[Math.floor(Math.random() * responses.length)];
            addMessage(randomResponse, randomUser);
        }, 1000);
    }
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessageBtn.click();
    }
});

// Online Users
function updateOnlineUsers() {
    onlineUsersList.innerHTML = '';
    onlineUsers.forEach(user => {
        const li = document.createElement('li');
        li.textContent = user;
        onlineUsersList.appendChild(li);
    });
}

updateOnlineUsers();

// Store Filters
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.dataset.category;
        
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filteredGames = category === 'all' 
            ? games 
            : games.filter(game => game.category === category);
            
        updateStoreGrid(filteredGames);
    });
});

function updateStoreGrid(games) {
    storeGrid.innerHTML = games.map(game => `
        <div class="game-card" data-category="${game.category}">
            <div class="game-image" style="background-image: url('${game.image}');">
                <div class="game-overlay">
                    <button class="btn">Play Now</button>
                </div>
            </div>
            <div class="game-info">
                <h3>${game.title}</h3>
                <div class="game-meta">
                    <span class="game-rating">★ ${game.rating}</span>
                    <span class="game-price">${game.price}</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize store
updateStoreGrid(games);

// Parallax Effect
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    document.querySelector('.hero').style.backgroundPositionY = scrolled * 0.5 + 'px';
});

// Intersection Observer for animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

document.querySelectorAll('.game-card, .section-title').forEach(el => {
    observer.observe(el);
});