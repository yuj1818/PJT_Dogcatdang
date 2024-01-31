import { useState, useEffect, useCallback } from "react";
import {
  OpenVidu,
  Session as OVSession,
  Publisher,
  Subscriber,
} from "openvidu-browser";
import axios, { AxiosError } from "axios";
import Form from "../../components/Broadcast/Form";
import Session from "../../components/Broadcast/Session";

const OPENVIDU_SERVER_URL = `http://localhost:4443`;
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

const BroadCastPage = () => {
  const [session, setSession] = useState<OVSession | "">("");
  const [sessionId, setSessionId] = useState<string>("");
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [OV, setOV] = useState<OpenVidu | null>(null);

  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect();
    }

    setOV(null);
    setSession("");
    setSessionId("");
    setSubscriber(null);
    setPublisher(null);
  }, [session]);

  const joinSession = () => {
    const newOV = new OpenVidu();
    setOV(newOV);
    setSession(newOV.initSession());
  };

  const getToken = useCallback(async (): Promise<string> => {
    const createToken = (sessionIds: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        const data = {};
        axios
          .post(
            `${OPENVIDU_SERVER_URL}/api/sessions/${sessionIds}/connection`,
            data,
            {
              headers: {
                Authorization: `Basic ${btoa(
                  `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
                )}`,
                "Content-Type": "application/json",
                withCredentials: true,
              },
            }
          )
          .then((response) => {
            resolve((response.data as { token: string }).token);
          })
          .catch((error) => reject(error));
      });
    };

    const createSession = async (sessionIds: string): Promise<string> => {
      try {
        const data = JSON.stringify({ customSessionId: sessionIds });
        const response = await axios.post(
          `${OPENVIDU_SERVER_URL}/api/sessions`,
          data,
          {
            headers: {
              Authorization: `Basic ${btoa(
                `OPENVIDUAPP:${OPENVIDU_SERVER_SECRET}`
              )}`,
              "Content-Type": "application/json",
              withCredentials: true,
            },
          }
        );

        return (response.data as { id: string }).id;
      } catch (error) {
        const errorResponse = (error as AxiosError)?.response;

        if (errorResponse?.status === 409) {
          return sessionIds;
        }

        return "";
      }
    };

    try {
      const newSessionId = await createSession(sessionId);
      const token = await createToken(newSessionId);
      return token;
    } catch (error) {
      throw new Error("Failed to get token.");
    }
  }, [sessionId]);

  const sessionIdChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSessionId(event.target.value);
  };

  useEffect(() => {
    if (session === "") return;

    session.on("streamDestroyed", (event) => {
      if (subscriber && event.stream.streamId === subscriber.stream.streamId) {
        setSubscriber(null);
      }
    });
  }, [subscriber, session]);

  useEffect(() => {
    if (session === "") return;

    session.on("streamCreated", (event) => {
      const subscribers = session.subscribe(event.stream, "");
      setSubscriber(subscribers);
    });

    getToken()
      .then((token) => {
        session
          .connect(token)
          .then(() => {
            if (OV) {
              const publishers = OV.initPublisher(undefined, {
                audioSource: undefined,
                videoSource: undefined,
                publishAudio: true,
                publishVideo: true,
              });

              setPublisher(publishers);
              session
                .publish(publishers)
                .then(() => {})
                .catch(() => {});
            }
          })
          .catch(() => {});
      })
      .catch(() => {});
  }, [session, OV, sessionId, getToken]);

  useEffect(() => {
    return () => leaveSession();
  }, []);

  return (
    <div>
      <h1>진행화면</h1>
      <>
        {session ? (
          <Session
            publisher={publisher as Publisher}
            subscriber={subscriber as Subscriber}
          />
        ) : (
          <Form
            joinSession={joinSession}
            sessionId={sessionId}
            sessionIdChangeHandler={sessionIdChangeHandler}
          />
        )}
      </>
    </div>
  );
};

export default BroadCastPage;
