// ═══════════════════════════════════════════════════════════════════════════
// D.esk AI — Home Page / Chatbot JavaScript
// ═══════════════════════════════════════════════════════════════════════════

/* ── Knowledge Base ────────────────────────────────────────────────────── */
const KB = {
    "courses": `📚 **Courses at Stella Mary's College of Engineering**\n\nDepartments available:\n• **CSE** – Computer Science & Engineering\n• **ECE** – Electronics & Communication\n• **EEE** – Electrical & Electronics\n• **MECH** – Mechanical Engineering\n• **CIVIL** – Civil Engineering\n• **IT** – Information Technology\n\nEach department offers B.E./B.Tech (4 years) and M.E./M.Tech (2 years) programs affiliated to Anna University.`,

    "exam": `📅 **Exam Schedule 2025**\n\n**Upcoming Exams:**\n• Internal Assessment 1 – Feb 20, 2025\n• Internal Assessment 2 – Mar 25, 2025\n• Model Exam – Apr 10–18, 2025\n• Semester End Exam – May 5–20, 2025\n\n**Hall tickets** are issued 5 days before exams. Check the college portal for subject-wise timetables.`,

    "attendance": `✅ **Attendance Rules**\n\n• Minimum attendance required: **75%**\n• Below 75% → Detained from semester exams\n• Medical leave is considered with valid documents\n• Attendance is updated every Monday on the portal\n\n**Formula:** (Classes Attended / Total Classes) × 100`,

    "hostel": `🏠 **Hostel Information**\n\n**Boys Hostel:** Capacity 400, AC & Non-AC rooms\n**Girls Hostel:** Capacity 600, AC & Non-AC rooms\n\n**Facilities:** Wi-Fi, Mess, Laundry, 24/7 Security, Study Hall\n**Fees:** ₹60,000–₹90,000 per year (varies by room type)\n\nContact: hostel@stellamarys.edu.in | 0462-XXXXXXX`,

    "placement": `💼 **Placement Information**\n\n**2024 Placement Highlights:**\n• 95% placement rate\n• Highest Package: ₹28 LPA (TCS Digital)\n• Average Package: ₹5.2 LPA\n• Top Recruiters: TCS, Infosys, Wipro, Cognizant, Zoho, HCL\n\n**Training:** Aptitude, Coding, Soft Skills from 3rd year\nContact: placement@stellamarys.edu.in`,

    "faculty": `👨‍🏫 **Faculty Directory**\n\n**CSE Department:**\n• Dr. A. Rajendran – HOD, Professor\n• Dr. S. Meena – Associate Professor (AI/ML)\n• Mr. K. Prakash – Assistant Professor (Web Dev)\n\n**For full directory:** Visit the college website or the Faculty section in Services.\n\n📞 Main Office: 0462-XXXXXXX`,

    "fees": `💰 **Fee Structure 2024-25**\n\n• **Tuition Fee:** ₹75,000/year\n• **Hostel Fee:** ₹60,000–₹90,000/year\n• **Bus Fee:** ₹15,000–₹25,000/year\n• **Exam Fee:** ₹1,200/semester\n\nFees can be paid online via the college portal or at the accounts office. Scholarships available for merit students.`,

    "library": `📖 **Library**\n\n• Over 50,000 books and journals\n• Digital library with IEEE, Springer, Elsevier access\n• Open: Mon–Sat, 8 AM – 8 PM\n• E-resources available 24/7 via VPN\n\n**Library Card:** Issued at the start of each academic year`,

    "admission": `🎓 **Admissions**\n\n• **UG (B.E./B.Tech):** Through TNEA counselling\n• **PG (M.E./M.Tech):** Through TANCET / GATE\n• **Management Quota:** Direct admission available\n\n**Documents Required:** 10th, 12th marksheets, Transfer Certificate, Community Certificate, Passport photos\n\nContact: admissions@stellamarys.edu.in`,

    "gpa": `📊 **GPA & Grading System**\n\n| Grade | Marks | Points |\n|-------|-------|--------|\n| O     | 91-100| 10     |\n| A+    | 81-90 | 9      |\n| A     | 71-80 | 8      |\n| B+    | 61-70 | 7      |\n| B     | 51-60 | 6      |\n| RA    | <50   | 0      |\n\n**CGPA** = Sum of (Grade Points × Credits) / Total Credits`,

    "default": `🤔 I'm not sure about that specific query. Here's what I can help with:\n\n• 📚 Courses & Departments\n• 📅 Exam Schedules\n• ✅ Attendance Rules\n• 🏠 Hostel Info\n• 💼 Placements\n• 👨‍🏫 Faculty\n• 💰 Fee Structure\n• 📖 Library\n• 🎓 Admissions\n• 📊 GPA & Grading\n\nTry asking: *"What are the attendance rules?"* or *"Tell me about placements"*`
};

