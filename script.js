const question = [
    {
        question: "Mana di bawah ini hewan terbesar?",
        answer: [
            { text: "Hiu", correct: false},
            { text: "kuda nil", correct: false},
            { text: "megalodon", correct: true},
            { text: "semut", correct: false},
        ]
    },
    {
        question: "Sebutkan ibukota indonesia saat ini?",
        answer: [
            { text: "Jakarta", correct: true},
            { text: "IKN", correct: false},
            { text: "Papua", correct: false},
            { text: "Sumatera", correct: false},
        ]
    },
    {
        question: "Banyak makanan manis yang menggunakan gula. Sebutkan tanaman di bawah ini yang merupakan bahan dasar gula?",
        answer: [
            {text: "tebu", correct: true},
            {text: "tomat", correct: false},
            {text: "cabai", correct: false},
            {text: "semangka", correct: false},
        ]
    },
    {
        question: "sebutkan negara asia di bawah ini, kecuali?",
        answer: [
            {text: "Korea", correct: false},
            {text: "Jepang", correct: false},
            {text: "Indonesia", correct:false},
            {text: "Russia", correct:true},
        ]
    }
];

const questionElemenent = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = question[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1; 
    questionElemenent.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
    const buttons = document.createElement("button");
    buttons.innerHTML = answer.text;
    buttons.classList.add("btn");
    answerButtons.appendChild(buttons);
    if(answer.correct){
        buttons.dataset.correct = answer.correct;
    }
    buttons.addEventListener("click", selectAnswer);
    });
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect")
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElemenent.innerHTML = `Nilai kamu adalah ${score} dari ${question.length}!`;
    nextButton.innerHTML = "Apakah kamu ingin bermain lagi?";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < question.length){
        showQuestion();
    }else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < question.length){
       handleNextButton();
   }else{
       startQuiz();
       }
   });

startQuiz();
