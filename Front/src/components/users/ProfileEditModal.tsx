import { useState, useEffect } from "react";
import ReactModal from "react-modal";
import styled from "styled-components";
import { checkEmail, checkNickname, editUserInfo, infoData, getUserInfo, editedInfoData, editedInfoDataWithPassword } from "../../util/UserAPI";
import { useParams } from "react-router-dom";
import { Button } from "../common/Button";
import { requestS3 } from "../../util/S3";
import { MdOutlineInsertPhoto } from "react-icons/md";

const EditForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin: 2rem 0;

  .image-input {
    display: none;
  }

  .img-box {
    width: 10rem;
    height: 10rem;
    border-radius: 50%;
    background-color: white;
    overflow: hidden;
    position: relative;

    .profile-img {
      height: 100%;
      width: 100%;
    }
    .hover-img {
      height: 100%;
      width: 100%;
      background-color: lightgrey;
      position: absolute;
      top: 0;
      z-index: 1;
      justify-content: center;
      align-items: center;
      opacity: .6;
      display: none;

      .photo-icon {
        height: 30%;
        width: 30%;
      }
    }
  }

  .img-box:hover .hover-img {
    display: flex;
  }

`;

const InputBox = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  .item {
    text-align: right;
    width: 5rem;
    white-space: nowrap;
    font-weight: bold;
  }
  .input {
    border: none;
    box-shadow: 0 3.5px 3.5px lightgrey;
    border-radius: 5px;
    width: 15rem;
    padding: .2rem .4rem;
  }
`;

