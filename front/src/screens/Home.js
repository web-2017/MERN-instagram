import React, {useState, useEffect} from "react";

import loglevel from '../middleware/loglevel'
import {HomeContainer, HomeCard, CardImage, CardContent} from "../assets/HomeStyle";
import {PUBLIC_URL} from "../config/KEYS";

const Home = () => {
    const [data, setData] = useState([])

    useEffect(() => {
        postData()
    }, [])

    const postData = async () => {

        try {
            const response = await fetch(`${PUBLIC_URL}/allposts`, {
                method: 'get',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                },
            })

            const result = await response.json()

            setData(result)

            loglevel.debug(result)

        } catch (e) {
            loglevel.error(e)
        }
    }

    return (
        <HomeContainer>
            {
                data.map(post => {
                    return (
                        <HomeCard key={post._id} className="card">
                            <h5>{post.postedBy.name}</h5>
                            <CardImage>
                                <img style={{width: '100%'}} src={post.image} alt=""/>
                            </CardImage>
                            <CardContent>
                                <i className="Small material-icons">favorite</i>
                                <h6>{post.title}</h6>
                                <p>{post.body}</p>
                                <input type="text" placeholder='add comment'/>
                            </CardContent>
                        </HomeCard>
                    )
                })
            }

        </HomeContainer>
    )
}

export default Home