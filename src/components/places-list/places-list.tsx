import type { PlaceCard } from '../../types/place-card';
import PlaceCardComponent from '../place-card/place-card';

type PlacesListProps = {
  offers: PlaceCard[];
  activeOfferId: string | null;
  onOfferTypeChange: (offerId: string | null) => void;
};

function PlacesList({ offers, activeOfferId, onOfferTypeChange }: PlacesListProps): JSX.Element {
  return (
    <div className="cities__places-list places__list tabs__content">
      {offers.map((offer) => (
        <PlaceCardComponent
          key={offer.id}
          {...offer}
          isActive={offer.id === activeOfferId}
          onMouseEnter={() => onOfferTypeChange(offer.id)}
          onMouseLeave={() => onOfferTypeChange(null)}
        />
      ))}
    </div>
  );
}

export default PlacesList;
