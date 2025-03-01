import {createRequest} from "../createRequest";
import {UploadImageOutput} from "./images.types";

const UrlPrefix = `https://*/api`

export async function uploadImage(data: FormData): Promise<UploadImageOutput> {
    return createRequest<UploadImageOutput>({
        url: `${UrlPrefix}/images`,
        method: 'POST',
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
}