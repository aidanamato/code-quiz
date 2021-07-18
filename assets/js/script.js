// DOM element global variables
var quizStartEl = document.querySelector("#quiz-start");
var quizStartBtn = document.querySelector("#quiz-start-btn");
var quizTimerEl = document.querySelector("#quiz-timer");

// quiz timer function
function timerStart() {
  var timer = 75;
  
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

// question bank with innerHTML
var questionBankObj = {
  // Which of these variables is an array? 1. var arr = (a, b, c, d), 2. var arr = [a, b, c, d], 3. var arr = {a, b, c, d}, 4. var arr = <a, b, c, d>
  1: '<div class="question"><h3>Which of these variables is an array?</h3><ol class="answers"><li><button type="button" class="btn-primary btn-1"><p>1. var arr = ("a", "b", "c", "d")</p></button></li><li><button type="button" class="btn-primary btn-2"><p>2. var arr = ["a", "b", "c", "d"]</p></button></li><li><button type="button" class="btn-primary btn-3"><p>3. var arr = {"a", "b", "c", "d"}</p></button></li><li><button type="button" class="btn-primary btn-4"><p>4. var arr = &lt"a", "b", "c", "d"&gt</p></button></li></ol></div>',
}

// quiz start button event listener
quizStartBtn.addEventListener("mousedown", function() {
  quizStartBtn.className = "btn-primary btn-primary-mousedown";
});

quizStartBtn.addEventListener("click", function() {
  // create the first question element
  var questionEl = document.createElement("div");
  questionEl.className = "question-flex";
  // retrieve question from questionBankObj
  questionEl.innerHTML = questionBankObj[1];
  quizStartEl.replaceWith(questionEl);

  timerStart();

  var quizBtnObj = {
    1: document.querySelector(".btn-1"),
    2: document.querySelector(".btn-2"),
    3: document.querySelector(".btn-3"),
    4: document.querySelector(".btn-4")
  };

  
});


