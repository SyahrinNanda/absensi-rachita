"use server";

import { z } from "zod";

const uploadSchema = z.object({
  image: z
    .instanceof(File)
    .refine((file) => file.size > 0)
    .refine((file) => file.size === 0 || file.type.startsWith("image/"), {
      message: "Hanya Gambar",
    })
    .refine((file) => file.size < 2000000, {
      message: "Gambar kurang dari 2MB",
    }),
});

export const uploadImage = async (prevState: unknown, formData: FormData) => {
  try {
    console.log("Success");
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};
