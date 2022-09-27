//Questions array
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
// score will be used for the timer
var score = 75;
//number of highscores allowed
var numHs = 5;
//highscore variables
var highScore = `highScores`;
var highScores = JSON.parse(localStorage.getItem(highScores)) ?? [];
var highScoreString = localStorage.getItem(highScore);
//used for timer, made it a global var so i can clear the interval in other functions
var timeInterval;
//dom elements
var timeEl = document.querySelector(".time");
var quizMenu = document.querySelector(`.main-menu`);
var quizQuestions = document.querySelector(`.quiz-questions`);
//will be used as an indicator of the questions array index
var questionNumber = 0;
//////////////////////////////////////////////////////////////////////
//Functions: I numbered them according to the order

// clears local storage and the dom element holding highscores
function clearHighScores() {
  localStorage.clear(`highScores`);
  var highScoreList = document.querySelector(`.high-scores`);
  highScoreList.innerHTML = "";
}

// allows us to go back to the menu and reset everything
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

//8. clears interval incase its called during the quiz, and adds the highscores sored in the local storage to the dom
function displayHighScores() {
  clearInterval(timeInterval);
  var highScoreList = document.querySelector(`.high-scores`);
  highScoreList.innerHTML = highScores
    .map((score) => `<li>${score.name} - ${score.score}</li>`)
    .join(``);

  document.querySelector(`.highscore-list`).classList.remove(`hidden`);
  document.querySelector(`.highscore-menu`).classList.add(`hidden`);
  quizMenu.classList.add(`hidden`);
  quizQuestions.classList.add("hidden");
}

//7. grabs the initials input and saves it with the score in an object, it sorts is based on highest to lowest score and gets rid of any scores that exceed the number of highscores allowed to be saved
function saveHighScore(score, highScores) {
  var name = document.querySelector(`#initials-input`).value;
  var newScore = { score, name };
  highScores.push(newScore);
  highScores.sort((a, b) => b.score - a.score);
  highScores.splice(numHs);
  localStorage.setItem(highScore, JSON.stringify(highScores));

  displayHighScores();
}

//6. makes sure the score is not negative and calls saveHighScore so it can be saved
function checkHighScore() {
  if (score < 0) score = 0;
  saveHighScore(score, highScores);
}

//5. Displays hishscore menu and adds event to submit button
var showHighscoreMenu = function () {
  clearInterval(timeInterval);
  quizQuestions.classList.add(`hidden`);
  document.querySelector(`.highscore-menu`).classList.remove(`hidden`);
  //allows it to not display negative values
  if (score >= 0) {
    document.querySelector(`.final-score`).textContent = score;
  } else {
    document.querySelector(`.final-score`).textContent = `0`;
  }
  var submitBtn = document.querySelector(`.submit-btn`);
  submitBtn.addEventListener(`click`, checkHighScore);
  //resets the question number, the timer and the result element
  questionNumber = 0;
  timeEl.textContent = 0;
  document.querySelector(`.result`).textContent = "";
};

// 1. Starts the timer and calls for displayQuiz function
function startQuiz() {
  //Starts timer
  setTimer();
  displayQuiz(questionNumber);
}

// 2.A starts timer and updates the time element, if score is 0 or below (negative) it will make the score = 0 to overwrite any negative values and send you to the end of the quiz
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

// 2.B Displays the current question from the questions array, starting at index 0
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

//4. Checks if the clicked option has the "correct" data-state, if so it adds 1 to the questionNumber which is the index of the questions array, displays correct, switches the data-state back to `incorrect`, and if theres another question it will call displayQuiz once more with the updated index (therefore showing the next question). If the data-state is `incorrect` the same will happen but it will deduct 10 from the score/timer. This will loop until there are no questions left
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

//3. Evaluates which option of the current question is the right answer and changes the data-state to "correct" while the rest remain "incorrect" then adds the click event to the options which will then trigger the checkAnswer function when clicked
var evaluateAnswer = function () {
  var currentQuestion = questions[questionNumber];
  var currentAnswer = currentQuestion.answer;
  console.log(currentAnswer);

  var correctAnswer = document.querySelector(`.${currentAnswer}`);
  correctAnswer.setAttribute(`data-state`, `correct`);
  var optionContainer = document.querySelector(`.options`);
  optionContainer.addEventListener(`click`, checkAnswer);
};

//click events
document.querySelector(`.start-btn`).addEventListener(`click`, startQuiz);

document
  .querySelector(`.high-scores-nav`)
  .addEventListener(`click`, displayHighScores);

document.querySelector(`.back-btn`).addEventListener(`click`, backToMenu);

document.querySelector(`.clear-btn`).addEventListener(`click`, clearHighScores);
