class Game {
  constructor() {
    this.board = new Board();
    this.foundPairList = new FoundPairList();
    this.trialCounter = 0;
    this.preventClicks = false; // nie pozwala kliknąć na jakikolwiek obrazek, dopóki się nie wykona setTimeout
    this.successCounter = 0;
    this.attachClickHandlers();
    this.render();
  }

  attachClickHandlers() {
    document.querySelectorAll(".card").forEach((card, index) => {
      card.addEventListener("click", () => {
        // jest to druga karta, jeśli istnieje już inna widoczna karta (ale nie odgadnięta)
        let visibleCard = this.board.getVisibleNotGuessedCard();
        let clickedCard = this.board.getCardByOrder(index);
        if (
          this.preventClicks === true || // zablokowanie kliknięć w trakcie działania setTimeout
          clickedCard.isGuessed || // zablokowanie kliknięcia w odgadnięte pary
          clickedCard === visibleCard // zablokowanie kliknięcia kiedy druga kliknięta karta jest dokładnie tą samą kartą co pierwsza
        ) {
          return;
        }

        if (visibleCard && visibleCard.image === clickedCard.image) {
          // dwie takie same karty
          visibleCard.isGuessed = true;
          clickedCard.isGuessed = true;
          this.trialCounter += 1;
          if (this.board.checkIfAllCardsAreGuessed()) {
            this.successCounter += 1;
            swal("Gratulacje wygranej!", "...może zagrasz jeszcze raz?");
          }
          this.foundPairList.pushImage(visibleCard.image);
        } else if (visibleCard) {
          // dwie różne karty
          this.preventClicks = true;
          this.trialCounter += 1;
          setTimeout(() => {
            visibleCard.isVisible = false;
            clickedCard.isVisible = false;
            this.render();
            this.preventClicks = false;
          }, 1200);
        }
        this.board.toggleCardVisibility(index);
        this.render();
      });
    });

    const newGame = document.querySelector(`.reset`);
    newGame.addEventListener("click", () => this.reset());
  }

  render() {
    this.board.render();
    this.foundPairList.render();
    const trialCounterElement = document.querySelector(`.attempts`);
    trialCounterElement.textContent = this.trialCounter;
    const successCounterElement = document.querySelector(`.success`);
    successCounterElement.textContent = this.successCounter;
  }

  reset() {
    this.board = new Board();
    this.foundPairList = new FoundPairList();
    this.trialCounter = 0;
    this.render();
  }
}
