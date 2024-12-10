import NavBar from "./components/NavBar";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home/HomePage";
import CreatePost from "./pages/Blogs/CreatePost";
import ProfilePage from "./pages/profile/ProfilePage";
import MyPosts from "./pages/Blogs/MyPostsPage";
import BlogList from "./pages/Blogs/PostListPage";
import Footer from "./components/Footer";
import SignUpPage from "./pages/auth/SignUpPage";
import SigninPage from "./pages/auth/SigninPage";
import BlogDetailPage from "./pages/Blogs/PostDetailPage";
import PrivateRoute from "./components/PrivateRoute";
import NotFoundPage from "./pages/Failures/NotFoundPage";

function App() {

  return (
    <div className="flex flex-col">
      <NavBar />
      <div className="py-24 flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogList />} />
          <Route element={<PrivateRoute />}>
          <Route path="/my-blogs" element={<MyPosts />} />
          <Route path="/create-blog" element={<CreatePost />} />
          </Route>
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/auth/signup" element={<SignUpPage />} />
          <Route path="/auth/signin" element={<SigninPage />} />
          <Route path="/blogs/:id" element={<BlogDetailPage />} />

           {/* Handle all other undefined routes */}
           <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </div>
      <Footer/>
    </div>
  );
}

export default App;
