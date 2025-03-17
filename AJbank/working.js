// Simple Bank Website JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const pages = {
    home: document.getElementById('homePage'),
    login: document.getElementById('loginPage'),
    register: document.getElementById('registerPage'),
    dashboard: document.getElementById('dashboardPage'),
    deposit: document.getElementById('depositPage'),
    withdraw: document.getElementById('withdrawPage')
};

// Navigation buttons
document.getElementById('showLoginBtn').addEventListener('click', () => showPage(pages.login));
document.getElementById('showRegisterBtn').addEventListener('click', () => showPage(pages.register));
document.getElementById('loginBackBtn').addEventListener('click', () => showPage(pages.home));
document.getElementById('registerBackBtn').addEventListener('click', () => showPage(pages.home));
document.getElementById('depositBackBtn').addEventListener('click', () => showPage(pages.dashboard));
document.getElementById('withdrawBackBtn').addEventListener('click', () => showPage(pages.dashboard));
document.getElementById('showDepositBtn').addEventListener('click', () => showPage(pages.deposit));
document.getElementById('showWithdrawBtn').addEventListener('click', () => showPage(pages.withdraw));
document.getElementById('logoutBtn').addEventListener('click', logout);

// Form submissions
document.getElementById('loginForm').addEventListener('submit', handleLogin);
document.getElementById('registerForm').addEventListener('submit', handleRegister);
document.getElementById('depositForm').addEventListener('submit', handleDeposit);
document.getElementById('withdrawForm').addEventListener('submit', handleWithdraw);

// User data store (in real app, this would be a database)
let users = [
    {
        username: 'demo',
        password: 'demo123',
        balance: 1000
    }
];

// Current logged in user
let currentUser = null;

// Function to show a specific page
function showPage(page) {
    // Hide all pages
    Object.values(pages).forEach(p => p.classList.remove('active'));
    
    // Show the requested page
    page.classList.add('active');
}

    // Handle login form submission
    function handleLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    
    // Find user
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Login successful
        currentUser = user;
        document.getElementById('usernameDisplay').textContent = currentUser.username;
        document.getElementById('balanceDisplay').textContent = currentUser.balance.toFixed(2);
        showPage(pages.dashboard);
        document.getElementById('loginForm').reset();
    } else {
        // Login failed
        alert('Invalid username or password!');
    }
}

    // Handle register form submission
    function handleRegister(event) {
    event.preventDefault();
    
    const username = document.getElementById('registerUsername').value;
    const password = document.getElementById('registerPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    // Check if passwords match
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Check if username already exists
    if (users.some(u => u.username === username)) {
        alert('Username already exists!');
        return;
    }
    
    // Create new user
    const newUser = {
        username: username,
        password: password,
        balance: 1000 // Initial balance
    };
    
    users.push(newUser);
    alert('Registration successful! You can now log in.');
    document.getElementById('registerForm').reset();
    showPage(pages.login);
}

    // Handle deposit form submission
    function handleDeposit(event) {
    event.preventDefault();
    
    const amount = parseFloat(document.getElementById('depositAmount').value);
    
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount!');
        return;
    }
    
    // Update balance
    currentUser.balance += amount;
    document.getElementById('balanceDisplay').textContent = currentUser.balance.toFixed(2);
    
    alert(`Successfully deposited $${amount.toFixed(2)}`);
    document.getElementById('depositForm').reset();
    showPage(pages.dashboard);
}

    // Handle withdraw form submission
    function handleWithdraw(event) {
    event.preventDefault();
    
    const amount = parseFloat(document.getElementById('withdrawAmount').value);
    
    if (isNaN(amount) || amount <= 0) {
        alert('Please enter a valid amount!');
        return;
    }
    
    if (amount > currentUser.balance) {
        alert('Insufficient funds!');
        return;
    }
    
    // Update balance
    currentUser.balance -= amount;
    document.getElementById('balanceDisplay').textContent = currentUser.balance.toFixed(2);
    
    alert(`Successfully withdrew $${amount.toFixed(2)}`);
    document.getElementById('withdrawForm').reset();
    showPage(pages.dashboard);
}

    // Handle logout
    function logout() {
    currentUser = null;
    showPage(pages.home);
    }
});
