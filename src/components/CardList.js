// @flow

/* eslint-disable camelcase */

import React from 'react';

import Kirara from '../API/Kirara';
import type {Char, CardIcon} from '../API/Kirara';
import {ring} from './Loading';

import {usedLocalStorage} from '../helpers/storage';

type Props = {
  onCardSelect: (cardId: string) => void,
  selectedChar: ?Char,
  useLocalStorage: boolean,
};

type State = {
  cardIconList: Array<CardIcon>,
  isFetchingCardList: boolean,
  selectedCardId: ?string,
};

export default class CardList extends React.Component<Props, State> {
  state = {
    cardIconList: [],
    isFetchingCardList: false,
    selectedCardId: null,
  };

  componentDidMount() {
    let {selectedChar, useLocalStorage} = this.props;

    if (selectedChar) {
      let {id} = selectedChar;
      let cardListJson;
      this.setState({
        isFetchingCardList: true,
      });
      if (useLocalStorage) {
        cardListJson = localStorage.getItem(id);
      }

      if (cardListJson) {
        console.log('[Card List] Using local data', id);
        this.setState({
          cardIconList: JSON.parse(cardListJson),
          isFetchingCardList: false,
        });
      } else {
        console.log('[Card List] Fetching new data');

        Kirara.getCardIconList(selectedChar.cards).then((cardIconList) => {
          if (useLocalStorage) {
            localStorage.setItem(id, JSON.stringify(cardIconList));
            console.log('Used storage', usedLocalStorage());
          }
          this.setState({
            cardIconList,
            isFetchingCardList: false,
          });
        });
      }
    }
  }

  componentWillUnmount() {
    // console.log('Card list unmounted');
  }

  _onCardIconClick = (id: string) => {
    let {onCardSelect} = this.props;
    this.setState({selectedCardId: id});
    onCardSelect(id);
  };

  render() {
    let {cardIconList, selectedCardId, isFetchingCardList} = this.state;

    let content;

    if (isFetchingCardList) {
      content = <div style={styles.loadingContainer}>{ring}</div>;
    } else if (cardIconList.length) {
      content = cardIconList.map((cardIcon) => {
        let {id, iconUrl} = cardIcon;

        return (
          <div
            style={
              selectedCardId && selectedCardId === id
                ? selectedCardStyle
                : styles.cardContainer
            }
            key={id}
            onClick={() => {
              this._onCardIconClick(id);
            }}
          >
            <img src={iconUrl} />
          </div>
        );
      });
    } else {
      content = (
        <div style={styles.loadingContainer}>No character selected.</div>
      );
    }

    return <div style={styles.container}>{content}</div>;
  }
}

const styles = {
  container: {
    display: 'flex',
    width: '350px',
    padding: '10px',
    justifyContent: 'space-evenly',
    alignContent: 'flex-start',
    flexWrap: 'wrap',
    overflowY: 'scroll',
    borderRight: 'solid 1px',
  },
  loadingContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
  cardContainer: {
    width: 124,
    height: 124,
    backgroundColor: 'rgba(241, 147, 80, 0.75)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
    padding: 1,
    borderRadius: 12,
  },
};

const selectedCardStyle = {
  ...styles.cardContainer,
  margin: 0,
  padding: 6,
  backgroundColor: 'rgba(50, 84, 201, 0.75)',
};
