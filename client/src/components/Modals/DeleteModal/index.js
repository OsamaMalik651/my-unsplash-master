import React, { useState } from 'react'
import styles from "./DeleteModalStyle.module.css"
const DeleteModal = ({ close, deleteImage }) => {
    const [password, setPassword] = useState("")
    const handleDelete = () => {
        if (password === "Test124") {
            deleteImage()
        }
        else (
            alert("Please enter password to delete")
        )
    }

    return (
        <div className={styles.DeleteModal}>
            <h1>Are you sure?</h1>
            <div className={styles.Input}>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="" placeholder='Enter password to delete'
                    value={password} onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className={styles.Buttons}>
                <button className={styles.Cancel} onClick={close}>Cancel</button>
                <button className={styles.Delete} onClick={handleDelete}>Submit</button>
            </div>
        </div>
    )
}

export default DeleteModal
