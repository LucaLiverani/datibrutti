// public/assets/js/main.js
window.addEventListener('hashchange', navigate);
window.addEventListener('load', navigate);

function navigate() {
    const hash = window.location.hash || '#home';
    const appDiv = document.getElementById('app');

    appDiv.innerHTML = ''; // Clear the current content

    switch (hash) {
        case '#home':
            appDiv.innerHTML = `<h1>Welcome to the SPA</h1><p>Select an analysis from the menu.</p>`;
            break;
        case '#analysis1':
            loadScript('analysis1.js', () => {
                renderAnalysis1(appDiv);
            });
            break;
        case '#analysis2':
            loadScript('analysis2.js', () => {
                renderAnalysis2(appDiv);
            });
            break;
        default:
            appDiv.innerHTML = `<h1>404 - Page Not Found</h1>`;
    }
}

function loadScript(src, callback) {
    const script = document.createElement('script');
    script.src = `assets/js/${src}`;
    script.onload = callback;
    document.head.appendChild(script);
}
