import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import { getAnimalData, searchAnimalData } from '../../../util/SaveAPI';
import { IoSearch } from "react-icons/io5";
import styled from 'styled-components';
import { Button } from '../../common/Button';
import { IoFilter } from "react-icons/io5";
import { FiEdit2 } from "react-icons/fi";
import API from '../../../util/axios';
import { dogInput, catInput } from '../Input';
import Select from "react-select";
import { Cookies } from 'react-cookie';

const SearchInput = styled.input<{ isFiltered: boolean }>`
  padding: .25rem .5rem;
  border-radius: 10px;
  border: ${(props) => props.isFiltered ? '1px solid #d5967d' : 'none'};
  flex-grow: ${(props) => props.isFiltered ? '1' : 'none'};
  height: 100%;
  &::placeholder {
    font-size: .8rem;
  }
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  .active {
    background-color: #5e1e03;
    color: white;
  }
  :disabled {
    cursor: default;
    opacity: .8;
    color: grey;
    background-color: lightgrey;
  }
`

const PaginationButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: #ffffff;
  color: #5e1e03;
  border: none;
  border-radius: 5px;
  outline: none;
  font-size: .8rem;
`;

const FilterBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: .5rem;
  background-color: white;
  padding: 1rem;
  border-radius: 5px;
`

interface animalInfo {
  animalId: number;
  code: string;
  breed: string;
  age: number;
  gender: string;
  isNeuter: string;
  state: string;
}

