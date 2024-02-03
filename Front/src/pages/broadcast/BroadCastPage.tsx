import { useState, useEffect, useCallback } from "react";
import {
  OpenVidu,
  Session as OVSession,
  Publisher,
  Subscriber,
} from "openvidu-browser";
import axios, { AxiosError } from "axios";
import BroadcastForm from "../../components/Broadcast/BroadcastForm";
import SessionComponent from "../../components/Broadcast/SessionComponent";
import { isOrg as org } from "../users/SignInPage";
import { useUserInfo } from "../../util/hooks";

const OPENVIDU_SERVER_URL = `http://localhost:4443`;
const OPENVIDU_SERVER_SECRET = "MY_SECRET";

const BroadCastPage = () => {
  const [session, setSession] = useState<OVSession | undefined>(undefined);
  const [sessionId, setSessionId] = useState("");
  const [subscriber, setSubscriber] = useState<Subscriber | undefined>(
    undefined
  );
  const [publisher, setPublisher] = useState<Publisher | undefined>(undefined);
  const [OV, setOV] = useState<OpenVidu | undefined>(undefined);
  const { id, nickname } = useUserInfo();

  const leaveSession = useCallback(() => {
    if (session) {
      session
        .signal({
          data: "닉네임님이 퇴장하였습니다.",
          to: [],
          type: "signal:my-chat",
        })
        .then(() => {});

      session.disconnect();
      setOV(undefined);
      setSession(undefined);
      setSessionId("");
      setSubscriber(undefined);
      setPublisher(undefined);
    }
  }, [session]);

  useEffect(() => {
    window.addEventListener("beforeunload", leaveSession);

    return () => {
      leaveSession();
      window.removeEventListener("beforeunload", leaveSession);
    };
  }, [leaveSession]);

  const joinSession = useCallback(() => {
    const newOV = new OpenVidu();
    newOV.enableProdMode();
    setOV(newOV);
    setSession(newOV.initSession());
  }, []);

  const getToken = useCallback(async (): Promise<string> => {
    const createToken = async (sessionIds: string): Promise<string> => {
      const response = await axios.post(
        `${OPENVIDU_SERVER_URL}/api/sessions/${sessionIds}/connection`,
        {},
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
      return response.data.token;
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

  const sessionIdChangeHandler = useCallback((event: string) => {
    setSessionId(event);
  }, []);

  useEffect(() => {
    if (!session) {
      return;
    }

    session.on("streamCreated", (event) => {
      const newSubscriber = session.subscribe(event.stream, undefined);
      setSubscriber(newSubscriber);
      console.log(newSubscriber);
    });

    const isOrg = org();

    if (isOrg) {
      getToken().then((token) => {
        session.connect(token, { nickname, id }).then(() => {
          if (OV) {
            const newPublisher = OV.initPublisher(undefined, {
              audioSource: undefined,
              videoSource: undefined,
              publishAudio: true,
              publishVideo: true,
              frameRate: 10,
            });

            setPublisher(newPublisher);
            session.publish(newPublisher);
          }
        });
      });
    } else {
      getToken().then((token) => {
        session.connect(token, { nickname, id }).then(() => {
          session.signal({
            data: `${nickname}님이 입장하였습니다.`,
            to: [],
            type: "signal:chat",
          });
        });
      });
    }
  }, [session, OV, sessionId, getToken]);

  return (
    <div>
      <>
        {session ? (
          <SessionComponent
            publisher={publisher as Publisher}
            subscriber={subscriber!}
            session={session}
          />
        ) : (
          <BroadcastForm
            sessionIdChangeHandler={sessionIdChangeHandler}
            joinSession={joinSession}
          />
        )}
      </>
    </div>
  );
};

export default BroadCastPage;
