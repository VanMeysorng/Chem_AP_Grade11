// main.js - AP Chemistry Pre-Test (Fully Working with Instructions - Compact Version)

// Global variables
let topicsState = {};
let globalStreak = 0;
let totalPossible = 0;
let currentTopic = null;
let confettiAnimationId = null;
let userId = null;
let hasSeenInstructions = false;

// ==================== USER MANAGEMENT ====================
function initializeUser() {
    let savedUser = localStorage.getItem('chemMasterUser');
    if (!savedUser) {
        userId = prompt('Welcome to AP Chemistry Pre-Test! Enter your name to save your progress:', 'Student');
        if (!userId) userId = 'Student';
        localStorage.setItem('chemMasterUser', userId);
    } else {
        userId = savedUser;
    }
    
    // Check if user has seen instructions
    let seen = localStorage.getItem('chemInstructionsSeen');
    if (seen === 'true') {
        hasSeenInstructions = true;
    }
    
    return userId;
}

function saveProgress() {
    if (!userId) return;
    const saveData = {
        userId: userId,
        topicsState: topicsState,
        globalStreak: globalStreak,
        lastSaved: new Date().toISOString(),
        hasSeenInstructions: hasSeenInstructions
    };
    localStorage.setItem(`chemMaster_${userId}`, JSON.stringify(saveData));
}

function loadProgress() {
    if (!userId) return false;
    const savedData = localStorage.getItem(`chemMaster_${userId}`);
    if (savedData) {
        try {
            const data = JSON.parse(savedData);
            topicsState = data.topicsState;
            globalStreak = data.globalStreak;
            if (data.hasSeenInstructions !== undefined) {
                hasSeenInstructions = data.hasSeenInstructions;
            }
            return true;
        } catch (e) {
            return false;
        }
    }
    return false;
}

function resetProgress() {
    if (confirm('Are you sure you want to reset ALL your progress?')) {
        for (let tid of TOPIC_ORDER) {
            const qlist = TOPICS[tid].questions;
            topicsState[tid] = {
                currentIdx: 0,
                answers: qlist.map(() => ({ answered: false, status: null, userAnswer: null }))
            };
        }
        globalStreak = 0;
        hasSeenInstructions = false;
        localStorage.removeItem('chemInstructionsSeen');
        saveProgress();
        updateStats();
        renderDashboard();
        if (currentTopic) closeArena();
        showToast('Progress has been reset!');
    }
}

function showUserInfo() {
    const correctCount = Object.values(topicsState).reduce(
        (sum, state) => sum + (state.answers.filter(a => a.status === 'correct').length), 0
    );
    const skippedCount = Object.values(topicsState).reduce(
        (sum, state) => sum + (state.answers.filter(a => a.status === 'skipped').length), 0
    );
    
    alert(`👤 Student: ${userId}\n📊 Score: ${correctCount}/${totalPossible}\n📝 Skipped: ${skippedCount}\n🔥 Streak: ${globalStreak}\n\nProgress auto-saved!`);
}

