import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import paw from "../../assets/paw-prints.png";
import logo from "../../assets/main-logo-big.png";
import { useEffect } from "react";
import { Cookies } from "react-cookie";

const Landing = styled.div`
  padding: 0 8rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;

  p {
    margin: 0;
    white-space: nowrap;
  }

  .paw-prints {
    position: absolute;
    top: 50px;
    left: 60px;
    width: 100%;

    .paw1 {
      position: absolute;
      width: 90px;
      height: 90px;
      left: 120px;
      top: 60px;
      transform: rotate(135deg);
    }
  
    .paw2 {
      position: absolute;
      width: 70px;
      height: 70px;
      left: 30px;
      top: 0;
      transform: rotate(150deg);
    }
  
    .paw3 {
      position: absolute;
      width: 70px;
      height: 70px;
      left: 10px;
      top: 110px;
      transform: rotate(190deg);
    }
  }

  .buttons {
    display: flex;
    gap: 2rem;
    margin-left: 12rem;

    button {
      white-space: nowrap;
      background-color: #FE9172;
      border-radius: 30px;
      font-size: 24px;
      font-weight: 600;
      color: white;
      border: none;
      width: 140px;
      height: 55px;
    }
  }

  .slogan {
    font-family: 'Nanum Pen Script';
    font-style: normal;
    font-weight: 400;
    font-size: 96px;
    line-height: 120px;

    .point {
      white-space: nowrap;
      color: #FF8331;
    }
  }

  .service-name {
    margin-left: 6rem;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 800;
    font-size: 140px;
    line-height: 151px;
    color: #5E1E03;
  }

  .service-intro {
    margin-left: 9rem;
    font-family: 'Poppins';
    font-style: normal;
    font-weight: 500;
    font-size: 35px;
    line-height: 52px;
    color: #A97A65;
  }

  .circle-box1 {
    z-index: -1;
    position: absolute;
    right: 0;
    top: 0;
    width: 300px;
    height: 400px;
    overflow: hidden;

    div {
      position: absolute;
      width: 464px;
      height: 433px;
      bottom: 0;
      border-radius: 50%;
      background: #FFCEAE;
    }
  }


  
  .circle-box2 {
    z-index: -2;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 1000px;
    height: 500px;
    overflow: hidden;

    div {
      width: 1400px;
      height: 1200px;
      border-radius: 50%;
      background: rgba(255, 131, 49, 0.59);
    }
  }

  .logo {
    z-index: -1;
    position: absolute;
    right: 50px;
    width: 40%;
  }
`

function LandingPage() {
  const cookie = new Cookies();
  const navigate = useNavigate();

  useEffect(() => {
    cookie.remove("U_ID");
    localStorage.clear();
  }, []);

  const goSignInOrg = () => {
    navigate('/signin/org');
  };

  const goSignInInv = () => {
    navigate('/signin/inv');
  };


  return (
    <Landing>
      <div className="paw-prints">
        <img className="paw1" src={ paw } alt="" />
        <img className="paw2" src={ paw } alt="" />
        <img className="paw3" src={ paw } alt="" />
      </div>
      
      <p className="slogan"><span className="point">가족</span>이 되면</p>
      <p className="service-name">독캣당</p>
      <p className="service-intro">새로운 가족을 만나보세요</p>

      <div className="buttons">
        <button onClick={goSignInOrg}>기관</button>
        <button onClick={goSignInInv}>개인</button>
      </div>

      <div className="circle-box1">
        <div className="circle1"></div>
      </div>
      <div className="circle-box2">
        <div className="circle2"></div>
      </div>

      <img className="logo" src={ logo } alt="" />
    </Landing>
  );
}

export default LandingPage;