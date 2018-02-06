// @flow

import React, {Component} from 'react';
import CharList from './CharList';
import CardList from './CardList';
import CardView from './CardView';

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

const loadingImgUrl =
  'https://loading.io/spinners/hourglass/lg.sandglass-time-loading-gif.gif';

const appStyle = {
  display: 'flex',
  backgroundColor: '#ffe5e5',
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
    this.setState({isLoading: true});
    Kirara.getCharList()
      .then((charList) => {
        // Fake loading just to showcase
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(charList);
          }, 2000);
        });
      })
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
            height: '100%',
            minHeight: '600px',
          }}
        >
          <div className="lds-ripple">
            <div />
            <div />
          </div>
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
