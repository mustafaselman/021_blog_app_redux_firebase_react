import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts, getPostsStatus, getPostsError} from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";
import { useEffect } from "react";

const PostsList = () => {

    const dispatch = useDispatch();

    const posts = useSelector(selectAllPosts);
    const postStatus = useSelector(getPostsStatus);
    const error = useSelector(getPostsError);

   
   

    let content;
    if (postStatus === 'loading') {
        content = <p>"Loading..."</p>;
    } else if (postStatus === 'succeeded') {
     
        content = posts.map(post => <PostsExcerpt key={post.title} post={post} />)
    } else if (postStatus === 'failed') {
        content = <p>{error}</p>;
    }

    return (
        <section>
            {content}
        </section>
    )
}
export default PostsList