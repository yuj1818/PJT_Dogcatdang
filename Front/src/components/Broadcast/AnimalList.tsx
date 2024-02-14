import { useLocation } from "react-router-dom";
import { retryFn } from "../../util/tanstackQuery";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import styled from "styled-components";
import {
  BroadcastAnimalInfo,
  broadcastAnimalInfo,
} from "../../util/broadcastAPI";
import { LoadingOrError } from "../common/LoadingOrError";

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

const AnimalList: React.FC = () => {
  const { state } = useLocation();
  const { streamingId } = state;

  const { data, isLoading, isError, error } = useQuery<
    BroadcastAnimalInfo[],
    Error,
    BroadcastAnimalInfo[]
  >({
    queryKey: ["broadcastdetail", state],
    queryFn: async ({ signal }) => {
      const result = await broadcastAnimalInfo({ signal, streamingId });
      return result as BroadcastAnimalInfo[];
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
        <Card {...animalInfo} key={animalInfo.animalId}></Card>
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

const Card: React.FC<BroadcastAnimalInfo> = ({
  animalId,
  breed,
  age,
  imgUrl,
}) => {
  animalId;
  return (
    <div>
      <Img src={imgUrl} alt="출연동물" />
      <ParaItems>{breed}</ParaItems>
      <ParaItems>{age}</ParaItems>
    </div>
  );
};
