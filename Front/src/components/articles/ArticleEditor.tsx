import { ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import DOMPurify from "dompurify";

import { queryClient, requestArticle } from "../../util/HTTP";
import { LoadingOrError } from "../../pages/articles/LoadingOrError";
import PreviewModal from "./PreviewModal";
import AlertModal from "../common/AlertModal";

// -----------------------reat-quill--------------------------------------------------------------
const MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { align: [] },
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image"],
    [{ color: [] }, { background: [] }],
  ],
};

const FORMATS = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "align",
  "color",
  "background",
];

interface BlockImageValue {
  alt: string;
  url: string;
}

const CustomImage = Quill.import("formats/image");
class BlockImage extends CustomImage {
  static create(value: BlockImageValue) {
    const node = super.create(value);
    node.setAttribute(
      "style",
      "display: block; max-width: 100%; height: auto;"
    );
    return node;
  }
}

Quill.register(BlockImage, true);

const ArticleEditor: React.FC<{ prevTitle?: string; content?: string }> = ({
  prevTitle,
  content,
}) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(prevTitle ?? "");
  const [dirtyContent, setDirtyContent] = useState(content ?? "");
  const [preViewModalIsOpen, setPreViewModalIsOpen] = useState(false);
  const [alertModalIsOpen, setAlertModalIsOpen] = useState(false);

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: requestArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articleList"] });
      navigate("/articles");
    },
  });

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const openModal = () => {
    setPreViewModalIsOpen(true);
  };

  const closePreviewModal = () => {
    setPreViewModalIsOpen(false);
  };

  const closeArletModal = () => {
    setAlertModalIsOpen(false);
  };

  const handleCreateArticle = (isSaved: boolean) => {
    const cleanContent = DOMPurify.sanitize(dirtyContent);
    mutate({
      data: { title: title as string, content: cleanContent, isSaved },
      method: "POST",
    });
    setAlertModalIsOpen(() => isError);
  };

  return (
    <>
      <PreviewModal
        title={title}
        content={dirtyContent}
        closeModal={closePreviewModal}
        modalIsOpen={preViewModalIsOpen}
      />
      {isError && (
        <AlertModal
          title={error.name}
          content={error.message}
          isOpen={alertModalIsOpen}
          closeModal={closeArletModal}
        />
      )}
      <div>
        <label htmlFor="title">제목</label>
        <input id="title" type="text" onChange={handleTitleChange} />
        <ReactQuill
          style={{ width: "70%", height: "50vh" }}
          theme="snow"
          modules={MODULES}
          formats={FORMATS}
          onChange={setDirtyContent}
        />
      </div>
      {isPending ? (
        <LoadingOrError isLoading={isPending} size={32} />
      ) : (
        <>
          <button
            style={{ marginTop: "50px" }}
            onClick={() => {
              handleCreateArticle(false);
            }}
          >
            임시 저장
          </button>
          <button onClick={openModal}>미리보기</button>
          <button
            style={{ marginTop: "50px" }}
            onClick={() => {
              handleCreateArticle(true);
            }}
          >
            제출
          </button>
        </>
      )}
    </>
  );
};
export default ArticleEditor;
