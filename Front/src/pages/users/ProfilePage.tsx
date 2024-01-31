import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserInfo } from "../../util/UserAPI";
import ProfileBox from "../../components/users/ProfileBox";

export interface infoData {
  id: number;
  username: string;
  role: string;
  email: string;
  nickname: string;
  address: string;
  phone: string;
  imgName: string;
  imgUrl: string;
  bio: string;
}

function ProfilePage() {
  const params = useParams();

  const [isMine, setIsMine] = useState(false);
  const [isOrg, setIsOrg] = useState(false);
  const [userInfo, setUserInfo] = useState<infoData>();

  const getInfo = async () => {
    const response = await getUserInfo(params.userId || "");
    //console.log(response.data);
    setUserInfo(response.data);
  };

  useEffect(() => {
    getInfo();
    setIsOrg(userInfo?.role === 'ROLE_SHELTER');
    setIsMine(() => JSON.parse(localStorage.getItem('userInfo') || "")?.id == params.userId);
  }, [params.userId]);

  return (
    <div>
      <p>{ isMine ? '마이 페이지' : '프로필'}</p>
      <p>{ isOrg ? '이것은 기관의 프로필' : '이것은 개인의 프로필'}</p>
      <ProfileBox userInfo={userInfo} isOrg={isOrg} isMine={isMine} />
    </div>
  );
}

export default ProfilePage;