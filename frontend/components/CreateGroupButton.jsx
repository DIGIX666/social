import React, { useState, useEffect } from "react"

export const CreateGroupButton = (newGroup) => {
    const [visible, setVisible] = useState(false)
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [loading, setLoading] = useState(false)
    const [urlImage, setUrlImage] = useState("")
    const [selectedImage, setSelectedImage] = useState(null)
    const [localImage, setLocalImage] = useState("")
    const [local, setLocal] = useState(false)
    const [errorMes, setErrorMes] = useState("")

    const openForm = () => {
        setVisible((prev) => !prev)
    };

    const closeForm = () => {
        setVisible((prev) => !prev)
    };

    const handleLocalChange = (location) => {
        if (location) {
            setLocal(true)
        } else {
            setLocal(false)
        }

    }

    const handleGroupPostSubmit = (evt) => {
        evt.preventDefault()
        setLoading(true)
        const data = new FormData(evt.target);
        let values = Object.fromEntries(data.entries())
        if (local) {
            values["group-avatar"] = localImage
        } else {
            values["group-avatar"] = urlImage
        }
        console.log({ values })
        fetch("http://localhost:8080/create-group", {
            method: "POST",
            headers: {
                'Content-Type': "multipart/form-data"
            },
            body: JSON.stringify(values),
        })
            .then(response => response.json())
            .then(response => {
                if (!response.hasOwnProperty("group-id")) {
                    setErrorMes("error creating group chat! Please Try Again")
                } else {
                    console.log(response)
                    newGroup["onSubmit"](response)
                    setName('')
                    setDescription('')
                    setLoading(false);
                    setUrlImage("")
                    setSelectedImage(null)
                    setLocalImage("")
                    setLocal(false)
                    closeForm()
                }
            })
    }
    return (
        <>
            {visible &&
                <div className="create-post-container">
                    <form onSubmit={handleGroupPostSubmit} className="create-group-form">
                        <div className="create-group-posts-close-container">
                            <button className="close-button" type="button" onClick={closeForm}>
                                <span>&times;</span>
                            </button>
                            <h1>Create Group</h1>
                        </div>
                        <input type="text" name="group-name" className="post-text-content" placeholder="Enter Group Name Here" onChange={(e) => setName(e.target.value)} disabled={loading} value={name} required />
                        {errorMes &&
                            <p className="error-message">{errorMes}</p>
                        }
                        <div className="create-chat-submit-container">
                            <input className="create-chat-submit-button" type="submit" value="Send" />
                        </div>
                    </form>
                </div>
            }
            <button type="button" className="create-group-post-button" onClick={openForm} >
                <img src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn4.iconfinder.com%2Fdata%2Ficons%2FmeBaze-Freebies%2F512%2Fadd-group.png&f=1&nofb=1&ipt=99c4a85ebd30424eca8cddc1a9114382fa413c46249e72182f19349440896591&ipo=images" />
            </button>
        </>
    )
}
