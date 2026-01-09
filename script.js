// script.js - SIMPLE FIX
document.addEventListener('DOMContentLoaded', function() {
    console.log('Fixed version loaded');
    
    // Mobile menu
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Click handlers
    document.querySelectorAll('.project-card-container[data-link]').forEach(container => {
        const link = container.getAttribute('data-link');
        const isVideo = container.classList.contains('video-card-container');
        const videoCard = container.querySelector('.video-card');
        const videoSrc = videoCard ? videoCard.getAttribute('data-video') : null;
        
        if (isVideo && videoSrc) {
            // Play button
            const playBtn = container.querySelector('.play-overlay');
            if (playBtn) {
                playBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    e.stopPropagation();
                    
                    // Create modal
                    const modal = document.createElement('div');
                    modal.className = 'video-modal active';
                    modal.innerHTML = `
                        <div class="modal-content">
                            <video controls>
                                <source src="${videoSrc}" type="video/mp4">
                            </video>
                            <button class="close-modal">&times;</button>
                        </div>
                    `;
                    document.body.appendChild(modal);
                    
                    // Close
                    modal.querySelector('.close-modal').addEventListener('click', () => modal.remove());
                    modal.addEventListener('click', (e) => {
                        if (e.target === modal) modal.remove();
                    });
                });
            }
            
            // Card click (opens link)
            container.addEventListener('click', function(e) {
                if (!e.target.closest('.play-overlay')) {
                    e.preventDefault();
                    window.open(link, '_blank');
                }
            });
        } else {
            // Regular card click
            container.addEventListener('click', function(e) {
                e.preventDefault();
                window.open(link, '_blank');
            });
        }
    });
});