import { useEffect, useRef, useState } from "react";
import { Input } from "../common/Design";
import { Label } from "./BroadcastForm";
import styled from "styled-components";
import { AnimalInfo } from "../../util/broadcastAPI";
interface CardInterface {
  selected: boolean;
}

const Container = styled.div`
  position: absolute;
  background-color: white;
  width: 100%;
  border: #121212 solid 1px;
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

interface AnimalSearchForBroadcastInterface {
  handleSelectedAnimal: (info: AnimalInfo) => void;
  selectedData: AnimalInfo[];
}

const AnimalSearchForBroadcast: React.FC<AnimalSearchForBroadcastInterface> = ({
  handleSelectedAnimal,
  selectedData,
}) => {
  // const [data, setData] = useState<AnimalInfo[]>([]);
  const data: AnimalInfo[] = [];
  const [filteredResults, setFilteredResults] = useState<AnimalInfo[]>([]);
  const cardContainerRef = useRef<HTMLDivElement | null>(null);

  const handleSearch = (query: string) => {
    let filteredData: AnimalInfo[];
    if (query.trim()) {
      filteredData = data.filter((item) => item.code.includes(query));
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
      <Label htmlFor="search">출연 동물</Label>
      <Input
        id="search"
        type="text"
        placeholder="출연할 동물을 선택하세요(코드로 검색하기)"
        onChange={(e) => {
          handleSearch(e.target.value);
        }}
        autoComplete="off"
      />

      {filteredResults.length > 0 && (
        <Container ref={cardContainerRef} className="rounded-md">
          {filteredResults.map((result) => (
            <List
              className="rounded-md"
              selected={selectedData.includes(result)}
              key={result.id}
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
