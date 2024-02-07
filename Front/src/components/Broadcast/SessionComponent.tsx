import { useEffect, useState } from "react";
import { Publisher, Session, Subscriber } from "openvidu-browser";
import MyVideo from "./MyVideo";
import Chat from "./Chat";
import styled from "styled-components";
import AnimalList from "./AnimalList";

const Container = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-gap: 20px;
  padding: 20px;
  width: 100%;
`;

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
  const [end, setEnd] = useState(false);

  useEffect(() => {
    if (subscriber) {
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    }
  }, [subscriber]);

  useEffect(() => {
    session.on("streamDestroyed", () => {
      setSubscribers([]);
      setEnd(true);
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
      <Container>
        {publisher && <MyVideo streamManager={publisher}></MyVideo>}
        {subscribers.map((subscriberItem, idx) => (
          <MyVideo key={idx} streamManager={subscriberItem} />
        ))}
        {end && <p>방송이 종료되었습니다.</p>}
        <Chat
          // onForeceLeave={handleForcedLeave}
          subscribers={subscribers}
          session={session}
        />
      </Container>
      <AnimalList />
    </>
  );
};

export default SessionComponent;
