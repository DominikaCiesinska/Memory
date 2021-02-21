class FoundPairList {
  constructor() {
    this.list = [];
  }

  pushImage(image) {
    this.list.push(image);
  }

  render() {
    const pairs = document.querySelector(`.pairs`);
    let pairsHTML = "";
    this.list.forEach((image) => {
      pairsHTML += `<img src="${image}" alt="" />`;
    });

    pairs.innerHTML = pairsHTML;
  }
}
