import { ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ReactQuill from "react-quill";
import DOMPurify from "dompurify";

import { queryClient, requestArticle } from "../../util/HTTP";
import { LoadingOrError } from "../../pages/articles/LoadingOrError";
import PreviewModal from "./PreviewModal";

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

const ArticleEditor: React.FC<{ prevTitle?: string; content?: string }> = ({
  prevTitle,
  content,
}) => {
  const navigate = useNavigate();
  const [title, setTitle] = useState(prevTitle ?? "");
  const [dirtyContent, setDirtyContent] = useState(content ?? "");
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleSubmit = () => {
    const cleanContent = DOMPurify.sanitize(dirtyContent);
    mutate({
      data: { title: title as string, content: cleanContent },
      method: "POST",
    });
  };

  return (
    <>
      <PreviewModal
        title={title}
        content={dirtyContent}
        closeModal={closeModal}
        modalIsOpen={modalIsOpen}
      />
      {isError ? (
        <LoadingOrError isLoading={isPending} isError={isError} error={error} />
      ) : (
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
      )}
      {isPending ? (
        <LoadingOrError
          isLoading={isPending}
          isError={isError}
          error={error}
          size={32}
        />
      ) : (
        <>
          <button style={{ marginTop: "50px" }} onClick={handleSubmit}>
            제출
          </button>
          <button onClick={openModal}>미리보기</button>
        </>
      )}
    </>
  );
};
export default ArticleEditor;
