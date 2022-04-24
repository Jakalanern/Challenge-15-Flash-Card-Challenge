// VARIABLES

let alert = document.querySelector(".alert");

// CREATE BOX STUFF
let createBtn = document.querySelector(".create-button");
let createBox = document.querySelector(".create-box");
let questionInput = document.querySelector(".question-input");
let answerInput = document.querySelector(".answer-input");
let saveBtn = document.querySelector(".save-button");
let clearBtn = document.querySelector(".clear-button");
let x = document.querySelector(".x");

// CARD STUFF
let card = document.querySelector(".card");
let answer = document.querySelector(".answer");
let showHide = document.querySelector("a");
let editBtn = document.querySelector(".edit");
let deleteBtn = document.querySelector(".delete");

// MISC
let count = 0;
let flashcards = [];

// QUERY SELECTOR ALL'S
// let deleteBtns = document.querySelectorAll(".delete");
// let showHides = document.querySelectorAll("a");
// let questions = document.querySelectorAll(".question");
// let answers = document.querySelectorAll(".answer");
// let editBtns = document.querySelectorAll(".edit");

// ***************************

// MAIN

//Hide some stuff
card.style.display = "none";
// *************

// CREATE BOX STUFF
createBtn.addEventListener("click", function () {
  showHideAnim();
});

x.addEventListener("click", function () {
  showHideAnim();
});

saveBtn.addEventListener("click", function () {
  if (questionInput.value !== "" && answerInput.value !== "") {
    saveCardData();
    createCard();
    questionInput.value = "";
    answerInput.value = "";
  } else {
    inputAlert();
  }
});

clearBtn.addEventListener("click", function () {
  if (questionInput.value !== "" && answerInput.value != "") {
    clearData();
  } else {
    clearAlert();
  }
});

// FUNCTIONS

function showHideAnim() {
  if (createBox.classList.contains("visible")) {
    createBox.classList.remove("visible");
    createBox.classList.add("invisible");
  } else {
    createBox.classList.add("visible");
    createBox.classList.remove("invisible");
  }
}

function clearData() {
  questionInput.value = "";
  questionValue = "";
  answerInput.value = "";
  answerValue = "";
}

function clearAlert() {}

function saveCardData() {
  cardData = { question: questionInput.value, answer: answerInput.value };
  flashcards.push(cardData);
}

function createCard() {
  //Create Card
  newCard = card.cloneNode(true);
  newCard.setAttribute("id", count);
  //Set question and answer from object
  let newCardQuestion = newCard.children[0];
  let newCardAnswer = newCard.children[2];
  newCardQuestion.innerHTML = flashcards[count].question;
  newCardAnswer.innerHTML = flashcards[count].answer;

  // Push element into the DOM
  card.before(newCard);
  // Reveal the card
  newCard.style.display = "flex";
  // Query Select the new Elements that have been created
  showHides = document.querySelectorAll("a");
  editBtns = document.querySelectorAll(".edit");
  deleteBtns = document.querySelectorAll(".delete");
  answers = document.querySelectorAll(".answer");

  for (let answer of answers) {
    answer.classList.add("hidden");
  }

  for (let btn of deleteBtns) {
    btn.addEventListener("click", function () {
      deleteCard(btn);
    });
  }

  for (let showHide of showHides) {
    showHide.addEventListener("click", function (e) {
      e.preventDefault();
    });
  }

  for (let a of showHides) {
    a.addEventListener("click", toggleAnswer);
  }

  for (let btn of editBtns) {
    btn.addEventListener("click", function () {
      editCard(btn);
      deleteCard(btn);
    });
  }

  // Increment count
  count++;
}

function editCard(btn) {
  console.dir(btn);
  questionInput.value =
    btn.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.innerHTML;
  answerInput.value = btn.parentElement.previousElementSibling.innerHTML;
  btn.parentElement;
}

function deleteCard(btn) {
  btn.parentElement.parentElement.remove();
}

function toggleAnswer() {
  if (this.nextElementSibling.classList.contains("hidden")) {
    this.nextElementSibling.classList.remove("hidden");
    this.nextElementSibling.classList.add("revealed");
  } else if (this.nextElementSibling.classList.contains("revealed")) {
    this.nextElementSibling.classList.remove("revealed");
    this.nextElementSibling.classList.add("hidden");
  }
}

function inputAlert() {
  alert.style.opacity = "1";
  setTimeout(function () {
    alert.style.opacity = "0";
  }, 1000);
}
