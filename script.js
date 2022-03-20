// Sheldon Explains YT Vid:https://youtu.be/_PUEoDYpUyQ

// Imports

import { startConfetti, stopConfetti, removeConfetti } from "./confetti.js";

// DOM vars
const playerScore = document.getElementById("playerScore");
const playerChoice = document.getElementById("playerChoice");
const computerScore = document.getElementById("computerScore");
const computerChoice = document.getElementById("computerChoice");
const result = document.getElementById("resultText");
// Player Icons
const playerRock = document.getElementById("playerRock");
const playerPaper = document.getElementById("playerPaper");
const playerScissors = document.getElementById("playerScissors");
const playerLizard = document.getElementById("playerLizard");
const playerSpock = document.getElementById("playerSpock");
// Computer Icons
const computerRock = document.getElementById("computerRock");
const computerPaper = document.getElementById("computerPaper");
const computerScissors = document.getElementById("computerScissors");
const computerLizard = document.getElementById("computerLizard");
const computerSpock = document.getElementById("computerSpock");
// All Icon Array
const allIcons = document.querySelectorAll(".fa-solid");
// Game Choices
const choices = {
  rock: { name: "Rock", defeats: ["scissors", "lizard"] },
  paper: { name: "Paper", defeats: ["rock", "spock"] },
  scissors: { name: "Scissors", defeats: ["paper", "lizard"] },
  lizard: { name: "Lizard", defeats: ["paper", "spock"] },
  spock: { name: "Spock", defeats: ["scissors", "rock"] },
};
// Global Variables
let playerWins = 0;
let computerWins = 0;
let computerSelection = "";

// Player Selection Functionality
// Reset Previous Selection
function clearSelected() {
  allIcons.forEach((icon) => {
    icon.classList.remove("selected");
  });
}

// Computer Selection
function selectRandomForComputer() {
  let computerNum = getRandomInt(1, 5);
  // console.log(computerNum);
  switch (computerNum) {
    case 1:
      computerRock.classList.add("selected");
      computerSelection = "Rock";
      break;
    case 2:
      computerPaper.classList.add("selected");
      computerSelection = "Paper";
      break;
    case 3:
      computerScissors.classList.add("selected");
      computerSelection = "Scissors";
      break;
    case 4:
      computerLizard.classList.add("selected");
      computerSelection = "Lizard";
      break;
    case 5:
      computerSpock.classList.add("selected");
      computerSelection = "Spock";
      break;
    default:
      break;
  }
  computerChoice.textContent = ` ${computerSelection}`;
}

// Setting Scores for Player vs Computer
// update score, update resultext, confetti
function setScores(playerSelection) {
  // console.log(playerSelection, computerSelection);
  if (playerSelection === computerSelection) {
    // stopConfetti();
    result.textContent = "It's a Tie.";
    playerScore.textContent = playerWins;
    computerScore.textContent = computerWins;
  } else {
    const choice = choices[playerSelection.toLowerCase()];
    // console.log(choice.defeats.indexOf(computerSelection.toLowerCase()));
    if (choice.defeats.indexOf(computerSelection.toLowerCase()) > -1) {
      startConfetti();
      // setTimeout(stopConfetti(), 100000);
      result.textContent = "You Won!";
      playerWins += 1;
      playerScore.textContent = playerWins;
      computerScore.textContent = computerWins;
    } else {
      // stopConfetti();
      result.textContent = "You Lost!";
      computerWins += 1;
      playerScore.textContent = playerWins;
      computerScore.textContent = computerWins;
    }
  }
}

// Determines winner based on player selection
function determineWinner(playerSelection) {
  clearSelected();
  selectRandomForComputer();
  setScores(playerSelection);
}

// Player onclick select
function select(playerSelection) {
  // console.log(selection);
  // if (isConfettiRunning()) {
  removeConfetti();
  // }
  determineWinner(playerSelection);
  switch (playerSelection) {
    case "Rock":
      playerRock.classList.add("selected");
      break;
    case "Paper":
      playerPaper.classList.add("selected");
      break;
    case "Scissors":
      playerScissors.classList.add("selected");
      break;
    case "Lizard":
      playerLizard.classList.add("selected");
      break;
    case "Spock":
      playerSpock.classList.add("selected");
      break;
    default:
      break;
  }
  playerChoice.textContent = ` ${playerSelection}`;
}
window.select = select;

// Restart Game Functionality
function restartGame() {
  clearSelected();
  playerWins = computerWins = 0;
  playerScore.textContent = 0;
  computerScore.textContent = 0;
  stopConfetti();
}
window.restartGame = restartGame;

// Util Classes
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// on load
restartGame();
