import React from "react";
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

function BookclubMeeting() {
  const [session, setSession] = useState<OVSession | "">("");
  const [sessionId, setSessionId] = useState<string>("");
  const [subscriber, setSubscriber] = useState<Subscriber | null>(null);
  const [publisher, setPublisher] = useState<Publisher | null>(null);
  const [OV, setOV] = useState<OpenVidu | null>(null);

  const OPENVIDU_SERVER_URL = "http://localhost:5000/";

  const leaveSession = useCallback(() => {
    if (session) session.disconnect();

    setOV(null);
    setSession("");
    setSessionId("");
    setSubscriber(null);
    setPublisher(null);
  }, [session]);

  const joinSession = () => {
    const OVs = new OpenVidu();
    setOV(OVs);
    setSession(OVs.initSession());
  };

  useEffect(() => {
    window.addEventListener("beforeunload", leaveSession);

    return () => {
      window.removeEventListener("beforeunload", leaveSession);
    };
  }, [leaveSession]);

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

    const createSession = async (sessionIds: string): Promise<string> => {
      try {
        const response = await axios.post(
          `${OPENVIDU_SERVER_URL}api/sessions`,
          { customSessionId: sessionIds },
          { headers: { "Content-Type": "application/json" } }
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

    const createToken = (sessionIds: string): Promise<string> => {
      return new Promise((resolve, reject) => {
        axios
          .post(`${OPENVIDU_SERVER_URL}api/sessions/${sessionIds}/connection`, {
            headers: { "Content-Type": "application/json" },
          })
          .then((response) => {
            resolve((response.data as { token: string }).token);
          })
          .catch((error) => reject(error));
      });
    };

    const getToken = async (): Promise<string> => {
      try {
        const sessionIds = await createSession(sessionId);
        const token = await createToken(sessionIds);
        return token;
      } catch (error) {
        throw new Error("Failed to get token.");
      }
    };

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
                mirror: true,
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
  }, [session, OV, sessionId, OPENVIDU_SERVER_URL]);

  return (
    <div>
      <h1>진행화면</h1>
      <>
        {!session && (
          <Form
            joinSession={joinSession}
            sessionId={sessionId}
            sessionIdChangeHandler={sessionIdChangeHandler}
          />
        )}
        {session && (
          <Session
            publisher={publisher as Publisher}
            subscriber={subscriber as Subscriber}
          />
        )}
      </>
    </div>
  );
}

export default BookclubMeeting;
