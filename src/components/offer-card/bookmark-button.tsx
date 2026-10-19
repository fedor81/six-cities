import clsx from 'classnames';

type BookmarkButtonProps = {
  isActive: boolean;
};

function BookmarkButton({ isActive }: BookmarkButtonProps): JSX.Element {
  return (
    <button
      className={clsx(
        'place-card__bookmark-button',
        'button',
        { 'place-card__bookmark-button--active': isActive },
      )}
      type="button"
    >
      <svg className="place-card__bookmark-icon" width="18" height="19">
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">In bookmarks</span>
    </button>
  );
}

export default BookmarkButton;
