import { IPost } from '../../@types';
import './Post.scss';

interface PostProps {
  post: IPost;
}

// rôle : afficher un article
function Post({ post }: PostProps) {
  return (
    <article className="post">
      <h2 className="post-title">{post.title}</h2>
      <div className="post-category">{post.category}</div>
      <p className="post-excerpt">{post.excerpt}</p>
    </article>
  );
}

export default Post;
