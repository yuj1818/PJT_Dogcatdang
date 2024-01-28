import DOMPurify from "dompurify";
import ReactModal from "react-modal";

const modalStyle = {
  content: {
    width: "50%", // Customize the width
    height: "auto", // Customize the height
    margin: "auto", // Center the modal
    borderRadius: "8px", // Add border radius
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Add box shadow
    overflow: "auto", // Allow for scrolling if content is too long
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Customize the overlay color
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
