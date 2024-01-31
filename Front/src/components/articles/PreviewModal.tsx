import DOMPurify from "dompurify";
import ReactModal from "react-modal";
import { Button } from "../common/CommonComponents";
import tw from "tailwind-styled-components";
import ArticleContent from "./ArticleContent";

const ButtonLayout = tw.div`
absolute bottom-1 left-1/2 transform -translate-x-1/2
`;
const modalStyle = {
  content: {
    width: "50%",
    height: "auto",
    margin: "auto",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
    overflow: "auto",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
};

interface articlePreviewModal {
  modalIsOpen: boolean;
  closeModal: () => void;
  title: string;
  content: string;
}

const Preview: React.FC<articlePreviewModal> = ({
  modalIsOpen,
  closeModal,
  title,
  content,
}) => {
  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={modalStyle}
    >
      <ArticleContent
        title={title}
        content={DOMPurify.sanitize(String(content))}
      />
      <ButtonLayout>
        <Button className="object-cover" onClick={closeModal}>
          닫기
        </Button>
      </ButtonLayout>
    </ReactModal>
  );
};
export default Preview;
