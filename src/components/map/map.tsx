import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { PlaceCard, City } from '../../types/place-card';
import 'leaflet/dist/leaflet.css';

const URL_MARKER_DEFAULT = '/img/pin.svg';
const URL_MARKER_CURRENT = '/img/pin-active.svg';

type MapProps = {
  city: City;
  offers: PlaceCard[];
  selectedOfferId: string | null;
};

const defaultCustomIcon = new Icon({
  iconUrl: URL_MARKER_DEFAULT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const currentCustomIcon = new Icon({
  iconUrl: URL_MARKER_CURRENT,
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

function Map({ city, offers, selectedOfferId }: MapProps): JSX.Element {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city.location);

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.city.location.latitude,
          lng: offer.city.location.longitude,
        });

        marker.setIcon(
          selectedOfferId !== null && offer.id === selectedOfferId
            ? currentCustomIcon
            : defaultCustomIcon
        );

        marker.addTo(markerLayer);
      });

      return () => {
        map.removeLayer(markerLayer);
      };
    }
  }, [map, offers, selectedOfferId]);

  return <div style={{ height: '100%' }} ref={mapRef} />;
}

export default Map;
