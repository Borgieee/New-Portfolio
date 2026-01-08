// script.js - FIXED VERSION
document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded - VIDEO FIX');
    
    // Mobile menu toggle
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', function() {
            navLinks.style.display = navLinks.style.display === 'flex' ? 'none' : 'flex';
        });
    }
    
    // Handle ALL project containers
    const containers = document.querySelectorAll('.project-card-container');
    console.log(`Found ${containers.length} project containers`);
    
    containers.forEach((container) => {
        const link = container.getAttribute('data-link');
        const isVideo = container.classList.contains('video-card-container');
        const videoCard = container.querySelector('.video-card');
        const videoSrc = videoCard ? videoCard.getAttribute('data-video') : null;
        
        // Handle VIDEO containers
        if (isVideo && videoCard && videoSrc) {
            const playOverlay = videoCard.querySelector('.play-overlay');
            const playIcon = videoCard.querySelector('.play-icon');
            
            console.log(`Video card found: ${videoSrc}`);
            
            // Make play button clickable
            if (playOverlay) {
                // Clean and setup play overlay
                playOverlay.style.cursor = 'pointer';
                
                playOverlay.addEventListener('click', function(e) {
                    console.log('Play overlay clicked!');
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    openVideoModal(videoSrc);
                    return false;
                });
            }
            
            if (playIcon) {
                playIcon.style.cursor = 'pointer';
                
                playIcon.addEventListener('click', function(e) {
                    console.log('Play icon clicked!');
                    e.preventDefault();
                    e.stopPropagation();
                    e.stopImmediatePropagation();
                    openVideoModal(videoSrc);
                    return false;
                });
            }
            
            // If video has a link, make rest of card clickable
            if (link) {
                container.style.cursor = 'pointer';
                
                container.addEventListener('click', function(e) {
                    // Only open link if NOT clicking play elements
                    if (!e.target.closest('.play-overlay') && 
                        !e.target.classList.contains('play-icon') &&
                        !e.target.closest('.play-icon')) {
                        e.preventDefault();
                        console.log('Opening video link:', link);
                        window.open(link, '_blank');
                    }
                });
            }
        }
        // Handle REGULAR containers
        else {
            if (link) {
                container.style.cursor = 'pointer';
                
                container.addEventListener('click', function(e) {
                    e.preventDefault();
                    window.open(link, '_blank');
                });
            }
        }
    });
    
    // SIMPLE VIDEO MODAL FUNCTION
    function openVideoModal(videoSrc) {
        console.log('Opening video modal for:', videoSrc);
        
        // Remove any existing modal first
        const existingModal = document.getElementById('videoModal');
        if (existingModal) {
            existingModal.remove();
        }
        
        // Create modal HTML
        const modalHTML = `
        <div id="videoModal" class="video-modal active" style="
            display: flex !important;
            position: fixed !important;
            top: 0 !important;
            left: 0 !important;
            width: 100% !important;
            height: 100% !important;
            background: rgba(0, 0, 0, 0.95) !important;
            z-index: 9999 !important;
            align-items: center !important;
            justify-content: center !important;
        ">
            <div class="modal-content" style="
                position: relative !important;
                background: #000 !important;
                padding: 0 !important;
                border-radius: 10px !important;
                overflow: hidden !important;
                box-shadow: 0 0 50px rgba(0,0,0,0.8) !important;
                max-width: 90vw !important;
                max-height: 90vh !important;
            ">
                <video controls autoplay style="
                    width: 800px !important;
                    max-width: 90vw !important;
                    height: auto !important;
                    display: block !important;
                    background: #000 !important;
                ">
                    <source src="${videoSrc}" type="video/mp4">
                    Your browser does not support the video tag.
                </video>
                <button class="close-modal" style="
                    position: absolute !important;
                    top: -45px !important;
                    right: 0 !important;
                    color: white !important;
                    font-size: 40px !important;
                    cursor: pointer !important;
                    background: rgba(0,0,0,0.7) !important;
                    border: none !important;
                    border-radius: 50% !important;
                    width: 50px !important;
                    height: 50px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    z-index: 10001 !important;
                ">&times;</button>
            </div>
        </div>`;
        
        // Add modal to page
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        
        // Get modal elements
        const modal = document.getElementById('videoModal');
        const video = modal.querySelector('video');
        const closeBtn = modal.querySelector('.close-modal');
        
        // Close button functionality
        closeBtn.addEventListener('click', function() {
            modal.remove();
        });
        
        // Close when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
        
        // Close with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && document.getElementById('videoModal')) {
                document.getElementById('videoModal').remove();
            }
        });
        
        // Handle video errors
        video.addEventListener('error', function() {
            console.error('Video error:', video.error);
            alert('Cannot load video. Please check if the file exists: ' + videoSrc);
        });
        
        // Try to play video
        const playPromise = video.play();
        if (playPromise !== undefined) {
            playPromise.catch(error => {
                console.log('Auto-play prevented, waiting for user interaction');
                // Video will play when user clicks play button
            });
        }
        
        console.log('Video modal should be visible now!');
    }
    
    console.log('JavaScript loaded successfully');
});