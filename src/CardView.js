// @flow

/*eslint-disable camelcase*/

import React from 'react';
import {ring} from './Loading';

// import fullCard from '../dev-assets/fullCard.png';

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

    let paddingRight;

    if ((name: String).startsWith('［')) {
      paddingRight = 18;
    } else {
      paddingRight = 6;
    }

    content = (
      <div key={id} style={styles.container}>
        <div style={{...styles.nameContainer, paddingRight}}>{name}</div>
        <div style={styles.imgContainer}>
          <img style={styles.img} src={card_image_ref} />
          <div style={styles.loadingImg}>{ring}</div>
        </div>
        <div style={styles.stats}>
          <div style={{...styles.commonStat, ...styles.hpContainer}}>
            HP : {hp_max} + {bonus_hp}
          </div>
          <div style={{...styles.commonStat, ...styles.vocalContainer}}>
            Vocal : {vocal_max} + {bonus_vocal}
          </div>
          <div style={{...styles.commonStat, ...styles.danceContainer}}>
            Dance : {dance_max} + {bonus_dance}
          </div>
          <div style={{...styles.commonStat, ...styles.visualContainer}}>
            Visual : {visual_max} + {bonus_visual}
          </div>
        </div>
      </div>
    );
  } else {
    content = <div style={styles.container}>No card selected.</div>;
  }
  return content;
}

const styles = {
  container: {
    flex: 1,
    display: 'flex',
    minWidth: '300px',
    height: '100%',
    padding: '10px',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    overflowY: 'scroll',
  },

  nameContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(165, 90, 195, 0.75)',
    padding: 6,
    borderRadius: 6,
    fontSize: 25,
    marginBottom: 12,
  },
  imgContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 1,
    width: 272,
    height: 340,
    backgroundColor: 'rgba(228, 143, 55, 0.75)',
    border: 'solid 3px rgba(228, 143, 55, 0.75)',
    borderRadius: 6,
  },
  loadingImg: {
    marginTop: -280 / 4,
    marginBottom: 0,
    zIndex: 0,
  },
  img: {
    borderTop: 'solid 2px lightblue',
    borderBottom: 'solid 2px lightblue',
    zIndex: 1,
  },
  stats: {
    marginTop: '15px',
    fontSize: 16,
    lineHeight: 1.4,
  },
  commonStat: {
    padding: 4,
  },
  hpContainer: {
    backgroundColor: 'rgb(60,179,113,0.4)',
  },
  vocalContainer: {
    backgroundColor: 'rgb(32,178,170,0.4)',
  },
  danceContainer: {
    backgroundColor: 'rgb(255,204,204,0.4)',
  },
  visualContainer: {
    backgroundColor: 'rgb(255,250,205,0.4)',
  },
};
