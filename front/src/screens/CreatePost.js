import React from "react";
import {PostCreateContainer} from "../assets/PostStyle";

export default function () {
    return (
        <PostCreateContainer className='card'>
            <input type="text" placeholder='title' />
            <input type="text" placeholder='text' />
            <div className="file-field input-field">
                <div className="btn">
                    <span>Upload Image</span>
                    <input type="file" />
                </div>
                <div className="file-path-wrapper">
                    <input className="file-path validate" type="text" />
                </div>
            </div>
            <button className="btn waves-effect waves-light blue darken-2" type="submit">
                Submit post
            </button>
        </PostCreateContainer>
    )
}