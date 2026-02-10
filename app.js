// ===== APP STATE =====
const AppState = {
    currentUser: null,
    currentPage: 'home',
    diagnosticTest: null,
    studyPlan: null,
    userProgress: {
        overall: 0,
        testsCompleted: 0,
        currentStreak: 0,
        totalPoints: 0,
        subjects: {
            math: 0,
            russian: 0,
            kyrgyz: 0,
            history: 0,
            social: 0
        }
    },
    facts: [],
    currentFactIndex: 0,
    battles: []
};

// ===== DATA =====
const SUBJECTS = {
    math: { name: 'Математика', icon: '🔢' },
    russian: { name: 'Русский Язык', icon: '📖' },
    kyrgyz: { name: 'Кыргызский Язык', icon: '🇰🇬' },
    history: { name: 'История Кыргызстана', icon: '🏛️' },
    social: { name: 'Обществознание', icon: '🌍' }
};

const DIAGNOSTIC_QUESTIONS = [
    // Mathematics
    { subject: 'math', question: 'Решите уравнение: 2x + 5 = 13', options: ['x = 3', 'x = 4', 'x = 5', 'x = 6'], correct: 1 },
    { subject: 'math', question: 'Чему равна площадь прямоугольника со сторонами 5 см и 8 см?', options: ['13 см²', '26 см²', '40 см²', '80 см²'], correct: 2 },
    { subject: 'math', question: 'Упростите выражение: 3(x + 2) - 2x', options: ['x + 6', '5x + 6', 'x + 2', '3x + 2'], correct: 0 },
    { subject: 'math', question: 'Найдите 25% от 80', options: ['15', '20', '25', '30'], correct: 1 },
    { subject: 'math', question: 'Решите неравенство: 3x - 7 > 8', options: ['x > 5', 'x > 3', 'x < 5', 'x < 3'], correct: 0 },
    
    // Russian Language
    { subject: 'russian', question: 'Выберите правильное написание: "В течени... дня"', options: ['В течение дня', 'В течении дня', 'Втечение дня', 'Втечении дня'], correct: 0 },
    { subject: 'russian', question: 'Какое слово является существительным?', options: ['Быстрый', 'Бежать', 'Бег', 'Быстро'], correct: 2 },
    { subject: 'russian', question: 'Укажите предложение с правильной пунктуацией:', options: ['Солнце взошло и птицы запели.', 'Солнце взошло, и птицы запели.', 'Солнце, взошло и птицы запели.', 'Солнце взошло и, птицы запели.'], correct: 1 },
    { subject: 'russian', question: 'Какое слово пишется слитно?', options: ['По этому', 'Поэтому', 'По-этому', 'По этому'], correct: 1 },
    { subject: 'russian', question: 'Выберите правильную форму глагола: "Они ... книги"', options: ['читают', 'читаит', 'читаете', 'читаем'], correct: 0 },
    
    // Kyrgyz Language
    { subject: 'kyrgyz', question: 'Кыргыз тилинде канча тамга бар?', options: ['32', '33', '36', '38'], correct: 2 },
    { subject: 'kyrgyz', question: '"Мектеп" сөзү кайсы сөз түркүмүнө кирет?', options: ['Зат атооч', 'Сын атооч', 'Этиш', 'Сан атооч'], correct: 0 },
    { subject: 'kyrgyz', question: 'Туура жазылган сөздү тандаңыз:', options: ['Бишкек', 'Бишкэк', 'Bishkek', 'Бишкег'], correct: 0 },
    { subject: 'kyrgyz', question: '"Ак" жана "кара" сөздөрү кандай сөздөр?', options: ['Синонимдер', 'Антонимдер', 'Омонимдер', 'Паронимдер'], correct: 1 },
    { subject: 'kyrgyz', question: 'Кыргыз тилинде канча сөз түркүмү бар?', options: ['8', '9', '10', '11'], correct: 1 },
    
    // History of Kyrgyzstan
    { subject: 'history', question: 'Кыргызстан качан эгемендүүлүккө ээ болгон?', options: ['1990', '1991', '1992', '1993'], correct: 1 },
    { subject: 'history', question: 'Кыргызстандын борбору кайсы шаар?', options: ['Ош', 'Бишкек', 'Жалал-Абад', 'Каракол'], correct: 1 },
    { subject: 'history', question: 'Манас эпосунун негизги каармандары кимдер?', options: ['Манас, Семетей, Сейтек', 'Манас, Каныкей, Бакай', 'Манас, Алмамбет, Чубак', 'Баары туура'], correct: 3 },
    { subject: 'history', question: 'Кыргызстан кайсы жылы СССР курамына кирген?', options: ['1924', '1926', '1936', '1940'], correct: 2 },
    { subject: 'history', question: 'Кыргызстандын биринчи президенти ким болгон?', options: ['Аскар Акаев', 'Курманбек Бакиев', 'Алмазбек Атамбаев', 'Сооронбай Жээнбеков'], correct: 0 },
    
    // Social Studies
    { subject: 'social', question: 'Что такое демократия?', options: ['Власть народа', 'Власть одного человека', 'Власть богатых', 'Власть военных'], correct: 0 },
    { subject: 'social', question: 'Какой документ является основным законом государства?', options: ['Уголовный кодекс', 'Конституция', 'Гражданский кодекс', 'Трудовой кодекс'], correct: 1 },
    { subject: 'social', question: 'Что относится к правам человека?', options: ['Право на жизнь', 'Право на образование', 'Право на свободу слова', 'Все перечисленное'], correct: 3 },
    { subject: 'social', question: 'Какая форма правления в Кыргызстане?', options: ['Монархия', 'Республика', 'Диктатура', 'Теократия'], correct: 1 },
    { subject: 'social', question: 'Что такое гражданское общество?', options: ['Общество граждан одной страны', 'Независимые от государства организации граждан', 'Военное общество', 'Политическая партия'], correct: 1 }
];

