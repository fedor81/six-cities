import BookmarkButton from '../bookmark-button/bookmark-button';

type PriceBlockProps = {
  cost: number;
  bookmarkActive: boolean;
};

function PriceBlock({ cost, bookmarkActive }: PriceBlockProps): JSX.Element {
  return (
    <div className="place-card__price-wrapper">
      <div className="place-card__price">
        <b className="place-card__price-value">&euro;{cost}</b>
        <span className="place-card__price-text">&#47;&nbsp;night</span>
      </div>
      <BookmarkButton isActive={bookmarkActive} />
    </div>
  );
}

export default PriceBlock;
