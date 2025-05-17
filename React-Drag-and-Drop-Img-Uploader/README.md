# **Which is Better for Image Previewing?**

Both `URL.createObjectURL()` and `FileReader.readAsDataURL()` can be used for image previewing, but they serve different purposes:

| **Method**                   | **Pros**                                                                             | **Cons**                                                        | **Best Use Case**                             |
| ---------------------------- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------- | --------------------------------------------- |
| `URL.createObjectURL()`      | ✅ Faster (no encoding) <br> ✅ Uses less memory <br> ✅ Works well for large files  | ❌ Temporary URL (must be revoked with `URL.revokeObjectURL()`) | Quick previews before uploading               |
| `FileReader.readAsDataURL()` | ✅ Converts to Base64 (useful for storing in DB) <br> ✅ Works offline after reading | ❌ Slower (converts to Base64) <br> ❌ Uses more memory         | When storing image data (e.g., in a database) |

---

## **🔹 How `URL.createObjectURL()` Works**

The `URL.createObjectURL()` method creates a temporary URL representing a `File` or `Blob` object.

### **Syntax**

```ts
const objectURL = URL.createObjectURL(blobOrFile);
```

### `URL.createObjectURL()`

**Parameters**: A File or Blob object.
**Returns**: A temporary URL (e.g., `blob:http://example.com/...`).

#### How It Works

1. When an image is uploaded, it exists as a File object in memory.
2. `URL.createObjectURL(image)` converts this File into a temporary URL.
3. The temporary URL can be used directly in an `<img>` tag:

```typescript
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    setPreview(imageUrl);
  }
};
```

👉 The URL should be revoked when no longer needed to free memory:

```typescript
URL.revokeObjectURL(imageUrl);
```

## `FileReader.readAsDataURL()`

The `FileReader.readAsDataURL()` method reads a file and converts it into a Base64-encoded string.

### Syntax

```typescript
const reader = new FileReader();
reader.onload = (e) => {
  console.log("File Content:", e.target?.result); // Base64 data URL
};
reader.readAsDataURL(selectedFile);
```

### How It Works

1. `FileReader` reads the entire file into memory.
2. Converts the file into a Base64-encoded string.
3. Can be used to display the image:

```typescript
const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (event) => {
      setPreview(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  }
};
```

👉 No need to revoke, but uses more memory.

---

# **🌟 Cloudinary Image Upload Steps**

## 🔹 Steps to Follow

[Cloudinary - Client-side Uploading](https://cloudinary.com/documentation/client_side_uploading#direct_call_to_the_api)

### 1. Create a Cloudinary Account and Get Your API Credentials:

- **Cloud Name**
- **API Key**
- **API Secret**

### 2. Cloudinary Setup (Important)

1. Go to **Cloudinary Dashboard** → **"Upload Presets"** → Create a new upload preset.
2. Enable **unsigned uploading** and set upload options (like folder, file type).

### 3. Set Up a Cloudinary Upload Utility Function:

This function will:

- Upload multiple images.
- Return an array of image URLs.

---

### 1️⃣ Utility File: `cloudinaryUploader.ts`

```typescript
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
```

## 🔹 What This Does:

- Loops through each selected image.
- Uploads it to Cloudinary using `fetch()`.
- Stores the `secure_url` of each uploaded image in an array.
- Returns the array of image URLs.

---
