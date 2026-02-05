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
            image: "https://images.unsplash.com/photo-1610486306351-c00689b6b71f?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
            image: "https://images.unsplash.com/photo-1611145610260-26227b68b088?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
            image: "https://images.unsplash.com/photo-1596795413009-dd773644f1c1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
            image: "https://images.unsplash.com/photo-1622340866060-e4b5e2f7f9b8?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
            image: "https://images.unsplash.com/photo-1626294747475-4c0d1b3b1c67?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
            image: "https://images.unsplash.com/photo-1617124317616-646e3e580e28?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
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
            toggleDarkMode: "Toggle Dark Mode",
            partnershipInquiry: "Partnership Inquiry",
            aboutUsLink: "About Us",
            privacyPolicyLink: "Privacy Policy",
            termsOfServiceLink: "Terms of Service",
            aboutUsTitle: "About Us",
            aboutUsHeading: "Our Mission",
            aboutUsContent1: "Welcome to Dinner Recommendation! Our mission is to help you decide what to eat for dinner by providing diverse and interesting food recommendations from around the world. We believe that choosing a meal should be exciting, not a chore.",
            aboutUsContent2: "This site was created by Gemini CLI as a demonstration of building a multi-functional web application. We continuously strive to offer a delightful user experience with engaging content and useful features like language switching and dark mode.",
            aboutUsContent3: "Whether you're looking for a quick meal idea or want to explore new cuisines, we're here to inspire your next dinner adventure. Enjoy your meal!",
            privacyPolicyTitle: "Privacy Policy",
            privacyPolicyHeading: "Information We Collect",
            privacyContent1: "We do not collect any personal identifiable information from our users. This website is purely for entertainment and recommendation purposes.",
            privacyContent2: "However, third-party services like Google AdSense and Disqus may collect non-personally identifiable information (e.g., IP address, browser type, pages visited) for analytics and ad serving purposes. Please refer to their respective privacy policies for more details.",
            cookiesHeading: "Cookies",
            cookiesContent: "This site may use cookies for functionality, such as remembering your language preference and dark mode setting. Third-party services like Disqus and Google AdSense may also use cookies. You can manage your cookie preferences through your browser settings.",
            externalLinksHeading: "External Links",
            externalLinksContent: "This website contains links to other sites. Please be aware that we are not responsible for the content or privacy practices of such other sites. We encourage our users to be aware when they leave our site and to read the privacy statements of any other site that collects personally identifiable information.",
            termsOfServiceTitle: "Terms of Service",
            termsOfServiceHeading: "1. Acceptance of Terms",
            termsOfServiceHeading2: "2. Use of Service",
            termsOfServiceHeading3: "3. Intellectual Property",
            termsOfServiceHeading4: "4. Limitation of Liability",
            termsContent1: "By accessing and using this website, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to abide by the above, please do not use this service.",
            termsContent2: "This website is provided for general information and entertainment purposes only. The food recommendations are for illustrative purposes and should not be taken as professional dietary advice. We are not responsible for any decisions made based on the information provided herein.",
            termsContent3: "The content, layout, design, data, databases and graphics on this website are protected by international copyright laws and are owned by Gemini CLI or its licensors. Unless expressly permitted in writing, you may not copy, reproduce, modify, republish, upload, post, transmit, or distribute any content from this website.",
            termsContent4: "We will not be liable for any damages of any kind arising from the use of this website, including, but not limited to direct, indirect, incidental, punitive, and consequential damages.",
            backToHome: "Back to Home"
        },
        ko: {
            siteTitle: "저녁 메뉴 추천",
            mainHeading: "오늘 저녁 뭐 먹지?",
            recommendButton: "저녁 메뉴 추천 받기",
            toggleLightMode: "라이트 모드 전환",
            toggleDarkMode: "다크 모드 전환",
            partnershipInquiry: "제휴 문의",
            aboutUsLink: "회사 소개",
            privacyPolicyLink: "개인정보처리방침",
            termsOfServiceLink: "이용약관",
            aboutUsTitle: "회사 소개",
            aboutUsHeading: "우리의 미션",
            aboutUsContent1: "저녁 메뉴 추천에 오신 것을 환영합니다! 우리의 미션은 전 세계의 다양하고 흥미로운 음식 추천을 제공하여 오늘 저녁 무엇을 먹을지 결정하는 데 도움을 드리는 것입니다. 우리는 식사 선택이 즐거움이 되어야 한다고 믿습니다.",
            aboutUsContent2: "이 사이트는 Gemini CLI가 다기능 웹 애플리케이션 구축을 시연하기 위해 만들었습니다. 우리는 언어 전환 및 다크 모드와 같은 매력적인 콘텐츠와 유용한 기능으로 즐거운 사용자 경험을 제공하기 위해 지속적으로 노력하고 있습니다.",
            aboutUsContent3: "빠른 식사 아이디어를 찾거나 새로운 요리를 탐험하고 싶으시다면, 저희가 다음 저녁 식사 모험에 영감을 드리겠습니다. 즐거운 식사하세요!",
            privacyPolicyTitle: "개인정보처리방침",
            privacyPolicyHeading: "수집하는 정보",
            privacyContent1: "저희는 사용자로부터 개인 식별 정보를 수집하지 않습니다. 본 웹사이트는 순전히 오락 및 추천 목적으로만 운영됩니다.",
            privacyContent2: "단, Google AdSense 및 Disqus와 같은 타사 서비스는 분석 및 광고 제공 목적으로 비개인 식별 정보(예: IP 주소, 브라우저 유형, 방문 페이지)를 수집할 수 있습니다. 자세한 내용은 해당 서비스의 개인정보처리방침을 참조하십시오.",
            cookiesHeading: "쿠키",
            cookiesContent: "이 사이트는 언어 기본 설정 및 다크 모드 설정 기억과 같은 기능을 위해 쿠키를 사용할 수 있습니다. Disqus 및 Google AdSense와 같은 타사 서비스도 쿠키를 사용할 수 있습니다. 브라우저 설정을 통해 쿠키 기본 설정을 관리할 수 있습니다.",
            externalLinksHeading: "외부 링크",
            externalLinksContent: "이 웹사이트에는 다른 사이트에 대한 링크가 포함되어 있습니다. 당사는 해당 다른 사이트의 콘텐츠 또는 개인정보 보호 관행에 대해 책임이 없음을 알려드립니다. 사용자는 당사 사이트를 떠날 때 이를 인지하고 개인 식별 정보를 수집하는 다른 모든 사이트의 개인정보 보호 정책을 읽을 것을 권장합니다.",
            termsOfServiceTitle: "이용약관",
            termsOfServiceHeading: "1. 약관 동의",
            termsOfServiceHeading2: "2. 서비스 이용",
            termsOfServiceHeading3: "3. 지적 재산권",
            termsOfServiceHeading4: "4. 책임의 제한",
            termsContent1: "본 웹사이트에 접속하여 이용함으로써 귀하는 본 계약의 약관 및 조항에 동의하고 이를 준수할 것에 동의합니다. 위에 명시된 내용을 준수하는 데 동의하지 않는 경우, 본 서비스를 이용하지 마십시오.",
            termsContent2: "본 웹사이트는 일반적인 정보 및 오락 목적으로만 제공됩니다. 음식 추천은 설명을 위한 것이며 전문적인 식단 조언으로 간주되어서는 안 됩니다. 당사는 여기에 제공된 정보를 기반으로 이루어진 어떠한 결정에 대해서도 책임지지 않습니다.",
            termsContent3: "본 웹사이트의 콘텐츠, 레이아웃, 디자인, 데이터, 데이터베이스 및 그래픽은 국제 저작권법에 의해 보호되며 Gemini CLI 또는 그 라이선스 제공자의 소유입니다. 서면으로 명시적으로 허용되지 않는 한, 본 웹사이트의 어떠한 콘텐츠도 복사, 복제, 수정, 재게시, 업로드, 게시, 전송 또는 배포할 수 없습니다.",
            termsContent4: "당사는 본 웹사이트 이용으로 인해 발생하는 직간접적, 우발적, 징벌적, 결과적 손해를 포함하되 이에 국한되지 않는 어떠한 종류의 손해에 대해서도 책임지지 않습니다.",
            backToHome: "홈으로 돌아가기"
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