var quiz = {
    // (A) PROPERTIES
    // (A1) QUESTIONS & ANSWERS
    // Q = QUESTION, O = OPTIONS, A = CORRECT ANSWER
    data: [
    {
      
      q : "How many planets are there in our solar system?",
      o : [
        "8",
        "9",
        "10",
        "11"
      ],
      a : 1 // arrays start with 0
    },
    {
      q : "Which Planet is nearest to sun",
      o : [
        "earth",
        "mars",
        "venus",
        "none"
      ],
      a : 3
    },
    {
      q : "Which Planet have two moons",
      o : [
        "Earth",
        "Mars",
        "Mercury",
        "Venus"
      ],
      a :1
    },
    
    {
      q : "Which is the largest Planet?",
      o : [
        "Jupiter",
        "Phebos",
        "Neptune",
        "None"
      ],
      a : 0
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
  