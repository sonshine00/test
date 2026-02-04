document.addEventListener('DOMContentLoaded', () => {
    const lottoNumbersDiv = document.getElementById('lottoNumbers');
    const generateLottoBtn = document.getElementById('generateLotto');
    const themeToggleBtn = document.getElementById('themeToggle');
    const body = document.body;

    // --- Lotto Number Generation ---
    function generateLottoNumbers() {
        const numbers = new Set();
        while (numbers.size < 5) { // Generate 5 unique numbers
            numbers.add(Math.floor(Math.random() * 45) + 1); // Numbers between 1 and 45
        }
        const sortedNumbers = Array.from(numbers).sort((a, b) => a - b);
        lottoNumbersDiv.innerHTML = sortedNumbers.map(num => `<span class="lotto-number">${num}</span>`).join('');
    }

    if (generateLottoBtn) {
        generateLottoBtn.addEventListener('click', generateLottoNumbers);
    }

    // --- Theme Toggling ---
    const LIGHT_THEME_CLASS = 'light-theme';
    const DARK_THEME_CLASS = 'dark-theme';
    const THEME_STORAGE_KEY = 'theme-preference';

    function setInitialTheme() {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme) {
            body.classList.add(savedTheme);
            if (savedTheme === DARK_THEME_CLASS) {
                themeToggleBtn.textContent = 'Toggle Light Mode';
            } else {
                themeToggleBtn.textContent = 'Toggle Dark Mode';
            }
        } else {
            // Default to light theme if no preference is saved
            body.classList.add(LIGHT_THEME_CLASS);
            localStorage.setItem(THEME_STORAGE_KEY, LIGHT_THEME_CLASS);
            themeToggleBtn.textContent = 'Toggle Dark Mode';
        }
    }

    function toggleTheme() {
        if (body.classList.contains(LIGHT_THEME_CLASS)) {
            body.classList.replace(LIGHT_THEME_CLASS, DARK_THEME_CLASS);
            localStorage.setItem(THEME_STORAGE_KEY, DARK_THEME_CLASS);
            themeToggleBtn.textContent = 'Toggle Light Mode';
        } else {
            body.classList.replace(DARK_THEME_CLASS, LIGHT_THEME_CLASS);
            localStorage.setItem(THEME_STORAGE_KEY, LIGHT_THEME_CLASS);
            themeToggleBtn.textContent = 'Toggle Dark Mode';
        }
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // Set theme on page load
    setInitialTheme();
});