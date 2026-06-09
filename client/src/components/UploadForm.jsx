import { useState } from "react";
import api from "../services/api";

function UploadForm({ onUploadSuccess }) {
  const [files, setFiles] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleDrop = (e) => {
    e.preventDefault();

    const droppedFiles = [...e.dataTransfer.files];

    setFiles(droppedFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (files.length === 0) {
      setMessage("Please select at least one file");
      return;
    }

    const formData = new FormData();

    files.forEach((file) => {
      formData.append("images", file);
    });

    try {
      setLoading(true);

      const response = await api.post(
        "/upload-multiple",
        formData
      );

      const duplicates =
        response.data.results.filter(
          (item) => !item.success
        );

      const uploaded =
        response.data.results.filter(
          (item) => item.success
        );

      let msg = "";

      if (uploaded.length > 0) {
        msg += `✅ ${uploaded.length} file(s) uploaded successfully. `;
      }

      if (duplicates.length > 0) {
        msg += `⚠️ ${duplicates.length} Duplicate image(s) detected. Upload skipped.`;
      }

      setMessage(msg);

      onUploadSuccess();

      setFiles([]);

    } catch (error) {
      console.error(error);

      setMessage(
        "❌ Upload failed. Please try again."
      );

    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        style={{
          border: "2px dashed gray",
          padding: "40px",
          textAlign: "center",
          marginBottom: "20px",
          borderRadius: "12px",
          background: "white"
        }}
      >
        <p>📁 Drag & Drop Images Here</p>
        <p>or click to browse</p>

        <input
          type="file"
          multiple
          onChange={(e) =>
            setFiles([...e.target.files])
          }
        />
      </div>

      {files.map((file) => (
        <div key={file.name}>
          {file.name}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading
          ? "Uploading..."
          : "Upload Images"}
      </button>

      {message && (
        <p
          style={{
            marginTop: "15px",
            fontWeight: "bold"
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}

export default UploadForm;