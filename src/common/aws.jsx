import axios from "axios"


 
 export const uploadImage = async (file) => {
    let imgUrl = null
    try{
        const uploadUrl =await  axios.get(import.meta.env.VITE_SERVER_DOMAIN + "/get-upload-url")
        const {url} = uploadUrl.data
        const uploadToAWS = await axios.put(url, file, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        })
        console.log("uploadToAWS",uploadToAWS)
        imgUrl = url.split("?")[0]

        return imgUrl
    }catch(err){
      console.log("upload error",err)
    }
   


}