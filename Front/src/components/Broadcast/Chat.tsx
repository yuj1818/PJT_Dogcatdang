import { Session } from "openvidu-browser";
import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getUserInfo } from "../../util/uitl";
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
  // onForeceLeave?: (subscriber: Subscriber) => void;
  // subscribers: Subscriber[];
  session: Session;
}

interface Message {
  nickname: string;
  content: string;
}

const isMessage = (obj: any): obj is Message => {
  return (
    typeof obj === "object" &&
    obj !== null &&
    "nickname" in obj &&
    "content" in obj
  );
};

const Chat: React.FC<ChatProps> = ({ session }) => {
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessage] = useState<(Message | string)[]>([]);
  const messageDiv = useRef<HTMLDivElement>(null);
  const { nickname } = getUserInfo();

  useEffect(() => {
    if (messageDiv) {
      messageDiv.current!.scrollTop = messageDiv.current!.scrollHeight;
    }
  }, [allMessage]);

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  // 채팅 보내기
  const handleSubmitEvent = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!message) {
      return;
    }

    const data = JSON.stringify({ nickname, message });

    await session.signal({
      data: data,
      to: [],
      type: "chat",
    });

    setMessage("");
  };

  // 채팅 받기
  useEffect(() => {
    session.on("signal:chat", (event) => {
      const { nickname, message } = JSON.parse(event.data || "{}");
      setAllMessage((prev) => [
        ...prev,
        {
          nickname: nickname || "알 수 없는 사용자",
          content: message || "",
        },
      ]);
    });
    // 입장 메세지 받기
    session.on("signal:enter", (event) => {
      const message = event.data;
      setAllMessage((prev) => [...prev, message!]);
    });
  }, []);

  return (
    <ChattingContainer>
      <AllMessage ref={messageDiv}>
        {allMessage.map((element, idx) => (
          <p key={idx}>
            {isMessage(element)
              ? `${element.nickname}: ${element.content}`
              : /* <button onClick={() => {onForeceLeave(element)}}>강퇴</button> */ element}
          </p>
        ))}
      </AllMessage>
      <Contour />
      <FormContainer onSubmit={handleSubmitEvent}>
        <label htmlFor="message" />
        <Input id="message" value={message} onChange={handleMessageChange} />
        <Button height={2.6} $marginTop={0.4} type="submit" disabled={!message}>
          보내기
        </Button>
      </FormContainer>
    </ChattingContainer>
  );
};

export default Chat;
