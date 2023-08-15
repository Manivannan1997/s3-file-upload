import React, { useState } from "react";
import './index.css';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  // const [selectedImage, setImage] = useState(null);
  const API_URL = `${process.env.API_URL}`

  const onChangeImage = (event) => {
    const temp = event.target.files[0];
    console.log(temp, '......');
    setSelectedFile(temp);
  };

  const uploadImg = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      let formData = new FormData();
      formData.append("image", selectedFile);
      // console.log("FormData before sending:");
      // for (let pair of formData.entries()) {
      //   console.log(pair[0], pair[1], "======================");
      // }

      const url = API_URL
      const options = {
        method: "POST",
        body: formData,
        header: {
          'content-Type':'application/json',
          accept:'application/json',
        },
      } 

      const response = await fetch(url, options)
      const data = await response.json()
      console.log(response)
      if (data.status === 200) {
        console.log("File uploaded successfully!");
      } else {
        console.log("File upload failed.");
      }
    }
  };

  return (
    <div className="form-container">
      <form className="form-sub-container" onSubmit={uploadImg}>
        <span className="heading">Upload File</span>
        <input className="input-file" onChange={onChangeImage} type='file' accept='image/*' />
        <button className="btn-submit" type='submit'>Upload</button>
      </form>
      {/* <img src={selectedFile}></img> */}
    </div>
  );
};

export default Upload;
