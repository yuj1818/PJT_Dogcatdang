import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { broadCastDetail } from "../../util/broadcastAPI";
import { LoadingOrError } from "../common/LoadingOrError";

const BroadcastDetail: React.FC = () => {
  const { state } = useLocation();
  const selector = useSelector((state: RootState) => state.broadcast);
  let streamingId: number;
  if (state) {
    streamingId = state.streamingId;
  } else {
    streamingId = selector.broadcastId;
  }

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["broadcastDetail"],
    queryFn: async ({ signal }: QueryFunctionContext) => {
      const response = await broadCastDetail({ streamingId, signal });
      return response;
    },
  });
  return (
    <>
      {(isLoading || isError) && (
        <LoadingOrError isLoading={isLoading} isError={isError} error={error} />
      )}
      {data && (
        <>
          <h2>{data.title}</h2>
          <p>{data.description}</p>
        </>
      )}
    </>
  );
};

export default BroadcastDetail;
