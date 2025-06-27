// ===== CODE DISCORD SIMPLIFIÉ QUI FONCTIONNE =====

// ⚠️ REMPLACEZ PAR VOTRE VRAIE URL WEBHOOK DISCORD
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1387929270025977969/PEhhykPp4e4txmB8_1L9kFTZgNx9_2G5gbnUcdh5V8HUFY2y1VzdiH4_BDDn4aRIAa3l';

// Questions prédéfinies
const questions = [
    "Serais tu te donner a fond pour le personne que tu aime ?",
    "Une relation a distace te dérengerais ?",
    "Veux tu sortie avec moi ?"
];

// Questions supplémentaires si OUI à la dernière question
const extraQuestions = [
    "Quel est ton plat préféré ?",
    "Quelle est ta couleur favorite ?",
    "Où aimerais-tu partir en voyage ?"
];

let currentQuestionIndex = 0;
let isLoading = false;
let usingExtraQuestions = false;

// FONCTION PRINCIPALE - RÉPONDRE À UNE QUESTION
function answerQuestion(answer) {
    if (isLoading) return; // Empêche double clic
    // Empêche de répondre si toutes les questions sont finies
    if (!usingExtraQuestions && currentQuestionIndex >= questions.length) return;
    if (usingExtraQuestions && currentQuestionIndex >= extraQuestions.length) return;

    // Détermine la question courante
    const currentQuestion = usingExtraQuestions ? extraQuestions[currentQuestionIndex] : questions[currentQuestionIndex];
    // 1. ENVOYER VERS DISCORD
    sendToDiscord(currentQuestionIndex + 1, currentQuestion, answer);

    // 2. Animation de chargement
    isLoading = true;
    showLoadingScreen();
    setTimeout(() => {
        hideLoadingScreen();
        // Cas spécial : dernière question principale
        if (!usingExtraQuestions && currentQuestionIndex === questions.length - 1) {
            if (answer === 'oui') {
                // Passe aux questions supplémentaires
                usingExtraQuestions = true;
                currentQuestionIndex = 0;
                displayCurrentQuestion();
            } else {
                showEndPage();
            }
        } else {
            currentQuestionIndex++;
            // Affiche la question suivante ou la fin
            if ((usingExtraQuestions && currentQuestionIndex < extraQuestions.length) || (!usingExtraQuestions && currentQuestionIndex < questions.length)) {
                displayCurrentQuestion();
            } else {
                showEndPage();
            }
        }
        isLoading = false;
    }, 900);
}

// Affiche l'écran de chargement
function showLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) loadingScreen.classList.add('show');
}

// Cache l'écran de chargement
function hideLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) loadingScreen.classList.remove('show');
}

// Affiche la page de fin et masque la carte de question
function showEndPage() {
    const questionCard = document.getElementById('questionCard');
    const endPage = document.getElementById('endPage');
    if (questionCard) questionCard.style.display = 'none';
    if (endPage) {
        endPage.classList.add('show');
        // Affiche juste "Fin" dans la page de fin
        endPage.innerHTML = '<h1 class="end-title">Fin</h1>';
    }
}

// AFFICHER LA QUESTION ACTUELLE + progression
function displayCurrentQuestion() {
    const questionDisplay = document.getElementById('questionDisplay');
    const progressCounter = document.getElementById('progressCounter');
    if (usingExtraQuestions) {
        questionDisplay.textContent = extraQuestions[currentQuestionIndex];
        if (progressCounter) progressCounter.textContent = `Question bonus ${currentQuestionIndex + 1}/${extraQuestions.length}`;
    } else {
        questionDisplay.textContent = questions[currentQuestionIndex];
        if (progressCounter) progressCounter.textContent = `Question ${currentQuestionIndex + 1}/${questions.length}`;
    }
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

// INITIALISATION
document.addEventListener('DOMContentLoaded', function() {
    displayCurrentQuestion();
    console.log('✅ Questionnaire initialisé !');
});

