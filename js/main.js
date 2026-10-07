// Typing animation (skipped gracefully if the CDN script failed to load)
const typingEl = document.querySelector('.typing');
if (typingEl) {
    const roles = ['Web Developer', 'Front-End Developer', 'Freelancer', 'Electrical Engineering Student'];
    if (typeof Typed !== 'undefined') {
        new Typed('.typing', { strings: roles, typeSpeed: 70, backSpeed: 40, backDelay: 1500, loop: true });
    } else {
        typingEl.textContent = roles[0];
    }
}

// Header: shadow on scroll + mobile menu
const header = document.getElementById('header');
const toggle = document.getElementById('nav-toggle');
const menu = document.getElementById('nav-menu');

const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

const setMenu = (open) => {
    menu.classList.toggle('open', open);
    header.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.firstElementChild.className = open ? 'bi bi-x' : 'bi bi-list';
};
toggle.addEventListener('click', () => setMenu(!menu.classList.contains('open')));
menu.addEventListener('click', (e) => { if (e.target.closest('a')) setMenu(false); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });

// Highlight the nav link of the section in view
const links = [...document.querySelectorAll('.nav-link')];
const sections = links.map((l) => document.querySelector(l.getAttribute('href')));
const spy = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        links.forEach((l) => l.classList.toggle('active', l.getAttribute('href') === '#' + entry.target.id));
    });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach((s) => s && spy.observe(s));

// Reveal on scroll (also triggers skill bar fill)
const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Footer year
document.getElementById('year').textContent = new Date().getFullYear();

// Contact form: validate, then open the visitor's email client with the message prefilled
const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const EMAIL = 'sameermurtaza11@gmail.com';

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const fields = [form.name, form.email, form.message];
    let valid = true;
    fields.forEach((f) => {
        const ok = f.value.trim() !== '' && f.checkValidity();
        f.classList.toggle('invalid', !ok);
        if (!ok) valid = false;
    });
    status.classList.toggle('error', !valid);
    if (!valid) {
        status.textContent = 'Please fill in your name, a valid email and a message.';
        return;
    }
    const subject = form.subject.value.trim() || 'Portfolio enquiry from ' + form.name.value.trim();
    const body = `${form.message.value.trim()}\n\n— ${form.name.value.trim()} (${form.email.value.trim()})`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    status.textContent = 'Opening your email app… if nothing happens, email me directly at ' + EMAIL;
    form.reset();
});
form.addEventListener('input', (e) => e.target.classList.remove('invalid'));
