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
    const {state} = useContext(UserContext)

    const fakeImage = 'https://images.unsplash.com/photo-1489875347897-49f64b51c1f8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'


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
                        <ImageAvatar src={fakeImage} alt=""/>
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
