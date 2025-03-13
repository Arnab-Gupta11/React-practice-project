export const uploadImagesToCloudinary = async (files: File[]): Promise<string[]> => {
  const cloudName = "your_cloud_name"; // Replace with your Cloudinary cloud name
  const uploadPreset = "your_upload_preset"; // Replace with your Cloudinary upload preset

  const imageUrls: string[] = [];

  for (const file of files) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPreset);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      if (data.secure_url) {
        imageUrls.push(data.secure_url); // Store the uploaded image URL
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  }

  return imageUrls;
};
