import React from 'react'
import styles from "./DeleteModalStyle.module.css"
const DeleteModal = ({ close }) => {
    return (
        <div className={styles.DeleteModal}>
            <h1>Are you sure?</h1>
            <div className={styles.Input}>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="" placeholder='Enter password to delete' />
            </div>
            <div className={styles.Buttons}>
                <button className={styles.Cancel} onClick={close}>Cancel</button>
                <button className={styles.Delete}>Submit</button>
            </div>
        </div>
    )
}

export default DeleteModal
