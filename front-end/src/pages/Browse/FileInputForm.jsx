import React from "react";

const FileInputForm = () => {
  const handleFileUpload = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("fileInput", event.target.files[0]);

    fetch("http://localhost:4002/uploads", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        // Handle the response data as needed
        console.log(data);
      })
      .catch((error) => {
        // Handle any error that occurs during the upload
        console.error(error);
      });
  };

  return (
    <div className="mb">
      <h1>File Input Form</h1>
      <form onSubmit={handleFileUpload} encType="multipart/form-data">
        <label htmlFor="fileInput">Select a File:</label>
        <input
          type="file"
          id="fileInput"
          name="fileInput"
          accept=".pdf, .doc, .docx"
          onChange={handleFileUpload}
        />
        <br />
        <input type="submit" value="Upload" />
      </form>
    </div>
  );
};

export default FileInputForm;
