import type { PlaceCardType } from '../../../types/place-card';

type PlaceInfoProps = {
  title: string;
  type: PlaceCardType;
};

function PlaceInfo({ title, type }: PlaceInfoProps): JSX.Element {
  return (
    <>
      <h2 className="place-card__name">{title}</h2>
      <p className="place-card__type">{type}</p>
    </>
  );
}

export default PlaceInfo;
