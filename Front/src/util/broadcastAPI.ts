import { AxiosError } from "axios";
import { handleAxiosError } from "./articleAPI";
import API from "./axios";

export interface AnimalInfo {
  id: number;
  code: string;
  breed: string;
  age: number;
  image: string;
}

export interface BoadcastData {
  title: string;
  description: string;
  animalInfo: AnimalInfo[];
  sessionId: string;
}

interface RequestBroadCastInterface {
  signal?: AbortSignal;
  data: BoadcastData;
}

const URL = "api/streamins";

export const requestBroadCast = async ({
  signal,
  data,
}: RequestBroadCastInterface) => {
  try {
    const response = await API.post(URL, data, { signal });
    return response.data;
  } catch (error) {
    handleAxiosError(error as AxiosError);
  }
};
