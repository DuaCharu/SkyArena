document.addEventListener('DOMContentLoaded', () => {
    // Get game details from URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const gameTitle = urlParams.get('title') || 'Game Title';
    const gamePrice = urlParams.get('price') || '$29.99';
    const gameImage = urlParams.get('image') || 'https://images.unsplash.com/photo-1542751371-adc38448a05e';

    // Update game details in the payment page
    document.getElementById('game-title').textContent = gameTitle;
    document.getElementById('game-price').textContent = gamePrice;
    document.getElementById('game-image').style.backgroundImage = `url('${gameImage}')`;

    // Payment form handling
    const paymentForm = document.getElementById('payment-form');
    const paymentMethods = document.querySelectorAll('input[name="payment"]');

    paymentMethods.forEach(method => {
        method.addEventListener('change', () => {
            const isPayPal = method.id === 'paypal';
            const cardFields = paymentForm.querySelectorAll('input:not([type="submit"])');
            
            cardFields.forEach(field => {
                field.disabled = isPayPal;
                field.required = !isPayPal;
            });
        });
    });

    paymentForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulate payment processing
        const button = paymentForm.querySelector('button');
        button.disabled = true;
        button.textContent = 'Processing...';

        setTimeout(() => {
            alert('Payment successful! Thank you for your purchase.');
            window.location.href = 'index.html';
        }, 2000);
    });
});