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
  const markerLayerRef = useRef<ReturnType<typeof layerGroup> | null>(null);

  useEffect(() => {
    if (map && !markerLayerRef.current) {
      markerLayerRef.current = layerGroup().addTo(map);
    }
  }, [map]);

  useEffect(() => {
    if (!markerLayerRef.current) {
      return;
    }

    const currentIds = new Set(offers.map((o) => o.id));
    const existingIds = new Set(Object.keys(markersRef.current));

    // Remove markers no longer in offers
    existingIds.forEach((id) => {
      if (!currentIds.has(id)) {
        markerLayerRef.current!.removeLayer(markersRef.current[id]);
        delete markersRef.current[id];
      }
    });

    // Add new markers
    offers.forEach((offer) => {
      if (!markersRef.current[offer.id]) {
        const marker = new Marker({
          lat: offer.location.latitude,
          lng: offer.location.longitude,
        });
        marker.addTo(markerLayerRef.current!);
        markersRef.current[offer.id] = marker;
      }
    });
  }, [offers]);

  // Update icons only when selected offer changes
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([offerId, marker]) => {
      marker.setIcon(
        offerId === selectedOfferId ? currentCustomIcon : defaultCustomIcon
      );
    });
  }, [selectedOfferId]);

  // Cleanup on unmount
  useEffect(() => () => {
    if (map && markerLayerRef.current) {
      map.removeLayer(markerLayerRef.current);
      markerLayerRef.current = null;
    }
    markersRef.current = {};
  }, [map]);

  return <div style={{ height: '100%' }} ref={mapRef} />;
}

export default Map;
