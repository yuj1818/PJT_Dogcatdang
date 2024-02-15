import React, { useEffect, useState } from "react";
import TextSearch from "../../components/common/TextSearch";
import { Button } from "../../components/common/Button";
import { isOrg } from "../users/SignInPage";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { broadcastInfo, broadcastList } from "../../util/broadcastAPI";
import { LoadingOrError } from "../../components/common/LoadingOrError";
import styled from "styled-components";
import { CardStyle } from "../../components/articles/ArticleCard";
import { retryFn } from "../../util/tanstackQuery";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  & > div {
    flex: 0 0 23%;
    box-sizing: border-box;
    margin: 1%;
    background-color: #fff;
    border-radius: 10px;
  }

  & > div:last-child {
    margin-right: auto;
  }
`;

const BoradcastListPage: React.FC = () => {
  const [content, setContent] = useState(<></>);

  const hadndleSubmit = (inputSearchWord: string) => {
    const filteredData = data!.filter((element) =>
      element.title.includes(inputSearchWord)
    );
    setContent(
      <>
        <Container>
          {filteredData.map((element) => (
            <Card {...element} key={element.streamingId} />
          ))}
        </Container>
      </>
    );
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["broadcastList"],
    queryFn: broadcastList,
    staleTime: 5 * 1000,
    retry: retryFn,
    retryDelay: 300,
  });

  useEffect(() => {
    if (!data) return;
    setContent(
      <>
        <Container>
          {data.map((element) => (
            <Card {...element} key={element.streamingId} />
          ))}
        </Container>
      </>
    );
  }, [data, isLoading, isError]);

  return (
    <>
      <TextSearch onSubmit={hadndleSubmit} text="현재 방송 목록">
        {isOrg() && (
          <Button>
            <NavLink to="/broadcast/trans">방송하기</NavLink>
          </Button>
        )}
      </TextSearch>
      {isLoading || isError ? (
        <LoadingOrError isLoading={isLoading} isError={isError} error={error} />
      ) : data ? (
        content
      ) : (
        <></>
      )}
    </>
  );
};

export default BoradcastListPage;

const Img = styled.img`
  object-fit: contain;
  height: 200px;
`;

const Card: React.FC<broadcastInfo> = ({
  title,
  orgNickname,
  sessionId,
  thumbnailImgUrl,
  streamingId,
}) => {
  return (
    <div>
      <NavLink to={`/broadcast/${sessionId}`} state={{ streamingId }}>
        <CardStyle>
          <Img src={thumbnailImgUrl} alt="방송 썸네일" />
          <p>{title}</p>
          <p>{orgNickname}</p>
        </CardStyle>
      </NavLink>
    </div>
  );
};
