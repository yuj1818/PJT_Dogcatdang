import { Subscriber } from "openvidu-browser";
import React from "react";

interface UserList {
  subscribers: Subscriber[];
}

const UserList: React.FC<UserList> = ({ subscribers }) => {
  subscribers;
  return (
    <>
      {/* {subscribers.map((subscriber, idx) => (
        <p key={subscriber.id ?? idx}>{subscriber.id}</p>
      ))} */}
    </>
  );
};

export default UserList;
