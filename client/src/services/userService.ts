import apiClient from "./apiClient";
import { signinData, SignInUserResponse, UpdateUserData, UserData } from "./types";

class UserService {
  controller = new AbortController();
  async registerUser(data: UserData) {
    const response = apiClient.post<UserData>("/auth/signup", data, {
      signal: this.controller.signal,
    });
    return { response, onClean: () => this.controller.abort()};
  }

  async signinUser(data: signinData) {
    const response = apiClient.post<SignInUserResponse>("/auth/signin", data, {
      signal: this.controller.signal,
    });
    return { response };
  }

  async getUser(token: string) {
    const response = apiClient.get<UserData>("/users/me", {
      headers: {
        "x-auth-token": token,
      },
      signal: this.controller.signal,
    });
    return { response };
  }

  async signinWithGoogle({
    name,
    email,
    googlePhotoUrl,
  }: {
    name: string;
    email: string;
    googlePhotoUrl: string;
  }) {
    const response = apiClient.post(
      "/auth/google",
      { name, email, googlePhotoUrl },
      {
        headers: {
          "Content-Type": "application/json",
        },
        signal: this.controller.signal,
      }
    );
    return { response };
  }

  async updateUser(id: string, data: UpdateUserData, token: string) {
    const response = apiClient.put(`/users/${id}`, data, { signal: this.controller.signal, headers: {
      "Content-Type": "application/json",
      "x-auth-token": token

    }})
    return { response }
  }

  async deleteUser(id: string, token: string) {
    const response = apiClient.delete(`/users/:${id}`,{ signal: this.controller.signal, headers: {
      "Content-Type": "application/json",
      "x-auth-token": token
    }})
    return { response }
  }
}

export default new UserService();
