import React, { useState } from "react";
import TextSearch from "../../components/common/TextSearch";
import { Button } from "../../components/common/Button";
import { isOrg } from "../users/SignInPage";
import { NavLink } from "react-router-dom";

const BoradcastListPage: React.FC = () => {
  const [searchWord, serSearchWorld] = useState("");
  const hadnleSubmit = (inputSearchWord: string) => {
    console.log(searchWord);
    serSearchWorld(inputSearchWord);
  };
  return (
    <>
      <TextSearch onSubmit={hadnleSubmit} text="현재 방송 목록">
        {isOrg() && (
          <Button>
            <NavLink to="/broadcast/trans">방송하기</NavLink>
          </Button>
        )}
      </TextSearch>
    </>
  );
};

export default BoradcastListPage;
