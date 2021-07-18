// DOM element global variables
var quizStartEl = document.querySelector("#quiz-start");
var quizStartBtn = document.querySelector("#quiz-start-btn");

// quiz start button event listener
quizStartBtn.addEventListener("mousedown", function() {
  quizStartBtn.className = "btn-primary btn-primary-mousedown";
});

quizStartBtn.addEventListener("click", function() {
  // create the first question element
  var questionEl = document.createElement("div");
  questionEl.className = "question-flex";
  questionEl.innerHTML = 
    '<div class="question"><h3>This is my sample question 1. What is the answer?</h3><ol class="answers"><li><button type="button" class="btn-primary btn-1"><p>1. Answer a is long.</p></button></li><li><button type="button" class="btn-primary btn-2"><p>2. Answer b.</p></button></li><li><button type="button" class="btn-primary btn-3"><p>3. Answer c is longer.</p></button></li><li><button type="button" class="btn-primary btn-4"><p>4. Answ.</p></button></li></ol></div>';
  quizStartEl.replaceWith(questionEl);

  var quizBtnObj = {
    1: document.querySelector(".btn-1"),
    2: document.querySelector(".btn-2"),
    3: document.querySelector(".btn-3"),
    4: document.querySelector(".btn-4")
  };

  
});


