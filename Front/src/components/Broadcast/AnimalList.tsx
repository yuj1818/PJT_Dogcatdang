import { useLocation, useNavigate } from "react-router-dom";
import { retryFn } from "../../util/tanstackQuery";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";
import {
  BroadcastAnimalInfo,
  broadcastAnimalInfo,
} from "../../util/broadcastAPI";
import { LoadingOrError } from "../common/LoadingOrError";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  & > div {
    flex: 0 0 9%;
    box-sizing: border-box;
    margin: 1%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & > div:last-child {
    margin-right: auto;
  }
`;

interface Props {
  togglePictureInPicture: () => void;
}

const AnimalList: React.FC<Props> = ({ togglePictureInPicture }) => {
  const { state } = useLocation();
  const selector = useSelector((state: RootState) => state.broadcast);
  let streamingId: number;
  if (state) {
    streamingId = state.streamingId;
  } else {
    streamingId = selector.broadcastId;
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["broadcastdetail", streamingId],
    queryFn: async ({ signal }) => {
      const result = await broadcastAnimalInfo({ signal, streamingId });
      return result;
    },
    staleTime: 5 * 1000,
    retry: retryFn,
    retryDelay: 300,
  });

  return (
    <Container>
      {(isLoading || isError) && (
        <LoadingOrError isLoading={isLoading} isError={isError} error={error} />
      )}
      {data?.map((animalInfo) => (
        <Card
          {...animalInfo}
          key={animalInfo.animalId}
          togglePictureInPicture={togglePictureInPicture}
        ></Card>
      ))}
    </Container>
  );
};

export default AnimalList;

const ParaItems = styled.p`
  white-space: nowrap;
  overflow: hidden;
  text-align: center;
`;

const Img = styled.img`
  object-fit: cover;
  height: 100px;
  width: 100px;
  border-radius: 50%;

  @media (max-width: 768px) {
    height: 50px;
  }
`;

interface CardProps extends BroadcastAnimalInfo {
  togglePictureInPicture: () => void;
}

const Card: React.FC<CardProps> = ({
  animalId,
  breed,
  age,
  imgUrl,
  togglePictureInPicture,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!document.parentElement) {
      togglePictureInPicture();
    }
    setTimeout(() => {
      navigate(`/save-animals/${animalId}`);
    }, 500);
  };

  return (
    <div>
      <button onClick={handleClick}>
        <Img src={imgUrl} alt="출연동물" loading="lazy" />
        <ParaItems>{breed}</ParaItems>
        <ParaItems>{age !== -1 ? `${age}살` : "나이 미상"}</ParaItems>
      </button>
    </div>
  );
};
