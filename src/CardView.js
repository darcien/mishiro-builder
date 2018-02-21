// @flow

/*eslint-disable camelcase*/

import React from 'react';

type Props = {
  selectedCard: ?Object,
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
        <div style={nameContainer}>{name}</div>
        <div style={imgContainerStyle}>
          <img style={imgStyle} src={card_image_ref} />
        </div>
        <div style={statsStyle}>
          <div style={{...commonStatStyle, ...hpStyle}}>
            HP : {hp_max} + {bonus_hp}
          </div>
          <div style={{...commonStatStyle, ...vocalStyle}}>
            Vocal : {vocal_max} + {bonus_vocal}
          </div>
          <div style={{...commonStatStyle, ...danceStyle}}>
            Dance : {dance_max} + {bonus_dance}
          </div>
          <div style={{...commonStatStyle, ...visualStyle}}>
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

const cardViewStyle = {
  display: 'flex',
  minWidth: '300px',
  height: '550px',
  padding: '10px',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
};

const nameContainer = {
  backgroundColor: 'rgba(165, 90, 195, 0.75)',
  padding: 6,
  borderRadius: 6,
  fontSize: 30,
  marginBottom: 12,
};

const imgContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  alignSelf: 'center',
  padding: 4,
  width: 272,
  height: 344,
  backgroundColor: 'rgba(228, 143, 55, 0.75)',
  borderRadius: 6,
};

const imgStyle = {
  borderTop: 'solid 2px lightblue',
  borderBottom: 'solid 2px lightblue',
};

const statsStyle = {
  marginTop: '15px',
  fontSize: 16,
  lineHeight: 1.4,
};
const commonStatStyle = {
  padding: 4,
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
