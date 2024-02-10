import { useMutation } from "@tanstack/react-query";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { queryClient } from "../../util/tanstackQuery";
import { requestLike } from "../../util/articleAPI";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LikeButton = styled.button`
  display: inline-block;
  text-align: center;
  position: relative;
`;

interface IntoIconsInterface {
  $like: boolean;
}

const IntoIcons = styled.div<IntoIconsInterface>`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${(props) => (props.$like ? "white" : "black")};
`;

interface props {
  like: boolean;
  likeCnt: number;
}

const iconprops = {
  size: 50,
};

const Likes: React.FC<props> = ({ like, likeCnt }) => {
  const { boardId } = useParams();

  const { mutate } = useMutation({
    mutationFn: requestLike,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["articleList", boardId] });
    },
  });

  const onLike = () => {
    mutate({ boardId, like });
  };

  return (
    <Container>
      <LikeButton onClick={onLike}>
        {like ? (
          <AiFillHeart
            style={{ color: "red", fontSize: "30px" }}
            {...iconprops}
          />
        ) : (
          <AiOutlineHeart style={{ fontSize: "30px" }} {...iconprops} />
        )}
        <IntoIcons $like={like}>{likeCnt}</IntoIcons>
      </LikeButton>
    </Container>
  );
};

export default Likes;
