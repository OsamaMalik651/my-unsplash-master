// @ts-nocheck
import React, { useEffect, useState } from 'react';
import Navbar from 'components/Navbar/index';
import styles from "./App.module.css";
import Modal from './components/Modals/Modal';
import AddModal from './components/Modals/AddModal';
import DeleteModal from './components/Modals/DeleteModal';
import { addImage, getImages, removeImage } from 'services/image';

function App() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [imagesArray, setImagesArray] = useState([]);
  const [filteredImages, setFilteredImages] = useState([])
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [loading, setLoading] = useState(true)

  //get Images from server on render
  useEffect(() => {
    loadImages();
  }, [])

  //After retrieving image from server, save it in filterable array
  useEffect(() => {
    setFilteredImages(imagesArray)
    setLoading(false)

  }, [imagesArray])

  //Filter image based on search term
  useEffect(() => {
    if (searchTerm.length === 0) setFilteredImages(imagesArray)
    if (searchTerm) {
      const searchedImages = imagesArray.filter(image => image.label === searchTerm).map(image => image)
      setFilteredImages(searchedImages)
    }
  }, [searchTerm])

  // Functions
  //Function to retrieve images
  async function loadImages() {
    await getImages().then(res => setImagesArray(res))
  }
  //Add image to db, load updated images
  const AddImage = (image) => {
    addImage(image).then(() => {
      loadImages(image)
    }).then(() => {
      setShowAddModal(false)
    })
  }
  //delete image from db and load updated images
  const deleteImage = () => {
    removeImage(selectedImage).then(() => {
      loadImages()
    }).then(() => {
      setShowDeleteModal(false)
    })
  }

  //show Delete modal
  const showDeletePrompt = (id) => {
    setSelectedImage(id)
    setShowDeleteModal(true)
  }

  return (
    <div className={styles.App}>
      <Navbar addPhoto={() => setShowAddModal(true)} searchTerm={searchTerm} setSearchTerm={(e) => setSearchTerm(e.target.value)} />
      {!loading ? (filteredImages ? <div className={styles.ImagesGrid}>
        {filteredImages.length > 0 ? filteredImages.map((image) =>
          <div className={styles.item}>
            <img src={image.url} alt={image.label} />
            <div className={styles.OnHover}>
              <button className={styles.DeleteButton} onClick={() => showDeletePrompt(image._id)}>delete</button>
              <p>{image.label}</p>
            </div>
          </div>
        ) : <p>image not found</p>}
      </div> : <h1>No images to show...</h1>) : <h1>Loading images...</h1>}
      {showAddModal && <Modal>
        <AddModal close={() => setShowAddModal(false)} AddImage={AddImage} />
      </Modal>}
      {showDeleteModal && <Modal>
        <DeleteModal close={() => setShowDeleteModal(false)} deleteImage={deleteImage} />
      </Modal>}
    </div>
  );
}

export default App;
