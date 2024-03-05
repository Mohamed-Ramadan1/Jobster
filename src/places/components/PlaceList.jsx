import { Card } from "../../shared/components";
import PlaceItem from "./PlaceItem";

import "./PlaceList.css";

const PlaceList = (props) => {
  if (props.items === 0) {
    return (
      <Card>
        <div className="place-list center">
          <h2>No places found. Maybe create one?</h2>
          <button>Share Place</button>
        </div>
      </Card>
    );
  }
  return (
    <ul className="place-list">
      {props.items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
