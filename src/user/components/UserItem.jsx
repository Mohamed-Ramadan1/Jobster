// Packages
import { Link } from "react-router-dom";

// UI Element imports
import { Avatar, Card } from "../../shared/components";
import "./UserItem.css";

const UserItem = ({ user }) => {
  const { id, image, name, places: placeCount } = user;
  console.log(placeCount);
  return (
    <li className="user-item">
      <Card className="user-item__content">
        <Link to={`/${id}/places`}>
          <div className="user-item__image">
            <Avatar image={image} alt={name} />
          </div>
          <div className="user-item__info">
            <h2>{name}</h2>
            <h3>
              {placeCount} {placeCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};

export default UserItem;
