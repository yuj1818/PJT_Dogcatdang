import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getUserInfo, infoData } from "../../util/UserAPI";
import ProfileBox from "../../components/users/ProfileBox";
import ProfileEditModal from "../../components/users/ProfileEditModal";
import { Title } from "../../components/common/Title";
import { Button } from "../../components/common/Button";
import { SubTitle } from "../../components/common/Title";

function ProfilePage() {
  const params = useParams();
  const navigate = useNavigate();

  const [isMine, setIsMine] = useState(false);
  const [isOrg, setIsOrg] = useState(false);
  const [userInfo, setUserInfo] = useState<infoData>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [done, setDone] = useState(false);

  const getInfo = async () => {
    if (params.userId) {
      const response = await getUserInfo(params.userId);
      //console.log(response.data);
      setUserInfo(() => response.data);
      setIsOrg(response.data.role === 'ROLE_SHELTER');
      setDone(true);
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
      { done ? 
        <ProfileEditModal 
          userInfo={userInfo} 
          isOrg={isOrg} 
          closeModal={setIsModalOpen} 
          isModalOpen={isModalOpen} 
          saveUserInfo={setUserInfo} 
        />
        :
        <></>
      }
      {
        isOrg ? 
        <div>
          <div className="flex gap-1 items-center">
            <h4>{userInfo?.nickname}에서 보호 중인 동물</h4>
            { isMine && <Button onClick={() => navigate('/save-animals/management')} $marginLeft={0} $marginTop={0} $paddingX={.3} $paddingY={.1} $fontSize={.75} $fontFamily="Pretendard-400" background="black">보호 동물 관리</Button> }
          </div>
          <div>
            
          </div>
        </div>
        :
        <div>
          <div className="flex gap-3">
            <SubTitle>관심 동물</SubTitle>
            <SubTitle>입양 근황</SubTitle>
          </div>
        </div>
      }
    </div>
  );
}

export default ProfilePage;