import type { PlaceCard } from '../../types/place-card';
import PlaceCardComponent from '../place-card/place-card';

type NearPlacesListProps = {
  offers: PlaceCard[];
};

function NearPlacesList({ offers }: NearPlacesListProps): JSX.Element {
  return (
    <div className="near-places__list places__list">
      {offers.map((offer) => (
        <PlaceCardComponent
          key={offer.id}
          {...offer}
          isActive={false}
          onMouseEnter={() => {}}
          onMouseLeave={() => {}}
        />
      ))}
    </div>
  );
}

export default NearPlacesList;
