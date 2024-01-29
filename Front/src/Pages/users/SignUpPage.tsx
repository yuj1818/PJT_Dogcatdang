import { useState } from "react";
import styled from "styled-components";
import { signUp } from "../../util/UserAPI";
import { useNavigate } from "react-router-dom";

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .box {
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
  }

  button {
    border: none;
    font-size: 20px;
    border-radius: 5px;
    background-color: #F7EDE1;
  }
`

function SignUpPage() {
  const navigate = useNavigate();

  const [isOrg, setIsOrg] = useState(false);
  const [role, setRole] = useState('ROLE_USER')
  const [userName, setUserName] = useState('');
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [isValidEmail, setIsValidEmail] = useState<boolean>();

  const selectType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsOrg(() => e.target.value === 'ROLE_SHLETER'  ? true : false);
    setRole(() => e.target.value);
  }

  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(() => e.target.value)
  }

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(() => e.target.value);
  }

  const handlePassword1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword1(() => e.target.value);
  }

  const handlePassword2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword2(() => e.target.value);
    // 비밀번호 같은지 체크
    if (password1 !== password2) {
      setIsValidEmail(false);
    } else {
      setIsValidEmail(true);
    }
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

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      username: userName,
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
    <div>
      <img src="/src/assets/auth-image.png" alt="" />
      <h3>회원가입</h3>
      <SignUpForm onSubmit={onSubmit}>
        <div className="box">
          <label className="item" htmlFor="isOrg">회원 구분</label>
          <div>ROLE_SHELTER
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
          <input className="input" type="text" id="username" name="username" onChange={handleUserName} />
          <button>중복확인</button>
        </div>
        <div className="box">
          <label className="item" htmlFor="nickname">{ isOrg ? '기관명' : '닉네임' }</label>
          <input className="input" type="text" id="nickname" name="nickname" onChange={handleNickname} />
          <button>중복확인</button>
        </div>
        <div className="box">
          <label className="item" htmlFor="password1">비밀번호</label>
          <input className="input" type="password" id="password1" name="password1" onChange={handlePassword1} />
        </div>
        <div className="box">
          <label className="item" htmlFor="password2">비밀번호 확인</label>
          <input className="input" type="password" id="password2" name="password2" onChange={handlePassword2} />
          { isValidEmail ? '비밀번호 일치' : '비밀번호 일치하지 않음'}
        </div>
        <div className="box">
          <label className="item" htmlFor="email">이메일</label>
          <input className="input" type="email" id="email" name="email" onChange={handleEmail} />
        </div>
        <div className="box">
          <label className="item" htmlFor="phone-number">전화번호</label>
          <input className="input" type="text" id="phone-number" name="phone-number" onChange={handlePhone} />
        </div>
        <div className="box">
          <label className="item" htmlFor="address">주소</label>
          <input className="input" type="text" id="address" name="address" onChange={handleAddress} />
        </div>
        <button>회원가입</button>
      </SignUpForm>
    </div>
  );
}

export default SignUpPage;