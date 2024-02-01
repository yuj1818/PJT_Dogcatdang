import { useState, useEffect, useCallback } from "react";
import { Publisher, Session, Subscriber } from "openvidu-browser";
import Video from "./Video";
import SendChat from "./SendChat";
import UserList from "./UserList";

interface SessionComponentProps {
  subscriber: Subscriber;
  publisher: Publisher;
  session: Session;
}

const SessionComponent: React.FC<SessionComponentProps> = ({
  subscriber,
  publisher,
  session,
}) => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    if (subscriber) {
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    }
  }, [subscriber]);

  const handleForcedLeave = useCallback(
    (subscriber: Subscriber) => {
      session.unsubscribe(subscriber);
      setSubscribers((prev) => prev.filter((sub) => sub.id !== subscriber.id));
    },
    [setSubscribers, session]
  );

  return (
    <>
      <Video streamManager={publisher} />
      <SendChat
        onForeceLeave={handleForcedLeave}
        subscriber={subscriber}
        session={session}
      />
      <UserList subscribers={subscribers}></UserList>
    </>
  );
};

export default SessionComponent;
