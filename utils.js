/**
 * Siggy PFP Generator - Utility Functions
 */

const Utils = {
    /**
     * Load image from URL
     * @param {string} src - Image source URL
     * @returns {Promise<HTMLImageElement>}
     */
    loadImage(src) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = 'anonymous';
            img.onload = () => resolve(img);
            img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
            img.src = src;
        });
    },

    /**
     * Draw image on canvas with positioning
     * @param {CanvasRenderingContext2D} ctx - Canvas context
     * @param {HTMLImageElement} img - Image to draw
     * @param {Object} options - Position and size options
     */
    drawImage(ctx, img, options = {}) {
        const {
            x = 0,
            y = 0,
            width = img.width,
            height = img.height,
            opacity = 1,
            mirror = false
        } = options;

        ctx.save();
        ctx.globalAlpha = opacity;

        if (mirror) {
            ctx.translate(x + width, y);
            ctx.scale(-1, 1);
            ctx.drawImage(img, 0, 0, width, height);
        } else {
            ctx.drawImage(img, x, y, width, height);
        }

        ctx.restore();
    },

    /**
     * Generate random color
     * @returns {string} Hex color code
     */
    randomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    },

    /**
     * Generate random integer
     * @param {number} min - Minimum value
     * @param {number} max - Maximum value
     * @returns {number}
     */
    randomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    /**
     * Download canvas as image
     * @param {HTMLCanvasElement} canvas - Canvas element
     * @param {string} filename - Download filename
     */
    downloadCanvas(canvas, filename = 'siggy-pfp.png') {
        const link = document.createElement('a');
        link.download = filename;
        link.href = canvas.toDataURL('image/png');
        link.click();
    },

    /**
     * Debounce function
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in ms
     * @returns {Function}
     */
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    /**
     * Create color presets
     * @param {string[]} colors - Array of color hex codes
     * @param {string} containerId - Container element ID
     * @param {Function} onSelect - Callback when color selected
     */
    createColorPresets(colors, containerId, onSelect) {
        const container = document.getElementById(containerId);
        if (!container) return;

        container.innerHTML = '';
        colors.forEach(color => {
            const preset = document.createElement('div');
            preset.className = 'color-preset';
            preset.style.backgroundColor = color;
            preset.title = color;
            preset.addEventListener('click', () => {
                document.querySelectorAll('.color-preset').forEach(p => p.classList.remove('active'));
                preset.classList.add('active');
                onSelect(color);
            });
            container.appendChild(preset);
        });
    },

    /**
     * Get asset path
     * @param {string} type - Asset type (base, outfit, etc.)
     * @param {string} name - Asset name
     * @returns {string}
     */
    getAssetPath(type, name) {
        if (name === 'none') return null;
        return `assets/images/${type}s/${name}.png`;
    },

    /**
     * Show notification
     * @param {string} message - Notification message
     * @param {string} type - Notification type (success, error, info)
     */
    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 2rem;
            background: ${type === 'success' ? '#22c55e' : type === 'error' ? '#ef4444' : '#6366f1'};
            color: white;
            border-radius: 8px;
            z-index: 1000;
            animation: fadeIn 0.3s ease;
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = Utils;
}