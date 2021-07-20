// DOM element global variables
var quizStartEl;
var quizStartBtn;
var quizTimerEl;
var viewScoresEl;

var timer;
var timerInterval;
var questionIterator;
var correctCounter;

// array for local storage
var scoresArr = JSON.parse(localStorage.getItem("userScores"));
if (!scoresArr) {
  scoresArr = [];
};

// question bank with innerHTML
var questionBankArr = [
  // Which of these variables is an array? 1. var arr = (a, b, c, d), 2. var arr = [a, b, c, d] (correct), 3. var arr = {a, b, c, d}, 4. var arr = &lta, b, c, d&gt
  '<div class="question"><h3>Which of these variables is an array?</h3><ol class="answers"><li><button type="button" class="btn-primary incorrect"><p>1. var arr = ("a", "b", "c", "d")</p></button></li><li><button type="button" class="btn-primary correct"><p>2. var arr = ["a", "b", "c", "d"]</p></button></li><li><button type="button" class="btn-primary incorrect"><p>3. var arr = {"a", "b", "c", "d"}</p></button></li><li><button type="button" class="btn-primary incorrect"><p>4. var arr = &lt"a", "b", "c", "d"&gt</p></button></li></ol></div>',

  // Which of these values is <b>not<b> a truthy value? 1. "false", 2. [], 3. {}, 4. "" (correct)
  '<div class="question"><h3>Which of these values is <b>not</b> a truthy value?</h3><ol class="answers"><li><button type="button" class="btn-primary incorrect"><p>1. "false"</p></button></li><li><button type="button" class="btn-primary incorrect"><p>2. []</p></button></li><li><button type="button" class="btn-primary incorrect"><p>3. {}</p></button></li><li><button type="button" class="btn-primary correct"><p>4. ""</p></button></li></ol></div>',

  // What is the shorthand used in Javascript to increase a number by 1? 1. ++ (correct), 2. +1, 3. 1+, 4. +
  '<div class="question"><h3>What is the shorthand used in Javascript to increase a number by 1?</h3><ol class="answers"><li><button type="button" class="btn-primary correct"><p>1. ++</p></button></li><li><button type="button" class="btn-primary incorrect"><p>2. +1</p></button></li><li><button type="button" class="btn-primary incorrect"><p>3. 1+</p></button></li><li><button type="button" class="btn-primary incorrect"><p>4. +</p></button></li></ol></div>',

  // What built in JavaScript object must you access in order to interact with the DOM (Document Object Model)? 1. dom, 2. document (correct), 3. event, 4. jQuery
  '<div class="question"><h3>What built in JavaScript object must you access in order to interact with the DOM (Document Object Model)?</h3><ol class="answers"><li><button type="button" class="btn-primary incorrect"><p>1. dom</p></button></li><li><button type="button" class="btn-primary correct"><p>2. document</p></button></li><li><button type="button" class="btn-primary incorrect"><p>3. event</p></button></li><li><button type="button" class="btn-primary incorrect"><p>4. jQuery</p></button></li></ol></div>',
  
  // What is the file extension used for Javascript files? 1. .js (correct), 2. .jv, 3. .java, 4. .script
  '<div class="question"><h3>What is the file extension used for Javascript files?</h3><ol class="answers"><li><button type="button" class="btn-primary correct"><p>1. .js</p></button></li><li><button type="button" class="btn-primary incorrect"><p>2. .jv</p></button></li><li><button type="button" class="btn-primary incorrect"><p>3.  .java</p></button></li><li><button type="button" class="btn-primary incorrect"><p>4. .script</p></button></li></ol></div>',

  // Which built in Window method is used to repeatedly call a function after a certain amount of time? 1. setTimer(), 2. setRepeat(), 3. setInterval() (correct), 4. setContinual()
  '<div class="question"><h3>Which built in Window method is used to repeatedly call a function after a certain amount of time?</h3><ol class="answers"><li><button type="button" class="btn-primary incorrect"><p>1. setTimer()</p></button></li><li><button type="button" class="btn-primary incorrect"><p>2. setRepeat()</p></button></li><li><button type="button" class="btn-primary correct"><p>3. setInterval()</p></button></li><li><button type="button" class="btn-primary incorrect"><p>4. setContinual()</p></button></li></ol></div>',
  
  // Which of these for loop conditional statements will result in the code block running exactly 6 times? 1. for (var i=0; i<6; i = i+2) {}, 2. for (var i=10; i>=5; i--) {} (correct), 3. for (var i=1; i=7; i++) {}, 4. for (var i=0; i<6; i--) {}
  '<div class="question"><h3>Which of these for loop conditional statements will result in the code block running exactly 6 times?</h3><ol class="answers"><li><button type="button" class="btn-primary incorrect"><p>1. for (var i=0; i<6; i = i+2) {}</p></button></li><li><button type="button" class="btn-primary correct"><p>2. for (var i=10; i>=5; i--) {}</p></button></li><li><button type="button" class="btn-primary incorrect"><p>3. for (var i=1; i=7; i++) {}</p></button></li><li><button type="button" class="btn-primary incorrect"><p>4. for (var i=0; i<6; i--) {}</p></button></li></ol></div>',
  
  // Which of these query selectors would return the first element with a class of "primary"? 1. document.querySelector(.primary), 2. document.querySelector("primary"), 3. document.querySelector("#primary"), 4. document.querySelector(".primary") (correct)
  '<div class="question"><h3>Which of these query selectors would return the first element with a class of "primary"?</h3><ol class="answers"><li><button type="button" class="btn-primary incorrect"><p>1. document.querySelector(.primary)</p></button></li><li><button type="button" class="btn-primary incorrect"><p>2. document.querySelector("primary")</p></button></li><li><button type="button" class="btn-primary incorrect"><p>3. document.querySelector("#primary")</p></button></li><li><button type="button" class="btn-primary correct"><p>4. document.querySelector(".primary")</p></button></li></ol></div>',
  
  // Which of these expressions sets a class of "hero" to the &ltsection&gt element? 1. document.querySelector("section").className = "hero" (correct), 2. document.querySelector("section").addClass = "hero", 3. document.querySelector("section").class = "hero", 4. document.querySelector("section").addClassName = "hero"
  '<div class="question"><h3>Which of these expressions sets a class of "hero" to the &ltsection&gt element?</h3><ol class="answers"><li><button type="button" class="btn-primary correct"><p>1. document.querySelector("section").className = "hero"</p></button></li><li><button type="button" class="btn-primary incorrect"><p>2. document.querySelector("section").addClass = "hero"</p></button></li><li><button type="button" class="btn-primary incorrect"><p>3. document.querySelector("section").class = "hero"</p></button></li><li><button type="button" class="btn-primary incorrect"><p>4. document.querySelector("section").addClassName = "hero"</p></button></li></ol></div>',
  
  // To which object does the "alert()" method belong? 1. browser, 2. console, 3. window (correct), 4. document
  '<div class="question"><h3>To which object does the "alert()" method belong?</h3><ol class="answers"><li><button type="button" class="btn-primary incorrect"><p>1. browser</p></button></li><li><button type="button" class="btn-primary incorrect"><p>2. console</p></button></li><li><button type="button" class="btn-primary correct"><p>3. window</p></button></li><li><button type="button" class="btn-primary incorrect"><p>4. document</p></button></li></ol></div>'
];

