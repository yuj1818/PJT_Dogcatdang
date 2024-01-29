import DOMPurify from "dompurify";
import ReactModal from "react-modal";

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
      <h2>{title}</h2>
      <div
        dangerouslySetInnerHTML={{
          __html: DOMPurify.sanitize(String(content)),
        }}
      ></div>
    </ReactModal>
  );
};

export default Preview;
