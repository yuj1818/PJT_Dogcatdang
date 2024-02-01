import { useEffect } from "react";
import { useParams } from "react-router-dom";

interface FormProps {
  joinSession: () => void;
  sessionId: string;
  sessionIdChangeHandler: (
    event: React.ChangeEvent<HTMLInputElement> | string
  ) => void;
}

const Form: React.FC<FormProps> = ({
  joinSession,
  sessionId,
  sessionIdChangeHandler,
}) => {
  const { broadcastId } = useParams();
  useEffect(() => {
    if (broadcastId) {
      console.log(broadcastId);
      sessionIdChangeHandler(broadcastId);
      joinSession();
    }
  }, [broadcastId, joinSession, sessionIdChangeHandler]);

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    joinSession();
  };

  return (
    <>
      <h1>Join a video session</h1>
      <form onSubmit={onSubmitHandler}>
        <p>
          <input
            type="text"
            value={sessionId}
            onChange={sessionIdChangeHandler}
            minLength={8}
            maxLength={20}
            required
          />
        </p>
        <p>
          <input type="submit" value="JOIN" />
        </p>
      </form>
    </>
  );
};

export default Form;
