type RatingBarProps = {
  rating: number;
  className?: string;
};

function RatingBar({ rating, className = 'place-card__stars rating__stars' }: RatingBarProps): JSX.Element {
  return (
    <div className={className}>
      <span style={{ width: `${rating}%` }}></span>
      <span className="visually-hidden">Rating</span>
    </div>
  );
}

export default RatingBar;
