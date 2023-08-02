import { API_URL } from "../config/constans";

export const get = async ({ typeFile }) => {
  try {
    let solic = await fetch(`${API_URL}uploads/`, {
      method: "GET",
      headers: {
        "X-type-file": typeFile,
      },
    });
    if (!solic.ok) throw await solic.json();

    return await solic.json();
  } catch (error) {
    return { error };
  }
};

export const post = async ({ file, filesToUpload }) => {
  let form = new FormData();
  if (file.length > 1) {
    filesToUpload.map((ele) => form.append("file", ele));
  } else form.append("file", file[0]);

  try {
    let solic = await fetch(`${API_URL}uploads/`, {
      method: "POST",
      body: form,
    });

    if (!solic.ok) throw await solic.json();
    return await solic.json();
  } catch (error) {
    return error;
  }
};

export const delet = async ({ id, typeFile }) => {
  try {
    const res = await fetch(`${API_URL}uploads/${id}`, {
      headers: {
        "X-type-file": typeFile,
      },
      method: "DELETE",
    });
    return await res.json();
  } catch (error) {
    return error;
  }
};
