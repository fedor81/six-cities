type PlaceCardTypeBadgeProps = {
  type: string;
};

function PlaceCardTypeBadge({ type }: PlaceCardTypeBadgeProps) {
  return (
    <p className="place-card__type">{type}</p>
  );
}

export default PlaceCardTypeBadge;
