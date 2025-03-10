import { Link } from "react-router";
import { LikeButton } from "./LikeButton";


export type Message = {
  id: string;
  userId: string;
  username: string;
  profilePictureUrl: string;
  publishedAt: string;
  text: string;
}

export const Post = ({ id, userId, profilePictureUrl, username, text, publishedAt}: Message) => {
  return (
    <div key={id} className="px-4 text-sm space-y-4">
      <div className="flex justify-between items-start space-x-4">
        <div className="flex items-center space-x-3">
          <Link to={`/u/${userId}`}>
            <img 
              src={profilePictureUrl} 
              alt={`${username}'s avatar`}
              className="w-10 h-10 rounded-full"
            />
          </Link>
          <div>
            <Link to={`/u/${userId}`}>
              <p className="font-medium text-gray-900 dark:text-gray-100">
                {username}
              </p>
            </Link>
          </div>
        </div>
        <p className="text-gray-500">{publishedAt}</p>
      </div>
      <p 
        className="text-gray-500 line-clamp-2 overflow-hidden"
      >
        {text}
      </p>
      <LikeButton />
    </div>
  );
};