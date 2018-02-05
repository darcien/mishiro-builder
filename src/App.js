// @flow

import React, {Component} from 'react';
import CharList from './CharList';
import CardList from './CardList';
import CardView from './CardView';

type State = {};

export default class App extends Component<State> {
  render() {
    return (
      <div>
        <CharList />
        <CardList />
        <CardView />
      </div>
    );
  }
}
