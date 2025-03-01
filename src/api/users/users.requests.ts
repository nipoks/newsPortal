import { createRequest } from '../createRequest'
import {AvatarOutput} from "./users.types";

const UrlPrefix = `https://*/api`
export async function getAvatar(userEmail: string): Promise<AvatarOutput> {
    return createRequest<AvatarOutput>({
        url: `${UrlPrefix}/avatars/${userEmail}`,
    })
}

export async function postAvatar(data: FormData): Promise<AvatarOutput> {
    return createRequest<AvatarOutput>({
        url: `${UrlPrefix}/avatars`,
        method: 'POST',
        data: data,
        headers: {
            "Content-Type": "multipart/form-data",
        }
    })
}
