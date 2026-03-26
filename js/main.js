// main.js - Main application logic for AP Chemistry Pre-Test
// Supports multiple choice, short answer, and free response questions

// Global variables
let topicsState = {};
let globalStreak = 0;
let totalPossible = 0;
let currentTopic = null;
let confettiAnimationId = null;
let autoAdvanceTimer = null;
let userId = null;
let selectedAnswerValue = null;
let shortAnswerText = null;
let isProcessing = false;

// User Management Functions
function initializeUser() {
    let savedUser = localStorage.getItem('chemMasterUser');
    if (!savedUser) {
        userId = prompt('Welcome to AP Chemistry Pre-Test! Enter your name to save your progress:', 'Student');
        if (!userId) userId = 'Student';
        localStorage.setItem('chemMasterUser', userId);
    } else {
        userId = savedUser;
    }
    return userId;
}

function saveProgress() {
    if (!userId) return;
    const saveData = {
        userId: userId,
        topicsState: topicsState,
        globalStreak: globalStreak,
        lastSaved: new Date().toISOString()
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
            return true;
        } catch (e) {
            return false;
        }
    }
    return false;
}

function resetProgress() {
    if (confirm('Are you sure you want to reset ALL your progress? This cannot be undone.')) {
        for (let tid of TOPIC_ORDER) {
            const qlist = TOPICS[tid].questions;
            topicsState[tid] = {
                currentIdx: 0,
                answers: qlist.map(() => ({ answered: false, correct: false, userAnswer: null }))
            };
        }
        globalStreak = 0;
        saveProgress();
        updateStats();
        renderDashboard();
        if (currentTopic) closeArena();
        alert('Progress has been reset!');
    }
}

function showUserInfo() {
    const correctCount = Object.values(topicsState).reduce((sum, state) => 
        sum + state.answers.filter(a => a.correct).length, 0);
    alert(`👤 Student: ${userId}\n📊 Total Score: ${correctCount}/${totalPossible}\n🔥 Current Streak: ${globalStreak}\n\nProgress is automatically saved!`);
}

// Initialize game
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
                answers: qlist.map(() => ({ answered: false, correct: false, userAnswer: null }))
            };
        }
    }
    
    const loaded = loadProgress();
    
    document.getElementById('totalPossible').innerText = totalPossible;
    document.getElementById('totalMastery').innerText = TOPIC_ORDER.length;
    
    addUserControls();
    
    updateStats();
    renderDashboard();
    loadTheme();
    
    if (loaded) {
        showToast(`Welcome back, ${userId}! Your progress has been loaded.`);
    }
}

function addUserControls() {
    const statsSection = document.querySelector('.stats-section');
    if (statsSection && !document.getElementById('userInfoBtn')) {
        const userBtn = document.createElement('button');
        userBtn.id = 'userInfoBtn';
        userBtn.className = 'pdf-btn';
        userBtn.innerHTML = `<i class="fas fa-user"></i> ${userId.substring(0, 12)}`;
        userBtn.onclick = showUserInfo;
        
        const resetBtn = document.createElement('button');
        resetBtn.id = 'resetProgressBtn';
        resetBtn.className = 'pdf-btn';
        resetBtn.innerHTML = `<i class="fas fa-trash-alt"></i> Reset`;
        resetBtn.style.background = '#f44336';
        resetBtn.onclick = resetProgress;
        
        statsSection.appendChild(userBtn);
        statsSection.appendChild(resetBtn);
    }
}

