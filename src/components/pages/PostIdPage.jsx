import { useParams } from "react-router-dom"
import PostService from "../../API/PostService"
import { useEffect, useState } from "react"
import { useFetching } from './../../hooks/useFetching'
import { Loader } from './../UI/Loader/Loader'

export const PostIdPage = () => {

    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [fetchPostById, isLoading, error] = useFetching(async () => {
        const response = await PostService.getById(params.id)
        setPost(response.data)
    })

    const [fetchComments, isComLoading, comError] = useFetching(async () => {
        const response = await PostService.getCommentsId(params.id)
        setComments(response.data)
    })

    useEffect(() => {
        fetchPostById()
        fetchComments()
    }, [])


    return (
        <div>
            <h1 className="flex justify-center items-center text-[20px]"> Вы попали на страницу поста c ID = {params.id} </h1>
            {isLoading ? <Loader></Loader> : <div className="flex justify-center items-center text-[20px] font-bold">{post.id}. {post.title}</div>}
            <h1 className="flex justify-center items-center text-[20px]">Комментарии</h1>
            {isComLoading
                ? <Loader></Loader>
                : <div>
                    {comments.map(comment => 
                        <div key={comment.id} className="my-[20px]">
                            <h5>{comment.email}</h5>
                            <div className="text-gray-500">{comment.body}</div>
                        </div>
                    )}
                </div>}
        </div>
    )
}