const INTERESTING_FACTS = [
    { category: 'Математика', text: 'Число Пи (π) было вычислено с точностью до 31,4 триллиона знаков после запятой! Но для большинства расчетов достаточно всего 39 знаков.' },
    { category: 'Математика', text: 'Ноль был изобретен в Индии около 5 века н.э. До этого математики не могли представить "ничего" в виде числа!' },
    { category: 'Русский Язык', text: 'В русском языке есть слово из одной буквы, которое является предложением: "Я!" - это полное предложение.' },
    { category: 'Русский Язык', text: 'Самое длинное слово в русском языке - "рентгеноэлектрокардиографического" (33 буквы).' },
    { category: 'Кыргызский Язык', text: 'Кыргызский язык относится к тюркской языковой семье и имеет много общего с казахским и узбекским языками.' },
    { category: 'Кыргызский Язык', text: 'Эпос "Манас" - один из самых длинных эпосов в мире, он в 20 раз длиннее "Илиады" и "Одиссеи" вместе взятых!' },
    { category: 'История Кыргызстана', text: 'Кыргызстан - одна из древнейших стран Центральной Азии. Первые упоминания о кыргызах датируются 201 годом до н.э.' },
    { category: 'История Кыргызстана', text: 'Озеро Иссык-Куль - второе по величине высокогорное озеро в мире после Титикаки. Оно никогда не замерзает!' },
    { category: 'Обществознание', text: 'Первая конституция в мире была принята в США в 1787 году и действует до сих пор!' },
    { category: 'Обществознание', text: 'ООН была основана 24 октября 1945 года. Сейчас в нее входят 193 государства-члена.' }
];

const TOPICS_BY_SUBJECT = {
    math: [
        { id: 'algebra', name: 'Алгебра', description: 'Уравнения и неравенства' },
        { id: 'geometry', name: 'Геометрия', description: 'Фигуры и их свойства' },
        { id: 'percentages', name: 'Проценты', description: 'Вычисления с процентами' },
        { id: 'functions', name: 'Функции', name: 'Графики и свойства функций' }
    ],
    russian: [
        { id: 'grammar', name: 'Грамматика', description: 'Правила русского языка' },
        { id: 'punctuation', name: 'Пунктуация', description: 'Знаки препинания' },
        { id: 'vocabulary', name: 'Лексика', description: 'Словарный запас' },
        { id: 'spelling', name: 'Орфография', description: 'Правописание слов' }
    ],
    kyrgyz: [
        { id: 'grammar_kg', name: 'Грамматика', description: 'Кыргыз тилинин грамматикасы' },
        { id: 'vocabulary_kg', name: 'Лексика', description: 'Сөздүк запас' },
        { id: 'literature_kg', name: 'Адабият', description: 'Кыргыз адабияты' }
    ],
    history: [
        { id: 'ancient', name: 'Древняя история', description: 'История до XX века' },
        { id: 'modern', name: 'Современная история', description: 'XX-XXI век' },
        { id: 'culture', name: 'Культура', description: 'Культурное наследие' }
    ],
    social: [
        { id: 'politics', name: 'Политика', description: 'Политическая система' },
        { id: 'economics', name: 'Экономика', description: 'Экономические основы' },
        { id: 'law', name: 'Право', description: 'Правовые основы' }
    ]
};

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
    setupEventListeners();
    loadUserData();
    updateUI();
});