function updateStats() {
    let totalCorrect = 0;
    let masteredCount = 0;
    for (let tid of TOPIC_ORDER) {
        const state = topicsState[tid];
        if (state) {
            const correct = state.answers.filter(a => a.correct).length;
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
        
        const correctCount = state.answers.filter(a => a.correct).length;
        const totalQs = topic.questions.length;
        const isMastered = correctCount === totalQs;
        const progressPercent = (correctCount / totalQs) * 100;
        
        const card = document.createElement('div');
        card.className = `topic-card`;
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
    currentTopic = tid;
    selectedAnswerValue = null;
    shortAnswerText = null;
    isProcessing = false;
    document.getElementById('arenaTitle').innerHTML = `<i class="${TOPICS[tid].icon}"></i> ${TOPICS[tid].name}`;
    document.getElementById('quizArena').classList.remove('hidden');
    renderQuiz();
}

function closeArena() {
    if (autoAdvanceTimer) {
        clearTimeout(autoAdvanceTimer);
        autoAdvanceTimer = null;
    }
    document.getElementById('quizArena').classList.add('hidden');
    currentTopic = null;
    selectedAnswerValue = null;
    shortAnswerText = null;
    isProcessing = false;
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
    const correctCount = state.answers.filter(a => a.correct).length;
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
            icon = 'fa-heart';
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
    const isCorrect = state.answers[state.currentIdx].correct;
    const progressPercent = (state.answers.filter(a => a.answered).length / totalQs) * 100;
    
    let feedbackHtml = `<i class="fas fa-brain"></i> Select an answer and click Submit`;
    let feedbackClass = '';
    
    if (isAnswered) {
        if (isCorrect) {
            feedbackHtml = `<i class="fas fa-check-circle"></i> Correct! ${current.hint || 'Well done!'}`;
            feedbackClass = 'feedback-correct';
        } else {
            feedbackHtml = `<i class="fas fa-lightbulb"></i> ${current.hint || 'Review the concept.'}<br><strong>Correct answer:</strong> ${current.correctAnswer || current.correct}`;
            feedbackClass = 'feedback-wrong';
        }
    }
    
    // Build disclaimer if it exists
    const disclaimerHtml = current.disclaimer ? `
        <div class="disclaimer-box">
            <i class="fas fa-info-circle"></i>
            <strong>Answer Format:</strong> ${current.disclaimer}
        </div>
    ` : '';
    
    // Render based on question type
    let inputHtml = '';
    if (current.type === 'mc') {
        inputHtml = `
            <div class="options-grid" id="optionsContainer">
                ${current.options.map((opt, idx) => {
                    let icon = 'fa-circle';
                    let selectedClass = '';
                    
                    if (isAnswered) {
                        if (opt === current.correct) {
                            icon = 'fa-check-circle';
                        }
                        if (opt === selectedAnswerValue && !isCorrect) {
                            icon = 'fa-times-circle';
                        }
                    } else {
                        if (selectedAnswerValue === opt) {
                            icon = 'fa-check-circle';
                            selectedClass = 'selected';
                        }
                    }
                    
                    return `
                        <button class="option-btn ${selectedClass}" data-opt="${opt.replace(/"/g, '&quot;')}" ${isAnswered ? 'disabled' : ''}>
                            <i class="fas ${icon}"></i>
                            ${opt}
                        </button>
                    `;
                }).join('')}
            </div>
        `;
    } else {
        // Short answer or free response
        const userAnswer = state.answers[state.currentIdx].userAnswer || '';
        inputHtml = `
            <div class="short-answer-area">
                <label for="shortAnswerInput"><i class="fas fa-pen"></i> Your Answer:</label>
                <textarea id="shortAnswerInput" class="short-answer-input" rows="6" ${isAnswered ? 'disabled' : ''} 
                    placeholder="Type your answer here. Be specific and use complete sentences. Show calculations where applicable.">${isAnswered ? userAnswer : ''}</textarea>
                <div class="answer-instructions">
                    <i class="fas fa-info-circle"></i>
                    <strong>For written responses:</strong> Show all work, include units, and explain your reasoning clearly.
                    Partial credit may be awarded for correct reasoning even if the final answer is incorrect.
                </div>
            </div>
        `;
    }
    
    container.innerHTML = `
        <div class="question-card">
            <div class="progress-bar" style="margin-bottom: 1rem;">
                <div class="progress-fill" style="width: ${progressPercent}%"></div>
            </div>
            <div class="question-type-badge">
                <span class="badge ${current.type === 'mc' ? 'badge-mc' : (current.type === 'sa' ? 'badge-sa' : 'badge-fr')}">
                    ${current.type === 'mc' ? 'Multiple Choice' : (current.type === 'sa' ? 'Short Answer' : 'Free Response')}
                </span>
                <span class="unit-badge">${current.unit || 'AP Chemistry'}</span>
            </div>
            ${disclaimerHtml}
            <div class="question-text">
                <i class="fas fa-question-circle"></i> ${current.text}
            </div>
            ${inputHtml}
            <div class="feedback ${feedbackClass}">${feedbackHtml}</div>
            ${!isAnswered ? `<button class="submit-btn" id="submitAnswerBtn"><i class="fas fa-check"></i> Submit Answer</button>` : ''}
            ${isAnswered ? `<button class="next-btn" id="nextQuestionBtn"><i class="fas fa-forward"></i> Next Question</button>` : ''}
        </div>
    `;
    
    if (!isAnswered) {
        if (current.type === 'mc') {
            const btns = document.querySelectorAll('.option-btn');
            const submitBtn = document.getElementById('submitAnswerBtn');
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.7';
                submitBtn.style.cursor = 'not-allowed';
            }
            
            btns.forEach((btn) => {
                btn.addEventListener('click', (e) => {
                    const selected = btn.getAttribute('data-opt');
                    selectedAnswerValue = selected;
                    
                    btns.forEach((otherBtn) => {
                        const otherIcon = otherBtn.querySelector('i');
                        const otherOpt = otherBtn.getAttribute('data-opt');
                        if (otherIcon) {
                            if (otherOpt === selected) {
                                otherIcon.className = 'fas fa-check-circle';
                                otherBtn.classList.add('selected');
                            } else {
                                otherIcon.className = 'fas fa-circle';
                                otherBtn.classList.remove('selected');
                            }
                        }
                    });
                    
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.style.opacity = '1';
                        submitBtn.style.cursor = 'pointer';
                        submitBtn.classList.add('active');
                    }
                });
            });
            
            if (submitBtn) {
                const handleSubmit = () => {
                    if (!selectedAnswerValue) {
                        const feedbackDiv = document.querySelector('.feedback');
                        feedbackDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Please select an answer first!';
                        feedbackDiv.classList.add('feedback-wrong');
                        setTimeout(() => {
                            if (!isAnswered) renderQuiz();
                        }, 1200);
                        return;
                    }
                    
                    if (isProcessing) return;
                    isProcessing = true;
                    
                    const isOptionCorrect = (selectedAnswerValue === current.correct);
                    submitAnswer(currentTopic, selectedAnswerValue, isOptionCorrect);
                };
                
                submitBtn.removeEventListener('click', handleSubmit);
                submitBtn.addEventListener('click', handleSubmit);
            }
        } else {
            // Short answer / free response
            const textarea = document.getElementById('shortAnswerInput');
            const submitBtn = document.getElementById('submitAnswerBtn');
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.style.opacity = '0.7';
                submitBtn.style.cursor = 'not-allowed';
            }
            
            if (textarea) {
                textarea.addEventListener('input', () => {
                    if (textarea.value.trim().length > 0) {
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.style.opacity = '1';
                            submitBtn.style.cursor = 'pointer';
                            submitBtn.classList.add('active');
                        }
                        shortAnswerText = textarea.value;
                    } else {
                        if (submitBtn) {
                            submitBtn.disabled = true;
                            submitBtn.style.opacity = '0.7';
                            submitBtn.style.cursor = 'not-allowed';
                            submitBtn.classList.remove('active');
                        }
                    }
                });
            }
            
            if (submitBtn) {
                const handleSubmit = () => {
                    const userAnswer = shortAnswerText || (textarea ? textarea.value.trim() : '');
                    if (!userAnswer) {
                        const feedbackDiv = document.querySelector('.feedback');
                        feedbackDiv.innerHTML = '<i class="fas fa-exclamation-triangle"></i> Please enter your answer before submitting!';
                        feedbackDiv.classList.add('feedback-wrong');
                        setTimeout(() => {
                            if (!isAnswered) renderQuiz();
                        }, 1500);
                        return;
                    }
                    
                    if (isProcessing) return;
                    isProcessing = true;
                    
                    // For written answers, we need to check if the answer matches the correct answer
                    const userAnswerLower = userAnswer.toLowerCase();
                    const correctAnswerLower = (current.correctAnswer || current.correct).toLowerCase();
                    
                    // Check for key concepts in the user's answer
                    const keyTerms = correctAnswerLower.split(' ').filter(word => word.length > 4);
                    let matchCount = 0;
                    for (let term of keyTerms) {
                        if (userAnswerLower.includes(term)) {
                            matchCount++;
                        }
                    }
                    
                    // Calculate a score based on matches
                    const matchPercentage = keyTerms.length > 0 ? matchCount / keyTerms.length : 0;
                    const isAnswerCorrect = matchPercentage >= 0.5 || userAnswerLower.includes(correctAnswerLower.substring(0, 30));
                    
                    submitShortAnswer(currentTopic, userAnswer, isAnswerCorrect);
                };
                
                submitBtn.removeEventListener('click', handleSubmit);
                submitBtn.addEventListener('click', handleSubmit);
            }
        }
    }
    
    const nextBtn = document.getElementById('nextQuestionBtn');
    if (nextBtn) {
        const handleNext = () => {
            nextQuestion(currentTopic);
        };
        nextBtn.removeEventListener('click', handleNext);
        nextBtn.addEventListener('click', handleNext);
    }
}

