type PremiumBadgeProps = {
  isPremium: boolean;
};

function PremiumBadge({ isPremium }: PremiumBadgeProps): JSX.Element | null {
  if (!isPremium) {
    return null;
  }

  return (
    <div className="place-card__mark">
      <span>Premium</span>
    </div>
  );
}

export default PremiumBadge;
