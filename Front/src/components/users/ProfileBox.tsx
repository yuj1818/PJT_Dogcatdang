import styled from "styled-components";
import { infoData } from "../../util/UserAPI";
import KakaoMap from "./KakaoMap";
import { useNavigate } from "react-router-dom";

const StyledBox = styled.div`
  border: 1px solid black;
  border-radius: 15px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1rem;
  gap: 1rem;
  width: 100%;
  height: 30vh;
  
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
  font-size: 12px;
  white-space: nowrap;
`

const Spacer = styled.div`
  flex-grow: .8;
`

const ProfileBox: React.FC<{ userInfo: infoData | undefined, isOrg: boolean, isMine: boolean, openModal: React.Dispatch<React.SetStateAction<boolean>> }> = (props) => {
  
  const navigate = useNavigate();

  const onClickEditBtn = () => {
    props.openModal((prev) => !prev);
  };

  const goVisitManagement = () => {
    navigate(`/profile/${props.userInfo?.id}/visit`);
  }

  return (
    <>
      <StyledBox>
        <div className="flex gap-1">
          <div className="profile-image-circle">
            <img className="profile-image" src={props.userInfo?.imgUrl || "/src/assets/defaultProfile.png"} alt="" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex gap-1">
              <p className="nickname">{props.userInfo?.nickname}</p>
              <div>{props.isMine ? <StyledButton onClick={onClickEditBtn}>정보 수정</StyledButton> : null}</div>
            </div>
          
            {
              props.isOrg ? 
              <>
                <div>
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
                      <StyledButton>방문 신청 관리</StyledButton>
                      <StyledButton>방문 예약 관리</StyledButton>
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
                <div>
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
        { props.isOrg? <KakaoMap address={props.userInfo?.address || ""} /> : <></>}
        <Spacer />
      </StyledBox>
      {
        props.isOrg ? 
        <div className="flex gap-1">
          <h4>{props.userInfo?.nickname}에서 보호 중인 동물</h4>
          { props.isMine ? <StyledButton>보호 동물 관리</StyledButton> : null }
        </div>
        :
        <div>
          <div className="flex gap-3">
            <h4>관심 동물</h4>
            <h4>입양 근황</h4>
            <h4>입양 신청 내역</h4>
          </div>
        </div>
      }
    </>
  )
}

export default ProfileBox;