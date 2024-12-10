import apiClient from "./apiClient";
import { Blog, BlogPost } from "./types";

class PostService {
  controller = new AbortController();
  async getAllPosts() {
    const response = apiClient.get<Blog[]>("/posts", {
      signal: this.controller.signal,
    });
    return { response, onClean: () => this.controller.abort() };
  }

  async getPost(id: string) {
    const response = apiClient.get<Blog>(`/posts/${id}`, {
      signal: this.controller.signal,
    });
    return { response, onClean: () => this.controller.abort() };
  }

  async getMyPosts(token: string) {
    const response = apiClient.get<Blog[]>("/posts/my-posts", {
      signal: this.controller.signal,
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json",
      },
    });
    return { response, onClean: () => this.controller.abort() };
  }

  async createPost(data: BlogPost, token: string) {
    const dataJson = JSON.stringify(data);
    const response = apiClient.post<Blog>("/posts", dataJson, {
      signal: this.controller.signal,
      headers: {
        "x-auth-token": token,
        "Content-Type": "application/json",
      },
    });

    return { response, onClean: () => this.controller.abort() };
  }

  async updatePost(id: string, data: Blog, token: string) {
    const response = apiClient.put(`/posts/${id}`, data, {
      signal: this.controller.signal,
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });
    return { response };
  }

  async deletePost(id: string, token: string) {
    const response = apiClient.delete(`/posts/${id}`, {
      signal: this.controller.signal,
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": token,
      },
    });
    return { response, onClean: () => this.controller.abort() };
  }
}

export default new PostService();
