import React, { ChangeEvent, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import tw from "tailwind-styled-components";
import styled from "styled-components";
import { useDispatch } from "react-redux";

import { isOrg } from "../../pages/users/SignInPage";
import { getUserInfo } from "../../util/uitl";
import { Button, Input, Contour, TextArea } from "../common/Design";
import AnimalSearchForBroadcast from "./AnimalSearchForBroadcast";
import { CallAnimal, requestBroadCast } from "../../util/broadcastAPI";
import { requestS3, resizeFile } from "../../util/S3";
import { encrypt } from "./simpleEncrypt";
import { set } from "../../store/broadcastSlice";

const TextLength = tw.p`
  text-right text-sm text-gray-500
`;

export const Label = tw.label`
  mt-3
`;

const SelectedAnimalConatainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const ImageUploadLabel = tw.label`
cursor-pointer flex items-center justify-center w-full px-4 py-2
border border-transparent rounded-md shadow-sm text-sm font-medium
text-white bg-orange-400 hover:bg-orange-600 focus:outline-none focus:ring-2
focus:ring-offset-2 focus:ring-orange-400 mt-5 mb-5
`;

interface FormProps {
  joinSession: () => void;
  sessionIdChangeHandler: (event: string) => void;
  sessionId: string;
}

const Form: React.FC<FormProps> = ({
  joinSession,
  sessionIdChangeHandler,
  sessionId,
}) => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedAnimal, setSelectedAnimal] = useState<CallAnimal[]>([]);
  const [error, setError] = useState("");
  const [file, setFile] = useState<File>();

  useEffect(() => {
    if (params.broadcastId) {
      sessionIdChangeHandler(params.broadcastId);
      joinSession();
    } else if (!params.broadcastId) {
      let newSessionId: string;

      if (params["*"]) {
        newSessionId = params["*"];
        sessionIdChangeHandler(newSessionId);
        joinSession();
      } else {
        const { username } = getUserInfo();
        const encryptedUsername = encrypt(username);
        const today = new Date();

        const year = String(today.getFullYear()).slice(-2);
        const month = String(today.getMonth() + 1).padStart(2, "0");
        const day = String(today.getDate()).padStart(2, "0");
        const ranmdeNum = Math.ceil(Math.random() * 10000);
        const numericFormat = `${year}${month}${day}${ranmdeNum}`;

        newSessionId = `${encryptedUsername}${numericFormat}`;
        sessionIdChangeHandler(newSessionId);
      }
    }
  }, [params, joinSession, sessionIdChangeHandler]);

  useEffect(() => {
    if (title.trim() && description.trim() && selectedAnimal.length > 0) {
      setError("");
    }
  }, [title, description, selectedAnimal]);

  const onSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    if (isOrg()) {
      if (
        !title.trim() ||
        !description.trim() ||
        selectedAnimal.length === 0 ||
        !file
      ) {
        setError("내용을 모두 입력하세요");
        return null;
      }

      // 서버 등록 요청
      const thumbnailImgUrl = await requestS3({
        name: title.slice(0, 10),
        file: file!,
      });
      const animalIds = selectedAnimal.map((element) => element.animalId);
      // 요청 보낼 데이터들

      const data = {
        animalInfo: animalIds,
        title,
        description,
        sessionId,
        thumbnailImgUrl,
      };
      const response = await requestBroadCast({ data });
      dispatch(set(response));
    }

    joinSession();

    if (isOrg()) {
      navigate(`${sessionId}`);
    }
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

  const handleSelectedAnimal = (info: CallAnimal) => {
    setSelectedAnimal((prev) => {
      if (prev.includes(info)) {
        return prev.filter((prev) => prev.animalId !== info.animalId);
      } else {
        return [...prev, info];
      }
    });
  };

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const addedfile = event.target.files;
    if (addedfile) {
      const img = await resizeFile(addedfile[0]);
      setFile(img);
    }
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
            <TextArea
              value={description}
              onChange={handleDescriptionChange}
              id="description"
            />
            <ImageUploadLabel htmlFor="imageUpload">
              <span>썸네일 이미지</span>
              <input
                type="file"
                id="imageUpload"
                name="imageUpload"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />
            </ImageUploadLabel>
            <AnimalSearchForBroadcast
              handleSelectedAnimal={handleSelectedAnimal}
              selectedData={selectedAnimal}
            />
            <SelectedAnimalConatainer>
              {selectedAnimal.map((animal) => (
                <AnimalCard key={animal.animalId} {...animal} />
              ))}
            </SelectedAnimalConatainer>
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

const Container = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  white-space: nowrap;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin: 5px;

  width: calc(33.33% - 10px);
  @media (min-width: 1280px) {
    width: calc(25% - 10px);
  }

  img {
    border-radius: 50%;
    width: 100px;
    height: 100px;
    object-fit: cover;
  }

  div {
    margin-left: 3px;
  }
`;

const AnimalCard: React.FC<CallAnimal> = ({ code, age, imgUrl, breed }) => {
  return (
    <Container>
      <img src={imgUrl} alt={"선택된 동물 코드" + code} />
      <div>
        <p>{code}</p>
        <p>나이: {age}</p>
        <p>품종: {breed}</p>
      </div>
    </Container>
  );
};
