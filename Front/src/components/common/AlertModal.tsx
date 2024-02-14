import { ReactNode, memo } from "react";
import ReactModal, { Styles } from "react-modal";
import { AlertIcon } from "./Icons";
import styled from "styled-components";

const modalStyle: Styles = {
  content: {
    width: "30%",
    height: "auto",
    zIndex: "150",
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "10px",
    boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
    backgroundColor: "white",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-around",
    overflow: "auto",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

interface alertModalInterface {
  isOpen: boolean;
  closeModal: () => void;
  title?: string;
  content?: string;
  children?: ReactNode;
  icon?: ReactNode;
}

const Title = styled.h2`
  color: #121212;
  font-size: 1.5rem;
  margin: 0;
`;

const Content = styled.p`
  color: #121212;
  font-size: 1rem;
  margin: 0;
`;

const AlertModal: React.FC<alertModalInterface> = memo(
  ({ isOpen, closeModal, title, content, children, icon }) => {
    return (
      <ReactModal
        isOpen={isOpen}
        onRequestClose={closeModal}
        style={modalStyle}
      >
        {!icon ? <AlertIcon /> : icon}
        {children ? (
          <>{children}</>
        ) : (
          <>
            <Title>{title}</Title>
            <Content>{content}</Content>
          </>
        )}
        <button onClick={closeModal}>닫기</button>
      </ReactModal>
    );
  }
);

export default AlertModal;
