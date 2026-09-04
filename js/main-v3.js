/**
 * Rodrigo Rocha Design — Landing Page v3
 * Interatividade, Filtros, Modal e Animações
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Cabeçalho com fundo dinâmico ao rolar a página
    const header = document.querySelector('.header-v3');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 40) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Atualizar link ativo no menu baseado na posição do scroll
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.offsetHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
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

    // 2. Menu Mobile Toggle
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

    // 3. Filtros do Portfólio (Identidade, Produto, Gráfico, Branding)
    const filterButtons = document.querySelectorAll('.filter-btn-v3');
    const projectCards = document.querySelectorAll('.project-card-v3');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                // O card destacado amarelo sempre permanece visível ou adapta se for selecionado
                if (filterValue === 'all' || cardCategory === filterValue || card.classList.contains('featured-yellow-card')) {
                    card.style.display = 'flex';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    }, 50);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'scale(0.95)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 250);
                }
            });
        });
    });

    // 4. Modal / Lightbox para Detalhes dos Projetos
    const modal = document.getElementById('project-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTag = document.getElementById('modal-tag');
    const modalTitle = document.getElementById('modal-title');
    const modalDesc = document.getElementById('modal-desc');
    const modalClose = document.getElementById('modal-close');

    projectCards.forEach(card => {
        card.addEventListener('click', (e) => {
            const linkClicked = e.target.closest('a');
            if (linkClicked && linkClicked.getAttribute('href') && linkClicked.getAttribute('href').startsWith('http')) {
                // Link externo do Instagram (como as pílulas D'Arco e Botica Dermo): abre a nova aba naturalmente
                return;
            }

            if (card.tagName.toLowerCase() === 'a' && card.getAttribute('href') && card.getAttribute('href').startsWith('http')) {
                // Card que é um link direto (como Lá de Passos ou Botica Dermo)
                return;
            }

            const isFeatured = card.classList.contains('featured-yellow-card');
            
            if (isFeatured) {
                modalTag.textContent = 'PROJETO EM DESTAQUE • DESIGN DE PRODUTO';
                modalTitle.textContent = 'Linha de Mobiliário Corporativo';
                modalDesc.textContent = 'Desenvolvimento autoral com foco no bem-estar, ergonomia e acabamentos refinados, resgatando a memória afetiva em ambientes contemporâneos.';
                modalImg.src = 'https://images.unsplash.com/photo-1505693314120-0d443867891c?q=80&w=800&auto=format&fit=crop';
            } else {
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
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    // 5. Botão "Carregar Mais" com feedback visual
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
