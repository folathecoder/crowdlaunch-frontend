import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { SearchContainer, SearchDropdown } from './headerSearchStyles';
import LoopCircleLoading from 'react-text-loop';
import { ClickAwayListener } from '@mui/material';
import { AnimatePresence } from 'framer-motion';
import { searchToggleVariant } from '@/styles/animation/searchToggleVariant';

interface WordSwitcherTypes {
  prefix: string;
}

interface HeaderSearchTypes {
  fullWidth?: boolean;
}

const WordSwitcher = ({ prefix }: WordSwitcherTypes) => {
  const words = ['Projects...', 'Startups...', 'NFTs...'];
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

const HeaderSearchBar = ({ fullWidth }: HeaderSearchTypes) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showPlaceHolder, setShowPlaceHolder] = useState(true);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Search term:', searchTerm);
    setSearchTerm('');
  };

  return (
    <ClickAwayListener onClickAway={() => setShowPlaceHolder(true)}>
      <SearchContainer
        onSubmit={handleSearchSubmit}
        onClick={() => setShowPlaceHolder(false)}
        fullWidth={fullWidth}
      >
        <div>
          <input
            id="searchInput"
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder=""
            aria-label="Search for Projects, NFTs..."
          />
          {showPlaceHolder && (
            <div
              className="input-overlay"
              onClick={() => setShowPlaceHolder(false)}
            >
              <WordSwitcher prefix="Search for" />
            </div>
          )}
        </div>
        <AnimatePresence>
          <SearchDropdown
            variants={searchToggleVariant('300px')}
            initial="hidden"
            animate={!showPlaceHolder ? 'show' : 'hidden'}
            exit="exit"
          >
            <p>Search</p>
          </SearchDropdown>
        </AnimatePresence>
      </SearchContainer>
    </ClickAwayListener>
  );
};

export default HeaderSearchBar;
