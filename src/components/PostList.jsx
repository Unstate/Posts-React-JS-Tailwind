import { PostItem } from "./PostItems"

export const PostList = ({ posts, title, ...props }) => {

    if (!posts.length) {
        return (<div className=' text-center'><strong>Посты не найдены</strong></div>)
    }

    return (
        <div>
            <h1 className='text-center'><strong>{title}</strong></h1>
                {posts.map((post, index) =>
                        <PostItem
                            delete={props.delete}
                            number={index + 1}
                            key = {post.id}
                            post={post}
                        >
                        </PostItem>
                )}
        </div>
    )
}