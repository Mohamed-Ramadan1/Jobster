import UserItem from "./UserItem";

import "./UsersList.css";

const UsersList = ({ items }) => {
  return (
    <>
      {!items && <div className="center">No users found.</div>}

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
