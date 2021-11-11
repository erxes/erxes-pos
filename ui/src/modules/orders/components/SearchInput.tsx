import React from 'react';

import Icon from "modules/common/components/Icon";
import { __ } from "modules/common/utils";
import { SearchInputWrapper } from '../styles';

type Props = {
  onSearch: (e: any) => void;
  clearSearch: () => void;
  placeholder: string;
}

type State = {
  showInput: boolean;
  searchValue: string;
}

export default class SearchInput extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);

    this.state = {
      showInput: true,
      searchValue: ''
    };
  }

  render() {
    const { onSearch, clearSearch, placeholder } = this.props;
    const { showInput, searchValue } = this.state;

    const handleInput = (e) => {
      this.setState({ searchValue: e.target.value });
    };

    const closeInput = (e) => {
      e.stopPropagation();
      this.setState({ showInput: false, searchValue: "" });

      clearSearch();
    };

    return (
      <SearchInputWrapper full={true}>
        <Icon icon="search-1" size={18} />
        {showInput ? (
          <>
            <input
              placeholder={__(placeholder)}
              value={searchValue}
              autoFocus={true}
              onKeyDown={onSearch}
              onChange={handleInput}
            />
            <Icon icon="times" size={18} onClick={closeInput} />
          </>
        ) : (
          <span>{__(placeholder)}...</span>
        )}
      </SearchInputWrapper>
    );
  } // end render()
}