document.addEventListener('DOMContentLoaded', () => {

    /* =========================================
       1. MENU MOBILE (TOGGLE)
       ========================================= */
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Animar o ícone de hambúrguer
            const spans = mobileBtn.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
            } else {
                spans[0].style.transform = 'none';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'none';
            }
        });

        // Fechar menu ao clicar em um link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    mobileBtn.click();
                }
            });
        });
    }

    /* =========================================
       2. SCROLL REVEAL ANIMATIONS
       ========================================= */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    const revealCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Opcional: Descomente a linha abaixo se quiser que a animação ocorra apenas uma vez
                // observer.unobserve(entry.target); 
            }
        });
    };

    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(revealCallback, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* =========================================
       3. FILTRO DE PORTFÓLIO
       ========================================= */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioItems = document.querySelectorAll('.portfolio-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remover classe active de todos os botões
            filterBtns.forEach(b => b.classList.remove('active'));
            // Adicionar classe active ao botão clicado
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            portfolioItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                // Mostrar todos ou filtrar por categoria
                if (filterValue === 'all' || filterValue === itemCategory) {
                    item.classList.remove('hide');
                    // Pequeno delay para a animação de reordenamento não ser brusca
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.classList.add('hide');
                    }, 300); // tempo de match com o var(--transition-base) do CSS se implementado
                }
            });
        });
    });

    /* =========================================
       4. SCROLL ATIVO NO MENU (SPY)
       ========================================= */
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
        
        // Efeito de encolhimento do header no scroll
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
        } else {
            header.style.padding = '1rem 0';
        }
    });

});
