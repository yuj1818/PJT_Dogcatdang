import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { FaDeleteLeft } from "react-icons/fa6";

import {
  RequestNotiInterfaceInterface,
  requestDetailNoti,
  requestNoti,
  requstDeleteNoti,
} from "../../util/notificationsAPI";
import { queryClient, retryFn } from "../../util/tanstackQuery";
import { LoadingOrError } from "../../components/common/LoadingOrError";
import AlertModal from "../../components/common/AlertModal";
import { InfoIcon } from "../../components/common/Icons";
import Pagination from "../../components/common/Pagination";

interface ModalContentInterface {
  title: string;
  content: string;
}

const NotificationPage: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState<ModalContentInterface>({
    title: "",
    content: "",
  });
  const [content, setContent] = useState(<></>);
  const [cnt, SetContent] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const itemsPerPage = 10;

  const { data, isLoading, isError, error, refetch } = useQuery<
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
      SetContent(data.length);
      setTotalPage(Math.ceil(data.length / 10));
      const handleOpenModal = (newMOdalContent: ModalContentInterface) => {
        setModalOpen(true);
        setModalContent(newMOdalContent);
      };
      setContent(
        <>
          {data
            .reverse()
            .slice(
              (currentPage - 1) * itemsPerPage,
              Math.min(currentPage * itemsPerPage, data.length)
            )
            .map((element) => (
              <Card
                {...element}
                key={element.id}
                handleOpenModal={handleOpenModal}
                refetch={refetch}
              />
            ))}
        </>
      );
    }
  }, [data, isLoading, isError]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
  };

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
      <p>총 {cnt} 개</p>
      {content}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPage}
        onPageChange={handlePageChange}
      />
    </>
  );
};

export default NotificationPage;

interface CardContainerInterface {
  $isRead: boolean;
}

const CardContainer = styled.div<CardContainerInterface>`
  display: flex;
  padding: 10px;
  border: 1px solid ${(props) => (props.$isRead ? "green" : "red")};
  border-radius: 5px;
  background-color: ${(props) => (props.$isRead ? "#f0f0f0" : "white")};
  justify-content: space-between;
`;

const ContentsContainer = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
`;

interface CardInterface extends RequestNotiInterfaceInterface {
  handleOpenModal: (newMOdalContent: ModalContentInterface) => void;
  refetch: () => void;
}

const Card: React.FC<CardInterface> = ({
  id,
  senderNickname,
  title,
  content,
  sentDate,
  isRead,
  handleOpenModal,
  refetch,
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

  const handleClick = async () => {
    handleOpenModal({ title, content });
    requestDetailNoti({ id });
    await queryClient.invalidateQueries({ queryKey: ["notifications"] });
    refetch();
  };

  const handleDeleteNoti = async () => {
    requstDeleteNoti({ id });
    await queryClient.invalidateQueries({ queryKey: ["notifications"] });
    refetch();
  };

  return (
    <CardContainer $isRead={isRead}>
      <ContentsContainer onClick={handleClick}>
        <p>{title}</p>
        <p>{formattedDateTime}</p>
        <p>{senderNickname}</p>
      </ContentsContainer>
      <div onClick={handleDeleteNoti}>
        <FaDeleteLeft />
      </div>
    </CardContainer>
  );
};
