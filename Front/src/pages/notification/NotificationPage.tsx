import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaDeleteLeft } from "react-icons/fa6";

import {
  RequestNotiInterfaceInterface,
  requestNoti,
  requstDeleteNoti,
} from "../../util/notifications";
import { retryFn } from "../../util/tanstackQuery";
import { LoadingOrError } from "../../components/common/LoadingOrError";
import AlertModal from "../../components/common/AlertModal";
import { InfoIcon } from "../../components/common/Icons";

interface ModalContentInterface {
  title: string;
  content: string;
}

const NotificationPage: React.FC = () => {
  const [content, setContent] = useState(<></>);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContentInterface>({
    title: "",
    content: "",
  });

  const { data, isLoading, isError, error } = useQuery<
    RequestNotiInterfaceInterface[],
    Error,
    RequestNotiInterfaceInterface[]
  >({
    queryKey: ["notifications"],
    queryFn: requestNoti,
    staleTime: 5 * 1000,
    retry: retryFn,
    retryDelay: 300,
  });

  useEffect(() => {
    if (isLoading || isError) {
      setContent(
        <LoadingOrError isLoading={isLoading} isError={isError} error={error} />
      );
    }

    if (data) {
      const handleOpenModal = (newMOdalContent: ModalContentInterface) => {
        setModalOpen(true);
        setModalContent(newMOdalContent);
      };
      setContent(
        <>
          {data.map((element) => (
            <Card
              {...element}
              key={element.id}
              handleOpenModal={handleOpenModal}
            />
          ))}
        </>
      );
    }
  }, [data, isLoading, isError, error]);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <AlertModal
        isOpen={modalOpen}
        closeModal={handleCloseModal}
        icon={<InfoIcon />}
        {...modalContent}
      />
      {content}
    </>
  );
};

export default NotificationPage;

interface CardContainerInterface {
  isRead: boolean;
}

const CardContainer = styled.div<CardContainerInterface>`
  display: flex;
  padding: 10px;
  border: 1px solid ${(props) => (props.isRead ? "green" : "red")};
  border-radius: 5px;
  background-color: ${(props) => (props.isRead ? "#f0f0f0" : "white")};
  justify-content: space-between;
`;

const ContentsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

interface CardInterface extends RequestNotiInterfaceInterface {
  handleOpenModal: (newMOdalContent: ModalContentInterface) => void;
}

const Card: React.FC<CardInterface> = ({
  id,
  senderNickname,
  title,
  content,
  sentDate,
  isRead,
  handleOpenModal,
}) => {
  const dateTime = new Date(sentDate);

  const formattedDateTime = `${dateTime.getFullYear()}-${(
    dateTime.getMonth() + 1
  )
    .toString()
    .padStart(2, "0")}-${dateTime
    .getDate()
    .toString()
    .padStart(2, "0")} ${dateTime
    .getHours()
    .toString()
    .padStart(2, "0")}:${dateTime.getMinutes().toString().padStart(2, "0")}`;

  const handleClick = () => {
    handleOpenModal({ title, content });
  };

  const handleDelete = () => {
    requstDeleteNoti({ id });
  };

  return (
    <CardContainer isRead={isRead}>
      <ContentsContainer onClick={handleClick}>
        <p>{title}</p>
        <p>{formattedDateTime}</p>
        <p>{senderNickname}</p>
      </ContentsContainer>
      <div onClick={handleDelete}>
        <FaDeleteLeft />
      </div>
    </CardContainer>
  );
};
