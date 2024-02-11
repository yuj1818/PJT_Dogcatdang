import { ReactNode } from "react";
import Error from "./Error";
import { LoadingIndicator } from "./Icons";

interface Props {
  isLoading: boolean;
  isError?: boolean;
  error?: { name: string; message: string } | null;
  size?: number;
  children?: ReactNode;
}

export const LoadingOrError: React.FC<Props> = ({
  isLoading,
  isError,
  error,
  size,
  children,
}) => {
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
        >
          {children}
        </Error>
      </>
    );
  }

  return content;
};
