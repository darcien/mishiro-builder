// @flow

/*eslint-disable camelcase*/

import React, {Component} from 'react';
import {ring} from './Loading';

import Kirara from '../API/Kirara';
import type {Card} from '../API/Kirara';
import {usedLocalStorage} from '../helpers/storage';

// import fullCard from '../dev-assets/fullCard.png';

type Props = {
  selectedCardId: ?string,
  useLocalStorage: boolean,
};

type State = {
  card: ?Card,
  isFetchingCard: boolean,
};

export default class CardView extends Component<Props, State> {
  state = {
    card: null,
    isFetchingCard: false,
  };

  componentDidMount() {
    let {selectedCardId, useLocalStorage} = this.props;

    if (selectedCardId) {
      let cardJson;
      this.setState({
        isFetchingCard: true,
      });
      if (useLocalStorage) {
        cardJson = localStorage.getItem(selectedCardId);
      }

      if (cardJson) {
        console.log('[Card] Using local data', selectedCardId);
        this.setState({
          card: JSON.parse(cardJson),
          isFetchingCard: false,
        });
      } else {
        console.log('[Card] Fetching new data');

        Kirara.getCard(selectedCardId).then((card) => {
          if (useLocalStorage) {
            localStorage.setItem(card.id, JSON.stringify(card));
            console.log('Used storage', usedLocalStorage());
          }
          this.setState({
            card,
            isFetchingCard: false,
          });
        });
      }
    }
  }

  render() {
    let {card, isFetchingCard} = this.state;

    let content;

    if (isFetchingCard) {
      content = <div style={styles.container}>{ring};</div>;
    } else if (card) {
      let {
        id,
        nameWithTitle,
        maxHp,
        maxVocal,
        maxDance,
        maxVisual,
        bonusHp,
        bonusVocal,
        bonusDance,
        bonusVisual,
        imageUrl,
        skill,
      } = card;

      let paddingRight;

      if (nameWithTitle.startsWith('［')) {
        paddingRight = 18;
      } else {
        paddingRight = 6;
      }

      content = (
        <div key={id} style={styles.container}>
          <div style={{...styles.nameContainer, paddingRight}}>
            {nameWithTitle}
          </div>
          <div style={styles.imgContainer}>
            <img style={styles.img} src={imageUrl} />
            <div style={styles.loadingImg}>{ring}</div>
          </div>
          <div style={styles.detailContainer}>
            <div style={styles.stats}>
              <div style={{...styles.commonStat, ...styles.hpContainer}}>
                HP : {maxHp} + {bonusHp}
              </div>
              <div style={{...styles.commonStat, ...styles.vocalContainer}}>
                Vocal : {maxVocal} + {bonusVocal}
              </div>
              <div style={{...styles.commonStat, ...styles.danceContainer}}>
                Dance : {maxDance} + {bonusDance}
              </div>
              <div style={{...styles.commonStat, ...styles.visualContainer}}>
                Visual : {maxVisual} + {bonusVisual}
              </div>
            </div>
            <div style={styles.skillContainer}>{skill ? skill.desc : null}</div>
          </div>
        </div>
      );
    } else {
      content = <div style={styles.container}>No card selected.</div>;
    }
    return content;
  }
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
  detailContainer: {
    alignSelf: 'stretch',
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: '15px',
  },
  stats: {
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
  skillContainer: {
    width: 200,
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(146, 213, 87, 0.75)',
    padding: 6,
  },
};
