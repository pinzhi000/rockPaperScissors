// create functions: each function has its own role 

const game = () => {

  // self contain all variables in game function: no global variables

  let pScore = 0;
  let cScore = 0;

  // start the game

  const startGame = () => {
    const playBtn = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");

    playBtn.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
    });
  };


  // play match

  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const playerHand = document.querySelector(".player-hand"); // left hand
    const computerHand = document.querySelector(".computer-hand"); // right hand 
    const hands = document.querySelectorAll(".hands img");


    // every time animation ends, this is going to run and it will remove animation 

    hands.forEach(hand => {
      hand.addEventListener("animationend", function() {
        this.style.animation = "";
      });
    });


    // get computer options: randomly generated

    const computerOptions = ["rock", "paper", "scissors"];

    options.forEach(option => {
      option.addEventListener("click", function() {

        // computer selects
        const computerNumber = Math.floor(Math.random() * 3); // Math.random() generates num between 0 and 1
        const computerChoice = computerOptions[computerNumber];

        // update scores and all text after animations are done
        setTimeout(() => {

          // compare hands and show in text 
          compareHands(this.textContent, computerChoice);

          // update images to the option selected 
          playerHand.src = `./assets/${this.textContent}.png`;
          computerHand.src = `./assets/${computerChoice}.png`;

        }, 2000); // wait 2000 ms

        // shaking hands animation 
        playerHand.style.animation = "shakePlayer 2s ease";
        computerHand.style.animation = "shakeComputer 2s ease";

      });
    });
  };

  // update score with each match

  const updateScore = () => {

    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");

    playerScore.textContent = pScore;
    computerScore.textContent = cScore;
  };


  const compareHands = (playerChoice, computerChoice) => {
    
    // update text
    const winner = document.querySelector(".winner");

    // check for tie 

    if (playerChoice === computerChoice) {
      winner.textContent = "It is a tie";
      return;
    }
    // check for rock
    if (playerChoice === "rock") {
      if (computerChoice === "scissors") {
        winner.textContent = "Player Wins";

        // increase player score
        pScore++;
        updateScore();

        return;

      } 
      else {
        winner.textContent = "Computer Wins";

        // increase computer score
        cScore++;
        updateScore();

        return;
      }
    }


    // check for paper
    if (playerChoice === "paper") {
      if (computerChoice === "scissors") {
        winner.textContent = "Computer Wins";

        cScore++;
        updateScore();

        return;
      } 
      else {
        winner.textContent = "Player Wins";

        pScore++;
        updateScore();

        return;
      }
    }

    // check for scissors
    if (playerChoice === "scissors") {
      if (computerChoice === "rock") {
        winner.textContent = "Computer Wins";

        cScore++;
        updateScore();

        return;
      } 
      
      else {
        winner.textContent = "Player Wins";

        pScore++;
        updateScore();
        
        return;
      }
    }
  };

  //Is call all the inner function
  startGame();
  playMatch();
};

//start the game function
game();
