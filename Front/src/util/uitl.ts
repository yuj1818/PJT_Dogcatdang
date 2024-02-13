interface userInformation {
  id: number; // user PK
  username: string; // user
  role: string;
  nickname: string;
}

export const getUserInfo = () => {
  const userInfo: userInformation = JSON.parse(
    localStorage.getItem("userInfo") || "{}"
  );
  return { ...userInfo };
};
