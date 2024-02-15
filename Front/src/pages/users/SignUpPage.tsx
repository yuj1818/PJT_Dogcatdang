import { useEffect, useState } from "react";
import styled from "styled-components";
import { signUp, checkUsername, checkNickname, checkEmail, oauthSignUp } from "../../util/UserAPI";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import Title from "../../components/users/Title";
import Line from "../../components/users/Line";
import { Button } from "../../components/common/Button";
import logo from "../../assets/auth-image.png";

const FormBox = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;

  .img-box {
    width: 40%;

    img {
      width: 80%;
    }
  }
`

const ErrMsg = styled.p<{ $isValid: boolean }>`
  font-size: .8rem;
  color: ${props => props.$isValid ? 'green' : 'red'};
`

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
  width: 40%;
  
  .box {
    display: flex;
    gap: 1rem;
    align-items: center;
    .item {
      text-align: right;
      width: 7rem;
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

    .item-err-msg {
      width: 15rem;
      text-align: center;
    }
  }

  .button-box {
    width: 15rem;
  }
`

interface MetaData {
  providerId: string;
  metaEmail: string;
}

function SignUpPage() {
  const navigate = useNavigate();
  const params = useParams();
  const [searchParams] = useSearchParams();
  const isOauth = searchParams.get('oauth');
  const [metadata, setMetadata] = useState<MetaData>();
  const isOrg = params.type === 'org';

  useEffect(() => {
    setMetadata(searchParams.get('metadata') && JSON.parse(searchParams.get('metadata') || ""));
  }, [isOauth])

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
  const [isValidPassword, setIsValidPassword] = useState(false);
  const [usernameErrMsg, setUsernameErrMsg] = useState('');
  const [emailErrMsg, setEmailErrMsg] = useState('');
  const [nicknameErrMsg, setNicknameErrMsg] = useState('');
  const [passwordErrMsg, setPasswordErrMsg] = useState('');
  const [signUpErrMsg, setSignUpErrMsg] = useState('');

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(() => e.target.value);
    setUsernameErrMsg('중복 검사 필요');
    setIsValidUsername(false);
  }

  const handleEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(() => e.target.value);
    setEmailErrMsg('중복 검사 필요');
    setIsValidEmail(false);
  }

  const handlePassword1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword1(() => e.target.value);
  }

  const handlePassword2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword2(() => e.target.value);
  }

  const handleNickname = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNickname(() => e.target.value);
    setNicknameErrMsg('중복 검사 필요');
    setIsValidNickname(false);
  }

  const handleAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddress(() => e.target.value);
  }

  const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = e.target.value
      .replace(/[^0-9]/g, '')
      .replace(/(^02.{0}|^01.{1}|[0-9]{3,4})([0-9]{3,4})([0-9]{4})/g, "$1-$2-$3");
    setPhone(() => e.target.value);
  }

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
      setNicknameErrMsg(`사용 가능한 ${ isOrg ? '기관명' : '닉네임'}입니다`);
    } else if (response.status === 409) {
      setIsValidNickname(false);
      setNicknameErrMsg(`이미 사용 중인 ${isOrg ? '기관명' : '닉네임'}입니다`);
    }
  }

  useEffect(() => {
    setIsComplete(isValidUsername && isValidNickname && isValidEmail && isValidPassword);
  }, [isValidUsername, isValidNickname, isValidEmail, isValidPassword])

  useEffect(() => {
    if (isComplete) {
      setSignUpErrMsg('');
    }
  }, [isComplete])

  const preventSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

  const onSubmit = async () => {
    if (isOauth) {
      if (!isValidNickname) {
        return;
      }
      
      const data = {
        username: metadata?.providerId,
        email: metadata?.metaEmail,
        nickname,
        phone,
        address,
        role: 'ROLE_USER', //db 입력할 때 notnull로 되어 있어서 고정값 부여
        password: '1234' //db 입력할 때 notnull로 되어 있어서 고정값 부여(진짜 비밀번호 아님)
      };

      const response = await oauthSignUp(data);
      console.log(response);
      navigate('/signin/inv');
    } else {
      if (!isComplete) {
        setSignUpErrMsg('중복검사 여부와 비밀번호 일치 여부를 확인해주세요');
        return;
      }
  
      const data = {
        username,
        role: isOrg ? 'ROLE_SHELTER' : 'ROLE_USER',
        code: '101',
        email,
        password: password1,
        nickname,
        address,
        phone,
        imgName: '',
        imgUrl: '',
      };
  
      const response = await signUp(data);
      console.log(response);
      navigate('/signin/org');
    }

  }

  return (
    <div className="flex flex-col justify-center h-screen gap-5">
      <Title title="회원가입" />
      <FormBox>
        <div className="img-box flex justify-center">
          <img src={ logo } alt="" />
        </div>
        <Line />
        <SignUpForm onSubmit={preventSubmit}>
          { !isOauth && <div className="flex flex-col gap-1">
            <div className="box">
              <label className="item" htmlFor="username">ID</label>
              <input className="input" type="text" id="username" name="username" onChange={handleUsername} required />
              <Button onClick={onClickCheckUsername} $marginLeft={0}>중복확인</Button>
            </div>
            <div className="box">
              <div className="item"></div>
              { usernameErrMsg && <ErrMsg className="item-err-msg" $isValid={isValidUsername} >{usernameErrMsg}</ErrMsg> }
            </div>
          </div> }
          <div className="flex flex-col gap-1">
            <div className="box">
              <label className="item" htmlFor="nickname">{ isOrg ? '기관명' : '닉네임' }</label>
              <input className="input" type="text" id="nickname" name="nickname" onChange={handleNickname} required />
              <Button onClick={onClickCheckNickname} $marginLeft={0}>중복확인</Button>
            </div>
            <div className="box">
              <div className="item"></div>
              { nicknameErrMsg && <ErrMsg className="item-err-msg" $isValid={isValidNickname} >{nicknameErrMsg}</ErrMsg> }
            </div>
          </div>
          { !isOauth && <div className="box">
            <label className="item" htmlFor="password1">비밀번호</label>
            <input className="input" type="password" id="password1" name="password1" onChange={handlePassword1} required />
          </div> }
          { !isOauth && <div className="flex flex-col gap-1">
            <div className="box">
              <label className="item" htmlFor="password2">비밀번호 확인</label>
              <input className="input" type="password" id="password2" name="password2" onChange={handlePassword2} required />
            </div>
            <div className="box">
              <div className="item"></div>
              { passwordErrMsg && <ErrMsg className="item-err-msg" $isValid={isValidPassword} >{passwordErrMsg}</ErrMsg> }
            </div>
          </div> }
          { !isOauth && <div className="flex flex-col gap-1">
            <div className="box">
              <label className="item" htmlFor="email">이메일</label>
              <input className="input" type="email" id="email" name="email" onChange={handleEmail} required />
              <Button onClick={onClickCheckEmail} $marginLeft={0}>중복확인</Button>
            </div>
            <div className="box">
              <div className="item"></div>
              { emailErrMsg && <ErrMsg className="err-msg item-err-msg" $isValid={isValidEmail} >{emailErrMsg}</ErrMsg>} 
            </div>
          </div>}
          <div className="box">
            <label className="item" htmlFor="phone-number">전화번호</label>
            <input className="input" type="text" id="phone-number" name="phone-number" onChange={handlePhone} required />
          </div>
          <div className="box">
            <label className="item" htmlFor="address">주소</label>
            <input className="input" type="text" id="address" name="address" onChange={handleAddress} required />
          </div>
          <ErrMsg $isValid={isComplete}>{signUpErrMsg}</ErrMsg>
          <div className="box">
            <div className="item"></div>
            <div className="button-box">
              <Button onClick={onSubmit} $marginLeft={0}>회원가입</Button>
            </div>
          </div>
        </SignUpForm>
      </FormBox>
    </div>
  );
}

export default SignUpPage;