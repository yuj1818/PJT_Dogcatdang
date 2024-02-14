import styled from "styled-components";
import { infoData } from "../../util/UserAPI";
import KakaoMap from "./KakaoMap";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../../assets/defaultProfile.png";
import { Button } from "../common/Button";
import { useEffect, useState } from "react";
import { RecentSeenData } from "../../pages/animals/save_animals/AnimalDetailPage";
import { IoMdHeart } from "react-icons/io";

const StyledBox = styled.div`
  border-radius: 15px;
  box-shadow: 0px 4px 4px lightgrey;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4rem;
  gap: 1rem;
  width: 100%;
  height: 30vh;
  background-color: white;
  
  .profile-image-circle {
    border-radius: 50%;
    overflow: hidden;
    width: 7rem;
    height: 7rem;
  }

  .profile-image {
    width: 100%;
    height: 100%;
    background:transparent;
  }

  .nickname {
    font-size: 20px;
    font-weight: 600;
  }

  .img-box {
    display: flex;
    border: 1px dashed #9f836e;
    border-radius: 10px;
    padding: 1rem;
    height: 60%;
    width: 100%;
    justify-content: center;
    align-items: center;    
  }

  .animal-image-circle {
    border-radius: 50%;
    overflow: hidden;
    width: 6rem;
    height: 6rem;
    margin-right: -0.5rem;
  }

  .animal-image-circle:last-child {
    margin-right: 0;
  }
`;

const RecentSeenAnimals = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: .5rem;
  height: 100%;
  width: 40%;

  .content-title {
    font-family: 'SUITE-Bold';
    color: #9f836e;
    display: flex;
    align-items: center;
    gap: .25rem;
  }
`

const ProfileBox: React.FC<{ userInfo: infoData | undefined, isOrg: boolean, isMine: boolean, isModalOpen:boolean, openModal: React.Dispatch<React.SetStateAction<boolean>> }> = (props) => {
  
  const navigate = useNavigate();

  const [recentSeen, setRecentSeen] = useState([]);

  const onClickEditBtn = () => {
    props.openModal((prev) => !prev);
  };

  const goVisitManagement = () => {
    navigate(`/visit/${props.userInfo?.id}`);
  };

  useEffect(() => {
    if (props.isMine) {
      setRecentSeen(JSON.parse(localStorage.getItem("recentSeen") || "[]"));
    } else {
      setRecentSeen([]);
    }
  }, [props.isMine])

  return (
    <>
      <StyledBox>
        <div className="flex gap-4 items-center">
          <div className="profile-image-circle">
            <img className="profile-image" src={props.userInfo?.imgUrl || defaultProfile} alt="" />
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-1">
              <p className="nickname">{props.userInfo?.nickname}</p>
              <div>{props.isMine ? <Button $background="black" $fontSize={.8} $marginLeft={0} $marginTop={0} $paddingY={.1} onClick={onClickEditBtn}>정보 수정</Button> : null}</div>
            </div>
          
            {
              props.isOrg ? 
              <>
                <div className="flex flex-col gap-1">
                  <p>주소: {props.userInfo?.address}</p>
                  <p>연락처: {props.userInfo?.phone}</p>
                  <p>이메일: {props.userInfo?.email}</p>
                </div>
                <div className="flex gap-1">
                  {
                    props.isMine &&
                    <>
                      <Button $background="black" $fontSize={.8} $marginLeft={0} $marginTop={0} $paddingY={.1} onClick={() => navigate('/visit/list')}>방문 신청 관리</Button>
                      <Button $background="black" $fontSize={.8} $marginLeft={0} $marginTop={0} $paddingY={.1} onClick={() => navigate(`/visit/${props.userInfo?.id}`)}>방문 예약 관리</Button>
                    </>
                  }
                </div>
              </>
              :
              <>
                <div className="flex flex-col gap-1">
                  <p>지역: {props.userInfo?.address}</p>
                  <p>소개글: {props.userInfo?.bio || "없음"}</p>
                </div>
                <div>
                  { props.isMine &&
                    <Button $background="black" $fontSize={.8} $marginLeft={0} $marginTop={0} $paddingY={.1} onClick={goVisitManagement}>방문 일정</Button>
                  }
                </div>
              </>
            }
          </div>
        </div>
        { props.isOrg && !props.isModalOpen ? 
          <KakaoMap address={props.userInfo?.address || ""} /> 
          : 
          props.isMine ?
          <RecentSeenAnimals>
            <p className="content-title"><IoMdHeart />최근 본 보호 동물<IoMdHeart /></p>
            <div className="img-box">
              {
                recentSeen && recentSeen.map((info: RecentSeenData) => (
                  <div 
                    key={info.animalId}
                    className="animal-image-circle"
                    onClick={() => navigate(`/save-animals/${info.animalId}`)}
                  >
                    <img className="profile-image" src={info.imgUrl} alt="" />
                  </div>
                ))
              }
            </div>
          </RecentSeenAnimals>
          :
          <></>
        }
      </StyledBox>
    </>
  )
}

export default ProfileBox;