import { z } from "zod";

export interface Blog {
  image: string;
  userPhoto: string;
  userName: string;
  date: string;
  title: string;
  content: string;
  id: string;
}

export interface User {
  userName: string;
  email: string;
  password: string;
  profilePicture?: string;
  posts?: Blog[];
  isAdmin: false;
}

export const UserSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be atleast 3 characters long" }),
  email: z
    .string()
    .email({ message: "Invalid email" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" }),
  profilePicture: z.string().optional(),
});

export type UserData = z.infer<typeof UserSchema>;

export const UpdateUserSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be atleast 3 characters long" })
    .optional(),
  email: z
    .string()
    .email({ message: "Invalid email" })
    .min(1, { message: "Email is required" })
    .optional(),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters" })
    .optional(),
  profilePicture: z.string().optional(),
});

export type UpdateUserData = z.infer<typeof UpdateUserSchema>;

export const signinSchema = z.object({
  email: z
    .string()
    .email({ message: "Invalid email" })
    .min(1, { message: "Email is required" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

export type signinData = z.infer<typeof signinSchema>;

export const blogSchema = z.object({
  title: z.string().min(3, { message: "Title must not be empty" }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters long" }),
  image: z.string().optional(),
});

export type BlogData = z.infer<typeof blogSchema>;

export interface BlogPost {
  image: string;
  title: string;
  content: string;
}

export interface CurrentUser {
  _id: string;
  username: string;
  email: string;
  profilePicture: string;
  posts: Blog[];
}


export interface UserState {
  currentUser: CurrentUser | null;
  signedIn: boolean;
  error: string | null;
  loading: boolean;
  token: string | null;
}

export interface SignInUserResponse{
  token: string;
  user: UserData
}
