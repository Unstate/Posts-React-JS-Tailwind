import { useEffect, useRef, useState } from 'react'
import { useObserver } from '../../hooks/useObserver'
import { MySelect } from '../UI/select/MySelect'
import PostService from './../../API/PostService'
import { useFetching } from './../../hooks/useFetching'
import { usePosts } from './../../hooks/usePosts'
import classes from './../../styles/Posts.module.scss'
import { getPagesArray, getPagesCount } from './../../utilits/pages'
import { PostFilter } from './../PostFilter'
import { PostForm } from './../PostForm'
import { PostList } from './../PostList'
import { Loader } from './../UI/Loader/Loader'
import { MyModal } from './../UI/MyModal/MyModal'
import { MyButton } from './../UI/button/MyButton'
// import { usePagination } from './hooks/usePagination'

export const Posts = () => {

    const [posts, setPosts] = useState([])
    const [filter, setFilter] = useState({ sort: '', query: '' }) // query - запрос
    const [modal, setModal] = useState(false)
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10);
    const [page, setPage] = useState(1)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const lastElement = useRef()
    // let pagesArray = usePagination(totalPages) // Прописать кастомный хук useMemo, который будет получать
    // количество страниц нормально, чтобы все работало
    let pagesArray = getPagesArray(totalPages)
    // console.log(totalPages)


    const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts([...posts, ...response.data])
        const totalCount = response.headers['x-total-count']
        setTotalPages(getPagesCount(totalCount, limit))
    })

    const changePage = (page) => {
        setPage(page)
    }

    useObserver(lastElement, page < totalPages, isPostsLoading, () => { setPage(page + 1) })


    useEffect(() => {
        fetchPosts(page,limit)
    }, [page,limit])

    const createPost = (newPost) => {
        setPosts([...posts, newPost])
        setModal(false)
    }

    const deletePost = (id) => {
        setPosts(posts.filter((post) => post.id !== id))
    }

    return (
        <div className={classes.app}>
            <MyButton style={{ marginTop: 30 }} onClick={() => { setModal(!modal) }}>Создать пост</MyButton>
            <MyModal visible={modal} setVisible={setModal}><PostForm create={createPost}></PostForm></MyModal>
            <hr className='my-[15px]'></hr>
            <PostFilter
                filter={filter}
                setFilter={setFilter}>
            </PostFilter>
            <MySelect
                value={limit}
                onChange={value => setLimit(value)}
                defaultValue={"Кол-во элементов на странице"}
                options={[
                    {value: 5, name: "5"},
                    {value: 10, name: "10"},
                    {value: 15, name: "15"},
                    {value: 20, name: "20"},
                    {value: -1, name: "Показать все"},
                ]}>
            </MySelect>
            {/* <div className={classes.pagesWrapper}>
                {pagesArray.map(p =>
                    <span
                        onClick={() => changePage(p)}
                        key={p}
                        className={page === p
                            ? `${classes.page} ${classes.pageCurrent}`
                            : classes.page}>
                        {p}
                    </span>)}
            </div> */}
            {postError.length ? <h1>{postError}</h1> : <></>}
            <PostList posts={sortedAndSearchedPosts} title="Посты про JS" delete={deletePost}></PostList>
            <div ref={lastElement} className='h-[20px] bg-red-500' />
            {isPostsLoading && <Loader></Loader>}
        </div>
    )
}