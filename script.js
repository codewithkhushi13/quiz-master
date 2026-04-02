const quizData = {
  gk: [
    {
      question: "Capital of India?",
      options: ["Mumbai", "Delhi", "Chennai", "Kolkata"],
      answer: "Delhi"
    },
    {
      question: "National animal of India?",
      options: ["Lion", "Tiger", "Elephant", "Cow"],
      answer: "Tiger"
    },
    {
      question: "Who is the Prime Minister of India (2024)?",
      options: ["Rahul Gandhi", "Narendra Modi", "Amit Shah", "Arvind Kejriwal"],
      answer: "Narendra Modi"
    },
    {
      question: "Which planet is known as Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Venus"],
      answer: "Mars"
    },
    {
      question: "Largest ocean in the world?",
      options: ["Atlantic", "Indian", "Pacific", "Arctic"],
      answer: "Pacific"
    },
    {
      question: "Which festival is known as Festival of Lights?",
      options: ["Holi", "Diwali", "Eid", "Christmas"],
      answer: "Diwali"
    },
    {
      question: "How many continents are there?",
      options: ["5", "6", "7", "8"],
      answer: "7"
    },
    {
      question: "Which country is known as Land of Rising Sun?",
      options: ["China", "Japan", "India", "Thailand"],
      answer: "Japan"
    }
  ],

  tech: [
    {
      question: "HTML stands for?",
      options: ["Hyper Text Markup Language", "High Text Machine", "Code", "None"],
      answer: "Hyper Text Markup Language"
    },
    {
      question: "JavaScript is used for?",
      options: ["Styling", "Logic", "Database", "Design"],
      answer: "Logic"
    },
    {
      question: "CSS is used for?",
      options: ["Structure", "Styling", "Database", "Logic"],
      answer: "Styling"
    },
    {
      question: "Which is NOT a programming language?",
      options: ["Python", "HTML", "Java", "C++"],
      answer: "HTML"
    },
    {
      question: "Which company developed JavaScript?",
      options: ["Microsoft", "Netscape", "Google", "Apple"],
      answer: "Netscape"
    },
    {
      question: "Which tag is used for heading in HTML?",
      options: ["<p>", "<h1>", "<div>", "<span>"],
      answer: "<h1>"
    },
    {
      question: "Which symbol is used for comments in JavaScript?",
      options: ["//", "##", "<!-- -->", "**"],
      answer: "//"
    },
    {
      question: "Which is used to connect CSS?",
      options: ["<script>", "<style>", "<link>", "<css>"],
      answer: "<link>"
    }
  ]
};

let currentQuestion = 0;
let score = 0;
let selectedAnswer = "";
let quiz = [];
let timeLeft = 10;
let timer;

document.getElementById("loginBtn").addEventListener("click", function() {
  const username = document.getElementById("username").value.trim();
  if (!username) { alert("Enter your name"); return; }

  localStorage.setItem("username", username);

  
  document.getElementById("loginBox").style.display = "none";
  document.getElementById("categoryBox").style.display = "block";
});

function startQuiz(category) {
  quiz = quizData[category];
  currentQuestion = 0;
  score = 0;
  document.getElementById("categoryBox").style.display = "none";
  document.querySelector(".quiz-container").style.display = "block";
  loadQuestion();
}

function loadQuestion() {
  const q = quiz[currentQuestion];

timeLeft = 10;
document.getElementById("timer").innerText = "Time: " + timeLeft;

clearInterval(timer);

timer = setInterval(() => {
  timeLeft--;
  document.getElementById("timer").innerText = "Time: " + timeLeft;

  if (timeLeft === 0) {
    clearInterval(timer);
    nextQuestion();
  }
}, 1000);

  document.getElementById("question").innerText = q.question;
  
  document.getElementById("progressText").innerText =
    "Question " + (currentQuestion + 1) + " of " + quiz.length;

  let progressPercent = ((currentQuestion + 1) / quiz.length) * 100;
  document.getElementById("progressBar").style.width = progressPercent + "%";

  const optionsDiv = document.getElementById("options");
  optionsDiv.innerHTML = "";

  q.options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;

    btn.onclick = function () {
      selectedAnswer = option;

      const buttons = document.querySelectorAll("#options button");

      buttons.forEach(b => {
        b.disabled = true; // disable all after click

        if (b.innerText === q.answer) {
          b.style.background = "#28a745";
        }

        if (b.innerText === selectedAnswer && selectedAnswer !== q.answer) {
          b.style.background = "#dc3545";
        }
      });

      document.getElementById("nextBtn").disabled = false;
    };

    optionsDiv.appendChild(btn);
  });

  document.getElementById("nextBtn").disabled = true;
}

function nextQuestion() {
  clearInterval(timer);

  if (selectedAnswer === quiz[currentQuestion].answer) score++;

  currentQuestion++;
  if (currentQuestion < quiz.length) {
    loadQuestion();
  } else {
    document.getElementById("question").style.display = "none";
    document.getElementById("options").style.display = "none";
    document.getElementById("nextBtn").style.display = "none";
    document.getElementById("progressText").style.display = "none";
    document.getElementById("progressBar").style.display = "none";
    document.getElementById("timer").style.display = "none";

    let message = "";
    if (score === quiz.length) 
      message = "Excellent! 🎯";
    else if (score >= quiz.length / 2) 
      message = "Good 👍";
    else 
      message = "Keep practicing 💪";

    const scoreEl = document.getElementById("score");
    scoreEl.innerText = `${message} 🎉 Your Score: ${score}/${quiz.length}`;
    scoreEl.style.display = "block";
  }
}

function restartQuiz() {
  location.reload();
}

