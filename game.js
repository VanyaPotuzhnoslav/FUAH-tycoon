let gameState = {
    balance: 1000,
    income: 0,
    lastLogin: Date.now()
};

function updateUI() {
    document.getElementById('balance').innerText = Math.floor(gameState.balance);
    document.getElementById('income').innerText = gameState.income;
}

function buyBuilding(type) {
    if (type === 'chicken' && gameState.balance >= 500) {
        gameState.balance -= 500;
        gameState.income += 100;
        updateUI();
        alert("Ви купили Курячий загін!");
    } else {
        alert("Недостатньо FUAH!");
    }
}

// Функція збереження під конкретним кодом
function saveGame() {
    const code = document.getElementById('syncCode').value;
    if (!code) return alert("Введіть код!");
    
    gameState.lastLogin = Date.now();
    localStorage.setItem('game_' + code, JSON.stringify(gameState));
    alert("Гру збережено під кодом: " + code);
}

// Функція завантаження та розрахунку офлайн-доходу
function loadGame() {
    const code = document.getElementById('syncCode').value;
    const savedData = localStorage.getItem('game_' + code);
    
    if (savedData) {
        const loadedState = JSON.parse(savedData);
        const now = Date.now();
        
        // Розрахунок часу (в мілісекундах)
        const timePassed = now - loadedState.lastLogin;
        const msPerDay = 24 * 60 * 60 * 1000; // 86,400,000 мс в одному дні
        
        // Скільки днів минуло (можна зробити дробовим для тесту)
        const daysPassed = timePassed / msPerDay;
        const offlineEarnings = daysPassed * loadedState.income;
        
        gameState = loadedState;
        gameState.balance += offlineEarnings;
        gameState.lastLogin = now;
        
        updateUI();
        alert(`Вітаємо! Поки вас не було, будівлі принесли ${offlineEarnings.toFixed(2)} FUAH за ${daysPassed.toFixed(2)} днів.`);
    } else {
        alert("Код не знайдено.");
    }
}