import React, {useEffect, useState} from 'react';
import {postAPI} from "../services/PostService";
import PostItem from "./PostItem";
import {IPost} from "../models/IPost";

const PostContainer = () => {

    const [limit, setLimit] = useState(100);

    const {data: posts, error, isLoading, refetch} = postAPI.useFetchAllPostsQuery(limit, {
        pollingInterval: 1000
    })
    const [createPost, {error: createError, isLoading: createIsLoading}] = postAPI.useCreatePostMutation()
    const [deletePost, {}] = postAPI.useDeletePostMutation()
    const [updatePost, {}] = postAPI.useUpdatePostMutation()

    // useEffect(() => {
    //     setTimeout(() => {
    //         setLimit(3)
    //     }, 2000)
    // })

    const handleCreate = async () => {
        const title = prompt()
        await createPost({title, body: title} as IPost)
    }

    const handleRemove = (post: IPost) => {
        deletePost(post)
    }
    const handleUpdate = (post: IPost) => {
        updatePost(post)
    }

    return (
        <div>
            <div className="post__list">

                <button onClick={handleCreate} >CREATE NEW POST</button>
                {/*<button onClick={() => refetch()} >REFETCH</button>*/}
                {error && <h1>Произошла ошибка</h1>}
                {isLoading && <h1>Идет загрузка...</h1>}

                {posts && posts.map( post =>
                    <PostItem remove={handleRemove} update={handleUpdate}  key={post.id} post={post} />
                 ) }

            </div>
        </div>
    );
};

export default PostContainer;