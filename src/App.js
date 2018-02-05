// @flow

import React, {Component} from 'react';
import CharList from './CharList';
import CardList from './CardList';
import CardView from './CardView';

import Kirara from './API/Kirara';

type Props = {};

type State = {
  searchValue: string,
  selectedCard: ?Object,
  selectedChar: ?Object,
  isLoading: boolean,
  charList: Array<Object>,
};

const appStyle = {
  display: 'flex',
  backgroundColor: '#ffe5e5',
  justifyContent: 'space-between',
  padding: 6,
  overflow: 'hidden',
};

export default class App extends Component<Props, State> {
  state = {
    searchValue: '',
    selectedChar: null,
    selectedCard: null,
    isLoading: false,
    charList: [],
  };

  componentDidMount() {
    Kirara.getCharList().then((charList) => {
      this.setState({charList});
    });
  }

  _onSearchChange = (event: Object) => {
    this.setState({
      searchValue: event.target.value,
    });
  };

  _onCharSelect = (selectedChar: Object) => {
    this.setState({selectedChar});
  };

  _onCardSelect = (selectedCard: Object) => {
    this.setState({selectedCard});
  };

  render() {
    let {charList, searchValue, selectedChar, selectedCard} = this.state;

    return (
      <div style={appStyle}>
        <CharList
          charList={charList}
          searchValue={searchValue}
          onSearchChange={this._onSearchChange}
          onCharSelect={this._onCharSelect}
        />
        <CardList
          key={selectedChar ? selectedChar.chara_id : -1}
          selectedChar={selectedChar}
          onCardSelect={this._onCardSelect}
        />
        <CardView
          key={selectedCard ? selectedCard.id : -1}
          selectedCard={selectedCard}
        />
      </div>
    );
  }
}
