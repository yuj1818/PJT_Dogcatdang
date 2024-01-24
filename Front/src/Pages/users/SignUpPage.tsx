import { useState } from "react";

function SignUpPage() {
  const [isOrg, setIsOrg] = useState(false);

  const selectType = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsOrg(() => e.target.value === '기관'  ? true : false)
  }

  return (
    <>
      <h3>회원가입</h3>
      <form>
        <div>
          <label htmlFor="isOrg">회원 구분</label>
          <input type="radio" name="isOrg" value="개인" id="개인" onChange={selectType} defaultChecked />
          <label htmlFor="개인">개인 회원</label>
          <input type="radio" name="isOrg" value="기관" id="기관" onChange={selectType} />
          <label htmlFor="기관">기관 회원</label>
        </div>
        <div>
          <label htmlFor="username">ID</label>
          <input type="text" id="username" name="username" />
          <button>중복확인</button>
        </div>
        <div>
          <label htmlFor="nickname">{ isOrg ? '기관명' : '닉네임' }</label>
          <input type="text" id="nickname" name="nickname" />
          <button>중복확인</button>
        </div>
        <div>
          <label htmlFor="password1">비밀번호</label>
          <input type="password" id="password1" name="password1" />
        </div>
        <div>
          <label htmlFor="password2">비밀번호 확인</label>
          <input type="password" id="password2" name="password2" />
        </div>
        <div>
          <label htmlFor="email">이메일</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="phone-number">전화번호</label>
          <input type="text" id="phone-number" name="phone-number" />
        </div>
        <div>
          <label htmlFor="address">주소</label>
          <input type="text" id="address" name="address" />
        </div>
        <button>회원가입</button>
      </form>
    </>
  );
}

export default SignUpPage;