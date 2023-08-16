import React, { useState } from "react";
import { Oval } from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const Upload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImageUrl, setUploadedImageUrl] = useState('');
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const API_URL = `${process.env.REACT_APP_API_URL}`
  const API_IMG_URL = `${process.env.REACT_APP_API_IMG_URL}`

  const onChangeImage = (event) => {
    const temp = event.target.files[0];
    setSelectedFile(temp);
  };

  const uploadImg = async (event) => {
    event.preventDefault();
    if (selectedFile) {
      setIsLoading(true);
      
      let formData = new FormData();
      formData.append("image", selectedFile);
      // console.log("FormData before sending:");
      // for (let pair of formData.entries()) {
      //   console.log(pair[0], pair[1], "======================");
      // }
      
      const url = `${API_URL}/upload`
      const options = {
        method: "POST",
        body: formData,
        header: {
          'content-Type':'application/json',
          accept:'application/json',
        },
      } 
      try {
        const response = await fetch(url, options)
        const data = await response.json()
        if (response.status === 200) {
          setSelectedFile(null);
          setUploadedImageUrl(`${API_IMG_URL}/${data.image_url}`);
          setModalIsOpen(true);
          toast.success('File uploaded successfully');
        } else {          
          toast.error('File upload failed');
        }
        setIsLoading(false);        
      } catch (error) {
        toast.error('An error occurred'); // Display error toast
      }
    } else {
      toast.error('Please select the file');
    }
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <>
      <ToastContainer position='top-right' />
      <div className="form-container">
        {isLoading ? (
          <Oval
            type="Oval"
            color="#00BFFF"
            height={50}
            width={50}
          />
        ) : (
          <form className="form-sub-container" onSubmit={uploadImg}>
            <span className="heading">Upload File</span>
            <input className="input-file" onChange={onChangeImage} type='file' accept='image/*' />
            <button className="btn-submit" type='submit'>Upload</button>
          </form>
        )}
        {modalIsOpen && (
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Uploaded Image Modal"
          >
            <div>
              <div className="close-btn">
                <button className="modal-close" onClick={closeModal}>
                  Close
                </button>
              </div>
              <div className="uploaded-img">
                <img src={uploadedImageUrl} alt="Uploaded" />
              </div>
            </div>
          </Modal>
        )} 
      </div>
    </>
  );
};

export default Upload;
