import styled from "styled-components";
import { infoData } from "../../util/UserAPI";
import KakaoMap from "./KakaoMap";
import { useNavigate } from "react-router-dom";
import defaultProfile from "../../assets/defaultProfile.png";

const StyledBox = styled.div`
  border-radius: 15px;
  box-shadow: 0px 4px 4px lightgrey;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1rem;
  gap: 1rem;
  width: 100%;
  height: 30vh;
  background-color: white;
  
  .profile-image-circle {
    border-radius: 50%;
    overflow: hidden;
    width: 100px;
    height: 100px;
  }

  .profile-image {
    width: 100%;
    height: 100%;
  }

  .nickname {
    font-size: 20px;
    font-weight: 600;
  }
`

const StyledButton = styled.button `
  color: white;
  background-color: black;
  border-radius: 5px;
  padding: .1rem .3rem;
  font-size: 0.75rem;
  white-space: nowrap;
`

const Spacer = styled.div`
  flex-grow: .8;
`

const ProfileBox: React.FC<{ userInfo: infoData | undefined, isOrg: boolean, isMine: boolean, isModalOpen:boolean, openModal: React.Dispatch<React.SetStateAction<boolean>> }> = (props) => {
  
  const navigate = useNavigate();

  const onClickEditBtn = () => {
    props.openModal((prev) => !prev);
  };

  const goVisitManagement = () => {
    navigate(`/visit/${props.userInfo?.id}`);
  }

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
              <div>{props.isMine ? <StyledButton onClick={onClickEditBtn}>정보 수정</StyledButton> : null}</div>
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
                    props.isMine ?
                    <>
                      <StyledButton>입양 절차 설정</StyledButton>
                      <StyledButton>방송 일정 관리</StyledButton>
                      <StyledButton onClick={() => navigate('/visit/list')}>방문 신청 관리</StyledButton>
                      <StyledButton onClick={() => navigate(`/visit/${props.userInfo?.id}`)}>방문 예약 관리</StyledButton>
                    </>
                    :
                    <>
                      <StyledButton>입양 절차 확인</StyledButton>
                      <StyledButton>1:1 문의</StyledButton>
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
                  {props.isMine ? <StyledButton onClick={goVisitManagement}>방문 일정</StyledButton> : null }
                </div>
              </>
            }
          </div>
        </div>
        { props.isOrg && !props.isModalOpen ? <KakaoMap address={props.userInfo?.address || ""} /> : <Spacer />}
      </StyledBox>
    </>
  )
}

export default ProfileBox;