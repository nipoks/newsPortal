import { Post, PostOutput} from "./posts.types";
import { formatDate} from "../../lib/utils";

export function mapPostsOutputToPost(postsOutput: PostOutput): Post {
    return {
        img: postsOutput.PreviewImageUrl,
        name: postsOutput.Title,
        date: formatDate(postsOutput.CreatedAt),
        time: "3 min read", //TODO как-то считать время на чтение в будущем
        type: 'news', // TODO type: postsOutput.Topic,
        id: postsOutput.ID,
        content: postsOutput.Content
    }
}