// quiz timer function
var timerStart = function() {
  timerInterval = setInterval(function() {
    // end quiz if timer reaches 0
    if (timer <= 0) {
      endScreen();
    } else {
      //countdown the timer
      timer--;
      quizTimerEl.textContent = timer;
    }
  }, 1000);
}

var startQuiz = function () {
  // create the first question element
  var questionEl = document.createElement("section");
  questionEl.setAttribute("id", "quiz-questions");
  questionEl.className = "question-flex";
  
  // create answer confirm element
  var answerConfirmEl = document.createElement("section");
  answerConfirmEl.className = "answer-confirm correct";
  answerConfirmEl.innerHTML = "<p></p>"
  
  // retrieve question from questionBankArr
  questionEl.innerHTML = questionBankArr[questionIterator];
  quizStartEl.replaceWith(questionEl);
  questionEl.after(answerConfirmEl);

  // set the timer on screen
  quizTimerEl.textContent = timer;

  timerStart();
  nextQuestion();
};

var nextQuestion = function() {
  var answersEl = document.querySelector(".answers");
  var questionEl = document.querySelector(".question-flex");
  var answerConfirmEl = document.querySelector(".answer-confirm");
  var answerConfirmParEl = document.querySelector(".answer-confirm p");

  // event listener for style effect
  answersEl.addEventListener("mousedown", function(event) {
    var buttonEl = event.target.closest("button");
    currentClass = buttonEl.className;
    buttonEl.className = currentClass + " btn-primary-mousedown";
  });

  // event listener to change the question/show the end screen
  answersEl.addEventListener("click", function(event) {
    questionIterator++;
    var buttonEl = event.target.closest("button");
    
    // if the answer is correct, display correct on screen
    if (buttonEl.className === "btn-primary correct btn-primary-mousedown") {
      answerConfirmEl.className = "answer-confirm correct";
      answerConfirmParEl.textContent = "Correct!"
      correctCounter++;
    } else {
      // if the answer is incorrect, minus 10 seconds from the timer and display incorrect
      timer = timer - 10;
      if (timer >= 0) {
        quizTimerEl.textContent = timer;
      } else {
        // stop timer from being negative value
        timer = 0;
        quizTimerEl.textContent = timer;
      }
      answerConfirmEl.className = "answer-confirm incorrect";
      answerConfirmParEl.textContent = "Wrong!"
    }

    if (questionIterator < questionBankArr.length) {
    questionEl.innerHTML = questionBankArr[questionIterator];
    nextQuestion();
    } else {
      endScreen();
    }
  });
}

