import z from "zod";

export const BaseUserSchema = z.object({
  name: z.string(),
  lastname: z.string(),
  sex: z.enum(["Мужской", "Женский"]),
  birthday: z.string(),
  country: z.string(),
  city: z.string(),
  phone: z.string(),
  email: z.email(),
  id: z.string(),
});

export const UpsertUserSchema = BaseUserSchema.extend({
  password: z.string(),
});

export const LoginResponseSchema = BaseUserSchema.extend({
  id: z.string(),
  message: z.string(),
});

export const LoginShema = z.object({
  email: z.email().min(1),
  password: z.string(),
});

export const MessageSchema = z.object({
  message: z.string(),
});
