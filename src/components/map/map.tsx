import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup } from 'leaflet';
import useMap from '../../hooks/use-map';
import { PlaceCard, City } from '../../types/place-card';
import 'leaflet/dist/leaflet.css';
import { URL_MARKER_DEFAULT, URL_MARKER_CURRENT } from './map-config';

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
  const markersRef = useRef<Record<string, Marker>>({});

  useEffect(() => {
    if (map) {
      const markerLayer = layerGroup().addTo(map);
      const markers: Record<string, Marker> = {};

      offers.forEach((offer) => {
        const marker = new Marker({
          lat: offer.city.location.latitude,
          lng: offer.city.location.longitude,
        });

        marker.addTo(markerLayer);
        markers[offer.id] = marker;
      });

      markersRef.current = markers;

      return () => {
        map.removeLayer(markerLayer);
        markersRef.current = {};
      };
    }
  }, [map, offers]);

  useEffect(() => {
    Object.entries(markersRef.current).forEach(([offerId, marker]) => {
      marker.setIcon(
        offerId === selectedOfferId ? currentCustomIcon : defaultCustomIcon
      );
    });
  }, [offers, selectedOfferId]);

  return <div style={{ height: '100%' }} ref={mapRef} />;
}

export default Map;
