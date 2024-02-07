import { Session, Subscriber } from "openvidu-browser";
import React, { useEffect, useRef, useState } from "react";
import { getUserInfo } from "../../util/uitl";
import styled from "styled-components";
import { Contour, FormContainer, Input } from "../common/Design";
import { Button } from "../common/Button";

const ChattingContainer = styled.div`
  background-color: #fff;
  color: #121212;
  padding: 20px;
  text-align: left;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  flex: 1;
  max-height: 70vh;

  div {
    flex-grow: 1;
  }

  form {
    width: 100%;
  }
`;

const AllMessage = styled.div`
  overflow-y: auto;
  scroll-snap-type: y mandatory;
  scroll-snap-align: end;
  scroll-behavior: smooth;
`;

interface ChatProps {
  onForeceLeave?: (subscriber: Subscriber) => void;
  subscribers: Subscriber[];
  session: Session;
}

interface Message {
  nickname: string;
  content: string;
}

const Chat: React.FC<ChatProps> = ({ session }) => {
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessage] = useState<Message[]>([]);
  const messageDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageDiv) {
      messageDiv.current!.scrollTop = messageDiv.current!.scrollHeight;
    }
  }, []);

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  // 채팅 보내기
  const handleSubmitEvent = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!message) {
      return;
    }

    await session.signal({
      data: message,
      to: [],
      type: "chat",
    });

    setMessage("");
  };

  // 채팅 받기
  useEffect(() => {
    session.on("signal:chat", (event) => {
      const { nickname } = getUserInfo();

      setAllMessage((prev) => [
        ...prev,
        {
          nickname: nickname || "알 수 없는 사용자",
          content: event.data || "",
        },
      ]);
      console.log(event);
    });
  }, []);

  return (
    <ChattingContainer>
      <AllMessage ref={messageDiv}>
        {allMessage.map((element, idx) => (
          <p key={idx}>
            {element.nickname}: {element.content}
            {/* <button onClick={() => {onForeceLeave(element)}}>강퇴</button> */}
          </p>
        ))}
      </AllMessage>
      <Contour></Contour>
      <FormContainer onSubmit={handleSubmitEvent}>
        <label htmlFor="message" />
        <Input id="message" value={message} onChange={handleMessageChange} />
        <Button height={2.6} marginTop={0.4} type="submit" disabled={!message}>
          보내기
        </Button>
      </FormContainer>
    </ChattingContainer>
  );
};

export default Chat;
