import {
  CommentOutlined,
  DeleteOutlined,
  EditOutlined,
  HeartOutlined,
} from "@ant-design/icons";
import { Avatar } from "antd";
import moment from "moment";
import PostImage from "../post-image/PostImage";
import { useStateContext } from "../../components/context/AppContext";
import { Link } from "react-router-dom";

// import renderHTML from "react-render-html";

const PostList = ({ posts, postDelete }) => {
  const { state } = useStateContext();
  return (
    <>
      {posts &&
        posts.map((post) => (
          <div key={post._id} className="card mb-5">
            <div className="card-header">
              <Avatar size={40}>{post.postedBy.name[0]}</Avatar>{" "}
              <span className="pt-2 ml-3" style={{ marginLeft: "1rem" }}>
                {post.postedBy.name}
              </span>
              <span className="pt-2 ml-3" style={{ marginLeft: "1rem" }}>
                {moment(post.createdAt).fromNow()}
              </span>
            </div>
            <div className="card-body">{post.content}</div>
            <div className="card-footer">
              {/* <img
                src={post.image && post.image.url}
                alt={post.postedBy.name}
              /> */}
              {post.image && <PostImage url={post.image.url} />}
              <div className="d-flex pt-2">
                <HeartOutlined className="text-danger pt-2 h5 cursor" />
                <div className="pt-2 pl-3" style={{ marginRight: "1rem" }}>
                  3 likes
                </div>
                <CommentOutlined className="text-danger pt-2 h5 pl-5 cursor" />
                <div className="pt-2 pl-3">2 comments</div>

                {state &&
                  state.user &&
                  state.user._id === post.postedBy._id && (
                    <>
                      <Link
                        to={`/${post._id}`}
                        className="text-danger pt-2 h5 px-2 mx-auto cursor"
                      >
                        <EditOutlined className="" />
                      </Link>

                      <DeleteOutlined
                        className="text-danger pt-2 h5 px-2 cursor"
                        onClick={() => postDelete(post._id)}
                      />
                    </>
                  )}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default PostList;
