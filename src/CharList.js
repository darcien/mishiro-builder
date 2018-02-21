// @flow

import React from 'react';

type Props = {
  charList: Array<Object>,
  searchValue: string,
  onSearchChange: (event: Object) => void,
  onCharSelect: (selectedChar: Object) => void,
};

type State = {
  selectedId: ?string,
};

export default class CharList extends React.Component<Props, State> {
  state = {
    selectedId: null,
  };

  render() {
    let {charList, searchValue, onSearchChange, onCharSelect} = this.props;
    let {selectedId} = this.state;

    let filteredCharList = [];

    if (searchValue.trim() === '') {
      filteredCharList = charList;
    } else {
      filteredCharList = charList.filter((char) => {
        let lowerCaseCharName = char.conventional.toLowerCase();
        let kanji = char.kanji_spaced;
        return lowerCaseCharName
          .concat(' ', kanji)
          .includes(searchValue.toLowerCase());
      });
    }

    let contentList = filteredCharList.map((char) => {
      let style =
        selectedId && char.chara_id === selectedId
          ? selectedCharStyle
          : charStyle;

      return (
        <li
          style={style}
          key={char.chara_id}
          onClick={() => {
            this.setState({selectedId: char.chara_id});
            onCharSelect(char);
          }}
        >
          {char.conventional} ({char.kanji_spaced})
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
  padding: 2,
  margin: 2,
  lineHeight: 1.2,
  fontSize: '1.25em',
};

const selectedCharStyle = {
  ...charStyle,
  padding: 6,
  backgroundColor: 'rgba(122, 185, 73, 0.75)',
};
