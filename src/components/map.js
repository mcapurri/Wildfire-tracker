import { useState } from "react";
import GoogleMapReact from "google-map-react";
import LocationMarker from "./location-marker";
import LocationInfoBox from "./location-info";
const { API_KEY } = require("./secrets.json");

const Map = ({ eventData, center, zoom }) => {
    console.log("eventData props", eventData);
    const [locationInfo, setlocationInfo] = useState(null);

    const markers = eventData.map((e, i) => {
        if (e.categories[0].id === 8) {
            return (
                <LocationMarker
                    lat={e.geometries[0].coordinates[1]}
                    lng={e.geometries[0].coordinates[0]}
                    onClick={() =>
                        setlocationInfo({ id: e[i].id, title: e[i].title })
                    }
                />
            );
        }
        return null;
    });
    return (
        <div className="map">
            <GoogleMapReact
                bootstrapURLKeys={{
                    key: API_KEY,
                }}
                defaultCenter={center}
                defaultZoom={zoom}
            >
                {markers}
            </GoogleMapReact>
            {locationInfo && <LocationInfoBox info={locationInfo} />}
        </div>
    );
};
Map.defaultProps = {
    center: {
        lat: 42.3265,
        lng: -122.8756,
    },
    zoom: 6,
};
export default Map;
