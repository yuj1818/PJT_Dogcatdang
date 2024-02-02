import { useEffect, useState } from "react";

interface userInformation {
  id: number; // user PK
  username: string; // user
  role: string;
  nickname: string;
}

export const useUserInfo = () => {
  const [userInfor, setUserInfomation] = useState<userInformation>();
  useEffect(() => {
    const userInfo: userInformation = JSON.parse(
      localStorage.getItem("userInfo") || ""
    );
    setUserInfomation(userInfo);
  }, []);

  return { ...userInfor };
};
