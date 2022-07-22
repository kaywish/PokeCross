// Winning conditions
const winCon = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

// Game variables
const players = ["X", "O"];
let elementsPlayed = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
let currentPlayerIndex = 0;
let gameComplete = false;

function restartGame() {
  // Clear game variables
  elementsPlayed = [-1, -1, -1, -1, -1, -1, -1, -1, -1];
  currentPlayerIndex = 0;
  gameComplete = false;

  // update dom elements (css + x and o)
  clearGameCell("choice1");
  clearGameCell("choice2");
  clearGameCell("choice3");
  clearGameCell("choice4");
  clearGameCell("choice5");
  clearGameCell("choice6");
  clearGameCell("choice7");
  clearGameCell("choice8");
  clearGameCell("choice9");
}

function clearGameCell(elementId) {
  // Locate DOM element
  let element = document.getElementById(elementId);

  // Clear any X or O within the div
  element.innerText = "";

  // Remove the "win" style class
  element.classList.remove("cell-won");
}

function gameButtonClicked(elementNumberSelected, elementIdSelected) {
  // Validate game has not been completed
  if (gameComplete == true) {
    alert('The current game is complete, please restart to play again!');
    return;
  }

  // Validate the selection has not already been played
  if (checkIfSpotPlayed(elementNumberSelected)) {
    alert('This spot has already been played! Pick another spot!');
    return;
  }

  // Add element to elementsPlayed
  playSpot(elementNumberSelected, currentPlayerIndex);

  // Add O or X to DOM
  updateDOMWithSpotPlayed(elementIdSelected);

  // Update currentPlayer to next player
  switchToNextPlayer();

  // Evaluate if the game is over
  evaluateGameComplete();
}

function checkIfSpotPlayed(spotIndex) {
  return elementsPlayed[spotIndex] != -1;
}

function playSpot(spotIndex, playerIndex) {
  // Update board variable
  elementsPlayed[spotIndex] = playerIndex;
}

function updateDOMWithSpotPlayed(elementIdSelected) {
  // Locate DOM element selected
  const locatedElement = document.getElementById(elementIdSelected);

  // Add current players character to element
  locatedElement.innerHTML = getCurrentPlayerCharacter();
}

function getCurrentPlayerCharacter() {
  return players[currentPlayerIndex];
}

function switchToNextPlayer() {
  currentPlayerIndex = currentPlayerIndex == 0 ? 1 : 0;
}

function evaluateGameComplete() {
  // Check if one player has won the game
  const result = checkIfPlayerWon();

  if (result) {
    gameComplete = true;

    alert("Player " + players[result.winningPlayerIndex] + " has won the game!");

    document.querySelector('[data-index="' + result.winningElements[0].toString() + '"]').classList.add('cell-won');
    document.querySelector('[data-index="' + result.winningElements[1].toString() + '"]').classList.add('cell-won');
    document.querySelector('[data-index="' + result.winningElements[2].toString() + '"]').classList.add('cell-won');

    return;
  }


  // Check if all the selections have been completed
  if (checkIfAllSpotsPlayed()) {
    gameComplete = true;
    alert("Game Over - TIE GAME!");
  }
}

function checkIfAllSpotsPlayed() {
  for (let i=0; i<elementsPlayed.length; i++) {
    if (elementsPlayed[i] == -1) {
      return false;
    }
  }

  return true;
}

function checkIfPlayerWon() {
  for (let i=0; i<winCon.length; i++) {
    let currentWinCondition = winCon[i];

    let wIndex0 = currentWinCondition[0];
    let wIndex1 = currentWinCondition[1];
    let wIndex2 = currentWinCondition[2];

    // Skip if any of the selections have not been played yet
    if (elementsPlayed[wIndex0] == -1 || elementsPlayed[wIndex1] == -1 || elementsPlayed[wIndex2] == -1) {
      continue;
    }

    // Evaluate if a Player has selected the 3 spots for this win condition
    if (elementsPlayed[wIndex0] == elementsPlayed[wIndex1] && elementsPlayed[wIndex0] == elementsPlayed[wIndex2]) {
      return {
        winningPlayerIndex: elementsPlayed[wIndex0],
        winningElements: [wIndex0, wIndex1, wIndex2]
      }
    }
  }
}