function retryTopic(tid) {
    const totalQs = TOPICS[tid].questions.length;
    topicsState[tid] = {
        currentIdx: 0,
        answers: Array(totalQs).fill().map(() => ({ answered: false, correct: false, userAnswer: null }))
    };
    
    selectedAnswerValue = null;
    shortAnswerText = null;
    isProcessing = false;
    
    saveProgress();
    updateStats();
    renderDashboard();
    openTopic(tid);
}

function submitAnswer(tid, selected, isCorrect) {
    const state = topicsState[tid];
    
    state.answers[state.currentIdx].answered = true;
    state.answers[state.currentIdx].correct = isCorrect;
    state.answers[state.currentIdx].userAnswer = selected;
    
    if (isCorrect) {
        globalStreak++;
        triggerConfetti();
    } else {
        globalStreak = 0;
    }
    
    selectedAnswerValue = null;
    isProcessing = false;
    
    renderQuiz();
    updateStats();
    renderDashboard();
    saveProgress();
}

function submitShortAnswer(tid, userAnswer, isCorrect) {
    const state = topicsState[tid];
    
    state.answers[state.currentIdx].answered = true;
    state.answers[state.currentIdx].correct = isCorrect;
    state.answers[state.currentIdx].userAnswer = userAnswer;
    
    if (isCorrect) {
        globalStreak++;
        triggerConfetti();
    } else {
        globalStreak = 0;
    }
    
    shortAnswerText = null;
    isProcessing = false;
    
    renderQuiz();
    updateStats();
    renderDashboard();
    saveProgress();
}

