import { ChangeEvent, useMemo, useRef, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "dompurify";

import { queryClient } from "../../util/tanstackQuery";
import { getUploadURL, requestArticle } from "../../util/articleAPI";
import { LoadingOrError } from "../../pages/articles/LoadingOrError";
import PreviewModal from "./PreviewModal";
import AlertModal from "../common/AlertModal";
import tw from "tailwind-styled-components";
import { Button, Input } from "../common/Design";
import axios from "axios";
import { getUserInfo } from "../../util/uitl";
import { resizeFile } from "../../util/imageHandler";

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

  // ------------------------imageHandler------------------------------------------------------

  const imageHandler = async () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();
    input.addEventListener("change", async () => {
      const uploadFile = await resizeFile(input.files![0]);

      try {
        const { nickname } = getUserInfo();
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const day = date.getDate().toString().padStart(2, "0");
        const YYMMDD = year + month + day;

        const randomNumber = Math.ceil(Math.random() * 10000);
        const fileName = YYMMDD + nickname + randomNumber + ".jpeg";
        const uploadURL = await getUploadURL(fileName);

        const formData = new FormData();
        formData.append("file", uploadFile);

        const IMG_URL = await axios
          .put(uploadURL, formData)
          .then((response) => {
            console.log(response);
          })
          .catch((error) => {
            console.log(error);
          });

        const editor = quillRef.current?.getEditor();
        if (editor) {
          const range = editor.getSelection();
          editor.insertEmbed(range!.index, "image", IMG_URL);
        }
      } catch (error) {
        console.log(error);
      }
    });
  };

  const MODULES = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: [1, 2, 3, 4, false] }],
          [{ color: [] }, { align: [] }],
          ["bold", "italic", "underline", "strike"],
          ["link", "image"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

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
    const data = {
      title: articleTitle as string,
      content: cleanContent,
      isSaved,
      boardId,
    };
    mutate({
      data,
      method: boardId ? "PUT" : "POST",
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