function getResponse(query) {
    const q = query.toLowerCase();
    if (q.match(/course|syllabus|department|cse|ece|mech|civil|it|eee/)) return KB.courses;
    if (q.match(/exam|test|schedule|timetable|internal|semester|hall ticket/)) return KB.exam;
    if (q.match(/attend|present|absent|detain/)) return KB.attendance;
    if (q.match(/hostel|room|mess|dormitory|stay/)) return KB.hostel;
    if (q.match(/place|job|recruit|package|lpa|company|campus/)) return KB.placement;
    if (q.match(/faculty|professor|teacher|staff|hod|lecturer/)) return KB.faculty;
    if (q.match(/fee|cost|tuition|money|pay|scholarship/)) return KB.fees;
    if (q.match(/library|book|journal|digital|ieee/)) return KB.library;
    if (q.match(/admit|admission|tnea|tancet|gate|join|enroll/)) return KB.admission;
    if (q.match(/gpa|cgpa|grade|mark|result|score/)) return KB.gpa;
    return KB.default;
}

/* ── Chat State ────────────────────────────────────────────────────────── */
let chatHistory = [];

function getTime() {
    return new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
}

function formatMarkdown(text) {
    return text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n/g, '<br/>')
        .replace(/•/g, '<span style="color:var(--green)">•</span>');
}

function appendMessage(role, content, time) {
    const container = document.getElementById('chat-messages');
    const div = document.createElement('div');
    div.className = `msg msg-${role}`;

    const avatarEmoji = role === 'bot' ? '🤖' : '👤';
    const formattedContent = role === 'bot' ? formatMarkdown(content) : content;

    div.innerHTML = `
    <div class="msg-avatar">${avatarEmoji}</div>
    <div class="msg-bubble">${formattedContent}</div>
    <span class="msg-time">${time || getTime()}</span>
  `;
    container.appendChild(div);
    container.scrollTop = container.scrollHeight;
    chatHistory.push({ role, content, time: time || getTime() });
}

function showTyping() {
    document.getElementById('typing-indicator').style.display = 'flex';
    const container = document.getElementById('chat-messages');
    container.scrollTop = container.scrollHeight;
}
function hideTyping() {
    document.getElementById('typing-indicator').style.display = 'none';
}

async function sendMessage() {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if (!msg) return;

    input.value = '';
    appendMessage('user', msg);
    showTyping();

    // Simulate AI response delay
    const delay = 800 + Math.random() * 800;
    await new Promise(r => setTimeout(r, delay));

    hideTyping();
    const response = getResponse(msg);
    appendMessage('bot', response);
}

function handleKey(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
    }
}

function askTopic(topic) {
    document.getElementById('chat-input').value = topic;
    sendMessage();
}

function clearChat() {
    const container = document.getElementById('chat-messages');
    container.innerHTML = '';
    chatHistory = [];
    // Re-add welcome message
    appendMessage('bot', `👋 Chat cleared! I'm ready to help again. What would you like to know about the campus?`);
    showToast('Chat cleared', 'info');
}

function toggleFullscreen() {
    const chatContainer = document.querySelector('.chat-container');
    chatContainer.classList.toggle('fullscreen-chat');
}

/* ── Voice Input ───────────────────────────────────────────────────────── */
let recognition = null;
let isRecording = false;

function toggleVoice() {
    const btn = document.getElementById('voice-btn');
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
        showToast('Voice input not supported in this browser', 'warn');
        return;
    }
    if (isRecording) {
        recognition?.stop();
        isRecording = false;
        btn.classList.remove('recording');
        btn.textContent = '🎤';
        return;
    }
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
    recognition = new SR();
    recognition.lang = 'en-IN';
    recognition.interimResults = false;
    recognition.onresult = (e) => {
        document.getElementById('chat-input').value = e.results[0][0].transcript;
        sendMessage();
    };
    recognition.onend = () => {
        isRecording = false;
        btn.classList.remove('recording');
        btn.textContent = '🎤';
    };
    recognition.start();
    isRecording = true;
    btn.classList.add('recording');
    btn.textContent = '🔴';
}

/* ── Fullscreen chat style ─────────────────────────────────────────────── */
const style = document.createElement('style');
style.textContent = `
  .fullscreen-chat {
    position: fixed !important;
    inset: 70px 0 0 0 !important;
    max-width: 100% !important;
    height: calc(100vh - 70px) !important;
    border-radius: 0 !important;
    z-index: 50;
  }
`;
document.head.appendChild(style);
