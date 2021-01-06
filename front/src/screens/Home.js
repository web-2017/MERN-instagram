import React from "react";

import {HomeContainer, HomeCard, CardImage, CardContent} from "../assets/HomeStyle";

const Home = () => {
    const urlImage = 'https://images.unsplash.com/photo-1598128558393-70ff21433be0?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTN8fHdhbGxwZXJzfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60'
    return (
        <HomeContainer>
            <HomeCard className="card">
                <h5>Ivan</h5>
                <CardImage>
                    <img src={urlImage} alt=""/>
                </CardImage>
                <CardContent>
                    <i className="Small material-icons">favorite</i>
                    <h6>title</h6>
                    <p>this is a post</p>
                    <input type="text" placeholder='add comment'/>
                </CardContent>
            </HomeCard>
            <HomeCard className="card">
                <h5>Ivan</h5>
                <CardImage>
                    <img src={urlImage} alt=""/>
                </CardImage>
                <CardContent>
                    <i className="Small material-icons">favorite</i>
                    <h6>title</h6>
                    <p>this is a post</p>
                    <input type="text" placeholder='add comment'/>
                </CardContent>
            </HomeCard>
            <HomeCard className="card">
                <h5>Ivan</h5>
                <CardImage>
                    <img src={urlImage} alt=""/>
                </CardImage>
                <CardContent>
                    <i className="Small material-icons">favorite</i>
                    <h6>title</h6>
                    <p>this is a post</p>
                    <input type="text" placeholder='add comment'/>
                </CardContent>
            </HomeCard>
        </HomeContainer>
    )
}

export default Home