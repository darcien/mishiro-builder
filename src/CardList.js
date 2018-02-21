// @flow

/* eslint-disable camelcase */

import React from 'react';

import Kirara from './API/Kirara';

type Props = {
  onCardSelect: (card: Object) => void,
  selectedChar: ?Object,
};

type State = {
  cardList: ?Array<Object>,
  isFetchingCardList: boolean,
  selectedCardId: ?string,
};

export default class CardList extends React.Component<Props, State> {
  state = {
    cardList: null,
    isFetchingCardList: false,
    selectedCardId: null,
  };

  componentDidMount() {
    let {selectedChar} = this.props;

    if (selectedChar) {
      this.setState({
        isFetchingCardList: true,
      });

      Kirara.getCardList(selectedChar.cards).then((cardList) => {
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
    let {cardList, selectedCardId} = this.state;

    let content;

    if (cardList) {
      content = cardList.map((card) => {
        let {id, icon_image_ref} = card;

        return (
          <div
            style={
              selectedCardId && selectedCardId === id
                ? selectedCardStyle
                : cardStyle
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
      content = null;
    }

    return <div style={cardListStyle}>{content}</div>;
  }
}

const cardListStyle = {
  display: 'flex',
  width: '350px',
  padding: '10px',
  justifyContent: 'space-evenly',
  alignContent: 'flex-start',
  flexWrap: 'wrap',
  overflowY: 'scroll',
  borderRight: 'solid 1px',
};

const cardStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  padding: 6,
  margin: 2,
  borderRadius: 12,
};

const selectedCardStyle = {
  ...cardStyle,
  backgroundColor: 'rgba(50, 84, 201, 0.75)',
};
