import {
  Device,
  OpenVidu,
  OpenViduError,
  Session,
  StreamManager,
} from "openvidu-browser";
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import UserVideoComponent from "../../components/Streaming/UserVideoComponent";

const APPLICATION_SERVER_URL: string =
  process.env.NODE_ENV === "production" ? "" : "http://192.168.30.214:5000/";

interface StreamingViewProps {}

const StreamingView: React.FC<StreamingViewProps> = () => {
  const [mySessionId, setMySessionId] = useState<string>("SessionA");
  const [myUserName, setMyUserName] = useState<string>(
    `Participant${Math.floor(Math.random() * 100)}`
  );
  const [session, setSession] = useState<Session | undefined>(undefined);
  const [publisher, setPublisher] = useState<StreamManager | undefined>(
    undefined
  );
  const [subscribers, setSubscribers] = useState<StreamManager[]>([]);
  const [currentVideoDevice, setCurrentVideoDevice] = useState<Device | null>(
    null
  );
  const [currentAudioDevice, setCurrentAudioDevice] = useState<Device | null>(
    null
  );

  const [videoDeviceList, setVideoNameList] = useState<
    { label: string; id: string }[]
  >([]);

  const [audioDeviceList, setAudioNameList] = useState<
    { label: string; id: string }[]
  >([]);

  const OV = useRef<OpenVidu>(new OpenVidu());

  const handleChangeSessionId = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMySessionId(e.target.value);
    },
    []
  );

  const handleChangeUserName = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setMyUserName(e.target.value);
    },
    []
  );

  const joinSession = useCallback((event: React.FormEvent) => {
    event.preventDefault();

    const mySession = OV.current.initSession();

    mySession.on("streamCreated", (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((subscribers) => [...subscribers, subscriber]);
    });

    mySession.on("streamDestroyed", (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    setSession(mySession);
  }, []);

  const createSession = async (sessionId: string) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The sessionId
  };

  const createToken = async (sessionId: string) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + `api/sessions/${sessionId}/connections`,
      {},
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    return response.data; // The token
  };

  const getToken = useCallback(async () => {
    return createSession(mySessionId).then((sessionId) =>
      createToken(sessionId)
    );
  }, [mySessionId]);

  useEffect(() => {
    if (session) {
      getToken().then(async (token) => {
        try {
          await session.connect(token, { clientData: myUserName });

          const newPublisher = await OV.current.initPublisherAsync(undefined, {
            audioSource: undefined,
            videoSource: undefined,
            publishAudio: true,
            publishVideo: true,
            resolution: "640x480",
            frameRate: 30,
            insertMode: "APPEND",
            mirror: false,
          });

          session.publish(newPublisher);

          const devices = await OV.current.getDevices();

          const videoDevices = devices.filter(
            (device) => device.kind === "videoinput"
          );
          const auidioDevices = devices.filter(
            (device) => device.kind === "audioinput"
          );

          setVideoNameList(
            videoDevices.map((e) => ({ label: e.label, id: e.deviceId }))
          );

          setAudioNameList(
            auidioDevices.map((e) => ({ label: e.label, id: e.deviceId }))
          );

          const currentVideoDeviceId = videoDeviceList[0].id;
          const currentAudioDeviceId = videoDeviceList[0].id;

          const currentVideoDevice =
            videoDevices.find(
              (device) => device.deviceId === currentVideoDeviceId
            ) || null;
          const currentAudioDevice =
            videoDevices.find(
              (device) => device.deviceId === currentAudioDeviceId
            ) || null;

          setPublisher(newPublisher);
          setCurrentVideoDevice(currentVideoDevice);
          setCurrentAudioDevice(currentAudioDevice);
        } catch (error: unknown) {
          if (error instanceof OpenViduError) {
            console.log(
              "There was an error connecting to the session:",
              error.name,
              error.message
            );
          } else {
            console.log(error);
          }
        }
      });
    }
  }, [session, myUserName, getToken]);

  const leaveSession = useCallback(() => {
    if (session) {
      session.disconnect();
    }

    OV.current = new OpenVidu();
    setSession(undefined);
    setSubscribers([]);
    setMySessionId("SessionA");
    setMyUserName(`Participant${Math.floor(Math.random() * 100)}`);
    setPublisher(undefined);
  }, [session]);

  const switchCamera = useCallback(async () => {
    try {
      const devices = await OV.current.getDevices();
      const videoDevices = devices.filter(
        (device) => device.kind === "videoinput"
      );

      if (videoDevices && videoDevices.length > 1) {
        const newVideoDevice = videoDevices.filter(
          (device) => device.deviceId !== currentVideoDevice?.deviceId
        );

        if (newVideoDevice.length > 0) {
          const newPublisher = OV.current.initPublisher(undefined, {
            videoSource: newVideoDevice[0].deviceId,
            publishAudio: true,
            publishVideo: true,
            mirror: true,
          });

          if (session) {
            await session.publish(newPublisher);
            setCurrentVideoDevice(newVideoDevice[0]);
            setPublisher(newPublisher);
          }
        }
      }
    } catch (e) {
      console.error(e);
    }
  }, [currentVideoDevice, session]);

  const deleteSubscriber = useCallback((streamManager: StreamManager) => {
    setSubscribers((prevSubscribers) => {
      const index = prevSubscribers.indexOf(streamManager);
      if (index > -1) {
        const newSubscribers = [...prevSubscribers];
        newSubscribers.splice(index, 1);
        return newSubscribers;
      } else {
        return prevSubscribers;
      }
    });
  }, []);

  useEffect(() => {
    const handleBeforeUnload = () => {
      leaveSession();
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [leaveSession]);

  return (
    <div>
      {session === undefined ? (
        <div id="join">
          <div id="img-div">
            <img
              src="resources/images/openvidu_grey_bg_transp_cropped.png"
              alt="OpenVidu logo"
            />
          </div>
          <div id="join-dialog">
            <h1> Join a video session </h1>
            <form onSubmit={joinSession}>
              <p>
                <label>Participant: </label>
                <input
                  type="text"
                  id="userName"
                  value={myUserName}
                  onChange={handleChangeUserName}
                  required
                />
              </p>
              <p>
                <label> Session: </label>
                <input
                  type="text"
                  id="sessionId"
                  value={mySessionId}
                  onChange={handleChangeSessionId}
                  required
                />
              </p>
              <input name="commit" type="submit" value="JOIN" />
            </form>
          </div>
        </div>
      ) : null}

      {session !== undefined ? (
        <div id="session">
          <div id="session-header">
            <h1 id="session-title">{mySessionId}</h1>
            <input
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="Leave session"
            />
            <input
              type="button"
              id="buttonSwitchCamera"
              onClick={switchCamera}
              value="Switch Camera"
            />
          </div>
          {publisher !== undefined ? (
            <div id="main-video">
              <UserVideoComponent streamManager={publisher} />
            </div>
          ) : null}
          <p>{subscribers.map((element) => element.id)}</p>
        </div>
      ) : null}
    </div>
  );
};

export default StreamingView;