const SavedAnimalList = () => {
  const navigate = useNavigate();
  const gridRef = useRef<AgGridReact | null>(null);
  const cookie = new Cookies();

  const editAnimalInfoRenderer = (props: any) => {
    const cellValue = props.valueFormatted ? props.valueFormatted : props.value;

    const apiUrl = `api/animals/${cellValue}`;
    const token = cookie.get("U_ID");
    const headers = {
      Authorization: token,
    };
    
    const buttonClicked = () => {
      API.get(apiUrl, {headers})
        .then((res) => {
          navigate(`/save-update/${cellValue}`, { state: res.data });
        })
    };

    return (
      <FiEdit2 onClick={buttonClicked} />
    )
  }
  
  const stateInput = ['전체', '보호중', '입양완료', '안락사', '자연사'];
  
  const columns = [
    { field: 'code', headerName: '동물 코드', flex: 1.5 },
    { field: 'breed', headerName: '품종', flex: 1.5 },
    { field: 'age', headerName: '나이', flex: 1 },
    { field: 'gender', headerName: '성별', flex: 1 },
    { field: 'isNeuter', headerName: '중성화 여부', flex: 1 },
    { field: 'state', headerName: '보호 상태', flex: 1 },
    { 
      field: 'animalId', 
      headerName: '',
      cellRenderer: editAnimalInfoRenderer,
      flex: 0.5
    }
  ];

  const transformedDogInput = dogInput.map((dog) => ({
    value: dog,
    label: dog,
  }));

  transformedDogInput.unshift({
    value: '전체',
    label: '전체'
  });

  const transformedCatInput = catInput.map((cat) => ({
    value: cat,
    label: cat,
  }));

  transformedCatInput.unshift({
    value: '전체',
    label: '전체'
  });

  const transformedStateInput = stateInput.map((state) => ({
    value: state,
    label: state,
  }));
  
  const [animalData, setAnimalData] = useState<animalInfo[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [isFiltered, setIsFiltered] = useState<boolean>(false);
  const [code, setCode] = useState('');
  const [breed, setBreed] = useState('');
  const [state, setState] = useState('');
  const [animalType, setAnimalType] = useState('강아지');

  const onSelectPage = (e: React.MouseEvent) => {
    setCurrentPage(parseInt((e.target as HTMLElement).textContent || '1'));
  };

  const goFirstPage = () => {
    setCurrentPage(1);
  };

  const goLastPage = () => {
    setCurrentPage(totalPages);
  };

  const goPrePage = () => {
    setCurrentPage(prev => prev - 1);
  };

  const goNextPage = () => {
    setCurrentPage(prev => prev + 1);
  };

  const handleCode = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCode(() => e.target.value);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSearch();
    }
  };

  const onSearch = async() => {
    const data = {
      code: code || null,
      breed: breed === '전체' || !breed ? null : breed,
      state: state === '전체' || !state ? null : state
    };

    const response = await searchAnimalData(data, currentPage);

    if (response.status === 204) {
      setAnimalData([]);
      setCurrentPage(1);
      setTotalPages(1);
    } else {
      setAnimalData(() => response.data.animalDtoList);
      setCurrentPage(() => response.data.currentPage);
      setTotalPages(() => response.data.totalPages);
    }
    setCode('');
  };

  useEffect(() => {
    onSearch();
  }, [currentPage]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <div className="flex gap-2">
          <Button 
            className="flex items-center gap-1" 
            $marginLeft={0} 
            $marginTop={0} 
            $paddingX={.5} 
            $fontSize={.8} 
            $background="white" 
            color="grey"
            $border="1px solid #babfc7"
            onClick={() => setIsFiltered(prev => !prev)}
          >
            <IoFilter />
            필터
          </Button>
          <Button onClick={() => navigate('/registration')} $marginLeft={0} $marginTop={0} $paddingX={.5} $fontSize={.8}>+ 보호 동물 추가</Button>
        </div>
        {
          !isFiltered &&
          <div className="flex items-center gap-2">
            <SearchInput isFiltered={isFiltered} type="text" onKeyDown={handleKeyDown} onChange={handleCode} value={code} placeholder="코드 검색" />
            <IoSearch onClick={onSearch} />
          </div>
        }
      </div>
      {
        isFiltered && 
        <FilterBox>
          <div className="button-box flex gap-2">
            <Button
              $marginLeft={0}
              $marginTop={0}
              $fontSize={.8}
              $background="#5e1e03"
              $selected={animalType === "강아지"}
              onClick={() => setAnimalType("강아지")}
            >
              강아지
            </Button>
            <Button
              $marginLeft={0}
              $marginTop={0}
              $fontSize={.8}
              $background="#5e1e03"
              $selected={animalType === "고양이"}
              onClick={() => setAnimalType("고양이")}
            >
              고양이
            </Button>
          </div>
          <div className="flex gap-2">
            <Select
              name="breed"
              id="breed"
              value={
                animalType === "강아지"
                  ? transformedDogInput.find((option) => option.value === breed)
                  : transformedCatInput.find((option) => option.value === breed)
              }
              options={
                animalType === "강아지"
                  ? transformedDogInput
                  : transformedCatInput
              }
              onChange={(selectedOption) => setBreed(selectedOption?.value || "")}
              placeholder="품종"
              styles={{
                control: (provided) => ({
                  ...provided,
                  border: "1px solid #d5967b",
                  borderRadius: "10px",
                  width: "10rem",
                  height: "1.5rem",
                  fontSize: ".8rem"
                }),
                option: (provided) => ({
                  ...provided,
                  fontSize: ".8rem"
                })
              }}
            />
            <Select
              name="state"
              id="state"
              value={transformedStateInput.find((option) => option.value === state)}
              options={transformedStateInput}
              onChange={(selectedOption) => setState(selectedOption?.value || "")}
              placeholder="보호 현황"
              styles={{
                control: (provided) => ({
                  ...provided,
                  border: "1px solid #d5967b",
                  borderRadius: "10px",
                  width: "10rem",
                  height: "1.5rem",
                  fontSize: ".8rem"
                }),
                option: (provided) => ({
                  ...provided,
                  fontSize: ".8rem"
                })
              }}
            />
            <div className="flex items-center gap-2 grow">
              <SearchInput isFiltered={isFiltered} type="text" onKeyDown={handleKeyDown} onChange={handleCode} value={code} placeholder="코드 검색" />
              <IoSearch onClick={onSearch} />
            </div>
          </div>
        </FilterBox>
      }
      <div className="ag-theme-alpine" style={{width: "100%"}}>
        <AgGridReact 
          ref={gridRef}
          columnDefs={columns as any} 
          rowData={animalData.map((data) => {
            return {
              animalId: data.animalId,
              code: data.code,
              breed: data.breed,
              age: data.age,
              gender: data.gender,
              isNeuter: data.isNeuter,
              state: data.state
            }
          })} 
          domLayout="autoHeight"
        />
      </div>
      <Pagination>
        <PaginationButton onClick={goFirstPage} disabled={currentPage === 1}>{'<<'}</PaginationButton>
        <PaginationButton onClick={goPrePage} disabled={currentPage === 1}>{'<'}</PaginationButton>
        {Array(5).fill(undefined).map((_,idx) => (
          !(idx+1+5*Math.floor(currentPage/5) > totalPages) &&
          <PaginationButton
            id={`${(idx + 1)+5*Math.floor(currentPage/5)}`}
            key={(idx + 1)+5*Math.floor(currentPage/5)}
            onClick={onSelectPage}
            className={currentPage === (idx + 1)+5*Math.floor(currentPage/5) ? "active" : "none"}
          >
            {(idx+1)+5*Math.floor(currentPage/5)}
          </PaginationButton>
        ))}
        <PaginationButton onClick={goNextPage} disabled={currentPage === totalPages}>{'>'}</PaginationButton>
        <PaginationButton onClick={goLastPage} disabled={currentPage === totalPages}>{'>>'}</PaginationButton>
      </Pagination>
    </div>
  )
}

export default SavedAnimalList;