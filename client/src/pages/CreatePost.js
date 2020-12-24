import React from 'react'


export const CreatePost = () => {
    return(
        <code>
            <h1>
                create post
            </h1>
            <p>
                <input type="text" id="name" name="name"></input>
                <br />
                <textarea name="text" id="text"></textarea><br />
                <button>Создать</button>
            </p>
        </code>
    )   
}