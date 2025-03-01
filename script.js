document.addEventListener('DOMContentLoaded', function() {
    // Theme initialization
    const themeToggle = document.querySelector('.theme-toggle');
    const mobileThemeToggle = document.querySelector('.mobile-theme-toggle');
    const moonIcon = document.querySelector('.moon-icon');
    const sunIcon = document.querySelector('.sun-icon');
    const mobileMoonIcon = document.querySelector('.mobile-moon-icon');
    const mobileSunIcon = document.querySelector('.mobile-sun-icon');
    const navLogo = document.querySelector('.nav-logo');
    const heroLogo = document.querySelector('.hero-logo');
    const menuIcon = document.querySelector('.mobile-menu-button svg');
    
    // Check for saved theme preference or prefer-color-scheme
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    // Function to update logos based on theme
    function updateLogos(theme) {
        if (theme === 'dark') {
            if (navLogo) navLogo.src = 'photos/JR_logo_white.png';
            if (heroLogo) heroLogo.src = 'photos/JR_logo_white.png';
        } else {
            if (navLogo) navLogo.src = 'photos/JR_logo.png';
            if (heroLogo) heroLogo.src = 'photos/JR_logo.png';
        }
    }
    
    // Function to update theme toggle icons
    function updateThemeToggleIcons(isDark) {
        // Update main toggle icons
        if (moonIcon && sunIcon) {
            moonIcon.style.display = isDark ? 'none' : 'block';
            sunIcon.style.display = isDark ? 'block' : 'none';
        }
        
        // Update mobile toggle icons
        if (mobileMoonIcon && mobileSunIcon) {
            mobileMoonIcon.style.display = isDark ? 'none' : 'block';
            mobileSunIcon.style.display = isDark ? 'block' : 'none';
        }
    }
    
    // Function to toggle theme
    function toggleTheme() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        // Toggle theme
        document.documentElement.setAttribute('data-theme', newTheme);
        document.documentElement.style.colorScheme = newTheme;
        localStorage.setItem('theme', newTheme);
        
        // Update icons
        updateThemeToggleIcons(newTheme === 'dark');
        
        // Update logos
        updateLogos(newTheme);
        
        // Subtle animation for theme change
        document.body.style.transition = 'background-color 0.5s ease, color 0.5s ease';
        
        // Update feather icons
        updateFeatherIcons();
    }
    
    // Set initial theme based on saved preference or system preference
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.documentElement.style.colorScheme = 'dark';
        updateThemeToggleIcons(true);
        updateLogos('dark');
    }
    
    // Theme toggle functionality
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }
    
    // Mobile theme toggle functionality
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', toggleTheme);
    }

    // Mobile menu toggle
    const menuButton = document.querySelector('.mobile-menu-button');
    const mobileMenu = document.querySelector('.mobile-menu');

    menuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!menuButton.contains(e.target) && !mobileMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
        }
    });

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // Account for fixed header
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                mobileMenu.classList.remove('active');
            }
        });
    });

    // Scroll animations for content sections
    const contentSections = document.querySelectorAll('.content-section');
    
    // Initial check for sections in viewport on page load
    checkSectionsInView();
    
    // Check for sections in viewport on scroll
    window.addEventListener('scroll', checkSectionsInView);
    
    function checkSectionsInView() {
        contentSections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            // If section is in viewport (with offset to start animation earlier)
            if (sectionTop < windowHeight - 150) {
                section.classList.add('visible');
            }
        });
    }

    // Micro-interactions for work items
    const workItems = document.querySelectorAll('.work-item');
    workItems.forEach(item => {
        // Subtle entrance delay for cards when they come into view
        item.style.opacity = '0';
        item.style.transform = 'translateY(10px)';
        item.style.transition = 'opacity 0.5s ease, transform 0.5s ease, border-color 0.3s ease, box-shadow 0.3s ease';
        
        setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
        }, 100 + Math.random() * 300); // Slight random delay for each card
        
        // Enhanced hover effect
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Form field micro-interactions
    const formFields = document.querySelectorAll('.contact-form input, .contact-form textarea');
    formFields.forEach(field => {
        field.addEventListener('focus', function() {
            this.parentElement.style.position = 'relative';
            
            // Subtle scale effect on focus
            this.style.transform = 'scale(1.01)';
            this.style.transition = 'all 0.2s ease';
        });
        
        field.addEventListener('blur', function() {
            // Return to normal on blur
            this.style.transform = 'scale(1)';
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const submitButton = contactForm.querySelector('.submit-button');
        
        // Button press effect
        if (submitButton) {
            submitButton.addEventListener('mousedown', function() {
                this.style.transform = 'scale(0.98)';
            });
            
            submitButton.addEventListener('mouseup', function() {
                this.style.transform = 'scale(1)';
            });
            
            submitButton.addEventListener('mouseleave', function() {
                this.style.transform = 'scale(1)';
            });
        }
        
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: this.elements.name.value,
                email: this.elements.email.value,
                message: this.elements.message.value
            };
            
            // Log form data (replace with actual form submission)
            console.log('Form submitted:', formData);
            
            // Store the original button styling properties
            const originalButtonStyles = {
                backgroundColor: window.getComputedStyle(submitButton).backgroundColor,
                color: window.getComputedStyle(submitButton).color,
                border: window.getComputedStyle(submitButton).border
            };
            
            // Add subtle success animation
            submitButton.innerHTML = '<span>Message Sent!</span>';
            submitButton.disabled = true;
            
            // Reset after 2 seconds
            setTimeout(() => {
                submitButton.innerHTML = '<span>Send Message</span>';
                submitButton.disabled = false;
                this.reset();
            }, 2000);
        });
    }

    // Ensure feather icons update with theme changes
    function updateFeatherIcons() {
        feather.replace();
    }
    
    // Initial feather icons update
    updateFeatherIcons();

    // Project modal functionality
    const projectModal = document.getElementById('project-modal');
    const modalOverlay = document.querySelector('.modal-overlay');
    const modalCloseButton = document.querySelector('.modal-close-button');
    
    // Project data for modal content
    const projectData = {
        'Libft': {
            title: 'Libft',
            description: 'A fundamental C library implementation recreating essential functions. This project establishes strong programming basics and memory management skills. The library includes functions for string manipulation, memory management, linked list operations, and other utilities that are commonly used in C programming.',
            image: 'photos/Libft_preview.jpeg', // Add project images to your photos folder
            tags: ['C', 'Library', 'Memory Management', '42 Project'],
            github: 'https://github.com/rjaada/Libft_42_Project'
        },
        'Push_Swap': {
            title: 'Push_Swap',
            description: 'An efficient sorting algorithm implementation using two stacks, focusing on optimization and algorithmic thinking. This project required developing a custom sorting algorithm to arrange numbers using a limited set of operations. The challenge was to minimize the number of operations needed to sort the stack.',
            image: 'photos/Push_Swap_preview.jpeg',
            tags: ['C', 'Algorithms', 'Sorting', 'Optimization', '42 Project'],
            github: 'https://github.com/rjaada/Push_Swap_42_Project'
        },
        'Philosophers': {
            title: 'Philosophers',
            description: 'A multi-threading and synchronization project solving the dining philosophers problem, demonstrating concurrent programming skills. This project implements a solution to a classic synchronization problem where multiple processes compete for limited resources without causing deadlocks or race conditions.',
            image: 'photos/Philosophers_preview.jpeg',
            tags: ['C', 'Threading', 'Synchronization', 'Concurrency', '42 Project'],
            github: 'https://github.com/rjaada/Philosophers_42_Project'
        },
        'Minishell': {
            title: 'Minishell',
            description: 'A shell implementation project showcasing system programming and command interpretation capabilities. This project involves creating a simplified version of a bash-like shell that can parse and execute commands, handle environment variables, implement redirections and pipes, and manage processes.',
            image: 'photos/Minishell_preview.jpeg',
            tags: ['C', 'Shell', 'System Programming', 'Process Management', '42 Project'],
            github: 'https://github.com/rjaada/Minishell_42_Project'
        }
    };
    
    // Open modal with project data and smooth animation
    function openProjectModal(projectName) {
        const project = projectData[projectName];
        if (!project) return;
        
        // Prepare modal content before animation
        document.querySelector('.modal-title').textContent = project.title;
        document.querySelector('.modal-text').textContent = project.description;
        
        // Set modal image with loading state
        const modalImage = document.querySelector('.modal-image');
        modalImage.style.opacity = '0';
        if (project.image) {
            modalImage.src = project.image;
            modalImage.style.display = 'block';
            
            // Fade in image once loaded
            modalImage.onload = () => {
                setTimeout(() => {
                    modalImage.style.transition = 'opacity 0.6s ease-out';
                    modalImage.style.opacity = '1';
                }, 100);
            };
        } else {
            modalImage.style.display = 'none';
        }
        
        // Set GitHub link
        const modalLink = document.querySelector('.modal-link');
        modalLink.href = project.github;
        modalLink.target = "_blank";
        modalLink.rel = "noopener noreferrer";
        modalLink.onclick = function(e) {
            e.preventDefault();
            window.open(this.href, '_blank', 'noopener,noreferrer');
            return false;
        }
        
        // Clear and populate tags with staggered animation
        const modalTags = document.querySelector('.modal-tags');
        modalTags.innerHTML = '';
        project.tags.forEach((tag, index) => {
            const tagElement = document.createElement('span');
            tagElement.classList.add('modal-tag');
            tagElement.textContent = tag;
            tagElement.style.opacity = '0';
            tagElement.style.transform = 'translateY(10px)';
            tagElement.style.transition = 'all 0.3s ease-out';
            modalTags.appendChild(tagElement);
            
            // Staggered animation for tags
            setTimeout(() => {
                tagElement.style.opacity = '1';
                tagElement.style.transform = 'translateY(0)';
            }, 300 + (index * 70));
        });
        
        // Update feather icons in the modal
        feather.replace();
        
        // Show modal with Claude-like animation sequence
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        projectModal.style.display = 'flex';
        
        // Staggered animation sequence
        setTimeout(() => {
            projectModal.classList.add('active');
            
            // Animate modal components in sequence
            setTimeout(() => {
                const modalHeader = document.querySelector('.modal-header');
                const modalBody = document.querySelector('.modal-body');
                const modalFooter = document.querySelector('.modal-footer');
                
                if (modalHeader) {
                    modalHeader.style.opacity = '0';
                    modalHeader.style.transform = 'translateY(20px)';
                    modalHeader.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                    setTimeout(() => {
                        modalHeader.style.opacity = '1';
                        modalHeader.style.transform = 'translateY(0)';
                    }, 50);
                }
                
                if (modalBody) {
                    modalBody.style.opacity = '0';
                    modalBody.style.transform = 'translateY(20px)';
                    modalBody.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                    setTimeout(() => {
                        modalBody.style.opacity = '1';
                        modalBody.style.transform = 'translateY(0)';
                    }, 150);
                }
                
                if (modalFooter) {
                    modalFooter.style.opacity = '0';
                    modalFooter.style.transform = 'translateY(20px)';
                    modalFooter.style.transition = 'all 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
                    setTimeout(() => {
                        modalFooter.style.opacity = '1';
                        modalFooter.style.transform = 'translateY(0)';
                    }, 250);
                }
            }, 200);
        }, 10);
    }
    
    // Close modal with smooth exit animation
    function closeProjectModal() {
        const modalContainer = document.querySelector('.modal-container');
        
        // Fade out animation
        modalContainer.style.opacity = '0';
        modalContainer.style.transform = 'translateY(20px) scale(0.97)';
        
        // Remove active class from modal with delay
        setTimeout(() => {
            projectModal.classList.remove('active');
            
            // Hide modal after animation completes
            setTimeout(() => {
                projectModal.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
                
                // Reset transforms for next opening
                modalContainer.style.opacity = '';
                modalContainer.style.transform = '';
            }, 300);
        }, 100);
    }
    
    // Event listeners for modal
    modalOverlay.addEventListener('click', closeProjectModal);
    modalCloseButton.addEventListener('click', closeProjectModal);
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeProjectModal();
        }
    });
    
    // Prevent clicks inside modal from closing it
    document.querySelector('.modal-container').addEventListener('click', function(e) {
        e.stopPropagation();
    });
    
    // Work items click handler with improved touch response
    workItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Visual feedback on click
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
            
            // Get project name from work title
            const projectTitle = this.querySelector('.work-title').textContent;
            
            // Slight delay before opening modal for better UX
            setTimeout(() => {
                openProjectModal(projectTitle);
            }, 200);
        });
    });

    // Project Explorer functionality
    const viewMoreBtn = document.getElementById('view-more-btn');
    const projectExplorer = document.getElementById('project-explorer');
    const explorerOverlay = document.querySelector('.explorer-overlay');
    const explorerCloseButton = document.querySelector('.explorer-close-button');
    const folders = document.querySelectorAll('.folder');

    // Project data for the explorer
    const explorerProjectData = {
        'libft': {
            title: 'Libft',
            description: 'A fundamental C library implementation recreating essential functions. This project establishes strong programming basics and memory management skills. The library includes functions for string manipulation, memory management, linked list operations, and other utilities.',
            tags: ['C', 'Library', 'Memory Management', '42 Project'],
            github: 'https://github.com/rjaada/Libft_42_Project',
            files: [
                { name: 'libft.h', type: 'file' },
                { name: 'ft_memset.c', type: 'file' },
                { name: 'ft_bzero.c', type: 'file' },
                { name: 'ft_memcpy.c', type: 'file' },
                { name: 'ft_strlen.c', type: 'file' },
                { name: 'ft_isalpha.c', type: 'file' },
                { name: 'ft_isdigit.c', type: 'file' },
                { name: 'ft_strncmp.c', type: 'file' }
            ]
        },
        'so_long': {
            title: 'So_Long',
            description: 'A small 2D game built with the MinilibX graphics library. The player must collect all collectibles and reach the exit while avoiding enemies.',
            tags: ['C', 'Game Development', 'Graphics', 'MinilibX', '42 Project'],
            github: 'https://github.com/rjaada/So_Long_42_Project',
            files: [
                { name: 'so_long.c', type: 'file' },
                { name: 'so_long.h', type: 'file' },
                { name: 'map.c', type: 'file' },
                { name: 'init.c', type: 'file' },
                { name: 'key_hook.c', type: 'file' },
                { name: 'move.c', type: 'file' },
                { name: 'win.c', type: 'file' },
                { name: 'put_imgs.c', type: 'file' },
                { name: 'parse_input.c', type: 'file' }
            ]
        },
        'get_next_line': {
            title: 'Get_Next_Line',
            description: 'A function that reads a line from a file descriptor. This project teaches about static variables, file handling, and memory management in C.',
            tags: ['C', 'File Handling', 'Memory Management', '42 Project'],
            github: 'https://github.com/rjaada/Get_Next_Line_42_Project',
            files: [
                { name: 'get_next_line.c', type: 'file' },
                { name: 'get_next_line.h', type: 'file' },
                { name: 'get_next_line_utils.c', type: 'file' },
                { name: 'test_file.txt', type: 'file' }
            ]
        },
        'minitalk': {
            title: 'Minitalk',
            description: 'A client-server communication system using only UNIX signals. This project demonstrates inter-process communication and signal handling.',
            tags: ['C', 'UNIX Signals', 'IPC', 'Client-Server', '42 Project'],
            github: 'https://github.com/rjaada/Minitalk_42_Project',
            files: [
                { name: 'client.c', type: 'file' },
                { name: 'server.c', type: 'file' },
                { name: 'minitalk.h', type: 'file' }
            ]
        },
        'printf': {
            title: 'Printf',
            description: 'A custom implementation of the printf function in C. This project focuses on variadic functions, string formatting, and output handling.',
            tags: ['C', 'Variadic Functions', 'String Formatting', '42 Project'],
            github: 'https://github.com/rjaada/Printf_42_Project',
            files: [
                { name: 'ft_printf.c', type: 'file' },
                { name: 'ft_printf.h', type: 'file' },
                { name: 'ft_formats.c', type: 'file' },
                { name: 'ft_utils.c', type: 'file' }
            ]
        }
    };

    // Open project explorer
    function openProjectExplorer() {
        document.body.style.overflow = 'hidden'; // Prevent scrolling
        projectExplorer.style.display = 'flex';
        
        // Staggered animation
        setTimeout(() => {
            projectExplorer.classList.add('active');
        }, 10);
    }

    // Close project explorer
    function closeProjectExplorer() {
        const explorerContainer = document.querySelector('.explorer-container');
        
        // Fade out animation
        explorerContainer.style.opacity = '0';
        explorerContainer.style.transform = 'translateY(20px) scale(0.97)';
        
        // Remove active class with delay
        setTimeout(() => {
            projectExplorer.classList.remove('active');
            
            // Hide modal after animation completes
            setTimeout(() => {
                projectExplorer.style.display = 'none';
                document.body.style.overflow = ''; // Restore scrolling
                
                // Reset transforms for next opening
                explorerContainer.style.opacity = '';
                explorerContainer.style.transform = '';
            }, 300);
        }, 100);
    }

    // Load project data into the right panel
    function loadProject(projectKey) {
        const project = explorerProjectData[projectKey];
        if (!project) return;
        
        // Update project title and description
        document.querySelector('.project-title').textContent = project.title;
        document.querySelector('.project-text').textContent = project.description;
        
        // Set GitHub link
        const projectLink = document.querySelector('.project-link');
        projectLink.href = project.github;
        
        // Clear and populate tags
        const projectTags = document.querySelector('.project-tags');
        projectTags.innerHTML = '';
        project.tags.forEach(tag => {
            const tagElement = document.createElement('span');
            tagElement.classList.add('project-tag');
            tagElement.textContent = tag;
            projectTags.appendChild(tagElement);
        });
        
        // Clear and populate files
        const projectFiles = document.querySelector('.project-files');
        projectFiles.innerHTML = '<h4>Files</h4>';
        project.files.forEach(file => {
            const fileElement = document.createElement('div');
            fileElement.classList.add('file-item');
            fileElement.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-file file-icon"><path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"></path><polyline points="13 2 13 9 20 9"></polyline></svg>
                <span>${file.name}</span>
            `;
            // Just highlight the file when clicked instead of showing content
            fileElement.addEventListener('click', () => highlightFileItem(fileElement));
            projectFiles.appendChild(fileElement);
        });
        
        // Clear previous content
        const existingContent = document.querySelector('.file-content');
        if (existingContent) {
            existingContent.remove();
        }
        
        const existingPrompt = document.querySelector('.terminal-prompt');
        if (existingPrompt) {
            existingPrompt.remove();
        }
        
        // Remove any existing placeholders
        const oldPlaceholders = document.querySelectorAll('.placeholder-block');
        oldPlaceholders.forEach(p => p.remove());
        
        // Update active folder styling
        folders.forEach(folder => {
            folder.classList.remove('active');
            if (folder.dataset.project === projectKey) {
                folder.classList.add('active');
            }
        });
        
        // Update feather icons
        feather.replace();
    }

    // Highlight a file item when clicked instead of showing content
    function highlightFileItem(fileElement) {
        // Remove highlight from all files
        const fileItems = document.querySelectorAll('.file-item');
        fileItems.forEach(item => {
            item.classList.remove('file-item-active');
        });
        
        // Add highlight to the clicked file
        fileElement.classList.add('file-item-active');
        
        // Instead of showing file content, just display filename in a message
        const fileName = fileElement.querySelector('span').textContent;
        
        // Remove existing content if any
        const existingContent = document.querySelector('.file-content');
        if (existingContent) {
            existingContent.remove();
        }
        
        const existingPrompt = document.querySelector('.terminal-prompt');
        if (existingPrompt) {
            existingPrompt.remove();
        }
        
        // Add a simple message showing which file was selected
        const terminalPrompt = document.createElement('div');
        terminalPrompt.classList.add('terminal-prompt');
        terminalPrompt.innerHTML = `<span class="prompt-user">user</span>:<span class="prompt-dir">~/${fileName}</span>$ <span class="blinking-cursor">|</span>`;
        document.querySelector('.project-details').appendChild(terminalPrompt);
    }

    // Event Listeners
    if (viewMoreBtn) {
        viewMoreBtn.addEventListener('click', openProjectExplorer);
    }

    if (explorerOverlay) {
        explorerOverlay.addEventListener('click', closeProjectExplorer);
    }

    if (explorerCloseButton) {
        explorerCloseButton.addEventListener('click', closeProjectExplorer);
    }

    // Load project data when folder is clicked
    folders.forEach(folder => {
        folder.addEventListener('click', () => {
            const projectKey = folder.dataset.project;
            loadProject(projectKey);
        });
    });

    // Close explorer with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && projectExplorer.classList.contains('active')) {
            closeProjectExplorer();
        }
    });

    // Prevent clicks inside explorer container from closing it
    document.querySelector('.explorer-container').addEventListener('click', function(e) {
        e.stopPropagation();
    });

    // Custom cursor functionality
    const cursorOutline = document.querySelector('.cursor-outline');
    
    // Check if cursor elements exist and if device supports hover
    const hasHoverSupport = window.matchMedia('(hover: hover)').matches;
    const hasCursorElements = cursorOutline;
    
    if (hasCursorElements && hasHoverSupport) {
        // Initialize cursor position at center of screen
        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let cursorX = mouseX;
        let cursorY = mouseY;
        
        // Set initial cursor position
        cursorOutline.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
        
        // Wait a moment before showing the cursor
        setTimeout(() => {
            cursorOutline.style.opacity = 1;
        }, 100);
        
        // Track mouse movement
        document.addEventListener('mousemove', function(e) {
            // Store the target position
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        // Apple-like smooth animation with lerping
        function animateCursor() {
            // Smooth interpolation calculation
            const easeFactor = 0.2; // Slightly faster for more responsiveness
            
            // Calculate the distance to move
            const dx = mouseX - cursorX;
            const dy = mouseY - cursorY;
            
            // Apply easing
            cursorX += dx * easeFactor;
            cursorY += dy * easeFactor;
            
            // Apply the transformation (without translate(-50%, -50%) since we use margin in CSS)
            cursorOutline.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
            
            // Continue the animation
            requestAnimationFrame(animateCursor);
        }
        
        // Start the animation loop
        animateCursor();
        
        // Handle mouse leaving/entering window
        document.addEventListener('mouseleave', function() {
            cursorOutline.style.opacity = 0;
        });
        
        document.addEventListener('mouseenter', function() {
            cursorOutline.style.opacity = 1;
        });
        
        // Handle cursor on clickable elements
        const clickables = document.querySelectorAll('a, button, .work-item, .nav-item a, .theme-toggle, .social-link, .view-more-button, input, textarea');
        
        clickables.forEach(element => {
            element.addEventListener('mouseenter', function() {
                cursorOutline.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1.3)`;
                cursorOutline.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
            });
            
            element.addEventListener('mouseleave', function() {
                cursorOutline.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1)`;
                cursorOutline.style.backgroundColor = 'transparent';
            });
        });
        
        // Handle mousedown/up state
        document.addEventListener('mousedown', function() {
            cursorOutline.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(0.9)`;
        });
        
        document.addEventListener('mouseup', function() {
            cursorOutline.style.transform = `translate(${cursorX}px, ${cursorY}px) scale(1)`;
        });
    }
});
