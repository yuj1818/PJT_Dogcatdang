import { ChangeEvent, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

import { queryClient } from "../../util/tanstackQuery";
import { requestArticle } from "../../util/articleAPI";
import { LoadingOrError } from "../common/LoadingOrError";
import PreviewModal from "./PreviewModal";
import AlertModal from "../common/AlertModal";
import tw from "tailwind-styled-components";
import { Button, Input } from "../common/Design";
import { getUserInfo } from "../../util/uitl";

// -----------------------reat-quill--------------------------------------------------------------
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

const MODULES = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, false] }],
      [{ color: [] }, { align: [] }],
      ["bold", "italic", "underline", "strike"],
      ["link", "image"],
    ],
    handlers: {},
  },
};

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

// ---------------------------------style------------------------------------------------------
const Label = tw.label`
 text-lg font-bold text-gray-800 mb-2 block mt-8
`;

interface ArticleEditorInterface {
  title?: string;
  content?: string;
  boardId?: number;
  isSaved?: boolean;
}

const ArticleEditor: React.FC<ArticleEditorInterface> = ({
  title,
  content,
  boardId,
}) => {
  const navigate = useNavigate();
  const [articleTitle, setTitle] = useState(title ?? "");
  const [dirtyContent, setDirtyContent] = useState(content ?? "");
  const [preViewModalIsOpen, setPreViewModalIsOpen] = useState(false);
  const [alertModalIsOpen, setAlertModalIsOpen] = useState(false);
  const quillRef = useRef<ReactQuill>();

  const { mutate, isPending, isError, error } = useMutation({
    mutationFn: requestArticle,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articleList"] });
      if (boardId) {
        navigate(`/articles/detail/${boardId}`);
      } else {
        navigate("/articles/1");
      }
    },
    onError: () => {
      setAlertModalIsOpen(true);
    },
  });

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  const togglePreviwModal = () => {
    setPreViewModalIsOpen((prev) => !prev);
  };

  const closeArletModal = () => {
    setAlertModalIsOpen(false);
  };

  const handleSubmitArticle = (isSaved: boolean) => {
    const cleanContent = DOMPurify.sanitize(dirtyContent);
    const { nickname } = getUserInfo();
    const data = {
      title: articleTitle as string,
      content: cleanContent,
      isSaved,
      boardId,
    };
    mutate({
      data,
      method: boardId ? "PUT" : "POST",
      nickname,
    });
  };

  return (
    <>
      <PreviewModal
        title={articleTitle}
        content={dirtyContent}
        closeModal={togglePreviwModal}
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

      <Label htmlFor="title">제목</Label>
      <Input
        id="title"
        type="text"
        value={articleTitle}
        onChange={handleTitleChange}
      />
      <Label htmlFor="content">내용</Label>
      <ReactQuill
        ref={(element) => {
          if (element != null) {
            quillRef.current = element;
          }
        }}
        style={{
          backgroundColor: "#fff",
        }}
        value={dirtyContent}
        id="content"
        className="w-full"
        theme="snow"
        modules={MODULES}
        formats={FORMATS}
        onChange={setDirtyContent}
      />

      {isPending ? (
        <LoadingOrError isLoading={isPending} size={32} />
      ) : (
        <div>
          <Button
            onClick={() => {
              handleSubmitArticle(false);
            }}
          >
            임시 저장
          </Button>
          <Button onClick={togglePreviwModal}>미리보기</Button>
          <Button
            onClick={() => {
              handleSubmitArticle(true);
            }}
          >
            제출
          </Button>
        </div>
      )}
    </>
  );
};
export default ArticleEditor;
