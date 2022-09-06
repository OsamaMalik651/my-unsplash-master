import React, { useEffect, useState } from 'react';
import Navbar from 'components/Navbar/index';
import styles from "./App.module.css";
import Modal from './components/Modals/Modal';
import AddModal from './components/Modals/AddModal';
import DeleteModal from './components/Modals/DeleteModal';

export const images = [
  { label: "person", url: "https://images.unsplash.com/photo-1659535998184-15d6c9f5f873?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80" },
  { label: "car", url: "https://images.unsplash.com/photo-1662392127523-b1bc16bb8bd6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=991&q=80" },
  { label: "birthday", url: "https://images.unsplash.com/photo-1657664072464-e525da1d426e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1374&q=80" },
  { label: "nature", url: "https://images.unsplash.com/photo-1662384874601-1f6b8b2fab9d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=500&q=60" },
  { label: "buildings", url: "https://images.unsplash.com/photo-1662377088274-0c914d5fc14f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" },
  { label: "street", url: "https://images.unsplash.com/photo-1662394757745-e5a6af92a06a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxOXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" },
  { label: "city", url: "https://images.unsplash.com/photo-1662377088264-44d48f34bd83?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0NXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" },
  { label: "car", url: "https://images.unsplash.com/photo-1662316208133-55e8e16f89fb?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1MHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" },
  { label: "sports", url: "https://images.unsplash.com/photo-1662323638318-cd7268293669?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1OXx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60" },

];

function App() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imagesArray, setImagesArray] = useState(images);
  const [filteredImages, setFilteredImages] = useState(images)
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    //Backend call to get images to be added here
    let timer1 = setTimeout(() => setLoading(false), 1 * 1000);
    return () => {
      clearTimeout(timer1);
    };
  }, [])
  useEffect(() => {
    if (searchTerm.length === 0) setFilteredImages(images)
    if (searchTerm) {
      const searchedImages = imagesArray.filter(image => image.label === searchTerm).map(image => image)
      setFilteredImages(searchedImages)
    }
  }, [searchTerm])

  const AddImage = (image) => {
    console.log("Add image function called with", image)
  }
  return (
    <div className={styles.App}>
      <Navbar addPhoto={() => setShowAddModal(true)} searhTerm={searchTerm} setSearchTerm={(e) => setSearchTerm(e.target.value)} />
      {!loading ? <div className={styles.ImagesGrid}>
        {filteredImages.length > 0 ? filteredImages.map((image) =>
          <div className={styles.item}>
            <img src={image.url} alt={image.label} />
            <div className={styles.OnHover}>
              <button className={styles.DeleteButton} onClick={() => setShowDeleteModal(true)}>delete</button>
              <p>{image.label}</p>
            </div>
          </div>
        ) : <p>image not found</p>}
      </div> : <h1>Loading images...</h1>}
      {showAddModal && <Modal>
        <AddModal close={() => setShowAddModal(false)} AddImage={AddImage} />
      </Modal>}
      {showDeleteModal && <Modal>
        <DeleteModal close={() => setShowDeleteModal(false)} />
      </Modal>}
    </div>
  );
}

export default App;
