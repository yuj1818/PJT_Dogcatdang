import { useState, useEffect } from 'react';
import { Map, MapMarker } from 'react-kakao-maps-sdk'
import styled from 'styled-components';

const StyledMap = styled.div`
  width: 35%;
`

const KakaoMap: React.FC<{address: string}> = (props) => {
  const [coords, setCoords] = useState({ lat: 35.0961029679051, lng: 128.857751633716 });

  useEffect(() => {
    const geocoder = new kakao.maps.services.Geocoder();

    geocoder.addressSearch(props.address, (result, status) => {
      if (status === kakao.maps.services.Status.OK) {
        const pos = new kakao.maps.LatLng(Number(result[0].y), Number(result[0].x));
        setCoords({ lat: pos.getLat(), lng: pos.getLng() });
      }
    })
  }, [props.address])

  return (
    <StyledMap>
      <Map 
            center={coords} 
            style={{ width: '100%', height: '20vh' }}
            level={3} 
          >
        <MapMarker position={coords} />
      </Map>
    </StyledMap>
	);
}

export default KakaoMap;