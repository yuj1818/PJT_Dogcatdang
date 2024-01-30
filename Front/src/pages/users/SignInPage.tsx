import { NavLink } from "react-router-dom";
import { useState } from "react";
import { signIn } from "../../util/UserAPI";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { onLogin } from "../../stores/auth";

function SignInPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const handleUserName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserName(() => e.target.value)
  }

  const handlePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(() => e.target.value);
  }

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const data = {
      username: userName,
      password: password
    };

    const response = await signIn(data);
    console.log(response);

    navigate('/');
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="username">ID</label>
          <input type="text" name="username" id="username" onChange={handleUserName} />
        </div>
        <div>
          <label htmlFor="password">PW</label>
          <input type="password" name="password" id="password" onChange={handlePassword} />
        </div>
        <div>
          <NavLink to="/signup">회원가입</NavLink>
          <button>ID 찾기</button>
          <button>Password 찾기</button>
        </div>
        <button>로그인</button>
      </form>
    </>
  );
}

export default SignInPage;