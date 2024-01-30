import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { isOrg as org } from "./SignInPage";

function ProfilePage() {
  const params = useParams();

  const isOrg = org();

  const [isMine, setIsMine] = useState(false);

  useEffect(() => {
    setIsMine(() => JSON.parse(localStorage.getItem('userInfo') || "")?.id === params.userId)
  }, [params.userId])

  return (
    <div>
      <p>{ isMine ? '마이 페이지' : '프로필'}</p>
      <p>나는야 {isOrg ? '기관' : '개인'}</p>
    </div>
  );
}

export default ProfilePage;