document.addEventListener('DOMContentLoaded', () => {
    
    // Trocador de Temas
    const htmlEl = document.documentElement;
    const themeBtns = document.querySelectorAll('.tema-btn');

    themeBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const novoTema = btn.getAttribute('data-set-tema');
            htmlEl.setAttribute('data-tema', novoTema);
            
            // Opcional: Efeito visual ao clicar
            themeBtns.forEach(b => b.style.transform = 'scale(1)');
            btn.style.transform = 'scale(1.2)';
        });
    });

    // Interatividade da Mesa (Metáfora de espalhar os papéis)
    const pecas = document.querySelectorAll('.peca');
    
    pecas.forEach(peca => {
        // Ao focar em uma peça, ela vem para frente
        peca.addEventListener('mouseenter', () => {
            pecas.forEach(p => p.style.zIndex = '10');
            peca.style.zIndex = '20';
        });
    });
});