const ErrMsg = styled.p<{ $isValid: boolean }>`
  width: 15rem;
  text-align: center;
  font-size: .8rem;
  color: ${props => props.$isValid ? 'green' : 'red'};
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
  const [password1, setPassword1] = useState<string | undefined>();
  const [password2, setPassword2] = useState<string | undefined>();
  const [nickname, setNickname] = useState(props.userInfo?.nickname || '');
  const [address, setAddress] = useState(props.userInfo?.address || '');
  const [phone, setPhone] = useState(props.userInfo?.phone || '');
  const [bio, setBio] = useState(props.userInfo?.bio || '');
  const [imgUrl, setImgUrl] = useState(props.userInfo?.imgUrl || '');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidNickname, setIsValidNickname] = useState(false);
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [nicknameErrMsg, setNicknameErrMsg] = useState('');
  const [passwordErrMsg, setPasswordErrMsg] = useState('');
  const [isEmailChanged, setIsEmailChanged] = useState(false);
  const [isNicknameChanged, setIsNicknameChanged] = useState(false);
  const [selectedImage, setSelectedImage] = useState<null | string>(props.userInfo?.imgUrl || null);

  const modalStyle = {
    content: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "50%",
      height: "auto",
      margin: "auto",
      borderRadius: "8px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      overflow: "auto",
      padding: "0",
      backgroundColor: "#f7f4eb"
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
  };

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(() => e.target.value);
    if (!isEmailChanged) {
      setIsEmailChanged(true);
      setEmailErrMsg('중복 검사 필요');
      setIsValidEmail(false);
    }
  };

  const handlePassword1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword1(() => e.target.value);
  };

  const handlePassword2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword2(() => e.target.value);
  };

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(() => e.target.value);
    if (!isNicknameChanged) {
      setIsNicknameChanged(true);
      setNicknameErrMsg('중복 검사 필요');
      setIsValidNickname(false);
    }
  };

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(() => e.target.value);
  };

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value
      .replace(/[^0-9]/g, '')
      .replace(/(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g, "$1-$2-$3");
    setPhone(() => e.target.value);
  };

  const handleBio = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBio(() => e.target.value);
  };

  const handleImageChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage((reader.result as string) || null);
      };
      reader.readAsDataURL(file);
      try {
        const uploadedImageUrl = await requestS3({
          name: file.name.replace(/\.[^/.]+$/, ''), 
          file: file,
        })
        if (uploadedImageUrl) {
          setImgUrl(uploadedImageUrl);
        } else {
          console.error("Error: Uploaded image URL is undefined");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  useEffect(() => {
    if (password1) {
      if (password1 === password2) {
        setPasswordErrMsg('비밀번호 일치');
        setIsValidPassword(true);
      } else {
        setPasswordErrMsg('비밀번호 불일치');
        setIsValidPassword(false);
      }
    }
  }, [password1, password2]);

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
  };

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
  };

  const onClickCloseBtn = () => {
    props.closeModal((prev) => !prev);
    setEmail(props.userInfo?.email || '');
    setNickname(props.userInfo?.nickname || '');
    setAddress(props.userInfo?.address || '');
    setPhone(props.userInfo?.phone || '');
    setBio(props.userInfo?.bio || '');
    setIsValidEmail(false);
    setIsValidNickname(false);
    setIsValidPassword(false);
    setEmailErrMsg('');
    setNicknameErrMsg('');
    setPasswordErrMsg('');
    setIsEmailChanged(false);
    setIsNicknameChanged(false);
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

    const data: editedInfoData | editedInfoDataWithPassword = {
      email: email,
      nickname: nickname,
      address: address,
      phone: phone,
      bio: bio,
      imgUrl: imgUrl,
      ...(password1 && { password: password1, passwordConfirm: password2})
    };
    
    const response = await editUserInfo(params.userId || '', data);
    console.log(response);

    const userInfoRes = await getUserInfo(params.userId || '');
    props.saveUserInfo(userInfoRes.data);

    const preInfo = JSON.parse(localStorage.getItem('userInfo') || "");
    localStorage.setItem('userInfo', JSON.stringify({
      ...preInfo,
      nickname: nickname
    }));

    props.closeModal((prev) => !prev);
  }

  const preventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

  return (
    <ReactModal
      isOpen={props.isModalOpen}
      onRequestClose={onClickCloseBtn}
      style={modalStyle}
    >
      <EditForm onSubmit={preventSubmit}>
        <div className="flex flex-col justify-center items-center">
          <label htmlFor="imageInput">
            <div className="img-box" style={{ marginTop: "1.5rem" }}>
              <img
                className="profile-img"
                src={selectedImage || imgUrl}
                alt="미리보기"
                style={{
                  maxWidth: "100%",
                  maxHeight: "300px",
                }}
              />
              <div className="hover-img">
                <MdOutlineInsertPhoto className="photo-icon" />
              </div>
            </div>
          </label>
          <input
            id="imageInput"
            className="image-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <InputBox>
          <label className="item">ID</label>
          <p>{props.userInfo?.username}</p>
        </InputBox>
        <div className="flex flex-col gap-1">
          <InputBox>
            <label className="item" htmlFor="nickname">{ props.isOrg ? '기관명' : '닉네임' }</label>
            <input className="input" type="text" id="nickname" name="nickname" onChange={handleNickname} defaultValue={props.userInfo?.nickname} />
            <Button $fontSize={.9} $fontFamily="Pretendard-500" $marginLeft={0} $marginTop={0} onClick={onClickCheckNickname}>중복확인</Button>
          </InputBox>
          <InputBox>
            <div className="item"></div>
            { nicknameErrMsg && <ErrMsg $isValid={isValidNickname}>{nicknameErrMsg}</ErrMsg>}
          </InputBox>
        </div>
        <InputBox>
          <label className="item" htmlFor="password1">비밀번호</label>
          <input className="input" type="password" id="password1" name="password1" onChange={handlePassword1} />
        </InputBox>
        <div className="flex flex-col gap-1">
          <InputBox>
            <label className="item" htmlFor="password2">비밀번호 확인</label>
            <input className="input" type="password" id="password2" name="password2" onChange={handlePassword2} />
          </InputBox>
          <InputBox>
            <div className="item"></div>
            { passwordErrMsg && <ErrMsg $isValid={isValidPassword}>{passwordErrMsg}</ErrMsg>}
          </InputBox>
        </div>
        <div className="flex flex-col gap-1">
          <InputBox>
            <label className="item" htmlFor="email">이메일</label>
            <input className="input" type="email" id="email" name="email" onChange={handleEmail} defaultValue={props.userInfo?.email} />
            <Button $fontSize={.9} $fontFamily="Pretendard-500" $marginLeft={0} $marginTop={0} onClick={onClickCheckEmail}>중복확인</Button>
          </InputBox>
          <InputBox>
            <div className="item"></div>
            { emailErrMsg && <ErrMsg $isValid={isValidEmail}>{emailErrMsg}</ErrMsg>}
          </InputBox>
        </div>
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
        <div className="flex justify-center">
          <Button $fontSize={.9} $fontFamily="Pretendard-500" $marginLeft={0} $marginTop={0} onClick={onSave} width={4}>수정</Button>
        </div>
      </EditForm>
    </ReactModal>
  )
}

export default ProfileEditModal;