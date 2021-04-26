
const quizData = [
    {
        question: "Est-ce que vous toussez ?",
        a: "Oui",
        b: "Non",
        correct: "a",
    },
    {
        question: "Avez-vous de la fièvre ?",
        a: "Oui",
        b: "Non",
        correct: "a",
    },
    {
        question: "Arrivrez-vous à ressentir des odeurs?",
        a: "Oui",
        b: "Non",
        correct: "b",
    },
    {
        question: "Arrivez vous à sentir le goût des aliments?",
        a: "Oui",
        b: "Non",
        correct: "b",
    },
];

const quiz = document.getElementById("quiz");
const answerEls = document.querySelectorAll(".answer");
const questionEl = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitBtn = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

loadQuiz();
function loadQuiz() {
    deselectAnswers();

    const currentQuizData = quizData[currentQuiz];

    questionEl.innerText = currentQuizData.question;
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
}

function getSelected() {
    let answer = undefined;

    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            answer = answerEl.id;
        }
    });

    return answer;
}

function deselectAnswers() {
    answerEls.forEach((answerEl) => {
        answerEl.checked = false;
    });
}

submitBtn.addEventListener("click", () => {
    // check to see the answer
    const answer = getSelected();
    var message = ""
    if (answer) {
        if (answer === quizData[currentQuiz].correct) {
            score++;
        }

        currentQuiz++;

        if (currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            if (score == 0) {
                message = "Vous n'avez aucun symptômes, respectez juste les gestes barrières et renforcez votre systèmes immunitiare en faisant de l'exercice physique et vous alimentant de façon èquilibrée et saine"
            }
            if (score == 1) {
                message = "Pas d'inquiétude. Surveillez vos symptômes. Respectez les gestes barrières et renforcez votre systèmes immunitiare en faisant de l'exercice physique et vous alimentant de façon èquilibrée et saine. "
            }
            if (score == 2) {
                message = "Respectez strictement les gestes barrières et faites au plutôt un test du COVID. Pas trop d'inquiétudes. Surveillez vos symptômes. <strong> Les Lieux pour faire le test du COVID sont : ....</strong> , Contactez le 67 15 39 74 pour plus d'information"
            }
            if (score == 3) {
                message = "Mettez vous immédiatement en isolement. Respectez rigoureusement les gestes barrières et faites au plutôt un test du COVID. Pas trop d'inquiétudes. Surveillez vos symptômes. <strong> Les Lieux pour faire le test du COVID sont : ....</strong>, <strong> VOUS SEREZ CONTACTE PAR NOS SERVICES POUR PLUS D'INFORMATIONS</strong>. Si vous ne recevez pas un appel ou un message dans les 12 prochaines heures, veuillez contactez le 67 15 39 74 "
            }
            if (score == 4) {
                message = "Mettez vous immédiatement en isolement. Respectez rigoureusement les gestes barrières <strong> VOUS SEREZ CONTACTE PAR NOS SERVICES POUR PLUS D'INFORMATIONS</strong>. Si vous ne recevez pas un appel ou un message dans les 12 prochaines heures, veuillez contactez le 67 15 39 74 "
            }
            quiz.innerHTML = `
                <h2>Vous avez  ${score} sur ${quizData.length} des symptômes.</h2>
                <p>${message}</p>
                <button onclick="sendEmail()" >C'EST COMPRIS</button>
            `;
        }
    }
});


function sendEmail() {
    var name_user = localStorage.getItem("name_user");
    var contry = localStorage.getItem("contry");
    var state = localStorage.getItem("state");
    var phone = localStorage.getItem("phone");
    var mail = localStorage.getItem("mail");
    console.log(name_user)
    Email.send({
        Host: "smtp.mandrillapp.com",
        Username: "birotori@gmail.com",
        Password: "06C3B4CDC2DB33D0FACD93A5A9879DD076B1",
        To: "irotoribaroka@yahoo.fr", mail,
        From: "birotori@gmail.com",
        Subject: "INFO COVID",
        Body: '<html><h2>Bonjour Mr / Mme :' + name_user + '</h2></html>'
    })
        .then(function (message) {
            location.href = 'index.html';
            alert("PRENEZ SOIN DE VOUS")
        });
};