function initializeApp() {
    // Initialize facts
    AppState.facts = INTERESTING_FACTS;
    
    // Load from localStorage if available
    const savedData = localStorage.getItem('examwayai_data');
    if (savedData) {
        const data = JSON.parse(savedData);
        AppState.currentUser = data.currentUser;
        AppState.userProgress = data.userProgress || AppState.userProgress;
        AppState.studyPlan = data.studyPlan;
        AppState.battles = data.battles || [];
    }
}

function loadUserData() {
    // Simulate loading user data
    if (AppState.currentUser) {
        document.getElementById('authBtn').textContent = AppState.currentUser.name;
    }
}

function saveData() {
    const data = {
        currentUser: AppState.currentUser,
        userProgress: AppState.userProgress,
        studyPlan: AppState.studyPlan,
        battles: AppState.battles
    };
    localStorage.setItem('examwayai_data', JSON.stringify(data));
}

// ===== EVENT LISTENERS =====
function setupEventListeners() {
    // Navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = link.dataset.page;
            navigateToPage(page);
        });
    });
    
    // Auth button
    document.getElementById('authBtn').addEventListener('click', () => {
        if (AppState.currentUser) {
            logout();
        } else {
            openModal('authModal');
        }
    });
    
    // Auth tabs
    document.querySelectorAll('.auth-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            const tabName = tab.dataset.tab;
            switchAuthTab(tabName);
        });
    });
    
    // Login/Register
    document.getElementById('loginBtn').addEventListener('click', handleLogin);
    document.getElementById('registerBtn').addEventListener('click', handleRegister);
    document.getElementById('googleLoginBtn').addEventListener('click', handleGoogleAuth);
    document.getElementById('googleRegisterBtn').addEventListener('click', handleGoogleAuth);
    
    // Diagnostic test
    document.getElementById('startDiagnosticBtn').addEventListener('click', startDiagnosticTest);
    document.getElementById('continueStudyBtn').addEventListener('click', () => {
        navigateToPage('practice');
    });
    
    // AI Assistant
    document.getElementById('aiAssistantBtn').addEventListener('click', toggleAIChat);
    document.getElementById('closeChatBtn').addEventListener('click', toggleAIChat);
    document.getElementById('sendMessageBtn').addEventListener('click', sendAIMessage);
    document.getElementById('aiChatInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendAIMessage();
    });
    
    // Battle
    document.getElementById('createBattleBtn').addEventListener('click', createBattle);
    document.getElementById('joinBattleBtn').addEventListener('click', joinBattle);
    
    // Facts navigation
    document.getElementById('prevFactBtn').addEventListener('click', () => navigateFacts(-1));
    document.getElementById('nextFactBtn').addEventListener('click', () => navigateFacts(1));
    
    // Modal close buttons
    document.querySelectorAll('.close-modal').forEach(btn => {
        btn.addEventListener('click', () => {
            const modalId = btn.dataset.modal;
            closeModal(modalId);
        });
    });
    
    // Close modals on outside click
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal(modal.id);
            }
        });
    });
    
    // Subject cards
    document.querySelectorAll('.subject-card').forEach(card => {
        card.addEventListener('click', () => {
            const subject = card.dataset.subject;
            navigateToPage('practice');
            setTimeout(() => selectSubject(subject), 100);
        });
    });
}

// ===== NAVIGATION =====
function navigateToPage(pageName) {
    // Update active page
    document.querySelectorAll('.page').forEach(page => page.classList.remove('active'));
    document.getElementById(`${pageName}Page`).classList.add('active');
    
    // Update active nav link
    document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
    document.querySelector(`[data-page="${pageName}"]`)?.classList.add('active');
    
    AppState.currentPage = pageName;
    
    // Load page-specific content
    if (pageName === 'practice') loadPracticePage();
    if (pageName === 'facts') loadFactsPage();
    if (pageName === 'progress') loadProgressPage();
    if (pageName === 'battle') loadBattlePage();
}

// ===== AUTHENTICATION =====
function switchAuthTab(tabName) {
    document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    document.getElementById('loginForm').style.display = tabName === 'login' ? 'flex' : 'none';
    document.getElementById('registerForm').style.display = tabName === 'register' ? 'flex' : 'none';
}

function handleLogin() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;
    
    if (!email || !password) {
        showNotification('Пожалуйста, заполните все поля', 'warning');
        return;
    }
    
    // Simulate login
    AppState.currentUser = {
        id: Date.now(),
        name: email.split('@')[0],
        email: email
    };
    
    document.getElementById('authBtn').textContent = AppState.currentUser.name;
    closeModal('authModal');
    showNotification('Добро пожаловать!', 'success');
    saveData();
}