var endScreen = function() {
  clearInterval(timerInterval);
  // retrieve the question section and answer confirm
  var questionEl = document.querySelector(".question-flex");
  var answerConfirmEl = document.querySelector(".answer-confirm");

  // create the end screen element
  var endScreenEl = document.createElement("section");
  endScreenEl.setAttribute("id", "quiz-end");
  endScreenEl.className = "quiz-end";
  endScreenEl.innerHTML = '<h2>Your Final Score</h2><p class="score-report">You got <span class="score">' + correctCounter + '</span> out of 10 questions with <span class="timer">' + timer + '</span> seconds remaining!</p><form class="save-score"><label for="initials">Enter your name to save your score:</label><input type="text"  placeholder="Initials" name="initials" /><button>Save</button></form>';

  // replace questionEl with endScreenEl and remove answer confirm
  questionEl.replaceWith(endScreenEl);
  answerConfirmEl.remove();

  // add event listeners to button
  var endBtnEl = document.querySelector(".save-score button");
  
  endBtnEl.addEventListener("mousedown", function() {
    endBtnEl.className = "btn-end-mousedown";
  });

  endBtnEl.addEventListener("click", function(event) {
    event.preventDefault();

    // get player initials from input element
    userName = document.querySelector("input").value;
    if (!userName) {
      alert("Please enter a valid username!");
      return;
    }

    // add high score to localStorage and load scoreboard
    addScore(userName, correctCounter, timer);
    loadScoreboard();
  });
}

var addScore = function(userName, correct, time) {
  // create object with user info
  var scoreObj = {
    name: userName,
    accuracy: correct,
    secsLeft: time
  };
  console.log(scoreObj);

  // push object to scores array
  scoresArr.push(scoreObj);

  // set updated scores array to localStorage
  localStorage.setItem("userScores", JSON.stringify(scoresArr));
};

