import UserItem from "./UserItem";

import "./UsersList.css";

import { Card } from "../../shared/components";
const UsersList = ({ items }) => {
  return (
    <>
      {!items && (
        <div className="center">
          <Card>
            <h2>No users found.</h2>
          </Card>
        </div>
      )}

      {items && (
        <ul className="users-list">
          {items.map((user) => (
            <UserItem key={user.id} user={user} />
          ))}
        </ul>
      )}
    </>
  );
};

export default UsersList;
