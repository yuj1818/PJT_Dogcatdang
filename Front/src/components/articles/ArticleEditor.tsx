import { ChangeEvent, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import DOMPurify from "dompurify";

import { queryClient, requestArticle } from "../../util/HTTP";
import { LoadingOrError } from "../../pages/articles/LoadingOrError";
import PreviewModal from "./PreviewModal";
import AlertModal from "../common/AlertModal";
import tw from "tailwind-styled-components";
import { Button } from "../common/CommonComponents";

// -----------------------reat-quill--------------------------------------------------------------
const MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, 4, false] }],
    [{ color: [] }, { align: [] }],
    ["bold", "italic", "underline", "strike"],
    ["link", "image"],
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

// ---------------------------------style------------------------------------------------------
const Input = tw.input`
w-full mt-2 p-2 border border-gray-300 rounded mb-8

focus:outline-none
focus:shadow-md
focus:placeholder:opacity-0
`;

const Label = tw.label`
 text-lg font-bold text-gray-800 mb-2 block
`;

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

  const togglePreviwModal = () => {
    setPreViewModalIsOpen((prev) => !prev);
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
      <div>
        <Label htmlFor="title">제목</Label>
        <Input id="title" type="text" onChange={handleTitleChange} />
        <Label htmlFor="content">내용</Label>
        <ReactQuill
          id="content"
          className="w-full"
          style={{ minHeight: "40vh", height: "300px", marginBottom: "50px" }}
          theme="snow"
          modules={MODULES}
          formats={FORMATS}
          onChange={setDirtyContent}
        />
      </div>
      {isPending ? (
        <LoadingOrError isLoading={isPending} size={32} />
      ) : (
        <div>
          <Button
            onClick={() => {
              handleCreateArticle(false);
            }}
          >
            임시 저장
          </Button>
          <Button onClick={togglePreviwModal}>미리보기</Button>
          <Button
            onClick={() => {
              handleCreateArticle(true);
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
