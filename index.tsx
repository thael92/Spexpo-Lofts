import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

let deferredPrompt: Event | null = null;

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  // Show the custom install prompt banner
  const installBanner = document.createElement('div');
  installBanner.id = 'install-banner';
  installBanner.className = 'fixed bottom-4 left-1/2 -translate-x-1/2 bg-red-600 text-white p-4 rounded-lg shadow-lg flex items-center justify-between z-50';
  installBanner.innerHTML = `
    <p class="mr-4">Instale Spexpo Lofts para uma experiência completa!</p>
    <button id="install-button" class="flex items-center bg-white text-red-600 px-4 py-2 rounded-md font-bold">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" class="w-5 h-5 mr-2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
      </svg>
      Instalar
    </button>
  `;
  document.body.appendChild(installBanner);

  document.getElementById('install-button')?.addEventListener('click', () => {
    installBanner.style.display = 'none';
    if (deferredPrompt) {
      (deferredPrompt as any).prompt();
      (deferredPrompt as any).userChoice.then((choiceResult: any) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
    }
  });
});

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);