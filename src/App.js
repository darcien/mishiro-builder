// @flow

import React, {Component} from 'react';
import CharList from './CharList';
import CardList from './CardList';
import CardView from './CardView';
import {ripple} from './Loading';

import style from './styles/App.css';

import Kirara from './API/Kirara';

type Props = {};

type State = {
  searchValue: string,
  selectedCard: ?Object,
  selectedChar: ?Object,
  isLoading: boolean,
  charList: Array<Object>,
};

let windowHeight;

if (document.documentElement) {
  windowHeight = document.documentElement.clientHeight;
  console.log('windowHeight', windowHeight);
}

const appStyle = {
  display: 'flex',
  backgroundColor: 'rgb(255, 230, 230)',
  padding: 6,
  overflow: 'hidden',
  justifyContent: 'flex-start',
  height: windowHeight ? windowHeight - 30 : 600,
  minHeight: Math.min(windowHeight ? windowHeight - 130 : 500),
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
    this.setState({isLoading: true});
    Kirara.getCharList()
      // .then((charList) => {
      //   // Fake loading just to showcase loading screen
      //   return new Promise((resolve) => {
      //     setTimeout(() => {
      //       resolve(charList);
      //     }, 2000);
      //   });
      // })
      .then((charList) => {
        this.setState({charList, isLoading: false});
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
    let {
      charList,
      isLoading,
      searchValue,
      selectedChar,
      selectedCard,
    } = this.state;

    let content;

    if (isLoading) {
      content = (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'black',
            height: windowHeight ? windowHeight - 30 : 600,
          }}
        >
          {ripple}
          {/* <img style={{width: '120px', height: 'auto'}} src={loadingImgUrl} /> */}
        </div>
      );
    } else {
      content = (
        <div style={appStyle}>
          <CharList
            charList={charList}
            searchValue={searchValue}
            onSearchChange={this._onSearchChange}
            onCharSelect={this._onCharSelect}
          />
          <CardList
            key={selectedChar ? selectedChar.chara_id : undefined}
            selectedChar={selectedChar}
            onCardSelect={this._onCardSelect}
          />
          <CardView
            key={selectedCard ? selectedCard.id : undefined}
            selectedCard={selectedCard}
          />
        </div>
      );
    }

    return content;
  }
}
