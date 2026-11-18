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
  const isRenderedRef = useRef<boolean>(false);
  const prevOfferIdsRef = useRef<string[]>([]);

  // Initialize the Leaflet map once; update center on city change
  useEffect(() => {
    const container = mapContainerRef.current;

    if (!isRenderedRef.current && container) {
      const instance = new LeafletMap(container, {
        center: {
          lat: city.location.latitude,
          lng: city.location.longitude,
        },
        zoom: city.location.zoom,
      });

      const tileLayer = new TileLayer(
        'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',
        {
          attribution:
            '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
        }
      );

      instance.addLayer(tileLayer);
      mapRef.current = instance;
      isRenderedRef.current = true;
    } else if (mapRef.current) {
      mapRef.current.setView(
        [city.location.latitude, city.location.longitude],
        city.location.zoom
      );
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [city.location.latitude, city.location.longitude, city.location.zoom]);

  // Manage markers — fires on every render but only acts when offer IDs actually change
  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    if (!markerLayerRef.current) {
      markerLayerRef.current = layerGroup().addTo(mapRef.current);
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

  // Cleanup on unmount
  useEffect(() => () => {
    if (mapRef.current && markerLayerRef.current) {
      mapRef.current.removeLayer(markerLayerRef.current);
    }
    markersRef.current = {};
    markerLayerRef.current = null;
  }, []);

  return <div style={{ height: '100%' }} ref={mapContainerRef} />;
}

export default Map;
