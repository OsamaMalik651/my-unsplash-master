import React, { useState } from 'react'
import styles from "./AddModalStyle.module.css"
const AddModal = ({ close, AddImage }) => {
    const [label, setLabel] = useState('');
    const [imageUrl, setImageUrl] = useState("")

    const handleSubmit = () => {
        if (label.length && imageUrl.length) {
            const image = { label: label, url: imageUrl }
            AddImage(image)
        }
        else {
            alert("Please add label and url to add photo")
        }
    }

    return (
        <div className={styles.AddModalStyle}>
            <h1>Add a new photo</h1>
            <div className={styles.Input}>
                <label htmlFor="label">Label</label>
                <input type="text" name="label" id="" placeholder='Enter photo label'
                    value={label}
                    onChange={(e) => setLabel(e.target.value)}
                />
            </div>
            <div className={styles.Input}>
                <label htmlFor="label">Photo URL</label>
                <input type="text" name="label" id="" placeholder='Enter photo URL'
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)} />
            </div>
            <div className={styles.Buttons}>
                <button className={styles.Cancel} onClick={close}>Cancel</button>
                <button className={styles.Submit} onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}

export default AddModal
