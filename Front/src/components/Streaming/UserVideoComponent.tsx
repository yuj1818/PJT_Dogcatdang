import styled from "styled-components";
import OpenViduVideoComponent from "./OvVideo";
import { StreamManager } from "openvidu-browser";

interface UserVideoComponentProps {
  streamManager: StreamManager;
}

const Container = styled.div`
  width: 100%;
  height: auto;
  float: left;
  cursor: pointer;

  div {
    position: absolute;
    background: #f8f8f8;
    padding-left: 5px;
    padding-right: 5px;
    color: #777777;
    font-weight: bold;
    border-bottom-right-radius: 4px;
  }

  p {
    margin: 0;
  }
`;

const UserVideoComponent: React.FC<UserVideoComponentProps> = ({
  streamManager,
}) => {
  const getNicknameTag = () => {
    // Gets the nickName of the user
    return JSON.parse(streamManager.stream.connection.data).clientData;
  };

  return (
    <Container>
      {streamManager !== undefined ? (
        <div>
          <OpenViduVideoComponent streamManager={streamManager} />
          <div>
            <p>{getNicknameTag()}</p>
          </div>
        </div>
      ) : null}
    </Container>
  );
};

export default UserVideoComponent;
