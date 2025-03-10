import { AddPostForm } from "./AddPostForm";
import { Message, Post } from "./Post";


type PostListPropsType = {
  messages: Message[];
  addPostPlaceholder?: string;
};

export const PostList = ({
  messages,
  addPostPlaceholder = "What's on your mind ?",
}: PostListPropsType) => {
  return (
    <div className="mx-auto py-4 md:py-8 flex justify-center">
      <div className="bg-white py-4 w-full">
        <div className="flex flex-col space-y-4 divide-y">
          <AddPostForm placeholder={addPostPlaceholder} />
          {messages.map((message) => (
            <Post key={message.id} {...message} />
          ))}
        </div>
      </div>
    </div>
  );
};