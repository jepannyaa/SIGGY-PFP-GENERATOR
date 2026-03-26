/**
 * Siggy PFP Generator - Main Application
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize generator
    const generator = new SiggyPFPGenerator('pfpCanvas');

    // Color presets
    const baseColorPresets = [
        '#FFD700', '#FF6B6B', '#4ECDC4', '#45B7D1', 
        '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8',
        '#F7DC6F', '#BB8FCE', '#85C1E9', '#F8B500'
    ];

    Utils.createColorPresets(baseColorPresets, 'baseColorPresets', (color) => {
        document.getElementById('baseColor').value = color;
        generator.updateConfig({ baseColor: color });
    });

    // Event Listeners
    const setupListener = (id, configKey, isColor = false) => {
        const element = document.getElementById(id);
        if (!element) return;

        element.addEventListener('input', Utils.debounce((e) => {
            generator.updateConfig({ [configKey]: e.target.value });
        }, 100));
    };

    setupListener('baseColor', 'baseColor', true);
    setupListener('outfit', 'outfit');
    setupListener('background', 'background');
    setupListener('bgColor', 'bgColor', true);
    setupListener('logo', 'logo');
    setupListener('logoText', 'logoText');
    setupListener('accessories', 'accessories');
    setupListener('eyes', 'eyes');
    setupListener('eyeColor', 'eyeColor', true);
    setupListener('nose', 'nose');

    // Checkbox listeners
    ['showShadow', 'showOutline', 'mirrorMode'].forEach(id => {
        const checkbox = document.getElementById(id);
        if (checkbox) {
            checkbox.addEventListener('change', (e) => {
                generator.updateConfig({ [id]: e.target.checked });
            });
        }
    });

    // Button listeners
    document.getElementById('randomizeBtn')?.addEventListener('click', () => {
        generator.randomize();
    });

    document.getElementById('downloadBtn')?.addEventListener('click', () => {
        generator.download();
    });

    document.getElementById('resetBtn')?.addEventListener('click', () => {
        generator.reset();
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key.toLowerCase()) {
                case 'r':
                    e.preventDefault();
                    generator.randomize();
                    break;
                case 's':
                    e.preventDefault();
                    generator.download();
                    break;
                case 'd':
                    e.preventDefault();
                    generator.reset();
                    break;
            }
        }
    });

    // Show welcome message
    console.log('%c🎨 Siggy PFP Generator', 'font-size: 20px; color: #6366f1; font-weight: bold;');
    console.log('%cReady to create amazing profile pictures!', 'font-size: 14px; color: #94a3b8;');
    console.log('%cShortcuts: Ctrl+R (Randomize), Ctrl+S (Download), Ctrl+D (Reset)', 'font-size: 12px; color: #64748b;');
});