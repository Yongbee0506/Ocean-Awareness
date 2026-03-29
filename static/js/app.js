// =====================================================
// 학생용 JavaScript 파일
// =====================================================
// 이 파일은 웹사이트의 인터랙티브 기능을 담당합니다.
//
// 수정해야 할 부분:
// 1. feedbackMessages - 피드백 메시지 내용
// 2. choiceIcons - 선택지별 이모지
// =====================================================

// ===== 점수 상태 (건드리지 마세요) =====
let score = 50;
let choiceHistory = [];

// ===== DOM Elements (건드리지 마세요) =====
const healthBarFill = document.getElementById('healthBarFill');
const healthScore = document.getElementById('healthScore');
const healthStatus = document.getElementById('healthStatus');
const feedbackMessage = document.getElementById('feedbackMessage');
const choiceHistoryEl = document.getElementById('choiceHistory');

// =====================================================
// 여기서부터 수정하세요!
// =====================================================

// ===== 피드백 메시지 =====
// 각 선택에 대한 피드백 메시지를 작성하세요.
// 배열 안에 여러 개를 넣으면 랜덤으로 출력됩니다.
const feedbackMessages = {
    good: [
        "___좋은 선택에 대한 피드백 메시지 1___",
        "___좋은 선택에 대한 피드백 메시지 2___",
        "___좋은 선택에 대한 피드백 메시지 3___"
    ],
    neutral: [
        "___중립 선택에 대한 피드백 메시지 1___",
        "___중립 선택에 대한 피드백 메시지 2___"
    ],
    warning: [
        "___주의 선택에 대한 피드백 메시지 1___",
        "___주의 선택에 대한 피드백 메시지 2___"
    ],
    bad: [
        "___나쁜 선택에 대한 피드백 메시지 1___",
        "___나쁜 선택에 대한 피드백 메시지 2___"
    ]
};

// ===== 선택지 아이콘 =====
// 선택 기록에 표시될 이모지를 설정하세요.
const choiceIcons = {
    good: '___이모지___',
    neutral: '___이모지___',
    warning: '___이모지___',
    bad: '___이모지___'
};

// ===== 상태 메시지 =====
// 점수에 따른 상태 메시지를 설정하세요.
const statusMessages = [
    { threshold: 90, message: "___90점 이상일 때 메시지___", color: '#06d6a0' },
    { threshold: 70, message: "___70점 이상일 때 메시지___", color: '#48cae4' },
    { threshold: 50, message: "___50점 이상일 때 메시지___", color: '#ffd166' },
    { threshold: 30, message: "___30점 이상일 때 메시지___", color: '#f4a261' },
    { threshold: 0, message: "___30점 미만일 때 메시지___", color: '#ef476f' }
];

// =====================================================
// 아래 코드는 수정하지 마세요!
// =====================================================

// ===== 점수바 업데이트 =====
function updateHealthBar() {
    // 점수를 0-100 사이로 제한
    score = Math.max(0, Math.min(100, score));

    // 화면에 표시
    healthBarFill.style.width = score + '%';
    healthScore.textContent = score;

    // 색상 조정
    const position = 100 - score;
    healthBarFill.style.backgroundPosition = position + '% 0';

    // 상태 메시지 업데이트
    for (const status of statusMessages) {
        if (score >= status.threshold) {
            healthStatus.textContent = status.message;
            healthScore.style.color = status.color;
            break;
        }
    }
}

// ===== 랜덤 피드백 가져오기 =====
function getRandomFeedback(type) {
    const messages = feedbackMessages[type];
    return messages[Math.floor(Math.random() * messages.length)];
}

// ===== 선택 기록 업데이트 =====
function updateChoiceHistory() {
    if (choiceHistory.length === 0) {
        choiceHistoryEl.innerHTML = '<span class="history-placeholder">아직 선택하지 않았어요</span>';
        return;
    }

    choiceHistoryEl.innerHTML = choiceHistory
        .map(choice => `<span class="history-item">${choiceIcons[choice]}</span>`)
        .join('');
}

// ===== 선택 처리 =====
function handleChoice(event) {
    const button = event.currentTarget;
    const choice = button.dataset.choice;
    const points = parseInt(button.dataset.points);

    // 점수 업데이트
    score += points;
    updateHealthBar();

    // 기록에 추가
    choiceHistory.push(choice);
    updateChoiceHistory();

    // 피드백 표시
    const feedback = getRandomFeedback(choice);
    feedbackMessage.textContent = feedback;
    feedbackMessage.className = 'feedback-message ' + (points >= 0 ? 'positive' : 'negative');

    // 애니메이션
    feedbackMessage.style.animation = 'none';
    feedbackMessage.offsetHeight; // 리플로우 트리거
    feedbackMessage.style.animation = 'fadeIn 0.5s ease';
}

// ===== 선택 버튼에 이벤트 연결 =====
document.querySelectorAll('.choice-card').forEach(btn => {
    btn.addEventListener('click', handleChoice);
});

// ===== 부드러운 스크롤 =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.nav-bar').offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== 네비게이션 활성 상태 =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

function updateActiveNav() {
    const scrollPosition = window.scrollY + 100;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === '#' + sectionId) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', updateActiveNav);

// ===== CSS 애니메이션 추가 =====
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }
    .nav-links a.active {
        color: #0077b6;
        font-weight: 600;
    }
`;
document.head.appendChild(style);

// ===== 초기화 =====
updateHealthBar();
updateChoiceHistory();

console.log('웹사이트가 성공적으로 로드되었습니다!');
