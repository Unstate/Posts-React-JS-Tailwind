import { useMemo } from "react"

export const useSortedPosts = (posts, sort) => {
    const sortedPosts = useMemo(() => { // принимает посты и выбранный метод сортировки, затем исходя от метода 
        if (sort) {                     // сортировки, сортирует и возращает отсортированный массив sortedPosts
            return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
        }
        return posts
    }, [sort, posts])

    return sortedPosts;
}

export const usePosts = (posts, sort,query) => { // получает на вход обычные посты, но сразу сортирует их по
    const sortedPosts = useSortedPosts(posts, sort) // выбранному методу сортировки, затем фильтрует их, в зависимости
                                                    // от поиска
    const sortedAndSearchedPosts = useMemo(() => {
        return sortedPosts.filter(post => post.title.toLowerCase().includes(query.toLowerCase()))
    }, [query, sortedPosts])

    return sortedAndSearchedPosts;
}