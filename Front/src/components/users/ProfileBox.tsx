import styled from "styled-components";
import { infoData } from "../../pages/users/ProfilePage";

const StyledBox = styled.div`
  border: 1px solid black;
  border-radius: 20px;
  
  .profile-image {
    border-radius: 50%;
    overflow: hidden;
    width: 100px;
    height: 100px;
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
`

const ProfileBox: React.FC<{ userInfo: infoData | undefined, isOrg: boolean, isMine: boolean }> = (props) => {
  
  return (
    <>
      <StyledBox>
        <div className="profile-image">
          <img src={props.userInfo?.imgUrl || "/src/assets/defaultProfile.png"} alt="" width="100%" />
        </div>
        <div>
          <p className="nickname">{props.userInfo?.nickname}</p>
          <button>정보 수정</button>
        </div>
        
        {
          props.isOrg ? 
          <>
            <div>
              <p>주소: {props.userInfo?.address}</p>
              <p>연락처: {props.userInfo?.phone}</p>
              <p>이메일: {props.userInfo?.email}</p>
            </div>
            <div>
              <StyledButton>입양 절차 설정</StyledButton>
              <StyledButton>방송 일정 관리</StyledButton>
              <StyledButton>방문 신청 관리</StyledButton>
              <StyledButton>방문 예약 관리</StyledButton>
            </div>
          </>
          :
          <>
            <div>
              <p>지역: {props.userInfo?.address}</p>
              <p>소개글: {props.userInfo?.bio || "없음"}</p>
            </div>
            <div>
              <StyledButton>방문 일정</StyledButton>
            </div>
          </>
        }
      </StyledBox>
      {
        props.isOrg ? 
        <div>
          <h4>{props.userInfo?.nickname}에서 보호 중인 동물</h4>
          <StyledButton>보호 동물 관리</StyledButton>
        </div>
        :
        <div>
          <div>
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