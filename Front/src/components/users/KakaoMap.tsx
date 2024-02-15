import { useState, useEffect, useRef } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk';

interface sizeData {
  width: string;
  height: string;
}

const KakaoMap: React.FC<{address: string, style: sizeData}> = (props) => {
  const mapRef = useRef<kakao.maps.Map | null>(null);
  const [coords, setCoords] = useState({ lat: 35.0961029679051, lng: 128.857751633716 });
  const [mapSize, setMapSize] = useState({
    width: "100%",
    height: "20vh",
  });

  const resizeMap = () => {
    setMapSize(props.style);
  }

  useEffect(() => {
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(props.address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const pos = new kakao.maps.LatLng(Number(result[0].y), Number(result[0].x));
        setCoords({ lat: pos.getLat(), lng: pos.getLng() });
      }
    })

    resizeMap();

    mapRef.current?.relayout();
  }, [props.address, props.style])

  return (
    <div style={props.style}>
      <Map 
            center={coords} 
            style={mapSize}
            level={3}
            ref={mapRef}
          >
        <MapMarker position={coords} />
      </Map>
    </div>
	);
}

export default KakaoMap;