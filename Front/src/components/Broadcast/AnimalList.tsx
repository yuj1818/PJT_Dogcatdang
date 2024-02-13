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

const CardContainer = styled.div`
  flex: 0 0 20%;
  box-sizing: border-box;
  margin: 1%;
`;

const Card: React.FC<BroadcastAnimalInfo> = ({
  animalId,
  breed,
  age,
  imgUrl,
}) => {
  animalId;
  return (
    <CardContainer>
      <p>종: {breed}</p>
      <p>나이: {age}</p>
      <img src={imgUrl} alt="출연동물" />
    </CardContainer>
  );
};