// ==================== INSTRUCTION MODAL (Compact Version) ====================
function showInstructionsModal(onComplete) {
    const modal = document.createElement('div');
    modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(0, 0, 0, 0.85);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;
    
    modal.innerHTML = `
        <div style="
            background: var(--card-bg);
            max-width: 650px;
            width: 90%;
            border-radius: 20px;
            padding: 1.5rem 2rem;
            border: 1px solid var(--card-border);
            box-shadow: 0 20px 40px rgba(0,0,0,0.3);
            animation: slideUp 0.3s ease;
        ">
            <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 1rem;">
                <i class="fas fa-flask" style="font-size: 2rem; color: var(--btn-primary);"></i>
                <h2 style="margin: 0; color: var(--text-primary); font-size: 1.3rem;">AP Chemistry Pre-Test</h2>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1rem; margin-bottom: 1rem;">
                <div style="text-align: center; padding: 0.8rem; background: rgba(33, 150, 243, 0.1); border-radius: 12px;">
                    <span class="badge-mc" style="display: inline-block; margin-bottom: 6px;">MC</span>
                    <p style="margin: 4px 0 0; font-size: 0.75rem; color: var(--text-secondary);">Multiple Choice</p>
                </div>
                <div style="text-align: center; padding: 0.8rem; background: rgba(76, 175, 80, 0.1); border-radius: 12px;">
                    <span class="badge-sa" style="display: inline-block; margin-bottom: 6px;">SA</span>
                    <p style="margin: 4px 0 0; font-size: 0.75rem; color: var(--text-secondary);">Short Answer</p>
                </div>
                <div style="text-align: center; padding: 0.8rem; background: rgba(255, 152, 0, 0.1); border-radius: 12px;">
                    <span class="badge-fr" style="display: inline-block; margin-bottom: 6px;">FR</span>
                    <p style="margin: 4px 0 0; font-size: 0.75rem; color: var(--text-secondary);">Free Response</p>
                </div>
            </div>
            
            <div style="display: flex; gap: 1rem; margin-bottom: 1rem; flex-wrap: wrap;">
                <div style="flex: 1; padding: 0.6rem; background: rgba(255, 152, 0, 0.1); border-radius: 10px;">
                    <i class="fas fa-question-circle" style="color: #ff9800; margin-right: 6px;"></i>
                    <strong style="font-size: 0.85rem;">Skip Option</strong>
                    <p style="font-size: 0.75rem; margin: 4px 0 0; color: var(--text-secondary);">Click "I Don't Know / Skip" to move on</p>
                </div>
                <div style="flex: 1; padding: 0.6rem; background: rgba(76, 175, 80, 0.1); border-radius: 10px;">
                    <i class="fas fa-save" style="color: #4caf50; margin-right: 6px;"></i>
                    <strong style="font-size: 0.85rem;">Auto-Save</strong>
                    <p style="font-size: 0.75rem; margin: 4px 0 0; color: var(--text-secondary);">Progress saved automatically</p>
                </div>
            </div>
            
            <div style="background: rgba(33, 150, 243, 0.1); padding: 0.6rem 0.8rem; border-radius: 10px; margin-bottom: 1rem;">
                <p style="color: var(--text-primary); font-size: 0.8rem; margin: 0;">
                    <i class="fas fa-lightbulb" style="color: var(--btn-warning);"></i>
                    <strong>Tip:</strong> Show all work for written responses. Skipped questions won't affect your streak.
                </p>
            </div>
            
            <div style="display: flex; gap: 1rem; justify-content: flex-end;">
                <button id="dontShowAgainBtn" style="
                    background: transparent;
                    border: 1px solid var(--card-border);
                    padding: 0.5rem 1rem;
                    border-radius: 2rem;
                    cursor: pointer;
                    color: var(--text-secondary);
                    font-size: 0.85rem;
                    transition: all 0.2s;
                ">Don't show again</button>
                <button id="startTestBtn" style="
                    background: linear-gradient(135deg, var(--btn-primary), var(--header-gradient-end));
                    border: none;
                    padding: 0.5rem 1.5rem;
                    border-radius: 2rem;
                    cursor: pointer;
                    color: white;
                    font-weight: 600;
                    font-size: 0.9rem;
                    transition: all 0.2s;
                "><i class="fas fa-play"></i> Start Test</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add animation styles if not present
    if (!document.getElementById('instructionStyles')) {
        const style = document.createElement('style');
        style.id = 'instructionStyles';
        style.textContent = `
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            @keyframes slideUp {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }
    
    const startBtn = document.getElementById('startTestBtn');
    const dontShowAgainBtn = document.getElementById('dontShowAgainBtn');
    
    startBtn.onclick = () => {
        modal.remove();
        if (onComplete) onComplete();
    };
    
    dontShowAgainBtn.onclick = () => {
        hasSeenInstructions = true;
        localStorage.setItem('chemInstructionsSeen', 'true');
        saveProgress();
        modal.remove();
        if (onComplete) onComplete();
    };
}

