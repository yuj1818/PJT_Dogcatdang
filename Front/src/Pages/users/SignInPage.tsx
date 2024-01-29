import { NavLink } from "react-router-dom";

function SignInPage() {
  return (
    <>
      <form>
        <div>
          <label htmlFor="username">ID</label>
          <input type="text" name="username" id="username" />
        </div>
        <div>
          <label htmlFor="password">PW</label>
          <input type="password" name="password" id="password" />
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