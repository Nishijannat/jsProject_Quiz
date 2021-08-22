var quiz = {
  // (A) PROPERTIES
  // (A1) QUESTIONS & ANSWERS
  // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWER
  data: [
  {
    
    q : "What are the four major layers on the Earth's core?",
    o : [
      "The inner core, the outer core, the mantle, the crust",
      "The mantle, the outside core, the indoor core, the layers",
      "There are no major layers",
      "The crust, the butter, the mix"
    ],
    a : 0 // arrays start with 0
  },
  {
    q : "What is the Earth's core made up of?",
    o : [
      "Rock and Metal",
      "Rock and Salt",
      "Rock",
      "water"
    ],
    a : 0
  },
  {
    q : "What are the Tectonic Plates?",
    o : [
      "The Earth's cover",
      "When plates slide past each other",
      "When plates slide past each other",
      "The Earth’s surface that consist of a number of rigid, but moving pieces or plates"
    ],
    a : 3
  },
  
  {
    q : "Which is the largest ocean on Earth?",
    o : [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean"
    ],
    a : 3
  }
  ],

  
  hWrap: null, // HTML quiz container
  hQn: null, // HTML question wrapper
  hAns: null, // HTML answers wrapper

  
  now: 0, // current question // flugs
  score: 0, // current score


  init: function(){
    
    quiz.hWrap = document.getElementById("quizWrap");

    
    quiz.hQn = document.createElement("div"); //  QUESTIONS SECTION
    quiz.hQn.id = "quizQn";
    quiz.hWrap.appendChild(quiz.hQn);

    
    quiz.hAns = document.createElement("div");  // ANSWERS 
    quiz.hAns.id = "quizAns";
    quiz.hWrap.appendChild(quiz.hAns);

    
    quiz.draw();
  },

  
  draw: function(){
    
    quiz.hQn.innerHTML = quiz.data[quiz.now].q; //  QUESTION

    
    quiz.hAns.innerHTML = "";   //  OPTIONS
    for (let i in quiz.data[quiz.now].o) {
      let radio = document.createElement("input");
      radio.type = "radio";
      radio.name = "quiz";
      radio.id = "quizo" + i;
      quiz.hAns.appendChild(radio);
      let label = document.createElement("label");
      label.innerHTML = quiz.data[quiz.now].o[i];
      label.setAttribute("for", "quizo" + i);
      label.dataset.idx = i;
      label.addEventListener("click", quiz.select);
      quiz.hAns.appendChild(label);
    }
  },

  //  OPTION SELECTED
  select: function(){
    // (D1) DETACH ALL ONCLICK
    let all = quiz.hAns.getElementsByTagName("label");
    for (let label of all) {
      label.removeEventListener("click", quiz.select);
    }

    //  CHECK IF CORRECT
    let correct = this.dataset.idx == quiz.data[quiz.now].a;
    if (correct) {
      quiz.score++;
      this.classList.add("correct");
    } else {
      this.classList.add("wrong");
    }

    //  NEXT QUESTION OR END GAME
    quiz.now++;
    setTimeout(function(){
      if (quiz.now < quiz.data.length) { quiz.draw(); }
      else {
        quiz.hQn.innerHTML = `You have answered ${quiz.score} of ${quiz.data.length} correctly.`;
        quiz.hAns.innerHTML = "";
      }
    }, 1000);
  },

  // (E) RESTART QUIZ
  reset : function () {
    quiz.now = 0;
    quiz.score = 0;
    quiz.draw();
  }
};
window.addEventListener("load", quiz.init);
