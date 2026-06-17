// Shared utility functions and auth guards

window.Omnitick = window.Omnitick || {};

// Toast System
Omnitick.showToast = function(message, type = 'info') {
    let container = document.querySelector('.toast-container');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    let iconClass = 'fas fa-info-circle';
    if (type === 'success') iconClass = 'fas fa-check-circle';
    if (type === 'error') iconClass = 'fas fa-exclamation-circle';

    toast.innerHTML = `<i class="${iconClass}"></i> <span>${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('hiding');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
};

// Loading System
Omnitick.showLoading = function() {
    let overlay = document.getElementById('loadingOverlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.id = 'loadingOverlay';
        overlay.className = 'loading-overlay';
        overlay.innerHTML = '<div class="spinner"></div>';
        document.body.appendChild(overlay);
    }
    overlay.classList.remove('hidden');
};

Omnitick.hideLoading = function() {
    const overlay = document.getElementById('loadingOverlay');
    if (overlay) {
        overlay.classList.add('hidden');
    }
};

// Logout Function
Omnitick.logout = function() {
    Omnitick.showLoading();
    firebase.auth().signOut().then(() => {
        window.location.href = 'login.html';
    }).catch(error => {
        Omnitick.hideLoading();
        Omnitick.showToast('Logout failed: ' + error.message, 'error');
    });
};

// Formatting utilities
Omnitick.formatDate = function(firebaseDate) {
    if (!firebaseDate) return 'Unknown';
    const date = firebaseDate.toDate();
    return new Intl.DateTimeFormat('en-US', {
        month: 'short', day: 'numeric', year: 'numeric'
    }).format(date);
};
