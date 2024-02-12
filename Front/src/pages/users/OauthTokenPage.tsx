import { useNavigate } from "react-router-dom";
import { getToken } from "../../util/UserAPI";
import { useEffect } from "react";

function OauthTokenPage() {
  const navigate = useNavigate();

  const getAuthToken = async () => {
    await getToken();
  };

  useEffect(() => {
    getAuthToken();
    navigate('/');
  }, []);

  return (
    <></>
  )
}

export default OauthTokenPage;