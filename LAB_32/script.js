const questions = [
    {
        question: "Em qual década surgiu o Movimento Tropicalista?",
        options: ["1950", "1960", "1970", "1980"],
        correct: 1
    },
    {
        question: "Quem é o compositor de 'Garota de Ipanema'?",
        options: ["Caetano Veloso", "Gilberto Gil", "Tom Jobim", "Vinicius de Moraes"],
        correct: 2
    },
    {
        question: "Quais os grandes cantores que lideraram o movimento da 'Jovem Guarda'?",
        options: ["Caetano & Gil", "Roberto Carlos & Erasmo Carlos", "Gal Costa & Rita Lee", "Chico Buarque & Vinícius de Moraes"],
        correct: 1
    },
    {
        question: "Quem foi a 'Musa do Tropicalismo'?",
        options: ["Gal Costa", "Elis Regina", "Rita Lee", "Maria Bethânia"],
        correct: 0
    },
    {
        question: "Qual a cantora com maior vendas de discos no Brasil?",
        options: ["Ivete Sangalo", "Elis Regina", "Rita Lee", "Maria Bethânia"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
const quizContainer = document.getElementById("quiz");
const feedbackElement = document.getElementById("feedback");
const confirmBtn = document.getElementById("confirm-btn");
const restartBtn = document.getElementById("restart-btn");

function loadQuestion() {
    const questionData = questions[currentQuestion];
    quizContainer.innerHTML = `
        <h2>${questionData.question}</h2>
        <ul>
            ${questionData.options.map((option, index) => `<li><input type="radio" name="option" value="${index}">${option}</li>`).join('')}
        </ul>
    `;
}

function checkAnswer() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (!selectedOption) return;

    const answer = parseInt(selectedOption.value);
    if (answer === questions[currentQuestion].correct) {
        feedbackElement.textContent = "Correto!";
        feedbackElement.className = "correct";
        feedbackElement.style.color = '#2AC263'
        feedbackElement.style.fontWeight = 'bold';
        score++;
    } else {
        feedbackElement.textContent = "Errado! A resposta correta é: " + questions[currentQuestion].options[questions[currentQuestion].correct];
        feedbackElement.className = "incorrect";
        feedbackElement.style.color = '#FF0000'
        feedbackElement.style.fontWeight = 'bold';
    }
    feedbackElement.style.display = "block";
    setTimeout(() => {
        nextQuestion();
    }, 1000);
}

function nextQuestion() {
    feedbackElement.style.display = "none";
    currentQuestion++;
    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizContainer.innerHTML = `<h2>Você acertou ${score} de ${questions.length} perguntas!</h2>`;
    confirmBtn.style.display = "none";
    restartBtn.style.display = "block";
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    confirmBtn.style.display = "block";
    restartBtn.style.display = "none";
    loadQuestion();
}

confirmBtn.addEventListener("click", checkAnswer);
restartBtn.addEventListener("click", restartQuiz);

loadQuestion();