function handleRegister() {
    const name = document.getElementById('registerName').value;
    const email = document.getElementById('registerEmail').value;
    const password = document.getElementById('registerPassword').value;
    
    if (!name || !email || !password) {
        showNotification('Пожалуйста, заполните все поля', 'warning');
        return;
    }
    
    // Simulate registration
    AppState.currentUser = {
        id: Date.now(),
        name: name,
        email: email
    };
    
    document.getElementById('authBtn').textContent = AppState.currentUser.name;
    closeModal('authModal');
    showNotification('Регистрация успешна!', 'success');
    saveData();
}

function handleGoogleAuth() {
    // Simulate Google authentication
    AppState.currentUser = {
        id: Date.now(),
        name: 'Пользователь Google',
        email: 'user@gmail.com'
    };
    
    document.getElementById('authBtn').textContent = AppState.currentUser.name;
    closeModal('authModal');
    showNotification('Вход через Google выполнен!', 'success');
    saveData();
}

function logout() {
    AppState.currentUser = null;
    document.getElementById('authBtn').textContent = 'Войти';
    showNotification('Вы вышли из системы', 'info');
    saveData();
}

// ===== DIAGNOSTIC TEST =====
function startDiagnosticTest() {
    if (!AppState.currentUser) {
        showNotification('Пожалуйста, войдите в систему', 'warning');
        openModal('authModal');
        return;
    }
    
    AppState.diagnosticTest = {
        questions: DIAGNOSTIC_QUESTIONS,
        currentQuestionIndex: 0,
        answers: [],
        startTime: Date.now()
    };
    
    openModal('diagnosticModal');
    showQuestion();
}

function showQuestion() {
    const test = AppState.diagnosticTest;
    const question = test.questions[test.currentQuestionIndex];
    
    // Update progress
    const progress = ((test.currentQuestionIndex + 1) / test.questions.length) * 100;
    document.getElementById('testProgressFill').style.width = `${progress}%`;
    document.getElementById('currentQuestion').textContent = test.currentQuestionIndex + 1;
    document.getElementById('totalQuestions').textContent = test.questions.length;
    
    // Show question
    document.getElementById('questionText').textContent = question.question;
    
    // Show options
    const optionsContainer = document.getElementById('questionOptions');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.textContent = option;
        btn.onclick = () => selectOption(index);
        
        if (test.answers[test.currentQuestionIndex] === index) {
            btn.classList.add('selected');
        }
        
        optionsContainer.appendChild(btn);
    });
    
    // Update navigation buttons
    document.getElementById('prevQuestionBtn').disabled = test.currentQuestionIndex === 0;
    document.getElementById('nextQuestionBtn').textContent = 
        test.currentQuestionIndex === test.questions.length - 1 ? 'Завершить' : 'Далее';
}

function selectOption(optionIndex) {
    const test = AppState.diagnosticTest;
    test.answers[test.currentQuestionIndex] = optionIndex;
    
    // Update UI
    document.querySelectorAll('.option-btn').forEach((btn, index) => {
        btn.classList.toggle('selected', index === optionIndex);
    });
}

document.getElementById('prevQuestionBtn')?.addEventListener('click', () => {
    if (AppState.diagnosticTest.currentQuestionIndex > 0) {
        AppState.diagnosticTest.currentQuestionIndex--;
        showQuestion();
    }
});

document.getElementById('nextQuestionBtn')?.addEventListener('click', () => {
    const test = AppState.diagnosticTest;
    
    if (test.currentQuestionIndex < test.questions.length - 1) {
        test.currentQuestionIndex++;
        showQuestion();
    } else {
        finishDiagnosticTest();
    }
});

function finishDiagnosticTest() {
    const test = AppState.diagnosticTest;
    
    // Calculate results
    let correctAnswers = 0;
    const subjectScores = {};
    
    test.questions.forEach((question, index) => {
        const userAnswer = test.answers[index];
        const isCorrect = userAnswer === question.correct;
        
        if (isCorrect) correctAnswers++;
        
        if (!subjectScores[question.subject]) {
            subjectScores[question.subject] = { correct: 0, total: 0 };
        }
        subjectScores[question.subject].total++;
        if (isCorrect) subjectScores[question.subject].correct++;
    });
    
    const score = Math.round((correctAnswers / test.questions.length) * 100);
    
    // Update user progress
    AppState.userProgress.testsCompleted++;
    AppState.userProgress.totalPoints += score;
    
    Object.keys(subjectScores).forEach(subject => {
        const subjectScore = Math.round((subjectScores[subject].correct / subjectScores[subject].total) * 100);
        AppState.userProgress.subjects[subject] = subjectScore;
    });
    
    AppState.userProgress.overall = Math.round(
        Object.values(AppState.userProgress.subjects).reduce((a, b) => a + b, 0) / 
        Object.keys(AppState.userProgress.subjects).length
    );
    
    // Generate study plan
    generateStudyPlan(subjectScores);
    
    // Show results
    closeModal('diagnosticModal');
    showTestResults(score, subjectScores);
    updateUI();
    saveData();
}

