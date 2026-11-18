import type { PlaceCard } from '../../types/place-card';
import PlaceCardComponent from '../place-card/place-card';

const noop: (offerId: string | null) => void = () => {};

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
          onHover={noop}
        />
      ))}
    </div>
  );
}

export default NearPlacesList;
