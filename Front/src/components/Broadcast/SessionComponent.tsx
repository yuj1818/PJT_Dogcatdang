import { useCallback, useEffect, useState } from "react";
import { Publisher, Session, Subscriber } from "openvidu-browser";
import MyVideo from "./MyVideo";
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
      setSubscribers(
        subscribers.filter((element) => element.id !== subscriber.id)
      );
    },
    [setSubscribers, session, subscribers]
  );

  useEffect(() => {
    console.log(subscribers);
  }, [subscribers]);

  return (
    <>
      {publisher && <MyVideo streamManager={publisher}></MyVideo>}
      {subscribers.map((subscriberItem) => (
        <div key={subscriberItem.id}>
          <MyVideo streamManager={subscriberItem} />
        </div>
      ))}
      <SendChat
        onForeceLeave={handleForcedLeave}
        subscribers={subscribers}
        session={session}
      />
      <UserList subscribers={subscribers}></UserList>
    </>
  );
};

export default SessionComponent;
