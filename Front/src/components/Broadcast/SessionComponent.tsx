import { useEffect, useState } from "react";
import { Publisher, Session, Subscriber } from "openvidu-browser";
import MyVideo from "./MyVideo";

interface SessionComponentProps {
  subscriber: Subscriber;
  publisher: Publisher;
  session: Session;
  leaveSession: () => void;
}

const SessionComponent: React.FC<SessionComponentProps> = ({
  subscriber,
  publisher,
  session,
  leaveSession,
}) => {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);

  useEffect(() => {
    if (subscriber) {
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    }
  }, [subscriber]);

  useEffect(() => {
    session.on("streamDestroyed", () => {
      setSubscribers([]);
    });
  }, []);

  // const handleForcedLeave = useCallback(
  //   (subscriber: Subscriber) => {
  //     session.unsubscribe(subscriber);
  //     setSubscribers(
  //       subscribers.filter((element) => element.id !== subscriber.id)
  //     );
  //   },
  //   [setSubscribers, session, subscribers]
  // );

  return (
    <>
      {publisher && (
        <MyVideo
          streamManager={publisher}
          leaveSession={leaveSession}
          session={session}
        ></MyVideo>
      )}
      {subscribers.map((subscriberItem, idx) => (
        <MyVideo
          key={idx}
          streamManager={subscriberItem}
          leaveSession={leaveSession}
          session={session}
        />
      ))}
      {!publisher && subscribers.length === 0 && <p>방송이 종료되었습니다.</p>}
    </>
  );
};

export default SessionComponent;
