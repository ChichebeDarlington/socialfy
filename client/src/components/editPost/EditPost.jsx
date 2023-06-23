import axios from "axios";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserRoute from "../routes/UserRoute";
import CreatePostForm from "../forms/CreatePostForm";
import { useStateContext } from "../../components/context/AppContext";

const EditPost = () => {
  const navigate = useNavigate();
  const { state } = useStateContext();
  const { _id } = useParams();
  // states
  const [imageLoading, setImageLoading] = useState(false);
  const [content, setContent] = useState("");
  const [image, setImage] = useState({});

  useEffect(() => {
    if (_id) fetchPost();
  }, [_id]);

  const fetchPost = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8000/api/post/user-post/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      setContent(data.content);
      setImage(data.image.url);
    } catch (error) {
      console.log(error);
    }
  };

  const handleImage = async (e) => {
    const file = e.target.files[0];
    let formData = new FormData();
    formData.append("image", file);
    // console.log([...formData]);
    setImageLoading(true);
    try {
      const { data } = await axios.post(
        `http://localhost:8000/api/post/image-upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      // console.log("uploaded image=>",data)
      const { public_id, url } = data;
      setImage({
        url,
        public_id,
      });
      setImageLoading(false);
    } catch (error) {
      console.log(error);
      setImageLoading(false);
    }
  };

  const handlePost = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.patch(
        `http://localhost:8000/api/post/post-update/${_id}`,

        {
          content,
          image,
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      toast.success("updated");
      navigate("/user/dashboard");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }

    // console.log("updated", image, content);
  };
  return (
    <UserRoute>
      <div className="container-fluid">
        <div className="col-md-8 col-sm-offset-2 mt-4">
          <CreatePostForm
            postSubmit={handlePost}
            content={content}
            setContent={setContent}
            image={image}
            uploading={imageLoading}
            handlePostImage={handleImage}
          />
        </div>
      </div>
    </UserRoute>
  );
};

export default EditPost;
