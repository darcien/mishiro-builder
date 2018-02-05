// @flow

import React from 'react';

import Kirara from './API/Kirara';

type Props = {
  onCardSelect: (card: Object) => void,
  selectedChar: ?Object,
};

type State = {
  cardList: ?Array<Object>,
  isFetchingCardList: boolean,
};

const cardListStyle = {
  flex: '0 0 auto',
  display: 'flex',
  width: '300px',
  height: '550px',
  padding: '10px',
  margin: '10px',
  justifyContent: 'space-evenly',
  alignContent: 'flex-start',
  flexWrap: 'wrap',
  borderRight: 'solid 1px',
};

const cardStyle = {
  padding: '10px',
  margin: 'auto',
};

export default class CardList extends React.Component<Props, State> {
  state = {
    cardList: null,
    isFetchingCardList: false,
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

  render() {
    let {onCardSelect, selectedChar} = this.props;

    let {cardList} = this.state;

    let content;

    if (cardList) {
      content = cardList.map((card) => {
        let {id, icon_image_ref} = card;

        return (
          <div style={cardStyle} key={id} onClick={() => onCardSelect(card)}>
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
