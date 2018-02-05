// @flow

import fetch from 'node-fetch';

const kiraraUrl = 'https://starlight.kirara.ca';

export default class Kirara {
  static async getCharList() {
    let response = await fetch(kiraraUrl + '/api/v1/list/char_t');

    let charList = response.json();

    return charList;
  }
}
