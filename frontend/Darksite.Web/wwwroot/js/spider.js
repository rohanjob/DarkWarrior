/**
 * DARKSITE - Spider Animation
 * Creates random black spider drops every 2 seconds
 * Study Purpose Only
 */

(function() {
    'use strict';

    let spiderInterval;

    function createSpider() {
        const spider = document.createElement('div');
        spider.className = 'spider';
        
        // Random horizontal position
        const randomX = Math.random() * window.innerWidth;
        spider.style.left = randomX + 'px';
        
        // Randomize animation duration for variation
        const duration = 2 + Math.random() * 2; // 2-4 seconds
        spider.style.animationDuration = duration + 's';
        
        document.body.appendChild(spider);
        
        // Remove spider after animation completes
        setTimeout(() => {
            if (spider.parentNode) {
                spider.remove();
            }
        }, duration * 1000);
    }

    function startSpiderAnimation() {
        // Create spider every 2 seconds
        spiderInterval = setInterval(() => {
            createSpider();
        }, 2000);
        
        // Create first spider immediately
        createSpider();
    }

    function stopSpiderAnimation() {
        if (spiderInterval) {
            clearInterval(spiderInterval);
        }
    }

    // Start animation when page loads
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startSpiderAnimation);
    } else {
        startSpiderAnimation();
    }

    // Cleanup on page unload
    window.addEventListener('beforeunload', stopSpiderAnimation);

    // Export for external control if needed
    window.DarksiteSpiders = {
        start: startSpiderAnimation,
        stop: stopSpiderAnimation,
        createOne: createSpider
    };
})();
