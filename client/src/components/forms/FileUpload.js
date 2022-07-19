// image upload using cloudinary

// sigup in cloudinary an dget api key
// create server endpoints to upload and remove files from cloudinary
// resizr file in frontend and send it to server
// server will upload it to cloudinary and receive url
// those url's send back to frontend
// at this point our frontend will have images with url's
// now save product image in database with image url's

// Resizer.imageFileResizer(
//     file, // Is the file of the image which will resized.
//     maxWidth, // Is the maxWidth of the resized new image.
//     maxHeight, // Is the maxHeight of the resized new image.
//     compressFormat, // Is the compressFormat of the resized new image.
//     quality, // Is the quality of the resized new image.
//     rotation, // Is the degree of clockwise rotation to apply to uploaded image.
//     responseUriFunc, // Is the callBack function of the resized new image URI.
//     outputType, // Is the output type of the resized new image.
//     minWidth, // Is the minWidth of the resized new image.
//     minHeight // Is the minHeight of the resized new image.
//   );

import React from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Resizer from "react-image-file-resizer";

import { Avatar, Badge } from "antd";


const FileUpload = ({ values, setValues, setLoading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  const fileUploadAndResize = (e) => {
    // console.log(e.target.files);
    //resize
    let files = e.target.files;
    let allUploadedFiles = values.images;

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            //   console.log(uri);
            axios
              .post(
                "http://localhost:8000/api/uploadimages",
                { image: uri },
                {
                  headers: {
                    authtoken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                console.log("image upload data", res);
                setLoading(false);
                allUploadedFiles.push(res.data);

                setValues({ ...values, images: allUploadedFiles });
              })
              .catch((err) => {
                setLoading(false);
                console.log("cloudinary upload error", err);
              });
          },
          "base64"
        );
      }
    }

    //send back to server to upload to cloudinary
    //set url to images[] in productcreate com.
  };

  const handleImageRemove = (public_id) => {
    setLoading(true);
    axios
      .post("http://localhost:8000/api/removeimages", public_id, {
        headers: {
          authtoken: user ? user.token : "",
        },
      })
      .then((res) => {
        setLoading(false);
        let filteredImages = values.images.filter((item) => {
          return item.public_id !== public_id;
        });
        setValues({ ...values, images: filteredImages });
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  return (
    <div>
      {values.images &&
        values.images.map((image) => (
          <Badge
            count="x"
            key={image.public_id}
            onClick={() => handleImageRemove(image.public_id)}
            style={{ cursor: "pointer" }}
          >
            <Avatar
              src={image.url}
              size={100}
              shape="square"
              className="ml-3"
            />
          </Badge>
        ))}
      <div>
        <label className="btn  btn-info ">
          Upload Images
          <input
            type="file"
            multiple
            accept="images/*"
            hidden
            onChange={fileUploadAndResize}
          />
        </label>
      </div>
    </div>
  );
};

export default FileUpload;
