document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                this.classList.add('active');
                
                const filterValue = this.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    if (filterValue === 'all') {
                        card.style.display = 'block';
                    } else {
                        if (card.getAttribute('data-category') === filterValue) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    const menuIcon = document.querySelector('.menu-icon');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuIcon && navLinks) {
        menuIcon.addEventListener('click', function() {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '70px';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = '#2c3e50';
                navLinks.style.padding = '20px 0';
            }
        });
    }

    function initVideoModal() {
    const videoCards = document.querySelectorAll('.video-card');
    const videoModal = document.getElementById('videoModal');
    const modalVideo = document.getElementById('modalVideo');
    const closeModal = document.getElementById('closeModal');
    
    if (videoCards.length > 0 && videoModal && modalVideo) {
        // Open modal when video card is clicked
        videoCards.forEach(card => {
            card.addEventListener('click', function() {
                const videoSrc = this.getAttribute('data-video');
                modalVideo.src = videoSrc;
                videoModal.classList.add('active');
                modalVideo.play();
            });
        });
        
        // Close modal when X is clicked
        closeModal.addEventListener('click', function() {
            videoModal.classList.remove('active');
            modalVideo.pause();
            modalVideo.src = '';
        });
        
        // Close modal when clicking outside video
        videoModal.addEventListener('click', function(e) {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
                modalVideo.pause();
                modalVideo.src = '';
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                videoModal.classList.remove('active');
                modalVideo.pause();
                modalVideo.src = '';
            }
        });
    }
}

// Call this function when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Your existing filtering code here...
    
    // Initialize video modal
    initVideoModal();
});
});