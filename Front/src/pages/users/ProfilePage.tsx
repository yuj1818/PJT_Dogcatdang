import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserInfo, infoData } from "../../util/UserAPI";
import ProfileBox from "../../components/users/ProfileBox";
import ProfileEditModal from "../../components/users/ProfileEditModal";
import { Title } from "../../components/common/Title";
import { Button } from "../../components/common/Button";
import styled from "styled-components";
import ContentBox from "../../components/users/ContentBox";

const MenuBox = styled.div`
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
  margin-left: .5rem;

  .active {
    color: #FF8331;
  }
`

const Menu = styled.p`
  font-size: 1.3rem;
  font-family: 'SUITE-SEMIBOLD';
  cursor: pointer;
`

function ProfilePage() {
  const params = useParams();
  const navigate = useNavigate();

  const [isMine, setIsMine] = useState(false);
  const [isOrg, setIsOrg] = useState(false);
  const [userInfo, setUserInfo] = useState<infoData>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [done, setDone] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState('관심 동물');

  const getInfo = async () => {
    if (params.userId) {
      const response = await getUserInfo(params.userId);
      //console.log(response.data);
      setUserInfo(() => response.data);
      setIsOrg(response.data.role === 'ROLE_SHELTER');
      setDone(true);
      setSelectedMenu(response.data.role === 'ROLE_SHELTER' ? '보호 동물' : '관심 동물');
    }
  };
  
  useEffect(() => {
    getInfo();
    setIsMine(() => JSON.parse(localStorage.getItem('userInfo') || "")?.id == params.userId);
  },[params.userId]);

  return (
    <div className="flex flex-col gap-4">
      <Title>{ isMine ? '마이 페이지' : '프로필'}</Title>
      <ProfileBox userInfo={userInfo} isOrg={isOrg} isMine={isMine} isModalOpen={isModalOpen} openModal={setIsModalOpen} />
      { done &&
        <ProfileEditModal 
          userInfo={userInfo} 
          isOrg={isOrg} 
          closeModal={setIsModalOpen} 
          isModalOpen={isModalOpen} 
          saveUserInfo={setUserInfo} 
        />
      }
      {
        isOrg ? 
        <div className="flex flex-col gap-3">
          <div className="flex gap-2 items-center mt-4 ms-2">
            <Menu>{userInfo?.nickname}에서 보호 중인 동물</Menu>
            { isMine && <Button onClick={() => navigate('/save-animals/management')} $marginLeft={0} $marginTop={0} $paddingX={.3} $paddingY={.1} $fontSize={.75} $background="black">보호 동물 관리</Button> }
          </div>
          <ContentBox menu={selectedMenu} userId={params.userId} />
        </div>
        :
        <div className="flex flex-col gap-3">
          <MenuBox>
            <Menu 
              className={`${selectedMenu === '관심 동물' ? 'active' : 'none'}`}
              onClick={() => setSelectedMenu('관심 동물')}
            >
              관심 동물
            </Menu>
            <Menu 
              className={`${selectedMenu === '작성한 입양 근황 글' ? 'active' : 'none'}`}
              onClick={() => setSelectedMenu('작성한 입양 근황 글')}
            >
              작성한 입양 근황 글
            </Menu>
          </MenuBox>
          <ContentBox menu={selectedMenu} userId={params.userId} />
        </div>
      }
    </div>
  );
}

export default ProfilePage;