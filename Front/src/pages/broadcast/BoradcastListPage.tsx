import React, { useState } from "react";
import TextSearch from "../../components/common/TextSearch";
import { Button } from "../../components/common/Button";
import { isOrg } from "../users/SignInPage";
import { NavLink } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { broadcastList } from "../../util/broadcastAPI";
import { LoadingOrError } from "../../components/common/LoadingOrError";

const BoradcastListPage: React.FC = () => {
  const [searchWord, serSearchWorld] = useState("");
  const hadnleSubmit = (inputSearchWord: string) => {
    console.log(searchWord);
    serSearchWorld(inputSearchWord);
  };

  const { data, isLoading, isError, error } = useQuery({
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
      ) : (
        <>{data}</>
      )}
    </>
  );
};

export default BoradcastListPage;
