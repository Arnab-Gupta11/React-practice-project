import { useEffect, useRef, useState } from "react";
import "./ImageUploader.css";
const ImageUploader = () => {
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]); // Store object URLs
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState("");

  // Generate object URLs and revoke old ones
  useEffect(() => {
    const newPreviews = images.map((image) => URL.createObjectURL(image));

    // Revoke old URLs before updating state
    imagePreviews.forEach((url) => URL.revokeObjectURL(url));

    setImagePreviews(newPreviews);

    return () => {
      // Cleanup function to revoke URLs when component unmounts
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const handleImageFile = (files: FileList) => {
    const selectedFiles = Array.from(files).filter((file) => file.type.startsWith("image/"));
    if (selectedFiles.length === 0) {
      setError("Only image files are allowed.");
      return;
    }

    setError("");
    setImages((prev) => [...prev, ...selectedFiles]);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleImageFile(e.target.files);
    }
  };

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    handleImageFile(e.dataTransfer.files);
  };

  const removeImage = (id: number) => {
    setImages((prev) => prev.filter((_, idx) => id !== idx));
  };

  const handleSubmit = () => {
    if (images.length === 0) {
      setError("At least one image is required.");
      return;
    }

    console.log("Uploaded Images:", images);
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <div className="drag-area" onDrop={handleImageDrop} onDragOver={(e) => e.preventDefault()} onClick={() => fileInputRef?.current?.click()}>
        <div>
          <p className="drag-area-head1">Drag and Drop image here.</p>
          <p className="drag-area-head2">or Select Image.</p>
          <input type="file" hidden ref={fileInputRef} multiple accept="image/*" onChange={handleChange} />
        </div>
      </div>
      {/* Error Message */}
      {error && <p className="text-red-500 mt-2">{error}</p>}

      {/* Image Previews */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        {imagePreviews.map((preview, index) => (
          <div key={index} className="relative">
            <img src={preview} alt="preview" className="w-full h-24 object-contain rounded-lg shadow-md p-1" />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs cursor-pointer shrink-0"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button className="cursor-pointer w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};

export default ImageUploader;
