import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUserInfo } from "../../util/UserAPI";
import ProfileBox from "../../components/users/ProfileBox";
import styled from "styled-components";
import ProfileEditModal from "../../components/users/ProfileEditModal";
import { infoData } from "../../util/UserAPI";

const Title = styled.p`
  font-size: 2rem;
`;

function ProfilePage() {
  const params = useParams();

  const [isMine, setIsMine] = useState(false);
  const [isOrg, setIsOrg] = useState(false);
  const [userInfo, setUserInfo] = useState<infoData>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getInfo = async () => {
    const response = await getUserInfo(params.userId || "");
    //console.log(response.data);
    setUserInfo(() => response.data);
    setIsOrg(response.data.role === 'ROLE_SHELTER');
  };
  
  useEffect(() => {
    getInfo();
    setIsMine(() => JSON.parse(localStorage.getItem('userInfo') || "")?.id == params.userId);
  }, [params.userId]);

  return (
    <div>
      <Title>{ isMine ? '마이 페이지' : '프로필'}</Title>
      <p>{ isOrg ? '이것은 기관의 프로필' : '이것은 개인의 프로필'}</p>
      <ProfileBox userInfo={userInfo} isOrg={isOrg} isMine={isMine} openModal={setIsModalOpen} />
      <ProfileEditModal userInfo={userInfo} isOrg={isOrg} closeModal={setIsModalOpen} isModalOpen={isModalOpen} saveUserInfo={setUserInfo} />
    </div>
  );
}

export default ProfilePage;