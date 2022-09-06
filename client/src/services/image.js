import axios from "axios"

export const getImages = async () => {
    try {
        const response = await axios.get("/api/get-images");
        return response.data
    } catch (err) {
        console.log(err)
    }
}

export const addImage = async (image) => {
    try {
        const response = await axios.post("/api/add-image", { image })
        console.log(response)
    } catch (err) {
        console.log(err)
    }
}
export const removeImage = async (id) => {
    try {
        const response = await axios.post("/api/delete-image", { id })
        console.log(response)
    } catch (err) {
        console.log(err)
    }
}