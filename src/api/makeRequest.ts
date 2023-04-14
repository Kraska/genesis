import axios, { Method } from "axios";
import { AppConfig } from "../config";

type Settings = {
  aadAuthorization?: boolean;
  addContentType?: boolean;
};

type Props<D> = {
  url: string;
  method?: Method;
  params?: Record<string, string>;
  data?: D;
  headers?: Record<string, string | boolean>;
  settings?: Settings;
};

const makeRequest = <D>({
  url,
  method = "get",
  params = {},
  data,
  headers = {},
  settings = {
    aadAuthorization: true,
    addContentType: true,
  },
}: Props<D>) => {
  settings.aadAuthorization &&
    (headers.Authorization = `Bearer ${AppConfig.API_TOKEN}`);

  settings.addContentType && (headers["Content-Type"] = "application/json");

  return axios<D>({
    url,
    method,
    params,
    data,
    headers,
  });
};

export default makeRequest;
