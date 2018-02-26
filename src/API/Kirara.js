// @flow
/*eslint-disable camelcase*/
// import fetch from 'node-fetch';

export type Char = {
  id: string, // chara_id
  nameRoman: string, //conventional
  nameKanji: string, //kanji_spaced
  // nameKana: string, // kana_spaced
  cards: Array<string>, // cards[...cardId]
  ref: string,
};

export type Card = {
  id: string,
  nameWithTitle: string, //name
  attribute: 'cute' | 'cool' | 'passion',
  rarity: Rarity,
  idolizedId: string, //evolution_id
  skillId: string, //skill_id
  leaderSkillId: string, //leader_skill_id
  minHp: string, //hp_min
  minVocal: string, //vocal_min
  minDance: string, //dance_min
  minVisual: string, //visual_min
  maxHp: string, //hp_max
  maxVocal: string, //vocal_max
  maxDance: string, //dance_max
  maxVisual: string, //visual_max
  bonusHp: string, //bonus_hp
  bonusVocal: string, //bonus_vocal
  bonusDance: string, //bonus_dance
  bonusVisual: string, //bonus_visual
  hasSpread: boolean, //has_spread
  nameOnly: string, //name_only
  title: ?string,
  skill: ?Skill,
  leadSkill: ?Object, // later...
  overallMin: string, //overall_min
  overallMax: string, //overall_max
  overallBonus: string, //overall_bonus
  spreadUrl: string, //spread_image_ref
  imageUrl: string, //card_image_ref
  iconUrl: string, //icon_image_ref
};

export type Rarity = {
  rarity: string,
  maxLevel: string, //base_max_level,
};

export type Skill = {
  id: string,
  name: string, //skill_name
  type: string, //skill_type
  desc: string, //explain_en
  typeId: string, //skill_type_id
};

export type CardIcon = {
  id: string,
  iconUrl: string,
};

const kiraraUrl = 'https://starlight.kirara.ca';

export default class Kirara {
  static async getCharList(): Promise<Array<Char>> {
    let response = await fetch(kiraraUrl + '/api/v1/list/char_t');

    let cardListJson = await response.json();

    let filteredCharList: Array<Char> = [];

    for (let char of cardListJson.result) {
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

  static async getCard(id: string): Promise<Card> {
    let response = await fetch(kiraraUrl + '/api/v1/card_t/' + id);

    let cardJson = await response.json();

    let card = cardJson.result.pop();

    let {
      name,
      attribute,
      evolution_id,
      skill_id,
      leader_skill_id,
      hp_min,
      vocal_min,
      dance_min,
      visual_min,
      hp_max,
      vocal_max,
      dance_max,
      visual_max,
      bonus_hp,
      bonus_vocal,
      bonus_dance,
      bonus_visual,
      has_spread,
      name_only,
      title,
      lead_skill, // later...
      overall_min,
      overall_max,
      overall_bonus,
      spread_image_ref,
      card_image_ref,
      icon_image_ref,
    } = card;

    let {rarity, base_max_level} = card.rarity;

    return {
      id,
      nameWithTitle: name,
      attribute,
      rarity: {rarity, maxLevel: base_max_level},
      idolizedId: evolution_id,
      skillId: skill_id,
      leaderSkillId: leader_skill_id,
      minHp: hp_min,
      minVocal: vocal_min,
      minDance: dance_min,
      minVisual: visual_min,
      maxHp: hp_max,
      maxVocal: vocal_max,
      maxDance: dance_max,
      maxVisual: visual_max,
      bonusHp: bonus_hp,
      bonusVocal: bonus_vocal,
      bonusDance: bonus_dance,
      bonusVisual: bonus_visual,
      hasSpread: has_spread,
      nameOnly: name_only,
      title,
      skill: card.skill
        ? {
          id: card.skill.skillId,
          name: card.skill.skill_name,
          type: card.skill.skill_type,
          desc: card.skill.explain_en,
          typeId: card.skill.skill_type_id,
        }
        : null,
      leadSkill: lead_skill,
      overallMin: overall_min,
      overallMax: overall_max,
      overallBonus: overall_bonus,
      spreadUrl: spread_image_ref,
      imageUrl: card_image_ref,
      iconUrl: icon_image_ref,
    };
  }

  static async getCardIcon(id: string): Promise<string> {
    let response = await fetch(kiraraUrl + '/api/v1/card_t/' + id);

    let card = await response.json();

    let {icon_image_ref} = card;

    return icon_image_ref;
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

  static async getCardIconList(
    idList: Array<string>,
  ): Promise<Array<CardIcon>> {
    let fetchArr = idList.map((id) => {
      return fetch(kiraraUrl + '/api/v1/card_t/' + id);
    });

    return Promise.all(fetchArr)
      .then((responseArr) => {
        return Promise.all(responseArr.map((response) => response.json()));
      })
      .then((cardJsonArr) => {
        return Promise.all(
          cardJsonArr.map((cardJson) => {
            let card = cardJson.result.pop();

            let {id, icon_image_ref} = card;

            return {
              id,
              iconUrl: icon_image_ref,
            };
          }),
        );
      });
  }
}
