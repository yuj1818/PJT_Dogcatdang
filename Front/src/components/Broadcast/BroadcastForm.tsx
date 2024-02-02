import React, { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import tw from "tailwind-styled-components";

import { isOrg } from "../../pages/users/SignInPage";
import { useUserInfo } from "../../util/hooks";
import { Button, Input, Contour } from "../common/Design";
import AnimalSearchForBroadcast from "./AnimalSearchForBroadcast";
import {
  AnimalInfo,
  BoadcastData,
  requestBroadCast,
} from "../../util/broadcastAPI";

const TesxtArea = tw.textarea`
  w-64 h-32 border rounded-md p-2 resize-none block w-full border-gray-300
`;

const TextLength = tw.p`
  text-right text-sm text-gray-500
`;

export const Label = tw.label`
  mt-3
`;

interface FormProps {
  joinSession: () => void;
  sessionIdChangeHandler: (event: string) => void;
}

const Form: React.FC<FormProps> = ({ joinSession, sessionIdChangeHandler }) => {
  const { broadcastId } = useParams();
  const { id, nickname } = useUserInfo();
  const [sessionId, setSessionId] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedAnimal, setSelectedAnimal] = useState<AnimalInfo[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (broadcastId) {
      console.log(broadcastId);
      sessionIdChangeHandler(broadcastId);
    } else if (nickname && id) {
      const encodedNickname = nickname.replace(
        /[a-zA-Z0-9]/g,
        (char, index) => {
          if (index < 7) {
            return String.fromCharCode(char.charCodeAt(0) + 1);
          } else {
            return "";
          }
        }
      );
      const today = new Date();

      const year = String(today.getFullYear()).slice(-2);
      const month = String(today.getMonth() + 1).padStart(2, "0");
      const day = String(today.getDate()).padStart(2, "0");
      const numericFormat = `${year}${month}${day}`;

      const newSessionId = `${id}${encodedNickname}${numericFormat}`;
      setSessionId(newSessionId);
      sessionIdChangeHandler(newSessionId);
    }
  }, [broadcastId, joinSession, sessionIdChangeHandler, id, nickname]);

  useEffect(() => {
    if (title.trim() && description.trim() && selectedAnimal.length > 0) {
      setError("");
    }
  }, [title, description, selectedAnimal]);

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isOrg()) {
      if (!title.trim() || !description.trim() || selectedAnimal.length == 0) {
        setError("내용을 모두 입력하세요");
        return null;
      }
    }
    // 서버 등록 요청
    console.log(selectedAnimal);
    console.log(sessionId);
    console.log(title);
    console.log(description);
    // 요청 보낼 데이터들

    const data = {
      animalInfo: selectedAnimal,
      title,
      description,
      sessionId,
    };
    await requestBroadCast({ data });

    joinSession();
  };

  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const inputTitle = event.target.value;
    if (inputTitle.length <= 30) {
      setTitle(event.target.value);
    }
  };

  const handleDescriptionChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = event.target.value;
    if (inputText.length <= 500) {
      setDescription(event.target.value);
    }
  };

  const handleSelectedAnimal = (info: AnimalInfo) => {
    setSelectedAnimal((prev) => {
      if (prev.includes(info)) {
        return prev.filter((prev) => prev.id !== info.id);
      } else {
        return [...prev, info];
      }
    });
  };

  return (
    <>
      {isOrg() ? (
        <>
          <Contour $thickness={0.5} $marginBottom={2} $marginTop={2} />
          <h3>방송을 시작하세요!</h3>
          <form onSubmit={onSubmitHandler} style={{ position: "relative" }}>
            <Label htmlFor="title">방송 제목</Label>
            <Input
              value={title}
              onChange={handleTitleChange}
              id="title"
              type="text"
            />
            <TextLength>{title.length} / 30</TextLength>
            <Label htmlFor="description">방송 설명</Label>
            <TesxtArea
              value={description}
              onChange={handleDescriptionChange}
              id="description"
            />
            <AnimalSearchForBroadcast
              handleSelectedAnimal={handleSelectedAnimal}
              selectedData={selectedAnimal}
            />
            {selectedAnimal.map((animal) => (
              <li>
                code: {animal.code}
                id: {animal.id}
                imgURL: {animal.image}
                age: {animal.age}
              </li>
            ))}
            {error}
            <Button type="submit">방송 시작하기</Button>
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
