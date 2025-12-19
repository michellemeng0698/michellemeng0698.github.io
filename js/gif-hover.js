document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.box-masonry-image').forEach(function(link) {
        var hoverImg = link.querySelector('img:last-child');
        
        if (hoverImg && hoverImg.src.match(/\.gif$/i)) {
            var originalSrc = hoverImg.src.split('?')[0];
            var isHovering = false;
            var lastTimestamp = null;
            
            link.addEventListener('mouseenter', function() {
                isHovering = true;
                var timestamp = new Date().getTime();
                lastTimestamp = timestamp;
                
                // Force complete cache bypass with multiple unique parameters
                var uniqueUrl = originalSrc + '?t=' + timestamp + '&r=' + Math.random();
                
                // Preload with unique URL
                var tempImg = new Image();
                tempImg.onload = function() {
                    // Only swap if still hovering and this is the most recent load
                    if (isHovering && lastTimestamp === timestamp) {
                        // Use requestAnimationFrame for smoother visual update
                        requestAnimationFrame(function() {
                            hoverImg.src = tempImg.src;
                        });
                    }
                };
                
                // Force immediate load without cache
                tempImg.src = uniqueUrl;
            });
            
            link.addEventListener('mouseleave', function() {
                isHovering = false;
            });
        }
    });
});