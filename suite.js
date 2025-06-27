// ===== CODE DISCORD SIMPLIFIÉ QUI FONCTIONNE =====

// ⚠️ REMPLACEZ PAR VOTRE VRAIE URL WEBHOOK DISCORD
const DISCORD_WEBHOOK_URL = 'https://discord.com/api/webhooks/1387929270025977969/PEhhykPp4e4txmB8_1L9kFTZgNx9_2G5gbnUcdh5V8HUFY2y1VzdiH4_BDDn4aRIAa3l';

// Questions prédéfinies
const questions = [
    "Serais-tu prêt à te donner à fond pour la personne que tu aimes ?",
    "Serais-tu prêt à attendre pour voir la personne que tu aimes ?",
    "Une relation à distance te dérangerait-elle ?",
    "Si tu te mettais en couple avec quelqu’un, serais-tu prêt à rester toute ta vie avec la personne que tu aimes ?",
    "Veux-tu sortir avec moi ?"
];

// Questions supplémentaires si OUI à la dernière question
const extraQuestions = [
    "Serais-tu prêt à quitter Paris pour venir me voir ?",
    "Plus tard, tu voudrais habiter à Paris (clique sur oui) ou une autre ville te conviendrait (clique sur non) ?",
    "Pourrais-tu être jalouse si ton mec parle ou vocalise avec d'autres filles que toi ?",
    "As-tu des questions que tu voudrais me poser ?",
    "Voudrais-tu que je fasse quelque chose en particulier ?"
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
        endPage.innerHTML = '<h1 class="end-title">Fin by pivert temps passer environ 3h</h1>';
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

