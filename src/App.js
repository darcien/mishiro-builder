// @flow

import React, {Component} from 'react';
import CharList from './components/CharList';
import CardList from './components/CardList';
import CardView from './components/CardView';
import {ripple} from './components/Loading';
import {storageAvailable} from './helpers/storage';

require('./styles/App.css');
// import style from './styles/App.css';

import Kirara from './API/Kirara';
import type {Char} from './API/Kirara';

type Props = {};

type State = {
  searchValue: string,
  selectedCardId: ?string,
  selectedChar: ?Char,
  isLoading: boolean,
  charList: Array<Char>,
};

let windowHeight;

if (document.documentElement) {
  windowHeight = document.documentElement.clientHeight;
} else {
  windowHeight = 600;
}

const USE_LOCALSTORAGE = storageAvailable('localStorage');

const appStyle = {
  display: 'flex',
  backgroundColor: 'rgb(255, 230, 230)',
  padding: 6,
  overflow: 'hidden',
  justifyContent: 'flex-start',
  height: Math.max(windowHeight ? windowHeight - 30 : 600, 600),
};

export default class App extends Component<Props, State> {
  state = {
    searchValue: '',
    selectedChar: null,
    selectedCardId: null,
    isLoading: false,
    charList: [],
  };

  componentDidMount() {
    let charListJson;
    this.setState({isLoading: true});

    if (USE_LOCALSTORAGE) {
      charListJson = localStorage.getItem('charListJson');
    }
    if (charListJson) {
      console.log('[App] Using local storage data');
      this.setState({charList: JSON.parse(charListJson), isLoading: false});
    } else {
      console.log('[App] Fetching new data');
      Kirara.getCharList().then((charList) => {
        if (USE_LOCALSTORAGE) {
          localStorage.setItem('charListJson', JSON.stringify(charList));
        }
        this.setState({charList, isLoading: false});
      });
    }
  }

  _onSearchChange = (event: Object) => {
    this.setState({
      searchValue: event.target.value,
    });
  };

  _onCharSelect = (selectedChar: Char) => {
    this.setState({selectedChar});
  };

  _onCardSelect = (selectedCardId: string) => {
    this.setState({selectedCardId});
  };

  render() {
    let {
      charList,
      isLoading,
      searchValue,
      selectedChar,
      selectedCardId,
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
            key={selectedChar ? selectedChar.id : undefined}
            selectedChar={selectedChar}
            onCardSelect={this._onCardSelect}
            useLocalStorage={USE_LOCALSTORAGE}
          />
          <CardView
            key={selectedCardId ? selectedCardId : undefined}
            selectedCardId={selectedCardId}
            useLocalStorage={USE_LOCALSTORAGE}
          />
        </div>
      );
    }

    return content;
  }
}
