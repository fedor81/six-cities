import BookmarkIcon from './bookmark-icon';

function OfferBookmarkButton(): JSX.Element {
  return (
    <button className="offer__bookmark-button button" type="button">
      <BookmarkIcon width={31} height={33} className="offer__bookmark-icon" />
      <span className="visually-hidden">To bookmarks</span>
    </button>
  );
}

export default OfferBookmarkButton;
