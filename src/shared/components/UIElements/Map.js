import React, { useRef, useEffect } from "react";

import "./Map.css";

const Map = (props) => {
	const mapRef = useRef();

	const { center, zoom } = props;

	console.log(`\n [DEBUG] mapRef: `, mapRef);
	console.log(`\n [DEBUG] center: `, center);

	console.log(`\n [DEBUG] zoom: `, zoom);
	useEffect(() => {
		const map = new window.google.maps.Map(mapRef.current, {
			center: center,
			zoom: zoom,
		});

		console.log(`\n [DEBUG] map: `, map);

		new window.google.maps.Marker({ position: center, map: map });
	}, [center, zoom]);

	return <div ref={mapRef} className={`map ${props.className}`} style={props.style}></div>;
};

export default Map;
