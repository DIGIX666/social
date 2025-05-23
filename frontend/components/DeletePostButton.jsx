import React, { useState } from "react"
export const DeleteButton = (deletedPost) => {
    const [visible, setVisible] = useState(false)
    const [errorMes, setErrorMes] = useState("")
    const postId = deletedPost.id

    const openDeletePostForm = () => {
        setVisible((prev) => !prev)
    };

    const closeDeletePostForm = () => {
        setVisible((prev) => !prev)
    };

    const handleDeletePostSubmit = (evt) => {
        evt.preventDefault()
        const values = { "post-id": postId, "type": "delete" }
        console.log(values)
        fetch("http://localhost:8080/post-interactions", {
            method: "POST",
            headers: {
                'Content-Type': "multipart/form-data"
            },
            body: JSON.stringify(values),
        })
            .then(response => response.json())
            // return array of posts and send to the top.
            .then(response => {
                console.log(response)
                if (response["error"] != "") {
                    setErrorMes(response["error"])
                    setTimeout(() => {
                        setErrorMes("")
                    }, 5000)
                } else {
                    deletedPost["func"](postId)
                    closeDeletePostForm()
                }
            })
    }

    return (
        <>
            {visible &&
                <div className="delete-post-container">
                    <div className="delete-post-form">
                        <h1>Are You Sure You Want to Delete Your Post</h1>
                        <div className="delete-confirmation-container">
                            <button type="button" className="delete-post-confirmed" onClick={handleDeletePostSubmit}>Yes</button>
                            <button type="button" className="delete-post-unconfirmed" onClick={closeDeletePostForm}>No</button>
                        </div>
                        {errorMes &&
                            <p className="error-message">{errorMes}</p>
                        }
                    </div>
                </div>
            }
            {/* <button type="button" onClick={openDeletePostForm}>
                <i class="fa fa-trash-o" aria-hidden="true"></i>
            </button> */}
        </>
    )
}