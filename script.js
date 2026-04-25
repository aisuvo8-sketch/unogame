const colors = ["red", "blue", "green", "yellow"];

let playerCards = [];
let botCards = [];
let centerCard;
let playerTurn = true;

// Generate random card
function getCard() {
  return {
    color: colors[Math.floor(Math.random() * 4)],
    number: Math.floor(Math.random() * 9)
  };
}

// Start game
function startGame() {
  playerCards = [];
  botCards = [];

  for (let i = 0; i < 5; i++) {
    playerCards.push(getCard());
    botCards.push(getCard());
  }

  centerCard = getCard();
  render();
}

// Render UI
function render() {
  const playerDiv = document.getElementById("player-cards");
  const centerDiv = document.getElementById("center-card");

  playerDiv.innerHTML = "";

  playerCards.forEach((card, index) => {
    const div = document.createElement("div");
    div.className = `card ${card.color}`;
    div.innerText = card.number;
    div.onclick = () => playCard(index);
    playerDiv.appendChild(div);
  });

  document.getElementById("bot-count").innerText = botCards.length;

  centerDiv.className = `card ${centerCard.color}`;
  centerDiv.innerText = centerCard.number;
}

// Player move
function playCard(index) {
  if (!playerTurn) return;

  const card = playerCards[index];

  if (isValid(card)) {
    centerCard = card;
    playerCards.splice(index, 1);

    if (playerCards.length === 0) {
      alert("🎉 You Win!");
      startGame();
      return;
    }

    playerTurn = false;
    render();
    setTimeout(botTurn, 800);
  } else {
    alert("Invalid move!");
  }
}

// Draw card
function drawCard() {
  if (!playerTurn) return;

  playerCards.push(getCard());
  playerTurn = false;
  render();
  setTimeout(botTurn, 800);
}

// Bot move
function botTurn() {
  for (let i = 0; i < botCards.length; i++) {
    if (isValid(botCards[i])) {
      centerCard = botCards[i];
      botCards.splice(i, 1);

      if (botCards.length === 0) {
        alert("😢 Bot Wins!");
        startGame();
        return;
      }

      playerTurn = true;
      render();
      return;
    }
  }

  botCards.push(getCard());
  playerTurn = true;
  render();
}

// Check valid move
function isValid(card) {
  return card.color === centerCard.color || card.number === centerCard.number;
}

// Start game
startGame();