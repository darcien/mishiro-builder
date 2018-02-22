// @flow

/* eslint-disable camelcase */

import React from 'react';

import Kirara from './API/Kirara';
import {ring} from './Loading';

type Props = {
  onCardSelect: (card: Object) => void,
  selectedChar: ?Object,
};

type State = {
  cardList: Array<Object>,
  isFetchingCardList: boolean,
  selectedCardId: ?string,
};

export default class CardList extends React.Component<Props, State> {
  state = {
    cardList: [],
    isFetchingCardList: false,
    selectedCardId: null,
  };

  componentDidMount() {
    let {selectedChar} = this.props;

    if (selectedChar) {
      console.log('Now fetching');
      this.setState({
        isFetchingCardList: true,
      });

      Kirara.getCardList(selectedChar.cards).then((cardList) => {
        console.log('Done fetching');
        this.setState({
          cardList,
          isFetchingCardList: false,
        });
      });
    }
  }

  componentWillUnmount() {
    // console.log('Card list unmounted');
  }

  _onCardClick = (card: Object) => {
    let {onCardSelect} = this.props;
    this.setState({selectedCardId: card.id});
    onCardSelect(card);
  };

  render() {
    let {cardList, selectedCardId, isFetchingCardList} = this.state;

    let content;

    if (isFetchingCardList) {
      content = <div style={styles.loadingContainer}>{ring}</div>;
    } else if (cardList.length) {
      content = cardList.map((card) => {
        let {id, icon_image_ref} = card;

        return (
          <div
            style={
              selectedCardId && selectedCardId === id
                ? selectedCardStyle
                : styles.cardContainer
            }
            key={id}
            onClick={() => {
              this._onCardClick(card);
            }}
          >
            <img src={icon_image_ref} />
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
