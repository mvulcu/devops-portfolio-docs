javascript// Дополнительный JavaScript для интерактивности
document.addEventListener('DOMContentLoaded', function() {
    console.log('DevOps Portfolio loaded!');
    
    // Анимация при прокрутке
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за всеми заголовками
    document.querySelectorAll('h2, h3, .md-typeset .admonition').forEach(el => {
        observer.observe(el);
    });
});