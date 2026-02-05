document.addEventListener('DOMContentLoaded', () => {
    const foodImage = document.getElementById('foodImage');
    const foodName = document.getElementById('foodName');
    const foodReason = document.getElementById('foodReason');
    const generateRecommendationBtn = document.getElementById('generateRecommendation');
    const themeToggleBtn = document.getElementById('themeToggle');
    const langKoBtn = document.getElementById('langKo');
    const langEnBtn = document.getElementById('langEn');
    const body = document.body;

    // --- Food Data ---
    const foodData = [
        {
            name: {
                en: "Kimchi Stew",
                ko: "김치찌개"
            },
            type: "Korean",
            image: "https://images.unsplash.com/photo-1597893979430-b49914979e27?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            reason: {
                en: "Spicy and hearty, perfect for a chilly evening to warm you up from the inside out.",
                ko: "맵고 얼큰해서 쌀쌀한 저녁 몸을 따뜻하게 데워줄 거예요."
            }
        },
        {
            name: {
                en: "Sushi",
                ko: "초밥"
            },
            type: "Japanese",
            image: "https://images.unsplash.com/photo-1579871701335-a4b0874c7283?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            reason: {
                en: "Light and fresh, a great option when you want something delicious but not too heavy.",
                ko: "신선하고 가벼워서 맛있지만 너무 부담스럽지 않은 식사를 원할 때 좋은 선택이에요."
            }
        },
        {
            name: {
                en: "Hamburger",
                ko: "햄버거"
            },
            type: "Fast Food",
            image: "https://images.unsplash.com/photo-1568901346379-880905a010c4?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            reason: {
                en: "A classic comfort food, satisfying and quick when you're craving something familiar.",
                ko: "전형적인 위안을 주는 음식! 익숙한 맛이 당길 때 만족스럽고 빠르게 즐길 수 있어요."
            }
        },
        {
            name: {
                en: "Pasta",
                ko: "파스타"
            },
            type: "Western",
            image: "https://images.unsplash.com/photo-1555949258-eb7b22a0090b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            reason: {
                en: "Versatile and delicious, pasta dishes can be both comforting and gourmet, suitable for any mood.",
                ko: "다양하고 맛있는 파스타는 어떤 기분에도 어울리는 편안하고 고급스러운 식사가 될 수 있어요."
            }
        },
        {
            name: {
                en: "Bibimbap",
                ko: "비빔밥"
            },
            type: "Korean",
            image: "https://images.unsplash.com/photo-1598006173007-88f1107567e6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            reason: {
                en: "A balanced meal with various vegetables and rich flavors, perfect for a healthy and satisfying dinner.",
                ko: "다양한 채소와 풍부한 맛이 어우러진 균형 잡힌 식사로, 건강하고 든든한 저녁으로 완벽해요."
            }
        },
        {
            name: {
                en: "Ramen",
                ko: "라멘"
            },
            type: "Japanese",
            image: "https://images.unsplash.com/photo-1617195454157-b0a51608ed19?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            reason: {
                en: "A warm bowl of ramen is incredibly comforting and flavorful, ideal for a cozy evening.",
                ko: "따뜻한 라멘 한 그릇은 믿을 수 없을 정도로 편안하고 풍미가 가득해서 아늑한 저녁에 이상적이에요."
            }
        }
    ];

    // --- Translations ---
    const translations = {
        en: {
            siteTitle: "Dinner Recommendation",
            mainHeading: "What to eat for dinner tonight?",
            recommendButton: "Recommend Dinner",
            toggleLightMode: "Toggle Light Mode",
            toggleDarkMode: "Toggle Dark Mode"
        },
        ko: {
            siteTitle: "저녁 메뉴 추천",
            mainHeading: "오늘 저녁 뭐 먹지?",
            recommendButton: "저녁 메뉴 추천 받기",
            toggleLightMode: "라이트 모드 전환",
            toggleDarkMode: "다크 모드 전환"
        }
    };

    let currentLanguage = localStorage.getItem('lang-preference') || 'ko'; // Default to Korean

    const LIGHT_THEME_CLASS = 'light-theme';
    const DARK_THEME_CLASS = 'dark-theme';
    const THEME_STORAGE_KEY = 'theme-preference';
    
    let currentFoodIndex = -1; // To store the index of the currently displayed food

    // Function to update all text content based on current language
    function applyTranslations() {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[currentLanguage][key]) {
                if (element.tagName === 'TITLE') {
                    document.title = translations[currentLanguage][key];
                } else {
                    element.textContent = translations[currentLanguage][key];
                }
            }
        });
        // Update food recommendation text if already displayed
        if (currentFoodIndex !== -1) {
            const selectedFood = foodData[currentFoodIndex];
            foodName.textContent = selectedFood.name[currentLanguage];
            foodReason.textContent = selectedFood.reason[currentLanguage];
        }
        updateThemeToggleButtonText();
    }

    // Function to generate and display a food recommendation
    function generateRecommendation(newFood = true) {
        let randomIndex;
        if (newFood) {
            do {
                randomIndex = Math.floor(Math.random() * foodData.length);
            } while (randomIndex === currentFoodIndex); // Ensure a new food is selected
            currentFoodIndex = randomIndex;
        } else {
            // If not newFood, and no food was previously selected, pick a random one
            if (currentFoodIndex === -1) {
                currentFoodIndex = Math.floor(Math.random() * foodData.length);
            }
            randomIndex = currentFoodIndex; // Display the current one
        }
        
        const selectedFood = foodData[randomIndex];

        foodImage.src = selectedFood.image;
        foodName.textContent = selectedFood.name[currentLanguage];
        foodReason.textContent = selectedFood.reason[currentLanguage];
    }

    // --- Theme Toggling ---
    function updateThemeToggleButtonText() {
        if (body.classList.contains(DARK_THEME_CLASS)) {
            themeToggleBtn.textContent = translations[currentLanguage].toggleLightMode;
        } else {
            themeToggleBtn.textContent = translations[currentLanguage].toggleDarkMode;
        }
    }

    function toggleTheme() {
        if (body.classList.contains(LIGHT_THEME_CLASS)) {
            body.classList.remove(LIGHT_THEME_CLASS);
            body.classList.add(DARK_THEME_CLASS);
            localStorage.setItem(THEME_STORAGE_KEY, DARK_THEME_CLASS);
        } else if (body.classList.contains(DARK_THEME_CLASS)) {
            body.classList.remove(DARK_THEME_CLASS);
            body.classList.add(LIGHT_THEME_CLASS);
            localStorage.setItem(THEME_STORAGE_KEY, LIGHT_THEME_CLASS);
        } else { // Handle case where no theme class is present (e.g., first load)
            body.classList.add(DARK_THEME_CLASS);
            localStorage.setItem(THEME_STORAGE_KEY, DARK_THEME_CLASS);
        }
        updateThemeToggleButtonText();
    }

    function setInitialTheme() {
        const savedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme === DARK_THEME_CLASS) {
            body.classList.add(DARK_THEME_CLASS);
        } else {
            // Default to light theme if no preference is saved or saved theme is light
            body.classList.add(LIGHT_THEME_CLASS);
            localStorage.setItem(THEME_STORAGE_KEY, LIGHT_THEME_CLASS);
        }
    }

    // --- Event Listeners ---
    langKoBtn.addEventListener('click', () => {
        currentLanguage = 'ko';
        localStorage.setItem('lang-preference', 'ko');
        applyTranslations();
    });

    langEnBtn.addEventListener('click', () => {
        currentLanguage = 'en';
        localStorage.setItem('lang-preference', 'en');
        applyTranslations();
    });

    if (generateRecommendationBtn) {
        generateRecommendationBtn.addEventListener('click', () => generateRecommendation(true));
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }

    // --- Initial Setup ---
    setInitialTheme(); // Set theme first so updateThemeToggleButtonText works correctly
    applyTranslations(); // Apply translations based on initial language
    generateRecommendation(true); // Generate initial food recommendation
});