// ==================== UI FUNCTIONS ====================
function addControls() {
    const statsSection = document.querySelector('.stats-section');
    if (!statsSection) return;
    
    if (!document.getElementById('userInfoBtn')) {
        const userBtn = document.createElement('button');
        userBtn.id = 'userInfoBtn';
        userBtn.className = 'pdf-btn';
        userBtn.innerHTML = `<i class="fas fa-user"></i> ${userId.substring(0, 10)}`;
        userBtn.onclick = showUserInfo;
        statsSection.appendChild(userBtn);
    }
    
    if (!document.getElementById('resetProgressBtn')) {
        const resetBtn = document.createElement('button');
        resetBtn.id = 'resetProgressBtn';
        resetBtn.className = 'pdf-btn';
        resetBtn.innerHTML = '<i class="fas fa-trash-alt"></i> Reset';
        resetBtn.style.background = '#f44336';
        resetBtn.onclick = resetProgress;
        statsSection.appendChild(resetBtn);
    }
}

function updateStats() {
    let totalCorrect = 0;
    let masteredCount = 0;
    for (let tid of TOPIC_ORDER) {
        const state = topicsState[tid];
        if (state) {
            const correct = state.answers.filter(a => a.status === 'correct').length;
            totalCorrect += correct;
            if (correct === TOPICS[tid].questions.length) masteredCount++;
        }
    }
    document.getElementById('totalScore').innerText = totalCorrect;
    document.getElementById('masteryComplete').innerText = masteredCount;
    document.getElementById('streakCount').innerText = globalStreak;
    saveProgress();
}

function renderDashboard() {
    const container = document.getElementById('topicsGrid');
    if (!container) return;
    container.innerHTML = '';
    
    for (let i = 0; i < TOPIC_ORDER.length; i++) {
        const tid = TOPIC_ORDER[i];
        const topic = TOPICS[tid];
        const state = topicsState[tid];
        if (!state) continue;
        
        const correctCount = state.answers.filter(a => a.status === 'correct').length;
        const totalQs = topic.questions.length;
        const isMastered = correctCount === totalQs;
        const progressPercent = (correctCount / totalQs) * 100;
        
        const card = document.createElement('div');
        card.className = 'topic-card';
        card.onclick = () => openTopic(tid);
        card.innerHTML = `
            <div class="card-header">
                <i class="${topic.icon}"></i>
                <h3>${topic.name}</h3>
            </div>
            <div class="card-body">
                <div class="card-stats">
                    <span><i class="fas fa-check-circle"></i> ${correctCount}/${totalQs}</span>
                    <span><i class="fas fa-chart-line"></i> ${Math.round(progressPercent)}%</span>
                </div>
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progressPercent}%"></div>
                </div>
                <div class="card-status">
                    ${isMastered ? '<span class="status-defeated"><i class="fas fa-trophy"></i> MASTERED</span>' : 
                      '<span class="status-unlocked"><i class="fas fa-play"></i> START TEST</span>'}
                </div>
            </div>
        `;
        container.appendChild(card);
    }
}

function openTopic(tid) {
    // Show instructions if not seen before
    if (!hasSeenInstructions) {
        showInstructionsModal(() => {
            currentTopic = tid;
            document.getElementById('arenaTitle').innerHTML = `<i class="${TOPICS[tid].icon}"></i> ${TOPICS[tid].name}`;
            document.getElementById('quizArena').classList.remove('hidden');
            renderQuiz();
        });
    } else {
        currentTopic = tid;
        document.getElementById('arenaTitle').innerHTML = `<i class="${TOPICS[tid].icon}"></i> ${TOPICS[tid].name}`;
        document.getElementById('quizArena').classList.remove('hidden');
        renderQuiz();
    }
}

