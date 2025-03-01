import './PostContent.css'
import MinimalTiptapThree from "../minimal-tiptap/custom/minimal-tiptap-post";
interface PostContentProps {
    content: string;
}

export const PostContent = (props: PostContentProps) => {

    return(
        <>
            <MinimalTiptapThree
                value={props.content}
                throttleDelay={10}
                className=""
                output="json"
                placeholder="This is your placeholder..."
                editable={false}
            />
        </>
    )
}