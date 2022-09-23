var score = 75;
var highScores = [];

//Timer
var timeEl = document.querySelector(".time");
function setTimer() {
  var timeInterval = setInterval(function () {
    score--;
    timeEl.textContent = score;
    if (score === 0) {
      clearInterval(timeInterval);
    }
  }, 1000);
}

//Questions
var questions = [
  {
    question: `Which of the following is NOT a data type?`,
    optionA: `strings`,
    optionB: `booleans`,
    optionC: `alerts`,
    optionD: `numbers`,
    answer: `optionC`,
  },
  {
    question: `What is the difference between "==" and "==="`,
    optionA: `"==" compares values and "===" compares variables`,
    optionB: `"==" compares types and "===" compares values`,
    optionC: `"==" compares types and "===" compares types much faster`,
    optionD: `"==" compares values and "===" compares both values and types`,
    answer: `optionD`,
  },
  {
    question: `What must an "if" statement return in order to run the code block?`,
    optionA: `true`,
    optionB: `undefined`,
    optionC: `false`,
    optionD: `null`,
    answer: `optionA`,
  },
  {
    question: `What does NaN mean in JavaScript?`,
    optionA: `Number after Number`,
    optionB: `Non-avaliable Number`,
    optionC: `Not a Number`,
    optionD: `Number avalible Now`,
    answer: `optionC`,
  },
  {
    question: `Which variable CANNOT be declared with an empty value?`,
    optionA: `const`,
    optionB: `let`,
    optionC: `var`,
    optionD: `None of the above`,
    answer: `optionA`,
  },
  {
    question: `What type of value will result in the following: "23" + 10 - "2"`,
    optionA: `number`,
    optionB: "string",
    optionC: `undefined`,
    optionD: `NaN`,
    answer: `optionA`,
  },
  {
    question: `Which of the following is NOT a falsy value?`,
    optionA: `0`,
    optionB: `""`,
    optionC: `NaN`,
    optionD: `None of the above`,
    answer: `optionD`,
  },
  {
    question: `Which of the following will result in a "true" value?`,
    optionA: `(true && true)`,
    optionB: `(true && false)`,
    optionC: `(false && true)`,
    optionD: `(false && false)`,
    answer: `optionA`,
  },
];
var questionNumber = 0;
var quizMenu = document.querySelector(`.main-menu`);
var quizQuestions = document.querySelector(`.quiz-question`);
var displayQuiz = function (questionNumber) {
  //Hides the main menu
  quizMenu.classList.add(`hidden`);
  //Displays quiz questions
  quizQuestions.classList.remove("hidden");
  //Starts timer
  setTimer();
  var currentQuestion = questions[questionNumber];
  document.querySelector(`.question`).textContent = currentQuestion.question;
  document.querySelector(`.option-A`).textContent = currentQuestion.optionA;
  document.querySelector(`.option-B`).textContent = currentQuestion.optionB;
  document.querySelector(`.option-C`).textContent = currentQuestion.optionC;
  document.querySelector(`.option-D`).textContent = currentQuestion.optionD;
};

document.querySelector(`.start-btn`).addEventListener(`click`, displayQuiz);