function closeArena() {
    document.getElementById('quizArena').classList.add('hidden');
    currentTopic = null;
    renderDashboard();
    updateStats();
    saveProgress();
}

function renderQuiz() {
    if (!currentTopic) return;
    
    const container = document.getElementById('quizContent');
    const topic = TOPICS[currentTopic];
    const state = topicsState[currentTopic];
    const totalQs = topic.questions.length;
    const correctCount = state.answers.filter(a => a.status === 'correct').length;
    const allQuestionsAnswered = state.answers.every(a => a.answered === true);
    
    document.getElementById('progressInfo').innerHTML = `<i class="fas fa-chart-line"></i> ${correctCount}/${totalQs} Correct`;
    
    if (allQuestionsAnswered) {
        const score = correctCount;
        const percentage = Math.round((score / totalQs) * 100);
        let message = '';
        let icon = '';
        
        if (percentage >= 80) {
            message = 'Excellent! You have a strong foundation in AP Chemistry!';
            icon = 'fa-trophy';
        } else if (percentage >= 60) {
            message = 'Good job! Review the questions you missed to strengthen your understanding.';
            icon = 'fa-thumbs-up';
        } else if (percentage >= 40) {
            message = 'Keep practicing! Review the material and try again.';
            icon = 'fa-book';
        } else {
            message = 'Review the AP Chemistry notes and attempt the test again to build your skills.';
        }
        
        container.innerHTML = `
            <div class="victory-screen">
                <i class="fas ${icon}"></i>
                <h2>Pre-Test Completed!</h2>
                <div class="score-display">
                    <div class="score-circle">
                        <span class="score-number">${score}</span>
                        <span class="score-total">/${totalQs}</span>
                    </div>
                    <div class="score-percentage">${percentage}%</div>
                </div>
                <p><i class="fas ${icon}"></i> ${message}</p>
                <div class="completion-buttons">
                    <button class="next-btn" onclick="retryTopic('${currentTopic}')">
                        <i class="fas fa-redo"></i> Retake Test
                    </button>
                    <button class="next-btn" onclick="closeArena()">
                        <i class="fas fa-home"></i> Dashboard
                    </button>
                </div>
            </div>
        `;
        return;
    }
    
    const current = topic.questions[state.currentIdx];
    const isAnswered = state.answers[state.currentIdx].answered;
    const currentStatus = state.answers[state.currentIdx].status;
    const progressPercent = (state.answers.filter(a => a.answered).length / totalQs) * 100;
    
    let feedbackHtml = `<i class="fas fa-brain"></i> Select an answer, click "Don't Know" to skip, or click Submit`;
    let feedbackClass = '';
    
    if (isAnswered) {
        if (currentStatus === 'skipped') {
            feedbackHtml = `<i class="fas fa-book-open"></i> You skipped this question.<br><strong>Correct answer:</strong> ${current.correctAnswer || current.correct}`;
            feedbackClass = 'feedback-skipped';
        } else if (currentStatus === 'correct') {
            feedbackHtml = `<i class="fas fa-check-circle"></i> Correct! ${current.hint || 'Well done!'}`;
            feedbackClass = 'feedback-correct';
        } else {
            feedbackHtml = `<i class="fas fa-lightbulb"></i> ${current.hint || 'Review the concept.'}<br><strong>Correct answer:</strong> ${current.correctAnswer || current.correct}`;
            feedbackClass = 'feedback-wrong';
        }
    }
    
    const disclaimerHtml = current.disclaimer ? `
        <div class="disclaimer-box">
            <i class="fas fa-info-circle"></i> ${current.disclaimer}
        </div>
    ` : '';
    
    let inputHtml = '';
    if (current.type === 'mc') {
        const selectedValue = state.answers[state.currentIdx].userAnswer;
        inputHtml = `
            <div class="options-grid" id="optionsContainer">
                ${current.options.map((opt, idx) => {
                    let isSelected = (selectedValue === opt);
                    let isCorrectAnswer = (opt === current.correct);
                    let showCheck = false;
                    let showX = false;
                    
                    if (isAnswered && currentStatus !== 'skipped') {
                        if (isCorrectAnswer) showCheck = true;
                        if (isSelected && !isCorrectAnswer) showX = true;
                    }
                    
                    return `
                        <button class="option-btn ${isSelected ? 'selected' : ''}" data-value="${opt.replace(/"/g, '&quot;')}" ${isAnswered ? 'disabled' : ''}>
                            <i class="fas ${showCheck ? 'fa-check-circle' : (showX ? 'fa-times-circle' : 'fa-circle')}"></i>
                            ${opt}
                        </button>
                    `;
                }).join('')}
            </div>
        `;
    } else {
        const userAnswer = state.answers[state.currentIdx].userAnswer || '';
        inputHtml = `
            <div class="short-answer-area">
                <textarea id="shortAnswerInput" class="short-answer-input" rows="5" ${isAnswered ? 'disabled' : ''} 
                    placeholder="Type your answer here. Show work for calculations.">${isAnswered && currentStatus !== 'skipped' ? userAnswer : ''}
                </textarea>
            </div>
        `;
    }
    
    const dontKnowBtnHtml = !isAnswered ? `<button class="dont-know-btn" id="dontKnowBtn"><i class="fas fa-question-circle"></i> I Don't Know / Skip</button>` : '';
    
    container.innerHTML = `
        <div class="question-card">
            <div class="progress-bar"><div class="progress-fill" style="width: ${progressPercent}%"></div></div>
            <div class="question-type-badge">
                <span class="badge-${current.type === 'mc' ? 'mc' : (current.type === 'sa' ? 'sa' : 'fr')}">${current.type === 'mc' ? 'Multiple Choice' : (current.type === 'sa' ? 'Short Answer' : 'Free Response')}</span>
                <span class="unit-badge">${current.unit || 'AP Chemistry'}</span>
            </div>
            ${disclaimerHtml}
            <div class="question-text"><i class="fas fa-question-circle"></i> ${current.text}</div>
            ${inputHtml}
            <div class="feedback ${feedbackClass}">${feedbackHtml}</div>
            ${!isAnswered ? `
                <div class="action-buttons-group">
                    <button class="submit-btn" id="submitAnswerBtn"><i class="fas fa-check"></i> Submit Answer</button>
                    ${dontKnowBtnHtml}
                </div>
            ` : `<button class="next-btn" id="nextQuestionBtn"><i class="fas fa-forward"></i> Next Question</button>`}
        </div>
    `;
    
    // Attach event handlers
    if (!isAnswered) {
        attachEventHandlers(current);
    }
    
    const nextBtn = document.getElementById('nextQuestionBtn');
    if (nextBtn) {
        nextBtn.onclick = () => nextQuestion(currentTopic);
    }
}

