import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { isOrg } from "../../pages/users/SignInPage";

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
    }
  }, [broadcastId, joinSession, sessionIdChangeHandler]);

  const onSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    joinSession();
  };

  return (
    <>
      {isOrg() ? (
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
      ) : (
        <>
          <form onSubmit={onSubmitHandler}>
            <p>출연 동물 목록</p>
            <button type="submit">입장하기</button>
          </form>
        </>
      )}
    </>
  );
};

export default Form;
