// ═══════════════════════════════════════════════════════════════════════════
// D.esk AI — Contact Page JavaScript
// ═══════════════════════════════════════════════════════════════════════════

/* ── Contact Form Submit ────────────────────────────────────────────────── */
async function submitContact(e) {
    e.preventDefault();
    const btn = document.getElementById('submit-btn');
    const text = document.getElementById('submit-text');

    btn.disabled = true;
    text.textContent = '⏳ Sending...';

    // Simulate API call
    await new Promise(r => setTimeout(r, 1800));

    // Show success
    document.getElementById('contact-form').style.display = 'none';
    document.getElementById('form-success').style.display = 'block';
    showToast('Message sent successfully! We\'ll respond within 24 hours.', 'success', 5000);

    btn.disabled = false;
    text.textContent = '📤 Send Message';
}

function resetForm() {
    document.getElementById('contact-form').reset();
    document.getElementById('contact-form').style.display = 'block';
    document.getElementById('form-success').style.display = 'none';
}

/* ── FAQ Accordion ─────────────────────────────────────────────────────── */
function toggleFaq(el) {
    const isOpen = el.classList.contains('open');
    // Close all
    document.querySelectorAll('.faq-item').forEach(f => f.classList.remove('open'));
    // Open clicked if it was closed
    if (!isOpen) el.classList.add('open');
}
