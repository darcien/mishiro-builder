// @flow
/*eslint-disable camelcase*/
// import fetch from 'node-fetch';

export type Char = {
  id: string, // chara_id
  nameRoman: string, //conventional
  nameKanji: string, //kanji_spaced
  // nameKana: string, // kana_spaced
  cards: Array<string>,
  ref: string,
};

const kiraraUrl = 'https://starlight.kirara.ca';

export default class Kirara {
  static async getCharList(): Promise<Array<Char>> {
    let response = await fetch(kiraraUrl + '/api/v1/list/char_t');

    let charList = await response.json();

    let filteredCharList: Array<Char> = [];

    for (let char of charList.result) {
      // Destructure only needed info
      let {chara_id, conventional, kanji_spaced, cards, ref} = char;

      filteredCharList.push({
        id: chara_id,
        nameRoman: conventional,
        nameKanji: kanji_spaced,
        cards,
        ref,
      });
    }

    return filteredCharList;
  }

  static async getCard(id: string) {
    let response = await fetch(kiraraUrl + '/api/v1/card_t/' + id);

    let card = await response.json();

    return card.result[0];
  }

  static async getCardList(idList: Array<string>) {
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
