document.addEventListener('DOMContentLoaded', () => {
    initBootScreen();
    updateClock();
    setInterval(updateClock, 1000);
    setupDragDrop();
});

// Boot Screen Logic
function initBootScreen() {
    const progress = document.querySelector('.progress');
    const bootScreen = document.getElementById('boot-screen');
    const desktop = document.getElementById('desktop');

    // Simulate loading
    setTimeout(() => { progress.style.width = '40%'; }, 500);
    setTimeout(() => { progress.style.width = '80%'; }, 1500);
    setTimeout(() => { progress.style.width = '100%'; }, 2500);

    setTimeout(() => {
        bootScreen.style.opacity = '0';
        setTimeout(() => {
            bootScreen.style.display = 'none';
            desktop.classList.remove('hidden');
            setTimeout(() => { desktop.classList.add('visible'); }, 50);
        }, 500);
    }, 3000);
}

// Clock Logic
function updateClock() {
    const now = new Date();
    const options = { weekday: 'short', month: 'short', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    document.getElementById('clock').textContent = now.toLocaleString('en-US', options).replace(',', '');
}

// Window Management
let zIndexCounter = 100;
const openWindows = {};

function openApp(appId) {
    if (openWindows[appId]) {
        bringToFront(openWindows[appId]);
        restoreWindow(openWindows[appId]);
        return;
    }

    const windowEl = createWindow(appId);
    document.getElementById('windows-container').appendChild(windowEl);
    openWindows[appId] = windowEl;
    bringToFront(windowEl);

    // Animate opening
    windowEl.style.transform = 'scale(0.8)';
    windowEl.style.opacity = '0';
    setTimeout(() => {
        windowEl.style.transform = 'scale(1)';
        windowEl.style.opacity = '1';
    }, 10);
}

function createWindow(appId) {
    const div = document.createElement('div');
    div.className = 'window';
    div.id = `window-${appId}`;
    div.style.left = `${100 + (Object.keys(openWindows).length * 30)}px`;
    div.style.top = `${50 + (Object.keys(openWindows).length * 30)}px`;
    div.style.zIndex = ++zIndexCounter;

    // Set dimensions based on app type
    if (appId === 'resume') {
        div.style.width = '800px';
        div.style.height = '600px';
    } else {
        div.style.width = '600px';
        div.style.height = '400px';
    }

    const title = appId.charAt(0).toUpperCase() + appId.slice(1);

    div.innerHTML = `
        <div class="window-header" onmousedown="startDrag(event, this.parentElement)">
            <div class="window-controls">
                <div class="control close" onclick="closeApp('${appId}')"></div>
                <div class="control minimize" onclick="minimizeApp('${appId}')"></div>
                <div class="control maximize" onclick="maximizeApp('${appId}')"></div>
            </div>
            <div class="window-title">${title}</div>
        </div>
        <div class="window-content">
            ${getAppContent(appId)}
        </div>
    `;

    div.addEventListener('mousedown', () => bringToFront(div));
    return div;
}

function closeApp(appId) {
    const win = openWindows[appId];
    if (win) {
        win.style.opacity = '0';
        win.style.transform = 'scale(0.9)';
        setTimeout(() => {
            win.remove();
            delete openWindows[appId];
        }, 200);
    }
}

function minimizeApp(appId) {
    const win = openWindows[appId];
    if (win) {
        win.style.transform = 'scale(0) translateY(500px)';
        win.style.opacity = '0';
        win.dataset.minimized = 'true';
    }
}

function restoreWindow(win) {
    if (win.dataset.minimized === 'true') {
        win.style.transform = 'scale(1) translateY(0)';
        win.style.opacity = '1';
        win.dataset.minimized = 'false';
    }
}

function maximizeApp(appId) {
    const win = openWindows[appId];
    if (win) {
        if (win.classList.contains('maximized')) {
            win.style.width = win.dataset.prevWidth;
            win.style.height = win.dataset.prevHeight;
            win.style.top = win.dataset.prevTop;
            win.style.left = win.dataset.prevLeft;
            win.classList.remove('maximized');
        } else {
            win.dataset.prevWidth = win.style.width;
            win.dataset.prevHeight = win.style.height;
            win.dataset.prevTop = win.style.top;
            win.dataset.prevLeft = win.style.left;

            win.style.width = '100%';
            win.style.height = 'calc(100% - 110px)'; // Minus menu bar and dock area
            win.style.top = '30px';
            win.style.left = '0';
            win.classList.add('maximized');
        }
    }
}

function bringToFront(win) {
    win.style.zIndex = ++zIndexCounter;
}

// Dragging Logic
let isDragging = false;
let currentWindow = null;
let dragOffsetX = 0;
let dragOffsetY = 0;

function startDrag(e, win) {
    if (e.target.closest('.window-controls')) return; // Don't drag if clicking controls
    if (win.classList.contains('maximized')) return;

    isDragging = true;
    currentWindow = win;
    dragOffsetX = e.clientX - win.offsetLeft;
    dragOffsetY = e.clientY - win.offsetTop;
    bringToFront(win);
}

function setupDragDrop() {
    document.addEventListener('mousemove', (e) => {
        if (isDragging && currentWindow) {
            e.preventDefault();
            currentWindow.style.left = `${e.clientX - dragOffsetX}px`;
            currentWindow.style.top = `${e.clientY - dragOffsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
        currentWindow = null;
    });
}

// Content Generation
function getAppContent(appId) {
    switch (appId) {
        case 'about':
            return `
                <div style="text-align: center; padding: 20px;">
                    <i class="fas fa-user-circle" style="font-size: 64px; color: #ccc; margin-bottom: 20px;"></i>
                    <h2>${resumeData.about.name}</h2>
                    <p style="color: #aaa;">${resumeData.about.title}</p>
                    <p>${resumeData.about.summary}</p>
                    <hr style="border-color: #444; margin: 20px 0;">
                    <h3>Education</h3>
                    ${resumeData.education.map(edu => `
                        <div style="margin-bottom: 15px; text-align: left;">
                            <strong>${edu.institution}</strong>
                            <div style="color: #aaa; font-size: 0.9em;">${edu.degree}</div>
                            <div style="color: #888; font-size: 0.8em;">${edu.duration} | ${edu.location}</div>
                            ${edu.details ? `<div style="font-size: 0.8em;">${edu.details}</div>` : ''}
                        </div>
                    `).join('')}
                </div>
            `;
        case 'resume':
            return `
                <div style="padding: 20px; max-width: 800px; margin: 0 auto;">
                    <h1>${resumeData.about.name}</h1>
                    <p>${resumeData.about.email} | ${resumeData.about.phone} | ${resumeData.about.location}</p>
                    
                    <h2>Experience</h2>
                    ${resumeData.experience.map(exp => `
                        <div style="margin-bottom: 20px;">
                            <h3>${exp.role} <span style="font-weight: normal; font-size: 0.9em;">at ${exp.company}</span></h3>
                            <div style="color: #aaa; margin-bottom: 5px;">${exp.duration} | ${exp.location}</div>
                            <ul style="padding-left: 20px;">
                                ${exp.points.map(point => `<li>${point}</li>`).join('')}
                            </ul>
                        </div>
                    `).join('')}

                    <h2>Skills</h2>
                    <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px;">
                        ${Object.entries(resumeData.skills).map(([category, skills]) => `
                            <div>
                                <strong style="color: #007aff;">${category}</strong>
                                <div style="font-size: 0.9em; margin-top: 5px;">${skills.join(', ')}</div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        case 'projects':
            return `
                <div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 20px; padding: 10px;">
                    ${resumeData.projects.map(proj => `
                        <div style="background: rgba(255,255,255,0.05); padding: 15px; border-radius: 8px;">
                            <h3 style="margin-top: 0; font-size: 1.1em;">${proj.title}</h3>
                            <p style="font-size: 0.9em; color: #ccc;">${proj.description}</p>
                            <div style="margin-top: 10px;">
                                ${proj.tags.map(tag => `
                                    <span style="display: inline-block; background: #007aff; color: white; padding: 2px 8px; border-radius: 10px; font-size: 0.7em; margin-right: 5px; margin-bottom: 5px;">${tag}</span>
                                `).join('')}
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        case 'contact':
            return `
                <div style="text-align: center; padding: 40px;">
                    <h2>Get in Touch</h2>
                    <p>Feel free to reach out for collaborations or opportunities.</p>
                    
                    <div style="margin-top: 30px; display: flex; flex-direction: column; gap: 15px; align-items: center;">
                        <a href="mailto:${resumeData.about.email}" style="color: #fff; text-decoration: none; display: flex; align-items: center; gap: 10px; padding: 10px 20px; background: rgba(255,255,255,0.1); border-radius: 8px; width: 300px;">
                            <i class="fas fa-envelope"></i> ${resumeData.about.email}
                        </a>
                        <a href="tel:${resumeData.about.phone}" style="color: #fff; text-decoration: none; display: flex; align-items: center; gap: 10px; padding: 10px 20px; background: rgba(255,255,255,0.1); border-radius: 8px; width: 300px;">
                            <i class="fas fa-phone"></i> ${resumeData.about.phone}
                        </a>
                        <a href="${resumeData.social.linkedin}" target="_blank" style="color: #fff; text-decoration: none; display: flex; align-items: center; gap: 10px; padding: 10px 20px; background: #0077b5; border-radius: 8px; width: 300px;">
                            <i class="fab fa-linkedin"></i> LinkedIn
                        </a>
                        <a href="${resumeData.social.github}" target="_blank" style="color: #fff; text-decoration: none; display: flex; align-items: center; gap: 10px; padding: 10px 20px; background: #333; border-radius: 8px; width: 300px;">
                            <i class="fab fa-github"></i> GitHub
                        </a>
                    </div>
                </div>
            `;
        case 'terminal':
            return `
                <div style="font-family: monospace; padding: 10px;">
                    <div style="color: #27c93f;">➜  ~  whoami</div>
                    <div style="margin-bottom: 10px;">${resumeData.about.name}</div>
                    
                    <div style="color: #27c93f;">➜  ~  cat about.txt</div>
                    <div style="margin-bottom: 10px;">${resumeData.about.summary}</div>
                    
                    <div style="color: #27c93f;">➜  ~  ls projects/</div>
                    <div style="margin-bottom: 10px;">
                        ${resumeData.projects.map(p => p.title.split(':')[0].trim().replace(/\s+/g, '_').toLowerCase()).join('  ')}
                    </div>
                    
                    <div style="color: #27c93f;">➜  ~  <span class="cursor">_</span></div>
                </div>
                <style>
                    .cursor { animation: blink 1s step-end infinite; }
                    @keyframes blink { 50% { opacity: 0; } }
                </style>
            `;
        default:
            return '<div style="padding: 20px;">App content not found</div>';
    }
}
