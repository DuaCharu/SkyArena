document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const authTabs = document.querySelectorAll('.auth-tab');

    // Tab switching
    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const targetForm = tab.dataset.tab;
            
            // Update active tab
            authTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Show selected form
            loginForm.classList.remove('active');
            registerForm.classList.remove('active');
            if (targetForm === 'login') {
                loginForm.classList.add('active');
            } else {
                registerForm.classList.add('active');
            }
        });
    });

    // Login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        // Add your login logic here
        console.log('Login:', { email, password });
        
        // Redirect to home page after successful login
        window.location.href = 'index.html';
    });

    // Register form submission
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = registerForm.querySelector('input[type="text"]').value;
        const email = registerForm.querySelector('input[type="email"]').value;
        const password = registerForm.querySelectorAll('input[type="password"]')[0].value;
        const confirmPassword = registerForm.querySelectorAll('input[type="password"]')[1].value;

        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        // Add your registration logic here
        console.log('Register:', { username, email, password });
        
        // Redirect to home page after successful registration
        window.location.href = 'index.html';
    });
});