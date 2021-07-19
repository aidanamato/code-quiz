// DOM element global variables
var quizStartEl = document.querySelector("#quiz-start");
var quizStartBtn = document.querySelector("#quiz-start-btn");
var quizTimerEl = document.querySelector("#quiz-timer");

var timer = 75;
var questionIterator = 0;

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
  var timerInterval = setInterval(function() {
    // stop timer after it reaches 0
    if (timer <= 0) {
      clearInterval(timerInterval);
      return;
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
  console.log(answerConfirmParEl);

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
    } else {
      // if the answer is incorrect, minus 10 seconds from the timer and display incorrect
      timer = timer - 10;
      if (timer >= 0) {
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
  console.log("The quiz is over!");
}

// quiz start button event listener
quizStartBtn.addEventListener("mousedown", function() {
  quizStartBtn.className = "btn-primary btn-primary-mousedown";
});

quizStartBtn.addEventListener("click", startQuiz);


