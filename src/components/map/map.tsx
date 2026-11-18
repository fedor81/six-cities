import { useRef, useEffect } from 'react';
import { Icon, Marker, layerGroup, Map as LeafletMap, TileLayer } from 'leaflet';
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
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerLayerRef = useRef<ReturnType<typeof layerGroup> | null>(null);
  const markersRef = useRef<Record<string, Marker>>({});
  const prevOfferIdsRef = useRef<string[]>([]);
  const initialViewRef = useRef(city.location);

  // Create the Leaflet map once for the component lifetime
  useEffect(() => {
    const container = mapContainerRef.current;

    if (!container) {
      return;
    }

    const instance = new LeafletMap(container, {
      center: {
        lat: initialViewRef.current.latitude,
        lng: initialViewRef.current.longitude,
      },
      zoom: initialViewRef.current.zoom,
    });

    instance.addLayer(
      new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      )
    );

    mapRef.current = instance;
    markerLayerRef.current = layerGroup().addTo(instance);

    return () => {
      instance.remove();
      mapRef.current = null;
      markerLayerRef.current = null;
      markersRef.current = {};
      prevOfferIdsRef.current = [];
    };
  }, []);

  // Follow the selected city
  useEffect(() => {
    mapRef.current?.setView(
      [city.location.latitude, city.location.longitude],
      city.location.zoom
    );
  }, [city.location.latitude, city.location.longitude, city.location.zoom]);

  // Manage markers — fires on every render but only acts when offer IDs actually change
  useEffect(() => {
    const markerLayer = markerLayerRef.current;

    if (!markerLayer) {
      return;
    }

    const currentIds = offers.map((o) => o.id).sort();
    const prevIds = prevOfferIdsRef.current;

    const hasChanged =
      currentIds.length !== prevIds.length ||
      currentIds.some((id, index) => id !== prevIds[index]);

    if (!hasChanged) {
      return;
    }

    const currentIdSet = new Set(currentIds);

    // Remove markers no longer in offers
    prevIds.forEach((id) => {
      if (!currentIdSet.has(id)) {
        markerLayer.removeLayer(markersRef.current[id]);
        delete markersRef.current[id];
      }
    });

    // Add new markers
    offers.forEach((offer) => {
      if (!markersRef.current[offer.id]) {
        const marker = new Marker(
          {
            lat: offer.location.latitude,
            lng: offer.location.longitude,
          },
          { icon: offer.id === selectedOfferId ? currentCustomIcon : defaultCustomIcon }
        );
        marker.addTo(markerLayer);
        markersRef.current[offer.id] = marker;
      }
    });

    prevOfferIdsRef.current = currentIds;
  });

  // Update marker icons when selection changes
  useEffect(() => {
    Object.entries(markersRef.current).forEach(([offerId, marker]) => {
      marker.setIcon(
        offerId === selectedOfferId ? currentCustomIcon : defaultCustomIcon
      );
    });
  }, [selectedOfferId]);

  return <div style={{ height: '100%' }} ref={mapContainerRef} />;
}

export default Map;
