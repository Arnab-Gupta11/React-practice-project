import { useEffect, useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import "./ImageUploader.css";

interface FormValues {
  images: File[];
}

const ImageUploaderUsingHookForm = () => {
  const { control, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: { images: [] },
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [error, setError] = useState("");

  // Watch for changes in images
  const images = watch("images");

  // Generate previews and revoke old URLs
  useEffect(() => {
    if (images.length === 0) {
      setImagePreviews([]);
      return;
    }

    const newPreviews = images.map((image) => URL.createObjectURL(image));

    // Cleanup previous previews
    imagePreviews.forEach((url) => URL.revokeObjectURL(url));

    setImagePreviews(newPreviews);

    return () => {
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
    setValue("images", [...images, ...selectedFiles]);
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

  const removeImage = (index: number) => {
    setValue(
      "images",
      images.filter((_, i) => i !== index)
    );
  };

  const onSubmit = (data: FormValues) => {
    if (data.images.length === 0) {
      setError("At least one image is required.");
      return;
    }

    console.log("Uploaded Images:", data.images);
  };

  return (
    <form className="max-w-md mx-auto p-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="drag-area" onDrop={handleImageDrop} onDragOver={(e) => e.preventDefault()} onClick={() => fileInputRef?.current?.click()}>
        <div>
          <p className="drag-area-head1">Drag and Drop image here.</p>
          <p className="drag-area-head2">or Select Image.</p>
          <Controller
            name="images"
            control={control}
            render={() => <input type="file" hidden ref={fileInputRef} multiple accept="image/*" onChange={handleChange} />}
          />
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
              onClick={(e) => {
                e.stopPropagation();
                removeImage(index);
              }}
              className="absolute top-1 right-1 bg-red-500 text-white w-5 h-5 rounded-full text-xs cursor-pointer shrink-0"
            >
              ✕
            </button>
          </div>
        ))}
      </div>

      <button type="submit" className="cursor-pointer w-full mt-4 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition">
        Submit
      </button>
    </form>
  );
};

export default ImageUploaderUsingHookForm;
