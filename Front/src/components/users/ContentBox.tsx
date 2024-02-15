import { useState, useEffect } from "react";
import { getLikedAnimals, getPosts, getProtectedAnimals } from "../../util/UserAPI";
import Card from "./Card";
import styled from "styled-components";

const StyledContentBox = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  & > div {
    flex: 0 0 19%;
    box-sizing: border-box;
    margin: .5%;
  }

  & > div:last-child {
    margin-right: auto;
  }

  .notice {
    margin-left: .5rem;
    color: grey;
  }
`

export interface contentData {
  animalId: number;
  breed: string;
  gender: string;
  imgUrl: string;
  boardId: number;
  title: string;
  thumbnailImgUrl: string;
  likeCnt: number;
}

const ContentBox: React.FC<{ menu: string, userId: string | undefined }> = ({ menu, userId }) => {
  const [data, setData] = useState<contentData[]>([]);

  const getLikedAnimalData = async () => {
    if (userId) {
      const response = await getLikedAnimals(userId);
      setData(() => response);
    }
  };

  const getPostData = async () => {
    if (userId) {
      const response = await getPosts(userId);
      setData(() => response);
    }
  };

  const getProtectedAnimalData = async () => {
    if (userId) {
      const response = await getProtectedAnimals(userId);
      setData(() => response);
    }
  };

  useEffect(() => {
    if (menu === '관심 동물') {
      getLikedAnimalData();
    } else if (menu === '보호 동물') {
      getProtectedAnimalData();
    } else {
      getPostData();
    }
  }, [menu]);

  return (
    <StyledContentBox>
      {
        data.length ? 
        data.map((el) => (
          <Card 
            key={menu === '관심 동물' || menu === '보호 동물' ? el.animalId : el.boardId} 
            data={el} 
            menu={menu}
            contentId={menu === '관심 동물' || menu === '보호 동물' ? el.animalId : el.boardId}
          />
        ))
        :
        <p className="notice">※ 등록된 동물이 없습니다.</p>
      }
    </StyledContentBox>
  )
}

export default ContentBox;