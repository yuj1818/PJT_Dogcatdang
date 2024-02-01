import { useEffect, useState } from "react";
import styled from "styled-components";
import { signUp, checkUsername, checkNickname, checkEmail } from "../../util/UserAPI";
import { useNavigate } from "react-router-dom";

const FormBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 5rem;

  .img-box {
    width: 40%;
  }
`

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;

  .box {
    display: flex;
    gap: 1rem;
    align-items: center;
    .item {
      text-align: right;
      width: 11rem;
      white-space: nowrap;
      font-size: 20px;
    }
    .input {
      font-size: 22px;
      border: none;
      box-shadow: 0 3.5px 3.5px lightgrey;
      border-radius: 5px;
      width: 15rem;
    }
  }

  button {
    border: none;
    font-size: 16px;
    border-radius: 5px;
    background-color: #F7EDE1;
    padding: .2rem .4rem;
  }

  .button-box {
    width: 15rem;
  }
`

function SignUpPage() {
  const navigate = useNavigate();

  const [isOrg, setIsOrg] = useState(false);
  const [role, setRole] = useState('ROLE_USER')
  const [username, setUsername] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isValidUsername, setIsValidUsername] = useState(false);
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidNickname, setIsValidNickname] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [usernameErrMsg, setUsernameErrMsg] = useState('중복 검사 필요');
  const [emailErrMsg, setEmailErrMsg] = useState('중복 검사 필요');
  const [nicknameErrMsg, setNicknameErrMsg] = useState('중복 검사 필요');
  const [passwordErrMsg, setPasswordErrMsg] = useState('');
  const [signUpErrMsg, setSignUpErrMsg] = useState('');

  const selectType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsOrg(() => e.target.value === 'ROLE_SHELTER');
    setRole(() => e.target.value);
  }

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(() => e.target.value)
  }

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(() => e.target.value);
  }

  const handlePassword1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword1(() => e.target.value);
  }

  const handlePassword2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword2(() => e.target.value);
  }

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(() => e.target.value);
  }

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(() => e.target.value);
  }

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPhone(() => e.target.value);
  }

  useEffect(() => {
    if (password1) {
      if (password1 === password2) {
        setPasswordErrMsg('비밀번호 일치');
      } else {
        setPasswordErrMsg('비밀번호 불일치');
      }
    }
  }, [password1, password2])

  const onClickCheckUsername = async() => {
    const data = {
      username: username
    };

    const response = await checkUsername(data);
    
    if (response.status === 200) {
      setIsValidUsername(true);
      setUsernameErrMsg('사용 가능한 아이디입니다');
    } else if (response.status === 409) {
      setIsValidUsername(false);
      setUsernameErrMsg('이미 사용 중인 아이디입니다');
    }
  }

  const onClickCheckEmail = async() => {
    const data = {
      email: email
    };

    const response = await checkEmail(data);
    
    if (response.status === 200) {
      setIsValidEmail(true);
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
      setNicknameErrMsg(`사용 가능한 ${isOrg ? '기관명' : '닉네임'}입니다`);
    } else if (response.status === 409) {
      setIsValidNickname(false);
      setNicknameErrMsg(`이미 사용 중인 ${isOrg ? '기관명' : '닉네임'}입니다`);
    }
  }

  useEffect(() => {
    setIsComplete(isValidUsername && isValidNickname && isValidEmail);
  }, [isValidUsername, isValidNickname, isValidEmail])

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isComplete) {
      setSignUpErrMsg('중복검사 해주세요');
      return;
    }

    const data = {
      username: username,
      role: role,
      code: '101',
      email: email,
      password: password1,
      nickname: nickname,
      address: address,
      phone: phone,
      imgName: '',
      imgUrl: '',
    };

    const response = await signUp(data);
    console.log(response);

    navigate('/signin');
  }

  return (
    <FormBox>
      <div className="img-box">
        <img src="/src/assets/auth-image.png" alt="" />
      </div>
      <SignUpForm onSubmit={onSubmit}>
        <h3>회원가입</h3>
        <div className="box">
          <label className="item" htmlFor="isOrg">회원 구분</label>
          <div>
            <input type="radio" name="isOrg" value="ROLE_USER" id="개인" onChange={selectType} defaultChecked />
            <label htmlFor="개인">개인 회원</label>
          </div>
          <div>
            <input type="radio" name="isOrg" value="ROLE_SHELTER" id="기관" onChange={selectType} />
            <label htmlFor="기관">기관 회원</label>
          </div>
        </div>
        <div className="box">
          <label className="item" htmlFor="username">ID</label>
          <input className="input" type="text" id="username" name="username" onChange={handleUsername} />
          <button onClick={onClickCheckUsername}>중복확인</button>
        </div>
        <p className="err-msg">{usernameErrMsg}</p>
        <div className="box">
          <label className="item" htmlFor="nickname">{ isOrg ? '기관명' : '닉네임' }</label>
          <input className="input" type="text" id="nickname" name="nickname" onChange={handleNickname} />
          <button onClick={onClickCheckNickname}>중복확인</button>
        </div>
        <p className="err-msg">{nicknameErrMsg}</p>
        <div className="box">
          <label className="item" htmlFor="password1">비밀번호</label>
          <input className="input" type="password" id="password1" name="password1" onChange={handlePassword1} />
        </div>
        <div className="box">
          <label className="item" htmlFor="password2">비밀번호 확인</label>
          <input className="input" type="password" id="password2" name="password2" onChange={handlePassword2} />
        </div>
        <p className="err-msg">{passwordErrMsg}</p>
        <div className="box">
          <label className="item" htmlFor="email">이메일</label>
          <input className="input" type="email" id="email" name="email" onChange={handleEmail} />
          <button onClick={onClickCheckEmail}>중복확인</button>
        </div>
        <p>{emailErrMsg}</p>
        <div className="box">
          <label className="item" htmlFor="phone-number">전화번호</label>
          <input className="input" type="text" id="phone-number" name="phone-number" onChange={handlePhone} />
        </div>
        <div className="box">
          <label className="item" htmlFor="address">주소</label>
          <input className="input" type="text" id="address" name="address" onChange={handleAddress} />
        </div>
        <p className="err-msg">{signUpErrMsg}</p>
        <div className="box">
          <div className="item"></div>
          <div className="button-box">
            <button>회원가입</button>
          </div>
        </div>
      </SignUpForm>
    </FormBox>
  );
}

export default SignUpPage;