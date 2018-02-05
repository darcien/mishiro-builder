// @flow

// import fetch from 'node-fetch';

const kiraraUrl = 'https://starlight.kirara.ca';

export default class Kirara {
  static async getCharList() {
    let response = await fetch(kiraraUrl + '/api/v1/list/char_t');

    let charList = await response.json();

    return charList.result;
  }

  static async getCard(id: string) {
    let response = await fetch(kiraraUrl + '/api/v1/card_t/' + id);

    let card = await response.json();

    return card.result[0];
  }

  static async getCardList(idList: Array<number>) {
    let responseArr = idList.map((id) => {
      return fetch(kiraraUrl + '/api/v1/card_t/' + id);
    });

    return Promise.all(responseArr)
      .then((cardArr) => {
        return Promise.all(cardArr.map((card) => card.json()));
      })
      .then((cardArr) => {
        return Promise.all(cardArr.map((card) => card.result[0]));
      });
  }
}
