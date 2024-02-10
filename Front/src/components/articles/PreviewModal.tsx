import DOMPurify from "dompurify";
import ReactModal from "react-modal";
import { Button } from "../common/Design";
import tw from "tailwind-styled-components";
import ArticleContent from "./ArticleContent";
import { getUserInfo } from "../../util/uitl";

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
  const { nickname } = getUserInfo();
  return (
    <ReactModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={modalStyle}
    >
      <ArticleContent
        title={title}
        content={DOMPurify.sanitize(String(content))}
        nickname={nickname}
        like={false}
        likeCnt={0}
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
