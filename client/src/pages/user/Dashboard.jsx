import axios from "axios";
import { useEffect, useState } from "react";
import { useStateContext } from "../../components/context/AppContext";
import CreatePostForm from "../../components/forms/CreatePostForm";
import UserRoute from "../../components/routes/UserRoute";
import { toast } from "react-toastify";
import PostList from "../../components/cards/PostList";

const Home = () => {
  const { state, setState } = useStateContext();

  const [content, setContent] = useState("");
  const [image, setImage] = useState({});
  const [uploading, setUploading] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (state && state.token) fetchUserPosts();
  }, [state && state.token]);

  const fetchUserPosts = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:8000/api/post/user-posts",
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      // console.log("user posts => ", data);
      setPosts(data);
    } catch (err) {
      console.log(err);
    }
  };

  const postSubmit = async (e) => {
    e.preventDefault();
    // console.log("post => ", content);
    setUploading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/post/create-post",

        { content, image },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      console.log("create post response => ", data);
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success("Post created");
        setContent("");
        setImage({});
      }

      setUploading(false);
      fetchUserPosts();
    } catch (err) {
      console.log(err);
      setUploading(false);
    }
  };

  const handlePostImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    console.log([...formData]);
    setUploading(true);
    try {
      const { data } = await axios.post(
        "http://localhost:8000/api/post/image-upload",
        formData,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      console.log(data);
      setImage({
        url: data.url,
        public_id: data.public_id,
      });
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const postDelete = async (_id) => {
    try {
      const answer = window.confirm("Do you want to delete this post?");
      if (!answer) return;
      const { data } = await axios.delete(
        `http://localhost:8000/api/post/post-delete/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      fetchUserPosts();
      toast.error(data.ok);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserRoute>
      <div className="container-fluid">
        <div className="row py-5 text-light bg-secondary text-light">
          <div className="col text-center">
            <h1>Newsfeed</h1>
          </div>
        </div>

        <div className="row py-3">
          <div className="col-md-8">
            <CreatePostForm
              content={content}
              setContent={setContent}
              postSubmit={postSubmit}
              handlePostImage={handlePostImage}
              image={image}
              uploading={uploading}
            />
            <br />
            <PostList posts={posts} postDelete={postDelete} />
          </div>
          <div className="col-md-4">Sidebar</div>
        </div>
      </div>
    </UserRoute>
  );
};

export default Home;
