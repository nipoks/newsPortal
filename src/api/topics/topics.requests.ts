import { createRequest } from '../createRequest'
import {TopicsOutput} from "./topics.types";

const UrlPrefix = `https://*/api`
export async function getTopics(): Promise<TopicsOutput> {
    return createRequest<TopicsOutput>({
        url: `${UrlPrefix}/topics`,
    })
}