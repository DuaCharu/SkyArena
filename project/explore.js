document.addEventListener('DOMContentLoaded', () => {
    // Sample games data - In a real app, this would come from a database
    const gamesData = [
        {
            id: 1,
            title: "Cyber Warriors",
            genre: "action",
            price: "Free",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1542751371-adc38448a05e",
            releaseDate: "2024-02-01"
        },
        {
            id: 2,
            title: "Dragon Quest",
            genre: "rpg",
            price: "$29.99",
            rating: 4.9,
            image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f",
            releaseDate: "2024-01-15"
        },
        {
            id: 3,
            title: "Space Command",
            genre: "strategy",
            price: "$19.99",
            rating: 4.7,
            image: "https://images.unsplash.com/photo-1556438064-2d7646166914",
            releaseDate: "2024-01-01"
        },
        {
            id: 4,
            title: "Sports League 2024",
            genre: "sports",
            price: "$39.99",
            rating: 4.6,
            image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f",
            releaseDate: "2024-02-15"
        },
        {
            id: 5,
            title: "Mystery Island",
            genre: "adventure",
            price: "$24.99",
            rating: 4.8,
            image: "https://images.unsplash.com/photo-1556438064-2d7646166914",
            releaseDate: "2024-02-10"
        }
    ];

    let filteredGames = [...gamesData];
    const gamesGrid = document.getElementById('games-grid');
    const searchInput = document.getElementById('game-search');
    const genreFilters = document.querySelectorAll('[data-genre]');
    const priceFilters = document.querySelectorAll('[data-price]');
    const sortSelect = document.getElementById('sort-games');

    function renderGames(games) {
        gamesGrid.innerHTML = games.map(game => `
            <div class="game-card" data-genre="${game.genre}">
                <div class="game-image" style="background-image: url('${game.image}');">
                    <div class="game-overlay">
                        <button class="btn" onclick="window.location.href='game-details.html?id=${game.id}'">View Details</button>
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

    function filterGames() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeGenre = document.querySelector('[data-genre].active').dataset.genre;
        const activePrice = document.querySelector('[data-price].active').dataset.price;

        let filtered = gamesData.filter(game => {
            const matchesSearch = game.title.toLowerCase().includes(searchTerm);
            const matchesGenre = activeGenre === 'all' || game.genre === activeGenre;
            
            let matchesPrice = true;
            if (activePrice !== 'all') {
                const price = parseFloat(game.price.replace('$', '')) || 0;
                switch (activePrice) {
                    case 'free':
                        matchesPrice = game.price === 'Free';
                        break;
                    case 'under-20':
                        matchesPrice = price < 20;
                        break;
                    case '20-40':
                        matchesPrice = price >= 20 && price <= 40;
                        break;
                    case '40-plus':
                        matchesPrice = price > 40;
                        break;
                }
            }

            return matchesSearch && matchesGenre && matchesPrice;
        });

        // Apply sorting
        const sortBy = sortSelect.value;
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'popular':
                    return b.rating - a.rating;
                case 'newest':
                    return new Date(b.releaseDate) - new Date(a.releaseDate);
                case 'price-low':
                    return (parseFloat(a.price.replace('$', '')) || 0) - (parseFloat(b.price.replace('$', '')) || 0);
                case 'price-high':
                    return (parseFloat(b.price.replace('$', '')) || 0) - (parseFloat(a.price.replace('$', '')) || 0);
                case 'rating':
                    return b.rating - a.rating;
                default:
                    return 0;
            }
        });

        filteredGames = filtered;
        renderGames(filtered);
    }

    // Event listeners
    searchInput.addEventListener('input', filterGames);
    sortSelect.addEventListener('change', filterGames);

    genreFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            genreFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterGames();
        });
    });

    priceFilters.forEach(btn => {
        btn.addEventListener('click', () => {
            priceFilters.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterGames();
        });
    });

    // Initialize page
    renderGames(gamesData);
});