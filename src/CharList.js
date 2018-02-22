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
          : styles.char;

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
      <div style={styles.container}>
        <div style={styles.searchContainer}>
          <input
            style={styles.searchInput}
            type="text"
            placeholder="Search char..."
            onChange={(event) => {
              onSearchChange(event);
            }}
            value={searchValue}
          />
        </div>
        <div style={styles.listContainer}>
          <ul style={styles.list} className="char-list">
            {contentList}
          </ul>
        </div>
      </div>
    );
  }
}

const styles = {
  container: {
    padding: 12,
    borderRight: '1px solid black',
    overflow: 'hidden',
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: 'stretch',
    width: 380,
  },
  searchContainer: {
    width: '100%',
    height: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  searchInput: {
    width: '100%',
    fontSize: '1em',
    padding: '12px 15px',
    margin: 0,
    backgroundColor: '#f1e5f9',
  },
  listContainer: {
    flex: 1,
    overflowY: 'auto',
  },
  list: {
    listStyle: 'none',
    padding: 0,
    paddingRight: 18,
  },
  char: {
    padding: 2,
    margin: 2,
    lineHeight: 1.2,
    fontSize: '1.25em',
    borderRadius: 4,
  },
};

const selectedCharStyle = {
  ...styles.char,
  padding: 6,
  backgroundColor: 'rgba(122, 185, 73, 0.75)',
};
