import React from 'react'
import styles from "./NavbarStyles.module.css";
import { ReactComponent as Logo } from "../../assets/my_unsplash_logo.svg"
const Navbar = ({ addPhoto, setSearchTerm, searchTerm }) => {
    return (
        <div className={styles.Navbar}>
            <div className={styles.NavbarLeft}>
                {/* Logo */}
                <Logo className={styles.Logo} />
                {/*Search bar */}
                <div className={styles.SearchBar}>
                    <span className="material-symbols-outlined Icon">
                        search
                    </span>
                    <input
                        type="text" name="search"
                        id="search" placeholder='Search by Name'
                        className={styles.Input}
                        value={searchTerm}
                        onChange={setSearchTerm}
                    />
                </div>
            </div>
            <div className={styles.NavbarRight}>
                <button
                    className={styles.Button}
                    onClick={addPhoto}
                >Add a photo</button>
            </div>



        </div>
    )
}

export default Navbar;
