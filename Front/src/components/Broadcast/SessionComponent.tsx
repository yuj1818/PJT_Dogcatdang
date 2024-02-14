import { useEffect, useState } from "react";
import { Publisher, Session, Subscriber } from "openvidu-browser";
import MyVideo from "./MyVideo";
import Chat from "./Chat";
import styled from "styled-components";
import AnimalList from "./AnimalList";
import { isOrg } from "../../pages/users/SignInPage";

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
      <Container>
        {publisher && (
          <MyVideo
            streamManager={publisher}
            leaveSession={leaveSession}
          ></MyVideo>
        )}
        {subscribers.map((subscriberItem, idx) => (
          <MyVideo
            key={idx}
            streamManager={subscriberItem}
            leaveSession={leaveSession}
          />
        ))}
        {!publisher && subscribers.length === 0 && (
          <p>방송이 종료되었습니다.</p>
        )}
        <Chat
          // onForeceLeave={handleForcedLeave}
          session={session}
        />
      </Container>
      <AnimalList />
    </>
  );
};

export default SessionComponent;
