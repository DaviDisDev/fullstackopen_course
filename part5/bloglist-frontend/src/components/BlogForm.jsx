import { useState } from 'react'

const BlogForm = (
    { title,
        author,
        url,
        handleTitleChange,
        handleAuthorChange,
        handleUrlChange,
        handleClick }
) => {


    return (
        <>
            <label>title</label>
            <input type="text" value={title}
                onChange={handleTitleChange} />
            <br />
            <label>author</label>
            <input type="text"
                value={author}
                onChange={handleAuthorChange} />
            <br />
            <label>url</label>
            <input type="text"
                value={url}
                onChange={handleUrlChange} />
            <br />
            <button onClick={handleClick}>create</button>
        </>
    )
}

export default BlogForm