function nextQuestion(tid) {
    const state = topicsState[tid];
    const totalQs = TOPICS[tid].questions.length;
    
    selectedAnswerValue = null;
    shortAnswerText = null;
    isProcessing = false;
    
    if (state.currentIdx + 1 < totalQs) {
        state.currentIdx++;
        renderQuiz();
    } else {
        renderQuiz();
        updateStats();
        renderDashboard();
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
    toast.innerHTML = `<i class="fas fa-save"></i> ${message}`;
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
    for (let tid of TOPIC_ORDER) {
        const topic = TOPICS[tid];
        const state = topicsState[tid];
        const correctCount = state.answers.filter(a => a.correct).length;
        totalCorrect += correctCount;
        
        reportHtml += `<h2>${topic.name}</h2>`;
        reportHtml += `<p>Score: ${correctCount}/${topic.questions.length} (${Math.round(correctCount/topic.questions.length*100)}%)</p>`;
        
        reportHtml += `<table style="width:100%; border-collapse: collapse;">`;
        reportHtml += `<tr style="background:#2196f3; color:white;"><th style="padding:8px;">#</th><th style="padding:8px;">Question</th><th style="padding:8px;">Type</th><th style="padding:8px;">Status</th><th style="padding:8px;">Your Answer</th><th style="padding:8px;">Correct Answer</th></tr>`;
        
        topic.questions.forEach((q, idx) => {
            const isCorrect = state.answers[idx]?.correct || false;
            const userAnswer = state.answers[idx]?.userAnswer || 'Not answered';
            const answerDisplay = userAnswer.length > 100 ? userAnswer.substring(0, 100) + '...' : userAnswer;
            reportHtml += `<tr style="border-bottom:1px solid #ddd;">
                <td style="padding:8px;">${idx+1}</td>
                <td style="padding:8px;">${q.text.substring(0, 80)}...</td>
                <td style="padding:8px;">${q.type === 'mc' ? 'MC' : (q.type === 'sa' ? 'SA' : 'FR')}</td>
                <td style="padding:8px; color:${isCorrect ? '#4caf50' : '#f44336'};">${isCorrect ? '✓ Correct' : '✗ Incorrect'}</td>
                <td style="padding:8px; max-width:200px;">${answerDisplay}</td>
                <td style="padding:8px;">${(q.correctAnswer || q.correct || 'N/A').substring(0, 80)}</td>
             </tr>`;
        });
        reportHtml += `</table><br>`;
    }
    
    reportHtml += `<hr><p><strong>Overall Score:</strong> ${totalCorrect}/${totalPossible} (${Math.round(totalCorrect/totalPossible*100)}%)</p>`;
    reportHtml += `<p><strong>Streak:</strong> ${globalStreak}</p>`;
    reportHtml += `<p><i>Note: Written responses are evaluated based on key concept inclusion. Review the correct answers to see what was expected.</i></p>`;
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

// Theme Functions
function loadTheme() {
    const saved = localStorage.getItem('chemTheme') || 'dark';
    document.body.setAttribute('data-theme', saved);
    
    document.querySelectorAll('.theme-btn').forEach(btn => {
        if (btn.dataset.theme === saved) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}

function applyTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('chemTheme', theme);
    
    document.querySelectorAll('.theme-btn').forEach(btn => {
        if (btn.dataset.theme === theme) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
    
    const modal = document.getElementById('themeModal');
    if (modal) modal.classList.remove('show');
    
    showToast(`${theme === 'dark' ? 'Dark' : theme === 'light' ? 'Light' : 'High Contrast'} theme applied!`);
}

// Add CSS for short answer and badges
function addAdditionalStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .question-type-badge {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
        }
        .badge {
            padding: 4px 12px;
            border-radius: 20px;
            font-size: 0.75rem;
            font-weight: 600;
        }
        .badge-mc {
            background: #2196f3;
            color: white;
        }
        .badge-sa {
            background: #4caf50;
            color: white;
        }
        .badge-fr {
            background: #ff9800;
            color: white;
        }
        .unit-badge {
            font-size: 0.7rem;
            padding: 4px 8px;
            background: rgba(33, 150, 243, 0.2);
            border-radius: 12px;
            color: var(--text-secondary);
        }
        .disclaimer-box {
            background: rgba(33, 150, 243, 0.1);
            border-left: 4px solid #2196f3;
            padding: 12px 16px;
            margin: 12px 0;
            border-radius: 8px;
            font-size: 0.85rem;
            display: flex;
            align-items: flex-start;
            gap: 10px;
            flex-wrap: wrap;
        }
        .disclaimer-box i {
            color: #2196f3;
            font-size: 1rem;
            margin-top: 2px;
        }
        .short-answer-area {
            margin: 1.5rem 0;
        }
        .short-answer-area label {
            font-weight: 600;
            display: block;
            margin-bottom: 0.5rem;
            color: var(--text-primary);
        }
        .short-answer-input {
            width: 100%;
            padding: 1rem;
            border-radius: 12px;
            border: 1px solid var(--card-border);
            background: var(--option-bg);
            color: var(--text-primary);
            font-family: inherit;
            font-size: 0.95rem;
            resize: vertical;
            line-height: 1.5;
        }
        .short-answer-input:focus {
            outline: none;
            border-color: var(--btn-primary);
        }
        .short-answer-input:disabled {
            opacity: 0.7;
            background: var(--progress-bg);
        }
        .answer-instructions {
            font-size: 0.75rem;
            color: var(--text-secondary);
            margin-top: 0.75rem;
            padding: 8px 12px;
            background: rgba(0,0,0,0.05);
            border-radius: 8px;
            display: flex;
            align-items: center;
            gap: 8px;
            flex-wrap: wrap;
        }
        .answer-instructions i {
            color: #ff9800;
        }
        .feedback-wrong strong {
            color: #f44336;
        }
        .feedback-correct strong {
            color: #4caf50;
        }
        .option-btn.selected {
            background: rgba(33, 150, 243, 0.2);
            border-color: #2196f3;
        }
    `;
    document.head.appendChild(style);
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    addAdditionalStyles();
    
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