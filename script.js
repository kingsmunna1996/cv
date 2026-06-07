document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Theme Switching Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // Load initial theme preference
    const savedTheme = localStorage.getItem('theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);

    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Re-initialize icons just in case icons need state refresh
        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    });

    // 3. Mobile Navigation Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileToggle && navLinksContainer) {
        mobileToggle.addEventListener('click', () => {
            const isVisible = navLinksContainer.style.display === 'flex';
            if (isVisible) {
                navLinksContainer.style.display = 'none';
                mobileToggle.innerHTML = '<i data-lucide="menu"></i>';
            } else {
                navLinksContainer.style.display = 'flex';
                navLinksContainer.style.flexDirection = 'column';
                navLinksContainer.style.position = 'absolute';
                navLinksContainer.style.top = 'var(--navbar-height)';
                navLinksContainer.style.left = '0';
                navLinksContainer.style.right = '0';
                navLinksContainer.style.background = 'var(--bg-secondary)';
                navLinksContainer.style.padding = '1.5rem';
                navLinksContainer.style.borderBottom = '1px solid var(--card-border)';
                navLinksContainer.style.gap = '1.5rem';
                mobileToggle.innerHTML = '<i data-lucide="x"></i>';
            }
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }
        });
    }

    // 4. Download & Print CV Button Triggers
    const downloadBtn = document.getElementById('download-btn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', () => {
            triggerPrint();
        });
    }

    // 5. Active Link Highlighting on Scroll
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let currentSectionId = '';
        const scrollPosition = window.scrollY + 100; // offset for navbar height

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });
});

// Global Print Handler Function
function triggerPrint() {
    // Save current document title
    const originalTitle = document.title;
    
    // Set a custom title for the printed document so it defaults to "H_Mohammed_Resume" when saving as PDF
    document.title = 'H_Mohammed_Resume';
    
    // Open system print dialog
    window.print();
    
    // Restore original title
    setTimeout(() => {
        document.title = originalTitle;
    }, 100);
}
