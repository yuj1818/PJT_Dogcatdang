import { useEffect, useRef, useState } from "react";
import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import styled from "styled-components";

import { Input } from "../common/Design";
import { Label } from "./BroadcastForm";
import { CallAnimal, callAnimal } from "../../util/broadcastAPI";
import { getUserInfo } from "../../util/uitl";
import { retryFn } from "../../util/tanstackQuery";
import { LoadingOrError } from "../common/LoadingOrError";

interface CardInterface {
  selected: boolean;
}

export const Container = styled.div`
  position: absolute;
  background-color: white;
  width: 100%;
  border: #121212 solid 1px;
  z-index: 9999;
  height: 10rem;
  overflow: auto;
`;

const List = styled.div<CardInterface>`
  margin-top: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
  background-color: ${({ selected }) => (selected ? "#f9d29b" : "white")};
  height: 2rem;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #edf2f7; /* Customize hover background color */
  }
`;

const AllAnimalContainer = styled.div`
  height: 150px;
  overflow: auto;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.2);
  margin-bottom: 10px;
`;

interface AnimalSearchForBroadcastInterface {
  handleSelectedAnimal: (info: CallAnimal) => void;
  selectedData: CallAnimal[];
}

const AnimalSearchForBroadcast: React.FC<AnimalSearchForBroadcastInterface> = ({
  handleSelectedAnimal,
  selectedData,
}) => {
  // const data: AnimalInfo[] = [];
  const [filteredResults, setFilteredResults] = useState<CallAnimal[]>([]);
  const cardContainerRef = useRef<HTMLDivElement | null>(null);
  const { id } = getUserInfo();

  const { data, isLoading, isError, error } = useQuery<
    CallAnimal[],
    Error,
    CallAnimal[]
  >({
    queryKey: ["ORG", id, "animal"],
    queryFn: async ({
      signal,
    }: QueryFunctionContext): Promise<CallAnimal[]> => {
      const result = await callAnimal({ signal });
      return result as CallAnimal[];
    },
    staleTime: 5 * 1000,
    retry: retryFn,
    retryDelay: 100,
  });

  const handleSearch = (query: string) => {
    let filteredData: CallAnimal[];
    if (query.trim()) {
      filteredData = data!.filter(
        (item) => item.code.includes(query) || item.breed.includes(query)
      );
    } else {
      filteredData = [];
    }
    setFilteredResults(filteredData);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        cardContainerRef.current &&
        !cardContainerRef.current.contains(event.target as Node)
      ) {
        handleSearch("");
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [cardContainerRef, handleSearch]);

  return (
    <>
      <Label htmlFor="data">전체 보호 동물 목록</Label>
      {data && (
        <AllAnimalContainer>
          {data.map((element) => (
            <div key={element.animalId}>
              CODE: {element.code} {element.breed}
            </div>
          ))}
        </AllAnimalContainer>
      )}
      <Label htmlFor="search">출연 동물</Label>
      {data && (
        <Input
          id="search"
          type="text"
          placeholder={
            data.length > 0
              ? "출연할 동물을 선택하세요(코드 또는 종으로 검색하기)"
              : "보호 중인 동물 정보가 없습니다. 동물을 등록하신 뒤 방송을 시작해 주세요"
          }
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          autoComplete="off"
        />
      )}
      {(isLoading || isError) && (
        <LoadingOrError isLoading={isLoading} isError={isError} error={error} />
      )}

      {filteredResults.length > 0 && (
        <Container ref={cardContainerRef} className="rounded-md">
          {filteredResults.map((result) => (
            <List
              className="rounded-md"
              selected={selectedData.includes(result)}
              key={result.animalId}
              onClick={() => {
                handleSelectedAnimal(result);
              }}
            >
              <p>{result.code}</p>
            </List>
          ))}
        </Container>
      )}
    </>
  );
};

export default AnimalSearchForBroadcast;
