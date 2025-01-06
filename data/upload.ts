import { removeExtension } from "@/utils/string";

export async function uploadImage(image: File): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("name", removeExtension(image.name));

  // Send the request
  const res = await fetch("/api/upload-image", {
    method: "POST",
    body: formData, // Use FormData
  });

  const data = await res.json();

  return data;
}
