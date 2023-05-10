import { useNavigate } from 'react-router-dom'
import classes from './../styles/PostItem.module.scss'
import { MyButton } from './UI/button/MyButton'

export const PostItem = (props) => {

    const router = useNavigate()

    return (
        <div key={props.post.id} className={classes.post}>
            <div className={classes.postContent}>
                <strong>{props.number}. {props.post.title}</strong>
                <div>
                    {props.post.body}
                </div>
            </div>
            <div className={classes.postButtons}>
                <MyButton onClick={() => router(`/posts/${props.post.id}`)}>
                    Открыть
                </MyButton>
                <MyButton onClick={() => props.delete(props.post.id)}>
                    Удалить
                </MyButton>
            </div>
        </div>
    )
}