function attachEventHandlers(current) {
    if (current.type === 'mc') {
        const btns = document.querySelectorAll('.option-btn');
        const submitBtn = document.getElementById('submitAnswerBtn');
        const dontKnowBtn = document.getElementById('dontKnowBtn');
        
        if (submitBtn) submitBtn.disabled = true;
        
        btns.forEach(btn => {
            btn.onclick = (e) => {
                e.preventDefault();
                const selected = btn.getAttribute('data-value');
                
                // Update all buttons
                btns.forEach(b => {
                    const icon = b.querySelector('i');
                    if (b.getAttribute('data-value') === selected) {
                        icon.className = 'fas fa-check-circle';
                        b.classList.add('selected');
                    } else {
                        icon.className = 'fas fa-circle';
                        b.classList.remove('selected');
                    }
                });
                
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                }
                
                // Store selected value
                window.currentSelectedAnswer = selected;
            };
        });
        
        if (submitBtn) {
            submitBtn.onclick = (e) => {
                e.preventDefault();
                const selected = window.currentSelectedAnswer;
                if (!selected) {
                    const feedbackDiv = document.querySelector('.feedback');
                    feedbackDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Please select an answer or click "Don\'t Know"!';
                    feedbackDiv.classList.add('feedback-wrong');
                    return;
                }
                if (isProcessing) return;
                isProcessing = true;
                const isCorrect = (selected === current.correct);
                submitAnswer(currentTopic, selected, isCorrect);
            };
        }
        
        if (dontKnowBtn) {
            dontKnowBtn.onclick = (e) => {
                e.preventDefault();
                if (isProcessing) return;
                isProcessing = true;
                submitSkip(currentTopic);
            };
        }
    } else {
        const textarea = document.getElementById('shortAnswerInput');
        const submitBtn = document.getElementById('submitAnswerBtn');
        const dontKnowBtn = document.getElementById('dontKnowBtn');
        
        if (submitBtn) submitBtn.disabled = true;
        
        if (textarea) {
            textarea.oninput = () => {
                if (textarea.value.trim().length > 0) {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.style.opacity = '1';
                    }
                    window.currentShortAnswer = textarea.value;
                } else {
                    if (submitBtn) {
                        submitBtn.disabled = true;
                        submitBtn.style.opacity = '0.7';
                    }
                }
            };
        }
        
        if (submitBtn) {
            submitBtn.onclick = (e) => {
                e.preventDefault();
                const answer = window.currentShortAnswer || (textarea ? textarea.value.trim() : '');
                if (!answer) {
                    const feedbackDiv = document.querySelector('.feedback');
                    feedbackDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Please enter your answer or click "Don\'t Know"!';
                    feedbackDiv.classList.add('feedback-wrong');
                    return;
                }
                if (isProcessing) return;
                isProcessing = true;
                const correctAnswer = (current.correctAnswer || current.correct).toLowerCase();
                const isCorrect = answer.toLowerCase().includes(correctAnswer.substring(0, 30)) ||
                    correctAnswer.split(' ').some(word => word.length > 4 && answer.toLowerCase().includes(word));
                submitAnswer(currentTopic, answer, isCorrect);
            };
        }
        
        if (dontKnowBtn) {
            dontKnowBtn.onclick = (e) => {
                e.preventDefault();
                if (isProcessing) return;
                isProcessing = true;
                submitSkip(currentTopic);
            };
        }
    }
}

