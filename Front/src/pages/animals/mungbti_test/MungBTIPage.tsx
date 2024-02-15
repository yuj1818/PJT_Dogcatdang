import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import BTI from "../../../assets/MungBTI.webp";

const CenteredImage = styled.img`
  display: block;
  margin: 0 auto;
  max-width: 100%;
  height: 550px;
`;

const CenteredLink = styled.a`
  display: block;
  text-align: center;
  margin-top: 20px; /* Adjust as needed */
`;

function MungBTIPage() {
  const navigate = useNavigate();
  const gotoMung = () => {
    navigate("/test");
  };
  return (
    <CenteredLink href="/test" onClick={gotoMung}>
      <CenteredImage src={BTI} alt="test" />
    </CenteredLink>
  );
}

export default MungBTIPage;
