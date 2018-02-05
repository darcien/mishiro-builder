// @flow

import React from 'react';

type Props = {
  charList: Array<Object>,
  searchValue: string,
  onSearchChange: (event: Object) => void,
  onCharSelect: (selectedChar: Object) => void,
};

const listViewStyle = {
  flex: '0 0 400px',
  height: '550px',
  padding: '10px',
  margin: '10px',
  borderRight: '1px solid black',
  overflow: 'hidden',
  display: 'box',
};

const searchStyle = {
  fontSize: '1em',
  width: '100%',
  padding: '12px 15px',
  margin: '10px 0',
  boxSizing: 'border-box',
  backgroundColor: '#f1e5f9',
};

const listStyle = {
  minHeight: '400px',
  maxHeight: '480px',
  overflowY: 'scroll',
};

const commonStyle = {
  listStyle: 'none',
  padding: 0,
};

const charStyle = {
  padding: '6',
  lineHeight: '1.4',
  margin: '6',
  fontSize: '1.2em',
};

export default class CharList extends React.Component<Props> {
  render() {
    let {charList, searchValue, onSearchChange, onCharSelect} = this.props;

    let filteredCharList = [];

    if (searchValue.trim() === '') {
      filteredCharList = charList;
    } else {
      filteredCharList = charList.filter((char) => {
        let lowerCaseCharName = char.conventional.toLowerCase();

        return lowerCaseCharName.includes(searchValue.toLowerCase());
      });
    }

    let contentList = filteredCharList.map((char) => {
      return (
        <li
          style={charStyle}
          key={char.chara_id}
          onClick={() => {
            onCharSelect(char);
          }}
        >
          {char.conventional}
        </li>
      );
    });

    return (
      <div style={listViewStyle}>
        <input
          style={searchStyle}
          type="text"
          placeholder="Search char..."
          onChange={(event) => {
            onSearchChange(event);
          }}
          value={searchValue}
        />
        <div style={listStyle}>
          <ul style={commonStyle} className="char-list">
            {contentList}
          </ul>
        </div>
      </div>
    );
  }
}
