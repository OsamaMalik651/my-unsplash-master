// @ts-nocheck
import React, { useEffect } from 'react'
import ReactDOM from 'react-dom';
import styles from "./ModalStyle.module.css"

const Modal = ({ children }) => {
    useEffect(() => {
        document.body.style.overflowY = 'hidden';
        return () => document.body.style.overflow = 'unset';
    }, [])

    return ReactDOM.createPortal(
        <div className={styles.Modal}>
            {children}
        </div>, document.getElementById("modalRoot")
    )
}

export default Modal