let isProcessing = false;

function retryTopic(tid) {
    const totalQs = TOPICS[tid].questions.length;
    topicsState[tid] = {
        currentIdx: 0,
        answers: Array(totalQs).fill().map(() => ({ answered: false, status: null, userAnswer: null }))
    };
    
    window.currentSelectedAnswer = null;
    window.currentShortAnswer = null;
    isProcessing = false;
    
    saveProgress();
    updateStats();
    renderDashboard();
    openTopic(tid);
}

function submitAnswer(tid, userAnswer, isCorrect) {
    const state = topicsState[tid];
    const status = isCorrect ? 'correct' : 'incorrect';
    
    state.answers[state.currentIdx].answered = true;
    state.answers[state.currentIdx].status = status;
    state.answers[state.currentIdx].userAnswer = userAnswer;
    
    if (isCorrect) {
        globalStreak++;
        triggerConfetti();
    } else {
        globalStreak = 0;
    }
    
    window.currentSelectedAnswer = null;
    window.currentShortAnswer = null;
    isProcessing = false;
    
    renderQuiz();
    updateStats();
    saveProgress();
}

function submitSkip(tid) {
    const state = topicsState[tid];
    
    state.answers[state.currentIdx].answered = true;
    state.answers[state.currentIdx].status = 'skipped';
    state.answers[state.currentIdx].userAnswer = '(Skipped)';
    
    globalStreak = 0;
    
    window.currentSelectedAnswer = null;
    window.currentShortAnswer = null;
    isProcessing = false;
    
    renderQuiz();
    updateStats();
    saveProgress();
}

