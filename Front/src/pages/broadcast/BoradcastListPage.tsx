import React, { useState } from "react";
import TextSearch from "../../components/common/TextSearch";
import { Button } from "../../components/common/Button";
import { isOrg } from "../users/SignInPage";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { broadcastInfo, broadcastList } from "../../util/broadcastAPI";
import { LoadingOrError } from "../../components/common/LoadingOrError";
import styled from "styled-components";
import { CardStyle } from "../../components/articles/ArticleCard";

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  & > div {
    flex: 0 0 23%;
    box-sizing: border-box;
    margin: 1%;
  }

  & > div:last-child {
    margin-right: auto;
  }
`;

const BoradcastListPage: React.FC = () => {
  const [searchWord, serSearchWorld] = useState("");
  const hadnleSubmit = (inputSearchWord: string) => {
    console.log(searchWord);
    serSearchWorld(inputSearchWord);
  };

  const { data, isLoading, isError, error } = useQuery<
    broadcastInfo[],
    Error,
    broadcastInfo[]
  >({
    queryKey: ["broadcastList"],
    queryFn: async ({ signal }) => {
      const response = await broadcastList({ signal });
      return response;
    },
  });
  return (
    <>
      <TextSearch onSubmit={hadnleSubmit} text="현재 방송 목록">
        {isOrg() && (
          <Button>
            <NavLink to="/broadcast/trans">방송하기</NavLink>
          </Button>
        )}
      </TextSearch>
      {isLoading || isError ? (
        <LoadingOrError isLoading={isLoading} isError={isError} error={error} />
      ) : data ? (
        <Container>
          {data.map((element) => (
            <Card {...element} key={element.streamingId} />
          ))}
        </Container>
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
}) => {
  return (
    <div>
      <NavLink to={`/broadcast/${sessionId}`}>
        <CardStyle>
          <Img src={thumbnailImgUrl} alt="방송 썸네일" />
          <p>{title}</p>
          <p>{orgNickname}</p>
        </CardStyle>
      </NavLink>
    </div>
  );
};
