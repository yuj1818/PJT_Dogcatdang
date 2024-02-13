import styled from "styled-components";

interface PaginationProps {
  totalPages: number;
  onPageChange: (newPage: number) => void;
  currentPage: number;
}

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px; /* Adjust margin as needed */
`;

const PaginationButton = styled.button`
  margin: 0 5px;
  padding: 5px 10px;
  cursor: pointer;
  background-color: #ffffff;
  color: #5e1e03;
  border: none;
  border-radius: 5px;
  outline: none;
`;

const Pagination: React.FC<PaginationProps> = ({
  totalPages,
  onPageChange,
  currentPage,
}) => {
  const handlePageChange = (newPage: number) => {
    onPageChange(newPage);
  };

  const generatePageNumbers = () => {
    const pageNumbers = [];

    for (
      let i = Math.max(1, currentPage - 2);
      i <= Math.min(totalPages, currentPage + 2);
      i++
    ) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <PaginationContainer>
      <PaginationButton
        onClick={() => handlePageChange(1)}
        disabled={currentPage === 1}
      >
        처음
      </PaginationButton>

      {generatePageNumbers().map((pageNumber) => (
        <PaginationButton
          key={pageNumber}
          onClick={() => handlePageChange(pageNumber)}
          style={{
            backgroundColor: currentPage === pageNumber ? "#5E1E03" : "#ffffff",
            color: currentPage === pageNumber ? "#ffffff" : "#5E1E03",
          }}
        >
          {pageNumber}
        </PaginationButton>
      ))}

      <PaginationButton
        onClick={() => handlePageChange(totalPages)}
        disabled={currentPage === totalPages}
      >
        마지막
      </PaginationButton>
    </PaginationContainer>
  );
};

export default Pagination;
