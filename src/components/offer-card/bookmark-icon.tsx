type BookmarkIconProps = {
  width: number;
  height: number;
  className: string;
};

function BookmarkIcon({ width, height, className }: BookmarkIconProps): JSX.Element {
  return (
    <svg className={className} width={width} height={height}>
      <use xlinkHref="#icon-bookmark" />
    </svg>
  );
}

export default BookmarkIcon;