var loadScoreboard = function() {
  // remove pointer cursor and event listener
  viewScoresEl.className = "high-scores";
  viewScoresEl.removeEventListener("click", loadScoreboard);
  
  var quizStartCheck = document.querySelector("#quiz-start");
  var quizEndCheck = document.querySelector("#quiz-end");
  var quizQuestionCheck = document.querySelector("#quiz-questions");
  var scoreboardCheck = document.querySelector("#scoreboard");

  // create the scoreboard element
  var scoreboardEl = document.createElement("section");
  scoreboardEl.setAttribute("id", "scoreboard");
  scoreboardEl.className = "scoreboard";
  scoreboardEl.innerHTML = '<h2>High Scores</h2><div class="table-wrapper"><table class="score-table"><tr class="titles"><th>Name</th><th>Questions Correct</th><th>Seconds Remaining</th></tr></table></div><div class="scoreboard-btn-wrapper"><button id="back">Go Back</button><button id="clear">Clear High Scores</button></div>'

  // load scoreboard element from start, end, question, or current scoreboard screen
  if (quizStartCheck) {
    quizStartCheck.replaceWith(scoreboardEl);

  } else if (quizEndCheck) {
    quizEndCheck.replaceWith(scoreboardEl);

  } else if (quizQuestionCheck) {
    quizQuestionCheck.replaceWith(scoreboardEl);

    clearInterval(timerInterval);

    var answerConfirmEl = document.querySelector(".answer-confirm");
    answerConfirmEl.remove();

  } else if (scoreboardCheck) {
    scoreboardCheck.replaceWith(scoreboardEl);
  }

  var scoreTableEl = document.querySelector("table");

  // if score array is empty, add placeholder html
  if (scoresArr.length === 0) {
    for (var i =0; i < 3; i++) {
      var userScoreEl = document.createElement("tr");
      userScoreEl.className = "stats";
      userScoreEl.innerHTML = '<td class="name"></td><td class="question-correct"></td><td class="seconds-remaining"></td>';
      scoreTableEl.appendChild(userScoreEl);
    }
  } else {
    // otherwise populate table element with saved scores
    for (var i = 0; i < scoresArr.length; i++) {
      var userScoreEl = document.createElement("tr");
      userScoreEl.className = "stats";
      userScoreEl.innerHTML = '<td class="name">' + scoresArr[i].name + '</td><td class="question-correct">' + scoresArr[i].accuracy + '</td><td class="seconds-remaining">' + scoresArr[i].secsLeft + '</td>';
      scoreTableEl.appendChild(userScoreEl);
    }
  }

  // add button event listeners
  var backBtn = document.querySelector("#back");
  var clearBtn = document.querySelector("#clear");

  backBtn.addEventListener("mousedown", function() {
    backBtn.className = "scoreboard-btn-mousedown";
  });

  // reset the quiz
  backBtn.addEventListener("click", function() {
    scoreboardEl = document.querySelector("#scoreboard");

    var loadScreenEl = document.createElement("section");
    loadScreenEl.setAttribute("id", "quiz-start");
    loadScreenEl.className = "quiz-start";
    loadScreenEl.innerHTML = '<h1>Coding Quiz Challenge</h1><p>Answer the following questions on JavaScript fundamentals within the time limit. For each incorrect answer you will lose 10 seconds. Can you answer them all before time runs out?</p><button id="quiz-start-btn" class="btn-primary"><p>Start Quiz</p></button>';

    scoreboardEl.replaceWith(loadScreenEl);
    viewScoresEl.className = "high-scores pointer";
    quizReset();
  });

  clearBtn.addEventListener("mousedown", function() {
    clearBtn.className = "scoreboard-btn-mousedown";
  });

  clearBtn.addEventListener("click", function() {
    localStorage.removeItem("userScores");
    scoresArr = [];
    loadScoreboard();
  });
};

var quizReset = function() {
  quizStartEl = document.querySelector("#quiz-start");
  quizStartBtn = document.querySelector("#quiz-start-btn");
  quizTimerEl = document.querySelector("#quiz-timer");
  viewScoresEl = document.querySelector(".high-scores");

  timer = 75;
  timerInterval;
  questionIterator = 0;
  correctCounter = 0;

  // remove timer display
  quizTimerEl.textContent = "";

  // quiz start event listeners
  quizStartBtn.addEventListener("mousedown", function() {
    quizStartBtn.className = "btn-primary btn-primary-mousedown";
  });

  quizStartBtn.addEventListener("click", startQuiz);

  viewScoresEl.addEventListener("click", loadScoreboard);
}

quizReset();


