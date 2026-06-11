document.addEventListener('DOMContentLoaded', () => {
    // 1. Scroll Animation Handler (Fade in elements as they scroll)
    const elementsToReveal = [
        ...document.querySelectorAll('.section-info'),
        ...document.querySelectorAll('.specs-card'),
        ...document.querySelectorAll('.section-header'),
        ...document.querySelectorAll('.calibration-graphic'),
        ...document.querySelectorAll('.calibration-container'),
        ...document.querySelectorAll('.pricing-card'),
        ...document.querySelectorAll('.stats-controls'),
        ...document.querySelectorAll('.table-container')
    ];

    // Add reveal class to these elements
    elementsToReveal.forEach(el => el.classList.add('reveal'));

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                obs.unobserve(entry.target); // Trigger only once
            }
        });
    }, observerOptions);

    elementsToReveal.forEach(el => observer.observe(el));

    // 2. Mock Live Telemetry Log Simulation
    const terminal = document.getElementById('terminal-output');
    const terminalLines = [
        { text: 'connecting to league of legends telemetry stream...', type: 'comment' },
        { text: 'session established (endpoint: riot_api_prod_04)', type: 'normal' },
        { text: 'listening for game state frames...', type: 'normal' },
        { text: '---------------------------------------------------', type: 'comment' },
        { text: 'frame_id: 1040   game_time: 12:40', type: 'metric' },
        { text: '  - analyzing player 2D coordinate positions...', type: 'comment' },
        { text: '  - calculating team gold differentials and item scaling...', type: 'comment' },
        { text: '  - monitoring active map objectives (dragons: 1, towers: 2)...', type: 'comment' },
        { text: 'evaluating game state through neural network...', type: 'normal' },
        { text: 'prediction result: Blue win probability = 58.4%', type: 'success' },
        { text: '---------------------------------------------------', type: 'comment' },
        { text: 'frame_id: 1240   game_time: 15:20', type: 'metric' },
        { text: '  - spatial pressure shift detected in bottom lane jungle...', type: 'comment' },
        { text: '  - gold advantage velocity: +140g/min blue side', type: 'comment' },
        { text: 'evaluating game state through neural network...', type: 'normal' },
        { text: 'prediction result: Blue win probability = 64.1%', type: 'success' },
        { text: '---------------------------------------------------', type: 'comment' },
        { text: 'frame_id: 1540   game_time: 19:10', type: 'metric' },
        { text: '  - objective event: red side secures baron nashor (+1)', type: 'comment' },
        { text: '  - spatial clustering: team fight at baron pit', type: 'comment' },
        { text: 'evaluating game state through neural network...', type: 'normal' },
        { text: 'prediction result: Blue win probability = 42.7%', type: 'success' },
        { text: '---------------------------------------------------', type: 'comment' },
        { text: 'frame_id: 1840   game_time: 23:05', type: 'metric' },
        { text: '  - gold advantage velocity: +480g/min red side', type: 'comment' },
        { text: '  - structural update: inhibitors destroyed: 1 red, 0 blue', type: 'comment' },
        { text: 'evaluating game state through neural network...', type: 'normal' },
        { text: 'prediction result: Blue win probability = 14.8%', type: 'success' },
        { text: '---------------------------------------------------', type: 'comment' },
        { text: 'session completed | model calibration: 98.8% reliable', type: 'success' }
    ];

    let lineIndex = 0;

    function appendTerminalLine() {
        if (lineIndex < terminalLines.length) {
            const lineData = terminalLines[lineIndex];
            const div = document.createElement('div');
            div.className = 'terminal-line';

            if (lineData.type === 'comment') {
                div.innerHTML = `<span class="t-comment">${lineData.text}</span>`;
            } else if (lineData.type === 'success') {
                let txt = lineData.text.replace('prediction result:', '<span class="t-key-success">prediction result:</span>')
                                       .replace('session completed', '<span class="t-key-success">session completed</span>');
                txt = txt.replace(/(\d+(?:\.\d+)?%)/g, '<span class="t-num-success">$1</span>');
                div.innerHTML = `<span class="t-success">✔ ${txt}</span>`;
            } else if (lineData.type === 'metric') {
                let txt = lineData.text.replace('frame_id:', '<span class="t-key">frame_id:</span>')
                                       .replace('game_time:', '<span class="t-key">game_time:</span>');
                txt = txt.replace(/(\b\d+)/g, '<span class="t-num">$1</span>');
                div.innerHTML = `<span class="t-metric">${txt}</span>`;
            } else {
                let txt = lineData.text;
                if (txt.includes('connecting')) {
                    txt = txt.replace('connecting', '<span class="t-action">connecting</span>');
                } else if (txt.includes('evaluating')) {
                    txt = txt.replace('evaluating', '<span class="t-action">evaluating</span>');
                } else if (txt.includes('session established')) {
                    txt = txt.replace('session established', '<span class="t-success-light">session established</span>');
                } else if (txt.includes('listening')) {
                    txt = txt.replace('listening', '<span class="t-action">listening</span>');
                }
                div.innerHTML = `<span>${txt}</span>`;
            }

            terminal.appendChild(div);
            terminal.scrollTop = terminal.scrollHeight; // Autoscroll
            lineIndex++;

            // Dynamic timing for rendering lines to feel realistic
            let delay = 350;
            if (lineData.text.startsWith('  -')) {
                delay = 120;
            } else if (lineData.text.includes('connecting') || lineData.text.includes('evaluating')) {
                delay = 800;
            }

            setTimeout(appendTerminalLine, delay);
        }
    }

    // Start terminal animation after a brief initial pause if terminal exists
    if (terminal) {
        setTimeout(appendTerminalLine, 1000);
    }

    // 3. Native Legal Modals Controls
    const modalTerms = document.getElementById('modal-terms');
    const modalPrivacy = document.getElementById('modal-privacy');

    const openTermsBtn = document.getElementById('open-terms');
    const openPrivacyBtn = document.getElementById('open-privacy');

    if (openTermsBtn && modalTerms) {
        openTermsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modalTerms.showModal();
        });
        
        const closeBtn = modalTerms.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => modalTerms.close());
        }
        
        // Close on clicking backdrop
        modalTerms.addEventListener('click', (e) => {
            const rect = modalTerms.getBoundingClientRect();
            const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height
              && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
            if (!isInDialog) {
                modalTerms.close();
            }
        });
    }

    if (openPrivacyBtn && modalPrivacy) {
        openPrivacyBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modalPrivacy.showModal();
        });
        
        const closeBtn = modalPrivacy.querySelector('.close-modal');
        if (closeBtn) {
            closeBtn.addEventListener('click', () => modalPrivacy.close());
        }
        
        // Close on clicking backdrop
        modalPrivacy.addEventListener('click', (e) => {
            const rect = modalPrivacy.getBoundingClientRect();
            const isInDialog = (rect.top <= e.clientY && e.clientY <= rect.top + rect.height
              && rect.left <= e.clientX && e.clientX <= rect.left + rect.width);
            if (!isInDialog) {
                modalPrivacy.close();
            }
        });
    }

    // 4. Interactive Champion Table Filtering (Search & Role selection)
    const searchInput = document.getElementById('champion-search');
    const roleButtons = document.querySelectorAll('.role-btn');
    const tableRows = document.querySelectorAll('#champion-table tbody tr');

    let activeRole = 'all';
    let searchQuery = '';

    function filterTable() {
        let visibleCount = 0;
        tableRows.forEach(row => {
            const champCol = row.querySelector('.champ-col');
            const rowRole = row.getAttribute('data-role');
            
            if (champCol) {
                const name = champCol.textContent.toLowerCase();
                const matchesSearch = name.includes(searchQuery);
                const matchesRole = (activeRole === 'all') || (rowRole === activeRole);
                
                if (matchesSearch && matchesRole) {
                    row.style.display = '';
                    visibleCount++;
                    const rankCol = row.querySelector('.rank-col');
                    if (rankCol) {
                        rankCol.textContent = visibleCount;
                    }
                } else {
                    row.style.display = 'none';
                }
            }
        });
    }

    if (searchInput && tableRows.length > 0) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            filterTable();
        });
    }

    if (roleButtons.length > 0 && tableRows.length > 0) {
        roleButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                // Toggle active button class
                roleButtons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                activeRole = btn.getAttribute('data-role');
                filterTable();
            });
        });
    }

    // Initialize table ranking on page load
    filterTable();

    // 5. Dynamic Stats Win Rate Coloring
    const winRateCells = document.querySelectorAll('#champion-table tbody td:nth-child(4)');
    winRateCells.forEach(cell => {
        const val = parseFloat(cell.textContent);
        if (!isNaN(val)) {
            cell.classList.remove('val-high', 'val-low', 'val-mid-high', 'val-mid-low');
            if (val >= 51.5) {
                cell.classList.add('val-high');
            } else if (val >= 50.0) {
                cell.classList.add('val-mid-high');
            } else if (val >= 48.5) {
                cell.classList.add('val-mid-low');
            } else {
                cell.classList.add('val-low');
            }
        }
    });
});
