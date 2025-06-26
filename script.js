const letters = document.querySelectorAll('.letter');

// Créer des cœurs flottants en arrière-plan
function createFloatingHearts() {
    const hearts = ['♥', '💖', '💕', '💘', '💝'];
    const heart = document.createElement('div');
    heart.className = 'floating-heart';
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.left = Math.random() * window.innerWidth + 'px';
    heart.style.animationDelay = Math.random() * 2 + 's';
    document.body.appendChild(heart);
    
    setTimeout(() => {
        heart.remove();
    }, 6000);
}

// Créer des cœurs flottants périodiquement
setInterval(createFloatingHearts, 1500);

// Fonction pour le bouton "Suivant"
function goToNextPage() {
    // Remplacez "next-page.html" par le nom de votre page suivante
    window.location.href = 'suite 1.html';
}