import { useState, useEffect } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import { checkEmail, checkNickname, editUserInfo, infoData, getUserInfo } from "../../util/UserAPI";
import { useParams } from "react-router-dom";

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

const InputBox = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  .item {
    text-align: right;
    width: 11rem;
    white-space: nowrap;
    font-size: 25px;
  }
  .input {
    font-size: 22px;
    border: none;
    box-shadow: 0 3.5px 3.5px lightgrey;
    border-radius: 5px;
  }
`

const StyledButton = styled.button`
  border: none;
    font-size: 20px;
    border-radius: 5px;
    background-color: #F7EDE1;
`

interface EditInfo {
  userInfo: infoData | undefined;
  isOrg: boolean;
  isModalOpen: boolean;
  closeModal: React.Dispatch<React.SetStateAction<boolean>>;
  saveUserInfo: React.Dispatch<React.SetStateAction<infoData | undefined>>;
}

const ProfileEditModal: React.FC<EditInfo> = (props) => {
  const params = useParams();
  
  const [email, setEmail] = useState(props.userInfo?.email || '');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [nickname, setNickname] = useState(props.userInfo?.nickname || '');
  const [address, setAddress] = useState(props.userInfo?.address || '');
  const [phone, setPhone] = useState(props.userInfo?.phone || '');
  const [bio, setBio] = useState(props.userInfo?.bio || '');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidNickname, setIsValidNickname] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState('중복 검사 필요');
  const [nicknameErrMsg, setNicknameErrMsg] = useState('중복 검사 필요');
  const [passwordErrMsg, setPasswordErrMsg] = useState('');
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [isNicknameChanged, setIsNicknameChanged] = useState(false);

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(() => e.target.value);
    if (!isEmailChanged) {
      setIsEmailChanged(true);
      setEmailErrMsg('중복 검사 필요');
      setIsValidEmail(false);
    }
  }

  const handlePassword1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword1(() => e.target.value);
  }

  const handlePassword2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword2(() => e.target.value);
  }

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(() => e.target.value);
    if (!isNicknameChanged) {
      setIsNicknameChanged(true);
      setNicknameErrMsg('중복 검사 필요');
      setIsValidNickname(false);
    }
  }

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(() => e.target.value);
  }

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(() => e.target.value);
  }

  const handleBio = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(() => e.target.value);
  }

  useEffect(() => {
    if (password1 === password2) {
      setPasswordErrMsg('비밀번호 일치');
    } else {
      setPasswordErrMsg('비밀번호 불일치');
    }
  }, [password1, password2])

  const onClickCheckEmail = async() => {
    const data = {
      email: email
    };

    const response = await checkEmail(data);
    
    if (response.status === 200) {
      setIsValidEmail(true);
      setIsEmailChanged(false);
      setEmailErrMsg('사용 가능한 이메일입니다');
    } else if (response.status === 409) {
      setIsValidEmail(false);
      setEmailErrMsg('이미 사용 중인 이메일입니다');
    }
  }

  const onClickCheckNickname = async() => {
    const data = {
      nickname: nickname
    };

    const response = await checkNickname(data);
    
    if (response.status === 200) {
      setIsValidNickname(true);
      setIsNicknameChanged(false);
      setNicknameErrMsg(`사용 가능한 ${props.isOrg ? '기관명' : '닉네임'}입니다`);
    } else if (response.status === 409) {
      setIsValidNickname(false);
      setNicknameErrMsg(`이미 사용 중인 ${props.isOrg ? '기관명' : '닉네임'}입니다`);
    }
  }

  const onClickCloseBtn = () => {
    props.closeModal((prev) => !prev);
  }

  const onSave = async(e: React.MouseEvent) => {
    e.preventDefault();

    if (isNicknameChanged) {
      if (!isValidNickname) {
        return ;
      }
    }

    if (isEmailChanged) {
      if (!isValidEmail) {
        return ;
      }
    }

    const data = {
      email: email,
      nickname: nickname,
      address: address,
      phone: phone,
      bio: bio,
      imgName: props.userInfo?.imgName || '',
      imgUrl: props.userInfo?.imgUrl || '',
      password: password1,
      passwordConfirm: password2
    };

    const response = await editUserInfo(params.userId || '', data);
    console.log(response);
    //props.saveUserInfo(response.data);

    const userInfoRes = await getUserInfo(params.userId || '');
    props.saveUserInfo(userInfoRes.data);

    props.closeModal((prev) => !prev);
  }

  const preventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

  return (
    <ReactModal
      isOpen={props.isModalOpen}
      onRequestClose={onClickCloseBtn}
    >
      <EditForm onSubmit={preventSubmit}>
        <InputBox>
          <label>ID</label>
          <p>{props.userInfo?.username}</p>
        </InputBox>
        <InputBox>
          <label className="item" htmlFor="nickname">{ props.isOrg ? '기관명' : '닉네임' }</label>
          <input className="input" type="text" id="nickname" name="nickname" onChange={handleNickname} defaultValue={props.userInfo?.nickname} />
          <StyledButton onClick={onClickCheckNickname}>중복확인</StyledButton>
        </InputBox>
        <p>{nicknameErrMsg}</p>
        <InputBox>
          <label className="item" htmlFor="password1">비밀번호</label>
          <input className="input" type="password" id="password1" name="password1" onChange={handlePassword1} />
        </InputBox>
        <InputBox>
          <label className="item" htmlFor="password2">비밀번호 확인</label>
          <input className="input" type="password" id="password2" name="password2" onChange={handlePassword2} />
        </InputBox>
        <p>{passwordErrMsg}</p>
        <InputBox>
          <label className="item" htmlFor="email">이메일</label>
          <input className="input" type="email" id="email" name="email" onChange={handleEmail} defaultValue={props.userInfo?.email} />
          <StyledButton onClick={onClickCheckEmail}>중복확인</StyledButton>
        </InputBox>
        <p>{emailErrMsg}</p>
        <InputBox>
          <label className="item" htmlFor="phone-number">전화번호</label>
          <input className="input" type="text" id="phone-number" name="phone-number" onChange={handlePhone} defaultValue={props.userInfo?.phone} />
        </InputBox>
        <InputBox>
          <label className="item" htmlFor="address">주소</label>
          <input className="input" type="text" id="address" name="address" onChange={handleAddress} defaultValue={props.userInfo?.address} />
        </InputBox>
        <InputBox>
          <label className="item" htmlFor="bio">소개</label>
          <textarea className="input" id="bio" name="bio" onChange={handleBio} defaultValue={props.userInfo?.bio} />
        </InputBox>
        <StyledButton onClick={onSave}>수정</StyledButton>
      </EditForm>
    </ReactModal>
  )
}

export default ProfileEditModal;