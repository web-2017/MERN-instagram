import React from "react";

// styles
import {ImageAvatar, ProfileContainer, ProfileHeader, ProfileFollowerContainer, GalleryContainer, GalleryItem} from "../assets/ProfileStyles";

export default () => {
    const imgUrl = 'https://images.unsplash.com/photo-1569466896818-335b1bedfcce?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTB8fHBlcnNvbnxlbnwwfDJ8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    return (
        <ProfileContainer>
            <ProfileHeader>
                <div>
                    <div>
                        <ImageAvatar src={imgUrl} alt=""/>
                    </div>
                </div>

                <div>
                    <h4>Mario Magomedov</h4>
                    <ProfileFollowerContainer>
                        <h6>40 posts</h6>
                        <h6>40 followers</h6>
                        <h6>40 following</h6>
                    </ProfileFollowerContainer>
                </div>
            </ProfileHeader>
            <GalleryContainer>
                <GalleryItem src={imgUrl}/>
                <GalleryItem src={imgUrl}/>
                <GalleryItem src={imgUrl}/>
                <GalleryItem src={imgUrl}/>
                <GalleryItem src={imgUrl}/>
                <GalleryItem src={imgUrl}/>
            </GalleryContainer>
        </ProfileContainer>
    )
}
