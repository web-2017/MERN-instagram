import React, {useState} from "react";
import {useHistory} from "react-router-dom";
import {PostCreateContainer} from "../assets/PostStyle";
import loglevel from "../middleware/loglevel";
import {validateEmail} from "../helpers/validateEmail";
import Toast from "../components/Toast";
import {PUBLIC_URL} from "../config/KEYS";

export default function () {
    const history = useHistory()
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [file, setFile] = useState('')
    const [url, setUrl] = useState('')

    const postDetails = async () => {


        try {
            const data = new FormData()
            data.append('file', file)
            data.append('upload_preset', 'instagram-clone')
            data.append('cloud_name', 'mario0284')

            const response = await fetch('https://api.cloudinary.com/v1_1/mario0284/image/upload', {
                method: 'post',
                body: data
            })

            const result = await response.json()
            setUrl(result.url)
            loglevel.debug(result)

            if(result) {
                await sendPostData()
            }
        } catch (e) {
            loglevel.error(e)
        }
    }

    const sendPostData = async () => {

        const data = {title, body, image: url}

        try {
            const response = await fetch(`${PUBLIC_URL}/createpost`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            })

            const result = await response.json()

            if (result.error) {
                Toast(result.error, true)
                loglevel.error(result)
            } else {
                Toast(`Создали пост!`)
                history.push('/')
            }

        } catch (e) {
            loglevel.error(e)
        }
    }


    return (
        <PostCreateContainer className='card'>
            <input type="text" placeholder='title' onChange={event => setTitle(event.target.value)}/>
            <input type="text" placeholder='text' onChange={event => setBody(event.target.value)}/>
            <div className="file-field input-field">
                <div className="btn">
                    <span>Upload Image</span>
                    <input type="file"/>
                </div>
                <div className="file-path-wrapper">
                    <input type="file" onChange={(e)=>setFile(e.target.files[0])} />
                </div>
            </div>
            <button className="btn waves-effect waves-light blue darken-2" type="submit"
                    onClick={()=> postDetails()}
            >
                Submit post
            </button>
        </PostCreateContainer>
    )
}