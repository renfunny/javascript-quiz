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

var score = 75;
var numHs = 5;
var highScore = `highScores`;
var highScores = JSON.parse(localStorage.getItem(highScores)) ?? [];
var highScoreString = localStorage.getItem(highScore);
var timeInterval;
var timeEl = document.querySelector(".time");
var quizMenu = document.querySelector(`.main-menu`);
var quizQuestions = document.querySelector(`.quiz-questions`);
var questionNumber = 0;

function clearHighScores() {
  localStorage.clear(`highScores`);
}

function backToMenu() {
  document.querySelector(`.highscore-list`).classList.add(`hidden`);
  document.querySelector(`.highscore-menu`).classList.add(`hidden`);

  quizMenu.classList.remove(`hidden`);
  quizQuestions.classList.add("hidden");
  score = 75;
  questionNumber = 0;
  timeEl.textContent = 0;
  document.querySelector(`.result`).textContent = "";
}

function displayHighScores() {
  var highScoreList = document.querySelector(`.high-scores`);
  highScoreList.innerHTML = highScores
    .map((score) => `<li>${score.name} - ${score.score}</li>`)
    .join(``);

  document.querySelector(`.highscore-list`).classList.remove(`hidden`);
  document.querySelector(`.highscore-menu`).classList.add(`hidden`);
  quizMenu.classList.add(`hidden`);
  quizQuestions.classList.add("hidden");
}

function saveHighScore(score, highScores) {
  var name = document.querySelector(`#initials-input`).value;
  var newScore = { score, name };
  highScores.push(newScore);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(numHs);
  localStorage.setItem(highScore, JSON.stringify(highScores));

  displayHighScores();
}

function checkHighScore() {
  var lowestScore = highScores[numHs - 1]?.score ?? 0;

  if (score > lowestScore) {
    saveHighScore(score, highScores);
    // showHighScores();
  }
}

//Displays hishscore menu and adds event to submit button
var showHighscoreMenu = function () {
  clearInterval(timeInterval);
  quizQuestions.classList.add(`hidden`);
  document.querySelector(`.highscore-menu`).classList.remove(`hidden`);
  document.querySelector(`.final-score`).textContent = score;

  var submitBtn = document.querySelector(`.submit-btn`);
  submitBtn.addEventListener(`click`, checkHighScore);

  questionNumber = 0;
  timeEl.textContent = 0;
  document.querySelector(`.result`).textContent = "";
};

//Starts the timer and calls for displayQuiz function once
function startQuiz() {
  //Starts timer
  setTimer();
  var done = false;
  if (!done) {
    done = true;
    displayQuiz(questionNumber);
  }
}

function setTimer() {
  timeInterval = setInterval(function () {
    score--;
    timeEl.textContent = score;
    if (score === 0 || score < 0) {
      clearInterval(timeInterval);
      score = 0;
      showHighscoreMenu();
    }
  }, 1000);
}

//Displays the current question from the questions array, starting at index 0
var displayQuiz = function (questionNumber) {
  //Hides the main menu
  quizMenu.classList.add(`hidden`);
  //Displays quiz questions
  quizQuestions.classList.remove("hidden");
  var currentQuestion = questions[questionNumber];
  document.querySelector(`.question`).textContent = currentQuestion.question;
  document.querySelector(`.optionA`).textContent = currentQuestion.optionA;
  document.querySelector(`.optionB`).textContent = currentQuestion.optionB;
  document.querySelector(`.optionC`).textContent = currentQuestion.optionC;
  document.querySelector(`.optionD`).textContent = currentQuestion.optionD;
  evaluateAnswer();
};

//checks if the clicked option has the "correct" data-state
var checkAnswer = function (event) {
  var userInput = event.target;
  var currentQuestion = questions[questionNumber];
  var currentAnswer = currentQuestion.answer;
  var correctAnswer = document.querySelector(`.${currentAnswer}`);

  if (userInput.matches(`.op`)) {
    var state = userInput.getAttribute(`data-state`);

    if (state === `correct`) {
      questionNumber++;
      document.querySelector(`.result`).textContent = `Correct!`;
      document
        .querySelector(`.${currentAnswer}`)
        .setAttribute(`data-state`, `incorrect`);
      if (questionNumber < questions.length) {
        displayQuiz(questionNumber);
      } else {
        showHighscoreMenu();
      }
    } else {
      questionNumber++;
      score -= 10;
      document.querySelector(`.result`).textContent = `Wrong!`;
      correctAnswer.setAttribute(`data-state`, `incorrect`);
      if (questionNumber < questions.length) {
        displayQuiz(questionNumber);
      } else {
        showHighscoreMenu();
      }
    }
  }
};

//Evaluates which option of the current question is the right answer and changes the data-state to "correct" while the rest remain "incorrect" then adds the click event to the options which will then trigger the checkAnswer function when clicked
var evaluateAnswer = function () {
  var currentQuestion = questions[questionNumber];
  var currentAnswer = currentQuestion.answer;
  console.log(currentAnswer);

  var correctAnswer = document.querySelector(`.${currentAnswer}`);
  correctAnswer.setAttribute(`data-state`, `correct`);
  var optionContainer = document.querySelector(`.options`);
  optionContainer.addEventListener(`click`, checkAnswer);
};

document.querySelector(`.start-btn`).addEventListener(`click`, startQuiz);

document
  .querySelector(`.high-scores-nav`)
  .addEventListener(`click`, displayHighScores);

document.querySelector(`.back-btn`).addEventListener(`click`, backToMenu);

document.querySelector(`.clear-btn`).addEventListener(`click`, clearHighScores);