function nextQuestion(tid) {
    const state = topicsState[tid];
    const totalQs = TOPICS[tid].questions.length;
    
    window.currentSelectedAnswer = null;
    window.currentShortAnswer = null;
    isProcessing = false;
    
    if (state.currentIdx + 1 < totalQs) {
        state.currentIdx++;
        renderQuiz();
    } else {
        renderQuiz();
        updateStats();
        saveProgress();
    }
}

function triggerConfetti() {
    if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);
    
    const canvas = document.getElementById('confettiCanvas');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    let particles = [];
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 6 + 2,
            speedY: Math.random() * 6 + 3,
            speedX: (Math.random() - 0.5) * 4,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`
        });
    }
    
    let startTime = Date.now();
    
    function draw() {
        if (Date.now() - startTime > 1500) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            confettiAnimationId = null;
            return;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let p of particles) {
            p.y += p.speedY;
            p.x += p.speedX;
            ctx.fillStyle = p.color;
            ctx.fillRect(p.x, p.y, p.size, p.size);
        }
        confettiAnimationId = requestAnimationFrame(draw);
    }
    draw();
}

function showToast(message) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `<i class="fas fa-info-circle"></i> ${message}`;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
}

function generateReport() {
    if (!userId) return;
    
    let reportHtml = `
        <div style="font-family: 'Inter', sans-serif; padding: 20px;">
            <h1>AP Chemistry Pre-Test Report</h1>
            <p><strong>Student:</strong> ${userId}</p>
            <p><strong>Date:</strong> ${new Date().toLocaleString()}</p>
            <hr>
    `;
    
    let totalCorrect = 0;
    let totalSkipped = 0;
    
    for (let tid of TOPIC_ORDER) {
        const topic = TOPICS[tid];
        const state = topicsState[tid];
        const correctCount = state.answers.filter(a => a.status === 'correct').length;
        const skippedCount = state.answers.filter(a => a.status === 'skipped').length;
        totalCorrect += correctCount;
        totalSkipped += skippedCount;
        
        reportHtml += `<h2>${topic.name}</h2>`;
        reportHtml += `<p>Score: ${correctCount}/${topic.questions.length} (${Math.round(correctCount/topic.questions.length*100)}%) | Skipped: ${skippedCount}</p>`;
        reportHtml += `<table style="width:100%; border-collapse: collapse;">`;
        reportHtml += `<tr style="background:#2196f3; color:white;"><th style="padding:8px;">#</th><th style="padding:8px;">Question</th><th style="padding:8px;">Type</th><th style="padding:8px;">Status</th><th style="padding:8px;">Your Answer</th><th style="padding:8px;">Correct Answer</th>`;
        
        topic.questions.forEach((q, idx) => {
            const answer = state.answers[idx];
            const status = answer?.status || 'not answered';
            const userAnswer = answer?.userAnswer || 'Not answered';
            const answerDisplay = userAnswer.length > 100 ? userAnswer.substring(0, 100) + '...' : userAnswer;
            
            let statusText = '';
            let statusColor = '';
            if (status === 'correct') {
                statusText = '✓ CORRECT';
                statusColor = '#4caf50';
            } else if (status === 'incorrect') {
                statusText = '✗ INCORRECT';
                statusColor = '#f44336';
            } else if (status === 'skipped') {
                statusText = '⏭️ SKIPPED';
                statusColor = '#ff9800';
            } else {
                statusText = '○ NOT ANSWERED';
                statusColor = '#757575';
            }
            
            reportHtml += `<tr style="border-bottom:1px solid #ddd;">
                <td style="padding:8px;">${idx+1}<\/td>
                <td style="padding:8px;">${q.text.substring(0, 80)}...<\/td>
                <td style="padding:8px;">${q.type === 'mc' ? 'MC' : (q.type === 'sa' ? 'SA' : 'FR')}<\/td>
                <td style="padding:8px; color:${statusColor};">${statusText}<\/td>
                <td style="padding:8px; max-width:200px;">${answerDisplay}<\/td>
                <td style="padding:8px;">${(q.correctAnswer || q.correct || 'N/A').substring(0, 80)}<\/td>
             <\/tr>`;
        });
        reportHtml += `<\/table><br>`;
    }
    
    reportHtml += `<hr><p><strong>Overall Score:</strong> ${totalCorrect}/${totalPossible} (${Math.round(totalCorrect/totalPossible*100)}%)</p>`;
    reportHtml += `<p><strong>Skipped Questions:</strong> ${totalSkipped}</p>`;
    reportHtml += `</div>`;
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html><head><title>AP Chemistry Report - ${userId}</title>
        <style>body{font-family:sans-serif;padding:20px;} table{border-collapse:collapse;width:100%;} td,th{padding:8px;text-align:left;border-bottom:1px solid #ddd;}</style>
        </head><body>${reportHtml}</body></html>
    `);
    printWindow.document.close();
    printWindow.print();
}

// ==================== THEME FUNCTIONS ====================
function loadTheme() {
    const saved = localStorage.getItem('chemTheme') || 'dark';
    document.body.setAttribute('data-theme', saved);
    document.querySelectorAll('.theme-btn').forEach(btn => {
        if (btn.dataset.theme === saved) btn.classList.add('active');
        else btn.classList.remove('active');
    });
}

function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('chemTheme', theme);
    document.querySelectorAll('.theme-btn').forEach(btn => {
        if (btn.dataset.theme === theme) btn.classList.add('active');
        else btn.classList.remove('active');
    });
    const modal = document.getElementById('themeModal');
    if (modal) modal.classList.remove('show');
    showToast(`${theme === 'dark' ? 'Dark' : theme === 'light' ? 'Light' : 'High Contrast'} theme applied!`);
}

// ==================== INITIALIZATION ====================
function initGame() {
    if (typeof randomizeAllQuestions === 'function') {
        randomizeAllQuestions();
    }
    
    initializeUser();
    
    totalPossible = 0;
    for (let tid of TOPIC_ORDER) {
        const qlist = TOPICS[tid].questions;
        totalPossible += qlist.length;
        if (!topicsState[tid]) {
            topicsState[tid] = {
                currentIdx: 0,
                answers: qlist.map(() => ({ answered: false, status: null, userAnswer: null }))
            };
        }
    }
    
    const loaded = loadProgress();
    
    document.getElementById('totalPossible').innerText = totalPossible;
    document.getElementById('totalMastery').innerText = TOPIC_ORDER.length;
    
    addControls();
    updateStats();
    renderDashboard();
    loadTheme();
    
    if (loaded) {
        showToast(`Welcome back, ${userId}! Your progress has been loaded.`);
    }
}

// ==================== EVENT LISTENERS ====================
document.addEventListener('DOMContentLoaded', () => {
    const reportBtn = document.getElementById('pdfReportBtn');
    if (reportBtn) reportBtn.addEventListener('click', generateReport);
    
    const closeBtn = document.getElementById('closeArenaBtn');
    if (closeBtn) closeBtn.addEventListener('click', closeArena);
    
    const openThemeBtn = document.getElementById('openThemeModal');
    if (openThemeBtn) {
        openThemeBtn.addEventListener('click', () => {
            document.getElementById('themeModal').classList.add('show');
        });
    }
    
    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', () => {
            document.getElementById('themeModal').classList.remove('show');
        });
    }
    
    const applyBtn = document.getElementById('applyThemeBtn');
    if (applyBtn) {
        applyBtn.addEventListener('click', () => {
            const selected = document.querySelector('.theme-btn.active')?.dataset.theme || 'dark';
            applyTheme(selected);
        });
    }
    
    document.querySelectorAll('.theme-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.theme-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
    
    const modal = document.getElementById('themeModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
            }
        });
    }
    
    initGame();
});