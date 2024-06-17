import React, { useEffect } from "react";
const MapComponent = ({ plotCoordinates, plotNumber, pinCoordinates }) => {
  const mapContainerStyle = {
    height: "100%",
    width: "100%",
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyDBmX0RRv74HsXPJHQYrpD5xqRgV-oQ9f8&callback=initMap`;
    script.async = true;
    document.body.appendChild(script);

    window.initMap = function () {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        zoom: 18,
        center: pinCoordinates,
        mapTypeId: "terrain",
      });

      const triangleCoords = plotCoordinates;

      const mapArea = new window.google.maps.Polygon({
        paths: triangleCoords,
        strokeColor: "#FF0000",
        strokeOpacity: 0.9,
        strokeWeight: 2,
        fillColor: "#FF0000",
        fillOpacity: 0.3,
      });

      mapArea.setMap(map);

      // Calculate centroid function
      function calculateCentroid(coords) {
        let latSum = 0;
        let lngSum = 0;
        const numCoords = coords.length;

        coords.forEach((coord) => {
          latSum += coord.lat;
          lngSum += coord.lng;
        });

        return {
          lat: latSum / numCoords,
          lng: lngSum / numCoords,
        };
      }

      const centroid = calculateCentroid(triangleCoords);
      new window.google.maps.Marker({
        position: centroid,
        map: map,
        title: plotNumber,
        icon: {
          url: "http://maps.google.com/mapfiles/ms/icons/yellow-dot.png",
          scaledSize: new window.google.maps.Size(30, 30),
        },
      });
    };
    // eslint-disable-next-line 
  }, [plotNumber]);

  return <div id="map" style={mapContainerStyle}></div>;
};

export default MapComponent;
