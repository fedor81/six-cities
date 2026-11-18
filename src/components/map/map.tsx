import React, { useEffect, useMemo, useRef } from 'react';
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

function MapInner({ city, offers, selectedOfferId }: MapProps): JSX.Element {
  const mapContainerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerLayerRef = useRef<ReturnType<typeof layerGroup> | null>(null);
  const markersRef = useRef<Record<string, Marker>>({});
  const prevOfferIdsRef = useRef<string[]>([]);
  const prevSelectedIdRef = useRef<string | null>(null);
  const initialViewRef = useRef(city.location);

  const offerIds = useMemo(() => offers.map((o) => o.id).sort(), [offers]);

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

  // Add or remove markers only when the set of offer IDs changes
  useEffect(() => {
    const markerLayer = markerLayerRef.current;

    if (!markerLayer) {
      return;
    }

    const currentIds = offerIds;
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
  }, [offers, offerIds, selectedOfferId]);

  // Update only the markers whose selection state actually changed
  useEffect(() => {
    const prevId = prevSelectedIdRef.current;

    if (prevId !== null && markersRef.current[prevId]) {
      markersRef.current[prevId].setIcon(defaultCustomIcon);
    }

    if (selectedOfferId !== null && markersRef.current[selectedOfferId]) {
      markersRef.current[selectedOfferId].setIcon(currentCustomIcon);
    }

    prevSelectedIdRef.current = selectedOfferId;
  }, [selectedOfferId]);

  return <div style={{ height: '100%' }} ref={mapContainerRef} />;
}

const Map = React.memo(MapInner);

export default Map;
