import { Link } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.css";

const Footer = () => {
  return (
    <footer className="-mb-7 bg-gray-800 text-white py-4">
      <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-2 gap-x-10">
        {/* Contact Information */}
        <div>
          <h2 className="text-lg font-semibold mb-4 place-self-center">Contact Us</h2>
          <div className="flex gap-8 place-self-center">
            <div>
              <p>1234 Blogging Lane</p>
              <p>City, State, ZIP</p>
            </div>
            <div>
              <p>Email: contact@blogsite.com</p>
              <p>Phone: +1 (555) 123-4567</p>
            </div>
          </div>
          <div className="flex space-x-6 mt-4 place-self-center gap-7">
            <Link to="#" aria-label="Facebook" className="hover:text-amber-400">
              <i className="fab fa-facebook"></i>
            </Link>
            <Link to="#" aria-label="Twitter" className="hover:text-amber-400">
              <i className="fab fa-twitter"></i>
            </Link>
            <Link to="#" aria-label="Instagram" className="hover:text-amber-400">
              <i className="fab fa-instagram"></i>
            </Link>
            <Link to="#" aria-label="LinkedIn" className="hover:text-amber-400">
              <i className="fab fa-linkedin"></i>
            </Link>
          </div>
        </div>

        <div className="place-self-center 2-cols:mt-0 mt-10">
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <ul>
            <li className="hover:text-amber-400">
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>

            <li className="hover:text-amber-400">
              <Link to="/blogs" className="hover:underline">
                Blogs
              </Link>
            </li>
            <li className="hover:text-amber-400">
              <Link to="/my-blogs" className="hover:underline">
                My Blog
              </Link>
            </li>
            <li className="hover:text-amber-400">
              <Link to="/create-blog" className="hover:underline">
                Create Blog
              </Link>
            </li>
          </ul>
        </div>

        {/* Subscribe / Social Media */}
        <div></div>
      </div>

      <div className="text-center mt-8 border-t border-gray-700 pt-4">
        <p>&copy; {new Date().getFullYear()} BlogSite. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
