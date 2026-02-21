document.addEventListener('DOMContentLoaded', () => {

    // ═══════════════════════════════════════════════════════════════════════════
    // TERMINAL FUNCTIONALITY
    // ═══════════════════════════════════════════════════════════════════════════
    const terminal = document.getElementById('terminal');
    const terminalClose = document.getElementById('terminal-close');
    const terminalInput = document.getElementById('terminal-input');
    const terminalBody = document.getElementById('terminal-body');
    const terminalTriggers = document.querySelectorAll('[data-terminal-trigger]');

    // Profile data for terminal commands
    const profileData = {
        name: 'Darshak Chavda',
        role: 'Full-Stack Developer & .NET Architecture Expert',
        location: 'Vadodara, India',
        email: 'darshak007chavda@gmail.com',
        github: 'github.com/darshakchavda',
        linkedin: 'linkedin.com/in/darshak-chavda',
        skills: ['React', 'Vite', 'JavaScript', '.NET', 'C#', 'Node.js', 'Python', 'MongoDB', 'PostgreSQL', 'GraphQL'],
        stacks: '5+ Tech Stacks',
        projects: ['CryptoHub', 'Budget Tracker', 'Scribble Chat']
    };

    // Command definitions
    const commands = {
        help: {
            description: 'Show available commands',
            execute: () => {
                return [
                    '┌─────────────────────────────────────────────┐',
                    '│  AVAILABLE COMMANDS                         │',
                    '├─────────────────────────────────────────────┤',
                    '│  help       - Show this help message        │',
                    '│  about      - About Darshak                 │',
                    '│  skills     - Technical skills              │',
                    '│  projects   - Featured projects            │',
                    '│  contact    - Contact information           │',
                    '│  social     - Social media links           │',
                    '│  clear      - Clear terminal                │',
                    '│  whoami     - Current user info            │',
                    '│  date       - Current date & time          │',
                    '│  banner     - ASCII art banner             │',
                    '└─────────────────────────────────────────────┘'
                ];
            }
        },
        about: {
            description: 'About Darshak',
            execute: () => [
                `Name    : ${profileData.name}`,
                `Role    : ${profileData.role}`,
                `Location: ${profileData.location}`,
                '',
                'Building scalable applications and intelligent systems',
                'for the next generation of digital experiences.'
            ]
        },
        skills: {
            description: 'Technical skills',
            execute: () => [
                'TECHNICAL SKILLS',
                '─────────────────',
                '',
                'Frontend   : React, Vite, JavaScript, HTML5, CSS3, TailwindCSS',
                'Backend   : .NET, C#, Node.js, Express, Python, GraphQL',
                'Database  : MSSQL, MongoDB, PostgreSQL, SQLite, Firebase',
                'Concepts  : OOP, Data Structures, SaaS, System Design',
                '',
                `Total Stack: ${profileData.stacks}`
            ]
        },
        projects: {
            description: 'Featured projects',
            execute: () => [
                'FEATURED PROJECTS',
                '──────────────────',
                '',
                '1. CryptoHub',
                '   → Cryptocurrency platform with real-time updates',
                '   → Tech: React, GraphQL, MongoDB',
                '',
                '2. Budget Tracker',
                '   → Personal finance app with data visualization',
                '   → Tech: Python, Pandas, SQLite',
                '',
                '3. Scribble Chat',
                '   → Real-time multiplayer drawing game',
                '   → Tech: Node.js, React, GraphQL'
            ]
        },
        contact: {
            description: 'Contact information',
            execute: () => [
                'CONTACT INFORMATION',
                '────────────────────',
                '',
                `Email    : ${profileData.email}`,
                `Phone    : +91 7203075804`,
                '',
                'Feel free to reach out for collaborations!'
            ]
        },
        social: {
            description: 'Social media links',
            execute: () => [
                'SOCIAL MEDIA',
                '─────────────',
                '',
                `GitHub   : https://${profileData.github}`,
                `LinkedIn : https://${profileData.linkedin}`,
                'Twitter  : https://twitter.com',
                ''
            ]
        },
        whoami: {
            description: 'Current user',
            execute: () => ['guest@portfolio']
        },
        date: {
            description: 'Current date and time',
            execute: () => [new Date().toString()]
        },
        banner: {
            description: 'ASCII art banner',
            execute: () => [
                '',
                '  █████╗ ██████╗  ██████╗  █████╗ ██████╗ ██████╗ ██╗   ██╗██╗     ███████╗',
                ' ██╔══██╗██╔══██╗██╔════╝ ██╔══██╗██╔══██╗██╔══██╗╚██╗ ██╔╝██║     ██╔════╝',
                ' ███████║██████╔╝██║  ███╗███████║██████╔╝██████╔╝ ╚████╔╝ ██║     █████╗  ',
                ' ██╔══██║██╔══██╗██║   ██║██╔══██║██╔══██╗██╔══██╗  ╚██╔╝  ██║     ██╔══╝  ',
                ' ██║  ██║██║  ██║╚██████╔╝██║  ██║██████╔╝██████╔╝   ██║   ███████╗███████╗',
                ' ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═════╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝',
                '',
                '     ██████╗ ███████╗██╗    ██╗██╗███╗   ██╗██████╗',
                '     ██╔══██╗██╔════╝██║    ██║██║████╗  ██║██╔══██╗',
                '     ██║  ██║█████╗  ██║ █╗ ██║██║██╔██╗ ██║██║  ██║',
                '     ██║  ██║██╔══╝  ██║███╗██║██║██║╚██╗██║██║  ██║',
                '     ██████╔╝███████╗╚███╔███╔╝██║██║ ╚████║██████╔╝',
                '     ╚═════╝ ╚══════╝ ╚══╝╚══╝ ╚═╝╚═╝  ╚═══╝╚═════╝',
                '',
                `Welcome to ${profileData.name}'s Portfolio Terminal`,
                "Type 'help' to get started"
            ]
        },
        clear: {
            description: 'Clear terminal',
            execute: () => {
                terminalBody.innerHTML = '';
                return [];
            }
        }
    };

    // Open terminal
    function openTerminal() {
        terminal.classList.add('active');
        terminalInput.focus();
        document.body.style.overflow = 'hidden';
    }

    // Close terminal
    function closeTerminal() {
        terminal.classList.remove('active');
        document.body.style.overflow = '';
        // Clear and reset input
        terminalInput.value = '';
    }

    // Add output line
    function addOutput(text, className = 'output') {
        const line = document.createElement('div');
        line.className = `terminal-line ${className}`;
        if (Array.isArray(text)) {
            line.innerHTML = text.join('<br>');
        } else {
            line.textContent = text;
        }
        terminalBody.insertBefore(line, terminalInput.parentElement);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    // Execute command
    function executeCommand(cmd) {
        const command = cmd.toLowerCase().trim();
        if (!command) return;

        // Add command to history
        addOutput(`$ ${cmd}`, 'command');

        if (commands[command]) {
            const output = commands[command].execute();
            if (output && output.length > 0) {
                addOutput(output.join('\n'), 'output');
            }
        } else {
            addOutput(`Command not found: ${command}. Type 'help' for available commands.`, 'error');
        }
    }

    // Event listeners
    terminalTriggers.forEach(trigger => {
        trigger.addEventListener('click', (e) => {
            e.preventDefault();
            openTerminal();
        });
    });

    terminalClose.addEventListener('click', closeTerminal);

    terminal.addEventListener('click', (e) => {
        if (e.target === terminal) closeTerminal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && terminal.classList.contains('active')) {
            closeTerminal();
        }
    });

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = terminalInput.value;
            terminalInput.value = '';
            executeCommand(cmd);
        }
    });

    // Keep focus on input
    terminal.addEventListener('click', () => {
        terminalInput.focus();
    });

    // ─────────────────────────────────────────────────────────────────────────
    // SMOOTH SCROLL  —  native scrollbar drives position, we lerp the visual
    //
    //  • #page-spacer  sets the page height so the browser scrollbar appears
    //  • .scroll-wrapper is position:fixed, moved with transform:translateY
    //  • window.scrollY is the "target"; currentY lerps toward it each frame
    //  • Works with mouse wheel, trackpad, keyboard, touch — everything native
    // ─────────────────────────────────────────────────────────────────────────
    const wrapper = document.querySelector('.scroll-wrapper');
    const spacer  = document.getElementById('page-spacer');
    const navbar  = document.querySelector('.navbar');

    if (!wrapper || !spacer) {
        console.warn('scroll-wrapper or page-spacer not found');
        return;
    }

    // Keep spacer height == wrapper content height so scrollbar is correct
    function syncHeight() {
        spacer.style.height = wrapper.scrollHeight + 'px';
    }
    syncHeight();
    new ResizeObserver(syncHeight).observe(wrapper);
    window.addEventListener('resize', syncHeight);

    // ── Lerp loop ──────────────────────────────────────────────────────────
    let currentY = 0;
    const EASE   = 0.10;   // lower = more glide; raise for snappier feel

    function lerp(a, b, t) { return a + (b - a) * t; }

    // ── Reveal system ──────────────────────────────────────────────────────
    const revealEls   = Array.from(document.querySelectorAll('.reveal'));
    const revealedSet = new Set();

    function checkReveals() {
        const triggerLine = currentY + window.innerHeight * 0.88;
        revealEls.forEach(el => {
            if (revealedSet.has(el)) return;
            // offsetTop relative to wrapper (which is our coordinate space)
            const top = el.offsetTop + (el.offsetParent !== wrapper ? (el.offsetParent?.offsetTop || 0) : 0);
            if (top < triggerLine) {
                el.classList.add('revealed');
                revealedSet.add(el);
            }
        });
    }

    // ── Active nav ─────────────────────────────────────────────────────────
    const sections = Array.from(document.querySelectorAll('section[id]'));
    const navLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));

    function updateNav() {
        if (navbar) navbar.classList.toggle('scrolled', currentY > 60);
        if (!sections.length) return;
        const mid = currentY + window.innerHeight * 0.45;
        let active = sections[0];
        sections.forEach(s => { if (s.offsetTop <= mid) active = s; });
        navLinks.forEach(a =>
            a.classList.toggle('active', a.getAttribute('href') === '#' + active.id)
        );
    }

    // ── Main RAF tick ──────────────────────────────────────────────────────
    function tick() {
        currentY = lerp(currentY, window.scrollY, EASE);

        // Snap tiny differences to avoid infinite micro-updates
        if (Math.abs(currentY - window.scrollY) < 0.05) currentY = window.scrollY;

        wrapper.style.transform = `translateY(${-currentY}px)`;

        // Expose for 3D parallax
        const maxScroll = Math.max(1, document.body.scrollHeight - window.innerHeight);
        window.scrollProgress = currentY / maxScroll;
        window._scrollY       = currentY;

        checkReveals();
        updateNav();

        requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);

    // ── Smooth anchor scroll ───────────────────────────────────────────────
    function easeOutQuart(t) { return 1 - Math.pow(1 - t, 4); }

    function smoothScrollTo(targetPx, ms = 900) {
        const from = window.scrollY;
        const dist = targetPx - from;
        const t0   = performance.now();
        (function step(now) {
            const p = Math.min((now - t0) / ms, 1);
            window.scrollTo(0, from + dist * easeOutQuart(p));
            if (p < 1) requestAnimationFrame(step);
        })(performance.now());
    }

    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (!href || href === '#') return;
            const el = document.querySelector(href);
            if (!el) return;
            e.preventDefault();
            smoothScrollTo(el.offsetTop);
        });
    });

    document.querySelectorAll('.cta-buttons .btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const id = btn.textContent.trim().includes('WORK') ? '#projects' : '#contact';
            const el = document.querySelector(id);
            if (el) smoothScrollTo(el.offsetTop);
        });
    });

    // ── Contact form ───────────────────────────────────────────────────────
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();
            const n = form.querySelector('input[type="text"]')?.value.trim();
            const m = form.querySelector('input[type="email"]')?.value.trim();
            const g = form.querySelector('textarea')?.value.trim();
            if (!n || !m || !g) { alert('Please fill out all fields'); return; }
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(m)) { alert('Please enter a valid email'); return; }
            alert('Thank you! I will get back to you soon.');
            form.reset();
        });
    }

    console.log('Portfolio loaded.');
});
