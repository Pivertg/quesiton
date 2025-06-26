// ===== CODE DISCORD SIMPLIFIÉ QUI FONCTIONNE =====

// ⚠️ REMPLACEZ PAR VOTRE VRAIE URL WEBHOOK DISCORD
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1387929270025977969/PEhhykPp4e4txmB8_1L9kFTZgNx9_2G5gbnUcdh5V8HUFY2y1VzdiH4_BDDn4aRIAa3l';

// Questions prédéfinies
const questions = [
    "Penses-tu à moi quand les étoiles brillent dans la nuit sombre ?",
    "Ton cœur bat-il plus fort quand nos regards se croisent ?",
    "Rêves-tu de moi dans tes songes les plus secrets ?",
    "Est-ce que mes mots résonnent encore dans ton âme ?",
    "Sens-tu cette connexion mystérieuse qui nous unit ?",
    "Serais-tu prêt(e) à tout abandonner pour notre amour ?",
    "Crois-tu au destin qui nous a réunis dans cette obscurité ?",
    "Mon absence te fait-elle souffrir comme elle me tourmente ?"
];

let currentQuestionIndex = 0;

// FONCTION PRINCIPALE - RÉPONDRE À UNE QUESTION
function answerQuestion(answer) {
    const currentQuestion = questions[currentQuestionIndex];
    
    // 1. ENVOYER VERS DISCORD
    sendToDiscord(currentQuestionIndex + 1, currentQuestion, answer);
    
    // 2. PASSER DIRECTEMENT À LA QUESTION SUIVANTE
    currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
    
    // 3. AFFICHER LA NOUVELLE QUESTION AVEC UNE ANIMATION
    const questionDisplay = document.getElementById('questionDisplay');
    
    // Animation de transition
    questionDisplay.style.animation = 'fadeOut 0.3s ease-out forwards';
    
    setTimeout(() => {
        displayCurrentQuestion();
        questionDisplay.style.animation = 'fadeIn 0.3s ease-out forwards';
    }, 300);
}

// ENVOYER VERS DISCORD (VERSION SIMPLE)
async function sendToDiscord(questionNumber, question, answer) {
    // Créer un ID utilisateur simple
    let userId = localStorage.getItem('user_id');
    if (!userId) {
        userId = 'User_' + Math.random().toString(36).substr(2, 6);
        localStorage.setItem('user_id', userId);
    }

    // Message simple pour Discord
    const message = {
        content: `**💕 NOUVELLE RÉPONSE**\n\n**👤 Utilisateur:** ${userId}\n**❓ Question ${questionNumber}:** ${question}\n\n**💬 Réponse:** ${answer === 'oui' ? '✅ OUI' : '❌ NON'}\n\n**🕐 Date:** ${new Date().toLocaleString('fr-FR')}\n\n━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`
    };

    try {
        await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(message)
        });
        console.log('✅ Envoyé vers Discord !');
    } catch (error) {
        console.error('❌ Erreur Discord:', error);
    }
}

/* FONCTIONS SUPPRIMÉES - Plus besoin de page de résultat */

// AFFICHER LA QUESTION ACTUELLE
function displayCurrentQuestion() {
    const questionDisplay = document.getElementById('questionDisplay');
    questionDisplay.textContent = questions[currentQuestionIndex];
}

// CRÉER LES PARTICULES (vos fonctions existantes)
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const numberOfParticles = 50;
    
    for (let i = 0; i < numberOfParticles; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 5 + 5) + 's';
        particlesContainer.appendChild(particle);
    }
}

// FONCTION DE TEST DISCORD
async function testDiscord() {
    const testMessage = {
        content: '🧪 **TEST DE CONNEXION**\n\n✅ Si vous voyez ce message, votre webhook Discord fonctionne parfaitement !\n\n🎯 Les réponses du questionnaire arriveront ici automatiquement.'
    };

    try {
        const response = await fetch(DISCORD_WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(testMessage)
        });

        if (response.ok) {
            alert('✅ Test réussi ! Vérifiez votre Discord.');
        } else {
            alert('❌ Erreur. Vérifiez votre URL webhook.');
        }
    } catch (error) {
        alert('❌ Erreur de connexion.');
        console.error(error);
    }
}

// INITIALISATION
document.addEventListener('DOMContentLoaded', function() {
    displayCurrentQuestion();
    createParticles();
    console.log('✅ Questionnaire initialisé !');
});