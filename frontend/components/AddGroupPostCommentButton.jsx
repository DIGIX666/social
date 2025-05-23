
import React, { useState } from "react"
export const AddGroupComment = (newComment) => {
    const [urlImage, setUrlImage] = useState("")
    const [selectedImage, setSelectedImage] = useState(null)
    const [localImage, setLocalImage] = useState("")
    const [emoji, setEmoji] = useState("")
    const [thread, setThread] = useState("")
    const [threadArr, setThreadArr] = useState([])
    const [visible, setVisible] = useState(false)
    const [local, setLocal] = useState(false)
    const [errorMes, setErrorMes] = useState("")
    const postId = newComment.id

    const openCommentForm = () => {
        setVisible((prev) => !prev)
    };

    const closeCommentForm = () => {
        setVisible((prev) => !prev)
    };

    const handleLocalChange = (location) => {
        if (location) {
            setLocal(true)
        } else {
            setLocal(false)
        }

    }

    const addThread = () => {
        if (thread != "") {
            let hashtag = "#" + thread
            setThreadArr(threadArr => {
                if (threadArr !== null) {
                    return [...threadArr, hashtag]
                } else {
                    return [hashtag]
                }
            })
            setThread("")
        }
    }
    const removeThread = (index) => {
        const newThreads = threadArr.filter((_, i) => i !== index);
        setThreadArr(newThreads);
    }


    const handleCommentSubmit = (evt) => {
        evt.preventDefault()
        const data = new FormData(evt.target);
        let values = Object.fromEntries(data.entries())
        if (local) {
            values["comment-image"] = localImage
        } else {
            values["comment-image"] = urlImage
        }
        if (threadArr.length != 0) {
            values["comment-threads"] = threadArr.join(",")
        }
        values['comment-time'] = new Date().getTime()


        fetch("http://localhost:8080/create-group-post-comment", {
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
                if (response.hasOwnProperty("error")) {
                    setErrorMes(response["error"])
                    setTimeout(() => {
                        setErrorMes("")
                    }, 5000)
                } else {
                    newComment["onSubmit"](response)
                    closeCommentForm()
                }

            })

    }

    const handleKeyPress = (evt) => {
        if (evt.key === "#") {
            evt.preventDefault()
        }
    }

    return (
        <>
            {visible &&
                <div className="create-comment-container">
                    <form className="add-comment-form" onSubmit={handleCommentSubmit}>
                        <button className="close-button-comment" type="button" onClick={closeCommentForm}>
                            <span>&times;</span>
                        </button>
                        <h1> Group Comment </h1>
                        <input type="hidden" name="post-id" value={postId} />
                
                        <textarea name="comment-text" contentEditable={true} className="post-text-content" onChange={(e) => setEmoji(e.target.value)} />
                

                        <div className="image-location">

                            <div>
                                <input type="radio" id="local" name="img-location" value="local" onChange={() => handleLocalChange(true)} />
                                <label htmlFor="local">Add Local Image</label>
                            </div>
                        </div>
                        {local ? (
                            <>
                                {selectedImage &&
                                    <div className="create-post-image-container">
                                        <img src={URL.createObjectURL(selectedImage)} alt="" onClick={() => {
                                            document.querySelector(".create-post-image").value = ""
                                            setLocalImage("")
                                            setSelectedImage(null)
                                        }} />
                                    </div>}
                                <div className="add-post-image">
                                    <input type="file" className="create-post-image" onChange={(e) => {
                                        if (e.target.files[0].size < 20000000) {
                                            setSelectedImage(e.target.files[0])
                                            const fileReader = new FileReader();
                                            fileReader.onload = function (e) {
                                                setLocalImage(e.target.result);
                                            };
                                            fileReader.readAsDataURL(e.target.files[0]);
                                        }
                                        ;
                                    }} />
                                </div>
                            </>
                        ) : (
                            <>
                                {urlImage &&
                                    <div className="create-post-image-container">
                                        <img src={urlImage} alt="" onClick={() => {
                                            document.querySelector(".create-post-image").value = ""
                                            setUrlImage("")
                                        }} />
                                    </div>}
                            </>
                        )}
                        <p>File Must Not Exceed 20MB</p>


                        {errorMes &&
                            <p className="error-message">{errorMes}</p>
                        }
                        <input type="submit" className="create-post-submit-button" value="Send" />
                    </form>
                </div>
            }
            <button type="button" className="add-comment-button" onClick={openCommentForm}> Add Comment</button>
        </>
    )
}