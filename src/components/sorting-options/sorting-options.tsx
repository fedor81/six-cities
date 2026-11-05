import { useState } from 'react';
import clsx from 'classnames';

import { SORTING_OPTIONS } from '../../const';
import type { SortingType } from '../../const';

type SortingOptionsProps = {
  currentSorting: SortingType;
  onSortingChange: (sorting: SortingType) => void;
};

function SortingOptions({ currentSorting, onSortingChange }: SortingOptionsProps): JSX.Element {
  const [isOpen, setIsOpen] = useState(false);

  const handleTypeClick = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOptionClick = (sorting: SortingType) => {
    onSortingChange(sorting);
    setIsOpen(false);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleTypeClick}
      >
        {currentSorting}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={clsx('places__options', 'places__options--custom', {
          'places__options--opened': isOpen,
        })}
      >
        {SORTING_OPTIONS.map((option) => (
          <li
            key={option}
            className={clsx('places__option', {
              'places__option--active': option === currentSorting,
            })}
            tabIndex={0}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default SortingOptions;
