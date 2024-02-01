import { Session, Subscriber } from "openvidu-browser";
import React, { useEffect, useState } from "react";

interface ChatProps {
  onForeceLeave?: (subscriber: Subscriber) => void;
  subscriber: Subscriber;
  session: Session;
}

interface Message {
  nickname: string;
  content: string;
  userId: number;
}

const Chat: React.FC<ChatProps> = ({ session }) => {
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessage] = useState<Message[]>([]);

  const handleMessageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  // Sender of the message (after 'session.connect')
  const handleSubmitEvent = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!message) {
      return;
    }

    await session.signal({
      data: message, // Any string (optional)
      to: [], // Array of Connection objects (optional. Broadcast to everyone if empty)
      type: "my-chat", // The type of message (optional)
    });

    setMessage("");
  };

  // Receiver of the message (usually before calling 'session.connect')
  useEffect(() => {
    session.on("signal:my-chat", (event) => {
      const data = JSON.parse(event.from?.data || "{}");

      setAllMessage((prev) => [
        ...prev,
        {
          userId: parseInt(data.userId),
          nickname: data.nickname || "알 수 없는 사용자",
          content: event.data || "",
        },
      ]);
      console.log(event);
    });
  }, []);

  return (
    <>
      {allMessage.map((element, idx) => (
        <span key={idx}>
          <p>
            {element.userId} {element.nickname} {element.content}
          </p>
          {/* <button onClick={() => {onForeceLeave(element)}}>강퇴</button> */}
        </span>
      ))}
      <form onSubmit={handleSubmitEvent}>
        <label htmlFor="message">채팅</label>
        <input
          id="message"
          value={message}
          onChange={handleMessageChange}
        ></input>
        <button type="submit" disabled={!message}>
          보내기
        </button>
      </form>
    </>
  );
};

export default Chat;
