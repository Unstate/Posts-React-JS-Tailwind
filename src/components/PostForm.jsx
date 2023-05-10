import { useState } from "react";
import { MyButton } from "./UI/button/MyButton"
import { MyInput } from "./UI/input/MyInput"

export const PostForm = ({create}) => {

    let [post, setPost] = useState({title:'',body:''});

    const addPost = (e) => {
        e.preventDefault();
        const newPost = {
            ...post, id: Date.now(),
        }
        create(newPost);
        setPost({title:'',body:''})
    }

    return (
        <form>
            <MyInput
                value={post.title}
                onChange={(e) => setPost({ ...post, title: e.target.value })}
                placeholder='Название поста'>
            </MyInput>
            <MyInput
                value={post.body}
                onChange={(e) => setPost({ ...post, body: e.target.value })}
                placeholder='Описание поста'>
            </MyInput>
            <MyButton onClick={(e) => addPost(e)}>Создать пост</MyButton>
        </form>
    )
}