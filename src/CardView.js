// @flow

import React from 'react';

type Props = {
  selectedCard: ?Object,
};

const cardViewStyle = {
  display: 'flex',
  height: '550px',
  padding: '10px',
  margin: '10px',
  flexFlow: 'column wrap',
};

const imgStyle = {
  alignSelf: 'center',
  flex: '0 0 auto',
  borderTop: 'solid 2px lightblue',
  borderBottom: 'solid 2px lightblue',
};

const statsStyle = {
  marginTop: '15px',
  lineHeight: '1.4',
};
const hpStyle = {
  backgroundColor: 'rgb(60,179,113,0.4)',
};
const vocalStyle = {
  backgroundColor: 'rgb(32,178,170,0.4)',
};
const danceStyle = {
  backgroundColor: 'rgb(255,204,204,0.4)',
};
const visualStyle = {
  backgroundColor: 'rgb(255,250,205,0.4)',
};

export default function CardView(props: Props) {
  let {selectedCard} = props;

  let content;

  if (selectedCard) {
    let {
      id,
      name,
      hp_max,
      vocal_max,
      dance_max,
      visual_max,
      bonus_hp,
      bonus_vocal,
      bonus_dance,
      bonus_visual,
      card_image_ref,
    } = selectedCard;

    content = (
      <div key={id} style={cardViewStyle}>
        <h3>{name}</h3>
        <img style={imgStyle} src={card_image_ref} />
        <div style={statsStyle}>
          <div style={hpStyle}>
            HP : {hp_max} + {bonus_hp}
          </div>
          <div style={vocalStyle}>
            Vocal : {vocal_max} + {bonus_vocal}
          </div>
          <div style={danceStyle}>
            Dance : {dance_max} + {bonus_dance}
          </div>
          <div style={visualStyle}>
            Visual : {visual_max} + {bonus_visual}
          </div>
        </div>
      </div>
    );
  } else {
    content = null;
  }
  return content;
}
