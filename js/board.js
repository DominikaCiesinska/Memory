class Board {
  constructor() {
    this.generateInitialCards();
  }
  generateInitialCards() {
    let orders = shuffle(Array.from({ length: 16 }, (_value, index) => index));

    // generowanie tablicy z 16 ścieżkami do obrazków (z 8, każdy wzięty podwójnie)
    let images = [];
    for (let i = 0; i < orders.length / 2; i++) {
      images.push(`files/moomin-${i + 1}.png`);
      images.push(`files/moomin-${i + 1}.png`);
    }

    // metoda map wykonująca się po 16 elementach tablicy orders
    // utworzenie tablicy z 16 obiektami kart
    this.cards = orders.map((order, index) => {
      return new Card(order, images[index]);
    });
  }

  render() {
    this.cards.forEach((card) => {
      const cardElement = document.querySelector(
        `.card:nth-child(${card.order + 1})`
      );
      // zmiana src dziecka .frontFace na adres obrazka
      const frontFaceImage = cardElement.querySelector(".frontFace");
      frontFaceImage.src = card.image;
      // nadanie odpowiedniej klasy elementowi w zależności od zmiennej isVisible
      if (card.isVisible) {
        cardElement.className = "card cardFrontFace";
      } else {
        cardElement.className = "card cardBackFace";
      }
    });
  }

  checkIfAllCardsAreGuessed() {
    return this.cards.every((card) => card.isGuessed);
  }

  toggleCardVisibility(order) {
    const cardObject = this.cards.find((card) => card.order === order);
    cardObject.isVisible = !cardObject.isVisible;
  }
  getVisibleNotGuessedCard() {
    return this.cards.find((card) => card.isVisible && !card.isGuessed);
  }
  getCardByOrder(order) {
    return this.cards.find((card) => card.order === order);
  }
}

function shuffle(a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}
