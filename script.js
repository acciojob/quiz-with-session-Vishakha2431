//your JS code here.

// Do not change code below this line
// This code will just display the questions to the screen
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

let container = document.getElementById("questions");
let btn = document.getElementById("submit");
let score = document.getElementById("score");

// getting saved progress from session storage
let savedAnswers =
  JSON.parse(sessionStorage.getItem("progress")) || {};

// Display questions
function renderQuestions() {
  container.innerHTML = "";

  questions.forEach((item, index) => {
    let div = document.createElement("div");

    div.innerHTML = `<h3>${item.question}</h3>
      ${item.choices
        .map(
          (option) => ` 
          <label>
            <input 
              type="radio"
              name="question-${index}"
              value="${option}"
              ${
                savedAnswers[index] === option ? "checked" : ""
              }
            >
            ${option}
          </label>
          <br>
      `
        )
        .join("")}`;

    container.appendChild(div);
  });

  // add event listeners after rendering
  let radios = document.querySelectorAll(
    "input[type='radio']"
  );

  radios.forEach((radio) => {
    radio.addEventListener("change", (e) => {
      let questionIndex =
        e.target.name.split("-")[1];

      savedAnswers[questionIndex] = e.target.value;

      sessionStorage.setItem(
        "progress",
        JSON.stringify(savedAnswers)
      );
    });
  });
}

renderQuestions();

// submit button
btn.addEventListener("click", () => {
  let finalScore = 0;

  questions.forEach((item, index) => {
    if (savedAnswers[index] === item.answer) {
      finalScore++;
    }
  });

  score.innerText = `Your score is ${finalScore} out of 5.`;

  // save score in local storage
  localStorage.setItem("score", finalScore);
});

// show old score after refresh
let savedScore = localStorage.getItem("score");

if (savedScore !== null) {
  score.innerText = `Your score is ${savedScore} out of 5.`;
}