function showTestResults(score, subjectScores) {
    const resultsContainer = document.getElementById('resultsContainer');
    
    let level = 'Слабый';
    let levelEmoji = '😟';
    let message = 'Не переживайте! У вас есть большой потенциал для роста.';
    
    if (score >= 70) {
        level = 'Хороший';
        levelEmoji = '😊';
        message = 'Отличная работа! Продолжайте в том же духе!';
    } else if (score >= 40) {
        level = 'Средний';
        levelEmoji = '😐';
        message = 'Неплохо! С нашей помощью вы быстро улучшите результаты.';
    }
    
    resultsContainer.innerHTML = `
        <div style="text-align: center; margin-bottom: 2rem;">
            <div style="font-size: 5rem; margin-bottom: 1rem;">${levelEmoji}</div>
            <h3 style="font-size: 2rem; margin-bottom: 0.5rem;">Ваш результат: ${score}%</h3>
            <p style="font-size: 1.2rem; color: var(--text-secondary);">Уровень: ${level}</p>
            <p style="margin-top: 1rem;">${message}</p>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h4 style="margin-bottom: 1rem;">Результаты по предметам:</h4>
            ${Object.entries(subjectScores).map(([subject, data]) => {
                const percentage = Math.round((data.correct / data.total) * 100);
                return `
                    <div style="margin-bottom: 1rem;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                            <span>${SUBJECTS[subject].icon} ${SUBJECTS[subject].name}</span>
                            <span>${percentage}%</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${percentage}%"></div>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
        
        <button class="btn-primary full-width" onclick="closeModal('resultsModal'); document.getElementById('studyPlanSection').style.display = 'block'; document.getElementById('studyPlanSection').scrollIntoView({ behavior: 'smooth' });">
            Посмотреть план обучения
        </button>
    `;
    
    openModal('resultsModal');
}

function generateStudyPlan(subjectScores) {
    const weeks = [];
    const weakSubjects = Object.entries(subjectScores)
        .filter(([_, data]) => (data.correct / data.total) < 0.7)
        .map(([subject]) => subject);
    
    // Generate 4-week plan
    for (let week = 1; week <= 4; week++) {
        const days = [];
        
        for (let day = 1; day <= 7; day++) {
            const subjectIndex = (week - 1) * 7 + day - 1;
            const subject = weakSubjects[subjectIndex % weakSubjects.length] || Object.keys(SUBJECTS)[subjectIndex % 5];
            
            days.push({
                day: `День ${day}`,
                subject: SUBJECTS[subject].name,
                topic: TOPICS_BY_SUBJECT[subject]?.[0]?.name || 'Общий обзор',
                status: 'pending'
            });
        }
        
        weeks.push({
            week: `Неделя ${week}`,
            days: days
        });
    }
    
    AppState.studyPlan = weeks;
    renderStudyPlan();
}

function renderStudyPlan() {
    const container = document.getElementById('studyPlanGrid');
    if (!AppState.studyPlan) return;
    
    container.innerHTML = AppState.studyPlan.map(week => `
        <div class="study-plan-week">
            <h3 class="week-title">📅 ${week.week}</h3>
            <div class="day-list">
                ${week.days.map(day => `
                    <div class="day-item">
                        <div class="day-info">
                            <h4>${day.day}: ${day.subject}</h4>
                            <p>${day.topic}</p>
                        </div>
                        <span class="day-status ${day.status}">${day.status === 'completed' ? 'Выполнено' : 'Запланировано'}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

// ===== AI ASSISTANT =====
function toggleAIChat() {
    document.getElementById('aiChatContainer').classList.toggle('active');
}

function sendAIMessage() {
    const input = document.getElementById('aiChatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Add user message
    addChatMessage(message, 'user');
    input.value = '';
    
    // Simulate AI response
    setTimeout(() => {
        const response = generateAIResponse(message);
        addChatMessage(response, 'ai');
    }, 1000);
}

function addChatMessage(text, sender) {
    const messagesContainer = document.getElementById('aiChatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = sender === 'user' ? 'user-message' : 'ai-message';
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${sender === 'user' ? '👤' : '🤖'}</div>
        <div class="message-content">
            <p>${text}</p>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function generateAIResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Simple keyword-based responses
    if (lowerMessage.includes('математика') || lowerMessage.includes('уравнение')) {
        return 'Математика - это логика и практика! Для решения уравнений важно помнить основные правила: что делаешь с одной стороной, делай и с другой. Хотите разобрать конкретный пример?';
    }
    
    if (lowerMessage.includes('русский') || lowerMessage.includes('грамматика')) {
        return 'Русский язык богат правилами! Главное - практика и чтение. Какая тема вызывает у вас затруднения? Орфография, пунктуация или что-то другое?';
    }
    
    if (lowerMessage.includes('кыргыз')) {
        return 'Кыргызский язык - красивый и мелодичный! Для его изучения важно погружение в языковую среду. Могу помочь с грамматикой или лексикой!';
    }
    
    if (lowerMessage.includes('история')) {
        return 'История Кыргызстана богата событиями! Важно понимать хронологию и причинно-следственные связи. О каком периоде хотите узнать больше?';
    }
    
    if (lowerMessage.includes('обществознание') || lowerMessage.includes('право')) {
        return 'Обществознание помогает понять, как устроено общество. Основные темы: политика, экономика, право. Что вас интересует?';
    }
    
    if (lowerMessage.includes('помощь') || lowerMessage.includes('помоги')) {
        return 'Я здесь, чтобы помочь! Задавайте вопросы по любому предмету ОРТ, и я объясню простым языком. Также могу проанализировать ваши ошибки и дать советы по улучшению.';
    }
    
    if (lowerMessage.includes('мотивация') || lowerMessage.includes('устал')) {
        return 'Помните: каждый маленький шаг приближает вас к цели! 🌟 Вы уже проделали большую работу. Сделайте небольшой перерыв, и продолжайте с новыми силами!';
    }
    
    return 'Отличный вопрос! Я готов помочь вам разобраться. Давайте подойдем к этому систематически. Можете уточнить, что именно вызывает затруднения?';
}

// ===== PRACTICE PAGE =====
function loadPracticePage() {
    renderSubjectSelector();
}

function renderSubjectSelector() {
    const container = document.getElementById('subjectSelector');
    container.innerHTML = `
        <h3 style="margin-bottom: 1rem;">Выберите предмет:</h3>
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 1rem;">
            ${Object.entries(SUBJECTS).map(([key, subject]) => `
                <button class="btn-secondary" onclick="selectSubject('${key}')" style="padding: 1rem;">
                    <div style="font-size: 2rem; margin-bottom: 0.5rem;">${subject.icon}</div>
                    <div>${subject.name}</div>
                </button>
            `).join('')}
        </div>
    `;
}

function selectSubject(subjectKey) {
    const topics = TOPICS_BY_SUBJECT[subjectKey];
    const container = document.getElementById('topicList');
    
    container.innerHTML = `
        <h3 style="margin: 2rem 0 1rem;">Темы по предмету "${SUBJECTS[subjectKey].name}":</h3>
        <div style="display: grid; gap: 1rem;">
            ${topics.map(topic => `
                <div class="subject-card" onclick="startTopicQuiz('${subjectKey}', '${topic.id}')">
                    <h4 style="margin-bottom: 0.5rem;">${topic.name}</h4>
                    <p style="color: var(--text-secondary); font-size: 0.9rem;">${topic.description}</p>
                    <button class="btn-primary" style="margin-top: 1rem;">Начать практику</button>
                </div>
            `).join('')}
        </div>
    `;
}

function startTopicQuiz(subject, topicId) {
    // Filter questions by subject
    const questions = DIAGNOSTIC_QUESTIONS.filter(q => q.subject === subject).slice(0, 10);
    
    if (questions.length === 0) {
        showNotification('Вопросы для этой темы скоро появятся!', 'info');
        return;
    }
    
    AppState.currentQuiz = {
        subject,
        topicId,
        questions,
        currentIndex: 0,
        answers: [],
        score: 0
    };
    
    document.getElementById('quizTitle').textContent = `Практика: ${SUBJECTS[subject].name}`;
    renderQuiz();
    openModal('quizModal');
}

function renderQuiz() {
    const quiz = AppState.currentQuiz;
    const question = quiz.questions[quiz.currentIndex];
    const container = document.getElementById('quizContainer');
    
    container.innerHTML = `
        <div class="test-progress">
            <div class="test-progress-bar">
                <div class="test-progress-fill" style="width: ${((quiz.currentIndex + 1) / quiz.questions.length) * 100}%"></div>
            </div>
            <div class="test-progress-text">
                <span>${quiz.currentIndex + 1}</span> / <span>${quiz.questions.length}</span>
            </div>
        </div>
        
        <div class="test-question">
            <h3 class="question-text">${question.question}</h3>
            <div class="question-options">
                ${question.options.map((option, index) => `
                    <button class="option-btn" onclick="answerQuizQuestion(${index})">
                        ${option}
                    </button>
                `).join('')}
            </div>
        </div>
    `;
}

function answerQuizQuestion(answerIndex) {
    const quiz = AppState.currentQuiz;
    const question = quiz.questions[quiz.currentIndex];
    const isCorrect = answerIndex === question.correct;
    
    if (isCorrect) quiz.score++;
    
    // Show feedback
    const buttons = document.querySelectorAll('#quizContainer .option-btn');
    buttons[answerIndex].classList.add(isCorrect ? 'correct' : 'incorrect');
    buttons[question.correct].classList.add('correct');
    
    // Disable all buttons
    buttons.forEach(btn => btn.disabled = true);
    
    // Move to next question after delay
    setTimeout(() => {
        quiz.currentIndex++;
        
        if (quiz.currentIndex < quiz.questions.length) {
            renderQuiz();
        } else {
            showQuizResults();
        }
    }, 1500);
}

function showQuizResults() {
    const quiz = AppState.currentQuiz;
    const percentage = Math.round((quiz.score / quiz.questions.length) * 100);
    
    // Update progress
    AppState.userProgress.subjects[quiz.subject] = Math.max(
        AppState.userProgress.subjects[quiz.subject],
        percentage
    );
    AppState.userProgress.testsCompleted++;
    AppState.userProgress.totalPoints += quiz.score * 10;
    
    updateUI();
    saveData();
    
    const container = document.getElementById('quizContainer');
    container.innerHTML = `
        <div style="text-align: center; padding: 2rem;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">
                ${percentage >= 70 ? '🎉' : percentage >= 40 ? '😊' : '💪'}
            </div>
            <h3 style="font-size: 2rem; margin-bottom: 1rem;">Результат: ${percentage}%</h3>
            <p style="font-size: 1.2rem; color: var(--text-secondary); margin-bottom: 2rem;">
                Правильных ответов: ${quiz.score} из ${quiz.questions.length}
            </p>
            <button class="btn-primary full-width" onclick="closeModal('quizModal')">
                Завершить
            </button>
        </div>
    `;
}

// ===== FACTS PAGE =====
function loadFactsPage() {
    renderCurrentFact();
    renderFactCategories();
}

function renderCurrentFact() {
    const fact = AppState.facts[AppState.currentFactIndex];
    const factCard = document.getElementById('currentFact');
    
    factCard.innerHTML = `
        <div class="fact-category">${fact.category}</div>
        <div class="fact-content">
            <p>${fact.text}</p>
        </div>
        <div class="fact-footer">
            <span class="fact-number">${AppState.currentFactIndex + 1} / ${AppState.facts.length}</span>
            <button class="btn-icon favorite-btn">❤️</button>
        </div>
    `;
}

function navigateFacts(direction) {
    AppState.currentFactIndex += direction;
    
    if (AppState.currentFactIndex < 0) {
        AppState.currentFactIndex = AppState.facts.length - 1;
    } else if (AppState.currentFactIndex >= AppState.facts.length) {
        AppState.currentFactIndex = 0;
    }
    
    renderCurrentFact();
}

function renderFactCategories() {
    const categories = [...new Set(AppState.facts.map(f => f.category))];
    const container = document.getElementById('factCategories');
    
    container.innerHTML = categories.map(category => `
        <button class="fact-category-btn" onclick="filterFactsByCategory('${category}')">
            ${category}
        </button>
    `).join('');
}

function filterFactsByCategory(category) {
    const filteredFacts = INTERESTING_FACTS.filter(f => f.category === category);
    AppState.facts = filteredFacts;
    AppState.currentFactIndex = 0;
    renderCurrentFact();
    
    // Update active category button
    document.querySelectorAll('.fact-category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent.trim() === category);
    });
}

// ===== BATTLE PAGE =====
function loadBattlePage() {
    renderBattleHistory();
}

function createBattle() {
    if (!AppState.currentUser) {
        showNotification('Пожалуйста, войдите в систему', 'warning');
        openModal('authModal');
        return;
    }
    
    const battleCode = Math.random().toString(36).substring(2, 8).toUpperCase();
    const battle = {
        id: Date.now(),
        code: battleCode,
        creator: AppState.currentUser.name,
        status: 'waiting',
        createdAt: new Date().toISOString()
    };
    
    AppState.battles.push(battle);
    saveData();
    
    showNotification(`Битва создана! Код: ${battleCode}`, 'success');
    renderBattleHistory();
}

function joinBattle() {
    if (!AppState.currentUser) {
        showNotification('Пожалуйста, войдите в систему', 'warning');
        openModal('authModal');
        return;
    }
    
    const code = prompt('Введите код битвы:');
    if (!code) return;
    
    const battle = AppState.battles.find(b => b.code === code.toUpperCase());
    
    if (battle) {
        showNotification('Присоединение к битве...', 'success');
        // Here you would start the battle
    } else {
        showNotification('Битва не найдена', 'error');
    }
}

function renderBattleHistory() {
    const container = document.getElementById('battleList');
    
    if (AppState.battles.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Нет активных битв</p>';
        return;
    }
    
    container.innerHTML = AppState.battles.map(battle => `
        <div class="battle-item">
            <div>
                <h4>Битва #${battle.code}</h4>
                <p style="color: var(--text-secondary); font-size: 0.9rem;">
                    Создатель: ${battle.creator}
                </p>
            </div>
            <span class="day-status ${battle.status === 'completed' ? 'completed' : 'pending'}">
                ${battle.status === 'completed' ? 'Завершена' : 'Ожидание'}
            </span>
        </div>
    `).join('');
}

// ===== PROGRESS PAGE =====
function loadProgressPage() {
    renderProgressChart();
    renderWeakTopics();
    renderTestHistory();
}

function renderProgressChart() {
    const canvas = document.getElementById('progressCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 300;
    
    // Simple bar chart
    const subjects = Object.entries(AppState.userProgress.subjects);
    const barWidth = canvas.width / subjects.length;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    subjects.forEach(([subject, progress], index) => {
        const barHeight = (progress / 100) * (canvas.height - 40);
        const x = index * barWidth + 10;
        const y = canvas.height - barHeight - 20;
        
        // Draw bar
        const gradient = ctx.createLinearGradient(0, y, 0, canvas.height);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(1, '#764ba2');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(x, y, barWidth - 20, barHeight);
        
        // Draw label
        ctx.fillStyle = '#ffffff';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(SUBJECTS[subject].icon, x + (barWidth - 20) / 2, canvas.height - 5);
        ctx.fillText(`${progress}%`, x + (barWidth - 20) / 2, y - 5);
    });
}

function renderWeakTopics() {
    const weakTopics = Object.entries(AppState.userProgress.subjects)
        .filter(([_, progress]) => progress < 50)
        .sort((a, b) => a[1] - b[1]);
    
    const container = document.getElementById('weakTopicsList');
    
    if (weakTopics.length === 0) {
        container.innerHTML = '<p style="color: var(--text-secondary);">Отличная работа! Слабых тем нет.</p>';
        return;
    }
    
    container.innerHTML = weakTopics.map(([subject, progress]) => `
        <div style="background: var(--bg-secondary); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 0.5rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <span>${SUBJECTS[subject].icon} ${SUBJECTS[subject].name}</span>
                <span style="color: var(--danger-color);">${progress}%</span>
            </div>
            <button class="btn-primary" style="margin-top: 0.5rem; width: 100%;" onclick="selectSubject('${subject}'); navigateToPage('practice');">
                Практиковать
            </button>
        </div>
    `).join('');
}

function renderTestHistory() {
    const container = document.getElementById('testList');
    
    if (AppState.userProgress.testsCompleted === 0) {
        container.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">Пока нет пройденных тестов</p>';
        return;
    }
    
    // Simulate test history
    container.innerHTML = `
        <div style="background: var(--bg-glass); padding: 1rem; border-radius: var(--radius-md); margin-bottom: 0.5rem;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
                <span>Диагностический тест</span>
                <span>${AppState.userProgress.overall}%</span>
            </div>
            <p style="color: var(--text-secondary); font-size: 0.9rem;">
                Пройдено тестов: ${AppState.userProgress.testsCompleted}
            </p>
        </div>
    `;
}

// ===== UI UPDATES =====
function updateUI() {
    // Update stats
    document.getElementById('overallProgress').textContent = `${AppState.userProgress.overall}%`;
    document.getElementById('testsCompleted').textContent = AppState.userProgress.testsCompleted;
    document.getElementById('currentStreak').textContent = AppState.userProgress.currentStreak;
    document.getElementById('totalPoints').textContent = AppState.userProgress.totalPoints;
    
    // Update subject progress
    Object.entries(AppState.userProgress.subjects).forEach(([subject, progress]) => {
        const card = document.querySelector(`.subject-card[data-subject="${subject}"]`);
        if (card) {
            const progressBar = card.querySelector('.progress-fill');
            const progressText = card.querySelector('.subject-progress');
            
            if (progressBar) progressBar.style.width = `${progress}%`;
            if (progressText) progressText.textContent = `${progress}% освоено`;
        }
    });
}

// ===== MODAL HELPERS =====
function openModal(modalId) {
    document.getElementById(modalId).classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

// ===== NOTIFICATIONS =====
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        background: var(--bg-secondary);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: var(--radius-md);
        padding: 1rem 1.5rem;
        box-shadow: var(--shadow-lg);
        z-index: 3000;
        animation: slideIn 0.3s ease;
        max-width: 400px;
    `;
    
    const emoji = type === 'success' ? '✅' : type === 'warning' ? '⚠️' : type === 'error' ? '❌' : 'ℹ️';
    notification.innerHTML = `<span style="margin-right: 0.5rem;">${emoji}</span>${message}`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
