document.addEventListener('DOMContentLoaded', () => {
    // Sample game data - In a real app, this would come from a database
    const gameData = {
        title: "Cyber Warriors",
        rating: 4.9,
        genre: "Action RPG",
        releaseYear: "2024",
        price: "$29.99",
        description: `Experience the future of gaming in this immersive action RPG. 
                     Battle through a dystopian cyberpunk world, upgrade your character 
                     with cutting-edge technology, and uncover a conspiracy that threatens 
                     the entire city.`,
        features: [
            "Stunning cyberpunk world with ray-tracing support",
            "Deep character customization system",
            "Over 100 hours of gameplay",
            "Dynamic combat system",
            "Multiplayer co-op missions"
        ],
        requirements: {
            minimum: {
                os: "Windows 10 64-bit",
                processor: "Intel Core i5-8400",
                memory: "8 GB RAM",
                graphics: "NVIDIA GTX 1060 6GB",
                storage: "100 GB"
            }
        },
        media: [
            "https://images.unsplash.com/photo-1542751371-adc38448a05e",
            "https://images.unsplash.com/photo-1552820728-8b83bb6b773f",
            "https://images.unsplash.com/photo-1556438064-2d7646166914"
        ],
        similarGames: [
            {
                title: "Dragon Quest",
                image: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f",
                price: "$29.99"
            },
            {
                title: "Space Command",
                image: "https://images.unsplash.com/photo-1556438064-2d7646166914",
                price: "$19.99"
            }
        ]
    };

    // Update page content with game data
    document.getElementById('game-title').textContent = gameData.title;
    document.getElementById('game-rating').textContent = `★ ${gameData.rating}`;
    document.getElementById('game-genre').textContent = gameData.genre;
    document.getElementById('game-release').textContent = gameData.releaseYear;
    document.getElementById('game-description').textContent = Continuing the game-details.js file content:

    document.getElementById('game-description').textContent = gameData.description;
    document.getElementById('game-price').textContent = gameData.price;
    document.getElementById('game-banner').style.backgroundImage = `url('${gameData.media[0]}')`;

    // Add features
    const featuresList = document.getElementById('game-features');
    gameData.features.forEach(feature => {
        const li = document.createElement('li');
        li.textContent = feature;
        featuresList.appendChild(li);
    });

    // Add system requirements
    const requirementsDiv = document.getElementById('system-requirements');
    const requirements = gameData.requirements.minimum;
    requirementsDiv.innerHTML = `
        <p><strong>OS:</strong> ${requirements.os}</p>
        <p><strong>Processor:</strong> ${requirements.processor}</p>
        <p><strong>Memory:</strong> ${requirements.memory}</p>
        <p><strong>Graphics:</strong> ${requirements.graphics}</p>
        <p><strong>Storage:</strong> ${requirements.storage}</p>
    `;

    // Add media gallery
    const mediaGrid = document.getElementById('game-media');
    gameData.media.forEach(mediaUrl => {
        const mediaItem = document.createElement('div');
        mediaItem.className = 'media-item';
        mediaItem.style.backgroundImage = `url('${mediaUrl}')`;
        mediaGrid.appendChild(mediaItem);
    });

    // Add similar games
    const similarGamesGrid = document.getElementById('similar-games');
    gameData.similarGames.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';
        gameCard.innerHTML = `
            <div class="game-image" style="background-image: url('${game.image}');">
                <div class="game-overlay">
                    <button class="btn" onclick="window.location.href='game-details.html'">View Details</button>
                </div>
            </div>
            <div class="game-info">
                <h3>${game.title}</h3>
                <div class="game-meta">
                    <span class="game-price">${game.price}</span>
                </div>
            </div>
        `;
        similarGamesGrid.appendChild(gameCard);
    });
});