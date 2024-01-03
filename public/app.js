const questions = [
  {
    question: "what's the largest animal ?",
    answer: [
      { text: "shark", correct: false },
      { text: "blue whale", correct: true },
      { text: "elephant", correct: false },
      { text: "giraffe", correct: false },
    ],
  },
  {
    question: "what's the smmalest country ?",
    answer: [
      { text: "vaticna city", correct: true },
      { text: "buhtan ", correct: false },
      { text: "nepal", correct: false },
      { text: "shri lanka", correct: false },
    ],
  },
  {
    question: "what's the largest desert ?",
    answer: [
      { text: "kalahari", correct: false },
      { text: "gobi ", correct: false },
      { text: "sahra", correct: false },
      { text: "antartica", correct: true },
    ],
  },
  {
    question: "what's the smallest continent ?",
    answer: [
      { text: "Asia", correct: false },
      { text: "australia ", correct: true },
      { text: "europe", correct: false },
      { text: "africa", correct: false },
    ],
  },
];

const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-btns");
const nextButton = document.getElementById("next-btn");
const previousButton = document.getElementById("back-btn");
const startButton = document.getElementById("start-btn");
const resetButton = document.getElementById("reset-btn");

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = [];

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  selectedAnswers = [];
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNum = currentQuestionIndex + 1;

  questionElement.innerHTML = questionNum + "." + currentQuestion.question;

  currentQuestion.answer.forEach((answer, index) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButton.appendChild(button);

    if (selectedAnswers[currentQuestionIndex] === index) {
      button.classList.add("selected");
    }

    button.addEventListener("click", () => selectAnswer(index));
  });
  nextButton.disabled = true;
  previousButton.disabled = true;

  nextButton.style.display = "block";
  previousButton.style.display = "block";
}

function resetState() {
  resetButton.style.display = "none";
  nextButton.style.display = "none";
  previousButton.style.display = "none";
  while (answerButton.firstChild) {
    answerButton.removeChild(answerButton.firstChild);
  }
  // Clear selected and correct classes
  Array.from(answerButton.children).forEach((button) => {
    button.classList.remove("selected", "correct");
  });
}

resetButton.addEventListener("click", startQuiz);

function selectAnswer(index) {
  Array.from(answerButton.children).forEach((button) => {
    button.classList.remove("selected", "correct");
  });

  answerButton.children[index].classList.add("selected");

  Array.from(answerButton.children).forEach((button) => {
    button.disabled = false;
  });

  // Update the score based on the change in answer
  if (selectedAnswers[currentQuestionIndex] !== undefined) {
    score -= questions[currentQuestionIndex].answer[
      selectedAnswers[currentQuestionIndex]
    ].correct
      ? 1
      : 0;
  }

  // Update the selected answer
  selectedAnswers[currentQuestionIndex] = index;

  // Update the score based on the newly selected answer
  score += questions[currentQuestionIndex].answer[index].correct ? 1 : 0;

  nextButton.disabled = false;
  previousButton.disabled = false;
  // Always show the "Next" button
  nextButton.style.display = "block";
  previousButton.style.display = "block";
}
function handleNext() {
  if (selectedAnswers[currentQuestionIndex] !== undefined) {
    score += questions[currentQuestionIndex].answer[
      selectedAnswers[currentQuestionIndex]
    ].correct
      ? 1
      : 0;
  }

  currentQuestionIndex++;

  if (questions.length > currentQuestionIndex) {
    showQuestion();
  } else {
    showScore();
    // Always display the "Next" button at the end
    nextButton.style.display = "block";
  }
}

let previousScore = null; 

async function showScore() {
  resetState();

  try {
    const token = localStorage.getItem("token");

    const response = await axios.get("/score", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.data.score !== undefined) {
      previousScore = response.data.score;
    } else {
      previousScore = null;
    }

    await axios.post(
      "/score",
      { score },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (previousScore !== null) {
      questionElement.innerHTML = `You scored ${score} out of ${questions.length}. Previous score: ${previousScore.score}`;
    } else {
      questionElement.innerHTML = `You scored ${score} out of ${questions.length}. First time!`;
    }

    resetButton.style.display = "block";
  } catch (error) {
    console.error(error);
  }
}

nextButton.addEventListener("click", () => {
  const selectedBtn = answerButton.querySelector(".selected");
  const isCorrect = selectedBtn && selectedBtn.dataset.correct === "true";

  if (selectedBtn && isCorrect) {
    score++;
    selectedBtn.classList.add("correct");
  }

  if (currentQuestionIndex < questions.length - 1) {
    currentQuestionIndex++;
    showQuestion();
  } else {
    showScore();
  }
});
previousButton.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    showQuestion();
  } else {
    alert("You are at the first question.");
  }
});

startQuiz();
