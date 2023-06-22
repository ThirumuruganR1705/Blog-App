import {uploadBytesResumable,ref,getDownloadURL} from 'firebase/storage'

const imageuploadhandler =(req,res)=>{
    console.log(req.body);
    // const storageRef = ref(storage, "/files/" + file.name);
    // const uploadTask = uploadBytesResumable(storageRef, file);
    // getDownloadURL(uploadTask.snapshot.ref).then((url) => {
    //   console.log(url);
    //   setPhotos([...photos, url]);
    // });
    return res.status(200).json({message:"got it.."});
}

export default imageuploadhandler;