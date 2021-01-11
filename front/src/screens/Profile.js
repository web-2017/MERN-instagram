import React, {useEffect, useState, useContext} from "react";
import {UserContext} from "../App";

// styles
import {
    ImageAvatar,
    ProfileContainer,
    ProfileHeader,
    ProfileFollowerContainer,
    GalleryContainer,
    GalleryItem
} from "../assets/ProfileStyles";
import {PUBLIC_URL} from "../config/KEYS";
import loglevel from "../middleware/loglevel";

export default () => {
    const [posts, setPosts] = useState([])
    const {state, dispatch} = useContext(UserContext)


    useEffect(() => {
        getMyPost()
    }, [])

    const getMyPost = async () => {
        try {
            const response = await fetch(`${PUBLIC_URL}/mypost`, {
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            })

            const result = await response.json()

            setPosts(result)

            loglevel.debug(result)

        } catch (e) {
            loglevel.error(e)
        }
    }

    return (
        <ProfileContainer>
            <ProfileHeader>
                <div>
                    <div>
                        <ImageAvatar alt=""/>
                    </div>
                </div>

                <div>
                    <h4>{state && state.name}</h4>
                    <ProfileFollowerContainer>
                        <h6>40 posts</h6>
                        <h6>40 followers</h6>
                        <h6>40 following</h6>
                    </ProfileFollowerContainer>
                </div>
            </ProfileHeader>
            <GalleryContainer>
                {posts.map(post => (
                    <GalleryItem key={post._id} src={post.image} alt={post.title}/>
                ))}
            </GalleryContainer>
        </ProfileContainer>
    )
}
