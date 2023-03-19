import { AxiosError } from "axios"


export type ErrorCode = string |
    "ERR_FR_TOO_MANY_REDIRECTS" |
    "ERR_BAD_OPTION_VALUE" |
    "ERR_BAD_OPTION" |
    "ERR_NETWORK" |
    "ERR_DEPRECATED" |
    "ERR_BAD_RESPONSE" |
    "ERR_BAD_REQUEST" |
    "ERR_NOT_SUPPORT" |
    "ERR_INVALID_URL" |
    "ERR_CANCELED" |
    "ECONNABORTED" |
    "ETIMEDOUT";

export type APIError = {
    message?: string,
    code?: ErrorCode,
}

export const convertToAPIError = (axiosError: AxiosError) => {
    const { message, code } = axiosError
    return { message, code }
}