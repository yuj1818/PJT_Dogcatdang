import Error from "../../components/common/Error";
import LoadingIndicator from "../../components/common/LoadingIndicator";

export const LoadingOrError: React.FC<{
  isLoading: boolean;
  isError: boolean;
  error: { name: string; message: string } | null;
  size?: number;
}> = ({ isLoading, isError, error, size }) => {
  let content;

  if (isLoading) {
    content = (
      <>
        <LoadingIndicator size={size ?? 64}></LoadingIndicator>
      </>
    );
  }

  if (isError) {
    content = (
      <>
        <Error
          title={error!.name || "An error occured"}
          message={error!.message || "네트워크 연결을 확인해 주세요"}
        ></Error>
      </>
    );
  }

  return content;
};
