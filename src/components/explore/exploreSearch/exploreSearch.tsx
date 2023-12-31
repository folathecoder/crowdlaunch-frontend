import React, {
  useState,
  useEffect,
  ChangeEvent,
  FormEvent,
  useContext,
} from 'react';
import {
  ExploreContext,
  ExploreContextReturnTypes,
} from '@/contexts/ExploreContext';
import { SearchContainer } from './exploreSearchStyles';
import LoopCircleLoading from 'react-text-loop';
import { ClickAwayListener } from '@mui/material';
import { FaSearch } from 'react-icons/fa';

interface WordSwitcherTypes {
  prefix: string;
}

interface HeaderSearchTypes {
  fullWidth?: boolean;
}

const WordSwitcher = ({ prefix }: WordSwitcherTypes) => {
  const words = [
    'New Projects...',
    'Early Stage Startups...',
    'High-Yield Investments...',
    'Innovative Initiatives...',
    'Emerging Ventures...',
    'Lucrative Investments...',
    'Cutting-edge Technologies...',
    'Disruptive Solutions...',
    'Promising Ventures...',
    'Profitable Projects...',
    'Innovations...',
    'VC Opportunities...',
  ];
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div>
      <p>
        {prefix}{' '}
        <span>
          {isMounted && (
            <LoopCircleLoading interval={2000} mask={true} fade={true}>
              {words.map((word) => (
                <div key={word}>{word}</div>
              ))}
            </LoopCircleLoading>
          )}
        </span>
      </p>
    </div>
  );
};

const ExploreSearch = ({ fullWidth }: HeaderSearchTypes) => {
  const { searchTerm, setSearchTerm } = useContext(
    ExploreContext
  ) as ExploreContextReturnTypes;

  const [showPlaceHolder, setShowPlaceHolder] = useState(true);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setSearchTerm('');
  };

  return (
    <ClickAwayListener onClickAway={() => setShowPlaceHolder(true)}>
      <SearchContainer
        onSubmit={handleSearchSubmit}
        onClick={() => setShowPlaceHolder(false)}
        fullWidth={fullWidth}
      >
        <div className="search_input">
          <input
            id="searchInput"
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder=""
            aria-label="Search for Projects, NFTs..."
          />
          {showPlaceHolder && searchTerm === '' && (
            <div
              className="input-overlay"
              onClick={() => setShowPlaceHolder(false)}
            >
              <WordSwitcher prefix="Search for" />
            </div>
          )}
        </div>
        <div className="search_icons">
          <FaSearch />
        </div>
      </SearchContainer>
    </ClickAwayListener>
  );
};

export default ExploreSearch;
