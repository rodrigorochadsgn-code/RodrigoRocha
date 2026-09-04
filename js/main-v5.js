/**
 * Rodrigo Rocha Design — Landing Page v4 (Parallax Clean Edition)
 * Suporte a Parallax 3D suave no Hero com a logo oficial RRDesgin.gif,
 * Parallax de scroll na seção Manifesto e filtros de portfólio.
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Cabeçalho Dinâmico ao Rolar
    const header = document.querySelector('.header-v4');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // 2. Elementos do Palco Parallax 3D no Hero (Logo Oficial RRDesgin.gif)
    const heroCard = document.getElementById('hero-tilt-card');
    const heroGlare = document.querySelector('.hero-brand-glare');
    const heroImg = document.querySelector('.hero-brand-main-img');

    // 3. Elementos da Seção Showcase Parallax (Manifesto)
    const showcaseSection = document.querySelector('.parallax-showcase-section');
    const showcaseBgLayer = document.querySelector('.showcase-bg-layer');
    const showcaseOutlineLayer = document.querySelector('.showcase-outline-layer');

    // =========================================================================
    // INTERAÇÃO PARALLAX 3D NO CURSOR (HERO TILT SUAVE)
    // =========================================================================
    if (heroCard) {
        let isHovered = false;
        let bounds = null;

        const updateBounds = () => {
            bounds = heroCard.getBoundingClientRect();
        };

        window.addEventListener('resize', updateBounds);
        heroCard.addEventListener('mouseenter', () => {
            isHovered = true;
            updateBounds();
            heroCard.style.transition = 'transform 0.1s ease-out, box-shadow 0.2s ease';
        });

        heroCard.addEventListener('mousemove', (e) => {
            if (!bounds) updateBounds();

            const mouseX = e.clientX - bounds.left;
            const mouseY = e.clientY - bounds.top;

            const centerX = bounds.width / 2;
            const centerY = bounds.height / 2;

            const deltaX = (mouseX - centerX) / centerX; // de -1 a 1
            const deltaY = (mouseY - centerY) / centerY; // de -1 a 1

            // Rotações 3D elegantes
            const maxRotateX = 12;
            const maxRotateY = 14;

            const rotateX = -deltaY * maxRotateX;
            const rotateY = deltaX * maxRotateY;

            heroCard.style.transform = `rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

            if (heroImg) {
                const imgShiftX = -deltaX * 12;
                const imgShiftY = -deltaY * 12;
                heroImg.style.transform = `translateZ(50px) translate3d(${imgShiftX.toFixed(1)}px, ${imgShiftY.toFixed(1)}px, 0)`;
            }

            if (heroGlare) {
                const glareX = 50 + deltaX * 35;
                const glareY = 50 + deltaY * 35;
                heroGlare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.22) 0%, transparent 65%)`;
            }
        });

        heroCard.addEventListener('mouseleave', () => {
            isHovered = false;
            heroCard.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s ease';
            heroCard.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';

            if (heroImg) {
                heroImg.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
                heroImg.style.transform = 'translateZ(45px) translate3d(0, 0, 0)';
            }

            if (heroGlare) {
                heroGlare.style.background = 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.14) 0%, transparent 65%)';
            }
        });
    }

    // =========================================================================
    // EFEITO DE SCROLL PARALLAX (60 FPS VIA REQUESTANIMATIONFRAME)
    // =========================================================================
    let ticking = false;

    const onScroll = () => {
        const scrollY = window.scrollY;

        // 1. Cabeçalho escuro ao rolar
        if (scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // 2. Atualizar link ativo no menu
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 130;
            const sectionHeight = section.offsetHeight;
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                const id = section.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // 3. Parallax suave no Hero card ao rolar
        if (heroCard && scrollY < 800) {
            const heroScrollOffset = scrollY * 0.12;
            heroCard.style.transform = `translate3d(0, ${heroScrollOffset.toFixed(1)}px, 0)`;
        }

        // 4. Parallax na Seção Showcase (Manifesto)
        if (showcaseSection) {
            const rect = showcaseSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;

            if (rect.top < windowHeight && rect.bottom > 0) {
                const relativeY = rect.top - windowHeight / 2;

                if (showcaseBgLayer) {
                    const offsetBg = relativeY * 0.28;
                    showcaseBgLayer.style.transform = `translate3d(0, ${offsetBg.toFixed(1)}px, 0)`;
                }

                if (showcaseOutlineLayer) {
                    const offsetOutline = relativeY * 0.42;
                    showcaseOutlineLayer.style.transform = `translate3d(0, ${offsetOutline.toFixed(1)}px, 0)`;
                }
            }
        }

        ticking = false;
    };

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(onScroll);
            ticking = true;
        }
    }, { passive: true });

    onScroll();

    // =========================================================================
    // MENU MOBILE
    // =========================================================================
    const mobileBtn = document.querySelector('.mobile-toggle');
    const navMenu = document.querySelector('.nav-links');

    if (mobileBtn && navMenu) {
        mobileBtn.addEventListener('click', () => {
            navMenu.classList.toggle('open');
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
            });
        });
    }

    // =========================================================================
    // FILTROS DO PORTFÓLIO
    // =========================================================================
    const filterButtons = document.querySelectorAll('.filter-btn-v4');
    const projectCards = document.querySelectorAll('.project-card-v4');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (filterValue === 'all' || cardCategory === filterValue || card.classList.contains('featured-yellow-card')) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 40);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 240);
                }
            });
        });
    });

    // =========================================================================
    // SLIDESHOWS DINÂMICOS ROLANTES & ESMORECENDO (IDENTIDADES, PRODUTOS, PAULA)
    // =========================================================================
    const slideshowCards = document.querySelectorAll('.card-slideshow');
    
    slideshowCards.forEach(card => {
        const slides = card.querySelectorAll('.slide-item');
        if (!slides.length) return;

        const counterEl = card.querySelector('.slideshow-counter');
        const progressFill = card.querySelector('.slideshow-progress-fill');
        const dynamicTitle = card.querySelector('.dynamic-title');
        const dynamicSub = card.querySelector('.dynamic-sub');
        const dynamicLinkArea = card.querySelector('.dynamic-link-area');
        const prevBtn = card.querySelector('.slideshow-nav-btn.prev');
        const nextBtn = card.querySelector('.slideshow-nav-btn.next');

        let currentIndex = 0;
        const totalSlides = slides.length;
        const slideDuration = card.id === 'card-identidade-paula' ? 3800 : (card.id === 'card-produtos-rodrigo' ? 3200 : 3400);
        let progressInterval = null;
        let slideTimer = null;
        let isPaused = false;
        let progressPercent = 0;

        const updateSlideView = (index) => {
            slides.forEach((s, i) => {
                if (i === index) {
                    s.classList.add('active');
                } else {
                    s.classList.remove('active');
                }
            });

            const activeSlide = slides[index];
            if (counterEl) {
                counterEl.textContent = `${String(index + 1).padStart(2, '0')}/${String(totalSlides).padStart(2, '0')}`;
            }

            if (dynamicTitle && activeSlide.dataset.title) {
                dynamicTitle.textContent = activeSlide.dataset.title;
            }

            if (dynamicSub && activeSlide.dataset.sub) {
                dynamicSub.textContent = activeSlide.dataset.sub;
            }

            if (dynamicLinkArea) {
                if (activeSlide.dataset.link) {
                    dynamicLinkArea.innerHTML = `
                        <a href="${activeSlide.dataset.link}" target="_blank" rel="noopener noreferrer" class="insta-sub-link">
                            <svg class="insta-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                                <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                            </svg>
                            <span>${activeSlide.dataset.linkText || 'Visitar ↗'}</span>
                        </a>
                    `;
                } else {
                    dynamicLinkArea.innerHTML = `
                        <span class="project-link-badge">Design Autoral Rodrigo Rocha</span>
                    `;
                }
            }
        };

        const resetProgress = () => {
            progressPercent = 0;
            if (progressFill) progressFill.style.width = '0%';
        };

        const nextSlide = () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSlideView(currentIndex);
            resetProgress();
        };

        const prevSlide = () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateSlideView(currentIndex);
            resetProgress();
        };

        if (nextBtn) {
            nextBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                nextSlide();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                prevSlide();
            });
        }

        // Animação Contínua Autônoma com Barra de Progresso
        const startProgress = () => {
            if (progressInterval) clearInterval(progressInterval);
            const stepTime = 40;
            const increment = 100 / (slideDuration / stepTime);

            progressInterval = setInterval(() => {
                if (!isPaused) {
                    progressPercent += increment;
                    if (progressFill) progressFill.style.width = `${Math.min(progressPercent, 100)}%`;
                    if (progressPercent >= 100) {
                        nextSlide();
                    }
                }
            }, stepTime);
        };

        // Pausa suave no hover que retoma automaticamente após 3 segundos mesmo se o cursor continuar parado
        let hoverResumeTimeout = null;
        card.addEventListener('mouseenter', () => {
            isPaused = true;
            if (hoverResumeTimeout) clearTimeout(hoverResumeTimeout);
            hoverResumeTimeout = setTimeout(() => {
                isPaused = false;
            }, 3000);
        });

        card.addEventListener('mouseleave', () => {
            if (hoverResumeTimeout) clearTimeout(hoverResumeTimeout);
            isPaused = false;
        });

        // Garantir continuidade contínua mesmo se a aba perder foco temporariamente
        document.addEventListener('visibilitychange', () => {
            if (!document.hidden) {
                isPaused = false;
                startProgress();
            }
        });

        // Inicializar imediatamente
        updateSlideView(0);
        startProgress();
    });

    // =========================================================================
    // MODAL / LIGHTBOX DE PROJETO (COM SUPORTE A APRESENTAÇÕES MULTI-SLIDES)
    // =========================================================================
    const modal = document.getElementById('project-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTag = document.getElementById('modal-tag');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalClose = document.getElementById('modal-close');
    const modalNavContainer = document.getElementById('modal-nav-container');
    const modalNavPrev = document.getElementById('modal-nav-prev');
    const modalNavNext = document.getElementById('modal-nav-next');
    const modalSlideCounter = document.getElementById('modal-slide-counter');

    // Lista de todas as 23 lâminas da apresentação completa da Dra. Paula Moraes
    const paulaAllSlides = Array.from({ length: 23 }, (_, i) => {
        const num = String(i + 1).padStart(2, '0');
        return {
            src: `Clientes/DraPaulaMoraes-Identidade/slide_${num}.jpg`,
            title: `Dra. Paula Roberta de Moraes — Advogada`,
            tag: `IDENTIDADE VISUAL • PROPOSTA COMPLETA`,
            desc: `Lâmina ${i + 1} de 23 da proposta autoral de identidade visual e branding desenvolvida pelo Rodrigo Rocha Design para a Dra. Paula Roberta de Moraes.`
        };
    });

    let currentModalSlides = [];
    let modalSlideIndex = 0;

    const renderModalSlide = (idx) => {
        if (!currentModalSlides.length) return;
        modalSlideIndex = (idx + currentModalSlides.length) % currentModalSlides.length;
        const item = currentModalSlides[modalSlideIndex];

        modalImg.src = item.src;
        if (modalSlideCounter) {
            modalSlideCounter.textContent = `Lâmina ${modalSlideIndex + 1} de ${currentModalSlides.length}`;
        }
        if (item.title) modalTitle.textContent = item.title;
        if (item.tag) modalTag.textContent = item.tag;
        if (item.desc) modalDesc.textContent = item.desc;
    };

    if (modalNavPrev) {
        modalNavPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            renderModalSlide(modalSlideIndex - 1);
        });
    }

    if (modalNavNext) {
        modalNavNext.addEventListener('click', (e) => {
            e.stopPropagation();
            renderModalSlide(modalSlideIndex + 1);
        });
    }

    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const linkClicked = e.target.closest('a');
            if (linkClicked && linkClicked.getAttribute('href') && linkClicked.getAttribute('href').startsWith('http')) {
                return;
            }

            if (e.target.closest('.slideshow-nav-btn')) {
                return;
            }

            if (card.tagName.toLowerCase() === 'a' && card.getAttribute('href') && card.getAttribute('href').startsWith('http')) {
                return;
            }

            const isFeatured = card.classList.contains('featured-yellow-card');

            if (isFeatured) {
                if (modalNavContainer) modalNavContainer.classList.remove('active');
                modalTag.textContent = 'PROJETO EM DESTAQUE • DESIGN DE PRODUTO';
                modalTitle.textContent = 'Linha de Mobiliário Corporativo';
                modalDesc.textContent = 'Desenvolvimento autoral com foco no bem-estar, ergonomia e acabamentos refinados, resgatando a memória afetiva em ambientes corporativos e residenciais.';
                modalImg.src = 'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=800&auto=format&fit=crop';
            } else if (card.id === 'card-identidade-paula') {
                // Abre a apresentação completa com todas as 23 lâminas em alta definição!
                currentModalSlides = paulaAllSlides;
                modalSlideIndex = 0;
                if (modalNavContainer) modalNavContainer.classList.add('active');
                renderModalSlide(0);
            } else if (card.classList.contains('card-slideshow')) {
                // Outro slideshow (como produtos autorais ou marcas)
                const activeSlides = Array.from(card.querySelectorAll('.slide-item')).map((img, i, arr) => ({
                    src: img.src,
                    title: img.dataset.title || card.querySelector('.project-title')?.textContent || 'Projeto',
                    tag: card.querySelector('.project-tag')?.textContent || 'PROJETO',
                    desc: img.dataset.sub ? `${img.dataset.sub} • ${card.getAttribute('data-desc') || ''}` : (card.getAttribute('data-desc') || '')
                }));

                currentModalSlides = activeSlides;
                modalSlideIndex = 0;
                if (modalNavContainer) modalNavContainer.classList.add('active');
                renderModalSlide(0);
            } else {
                if (modalNavContainer) modalNavContainer.classList.remove('active');
                const img = card.querySelector('img');
                const tag = card.querySelector('.project-tag');
                const title = card.querySelector('.project-title');
                const desc = card.getAttribute('data-desc') || 'Projeto desenvolvido com atenção minuciosa aos detalhes de manufatura, forma e impacto visual.';

                if (img) modalImg.src = img.src;
                if (tag) modalTag.textContent = tag.textContent;
                if (title) modalTitle.textContent = title.textContent;
                modalDesc.textContent = desc;
            }

            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    if (modalClose && modal) {
        const closeModal = () => {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        };

        modalClose.addEventListener('click', closeModal);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (modal.classList.contains('active')) {
                if (e.key === 'Escape') {
                    closeModal();
                } else if (e.key === 'ArrowRight' && currentModalSlides.length > 1) {
                    renderModalSlide(modalSlideIndex + 1);
                } else if (e.key === 'ArrowLeft' && currentModalSlides.length > 1) {
                    renderModalSlide(modalSlideIndex - 1);
                }
            }
        });
    }

    // Botão Carregar Mais
    const loadMoreBtn = document.querySelector('.btn-load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loadMoreBtn.textContent = 'TODOS OS PROJETOS EXIBIDOS';
            loadMoreBtn.style.backgroundColor = 'var(--cor-destaque)';
            loadMoreBtn.style.color = '#111111';
        });
    }
});
