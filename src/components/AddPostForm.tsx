import { Link } from "react-router";

export const AddPostForm = ({ placeholder }: { placeholder: string }) => {
  return (
    <form>
      <div className="flex flex-row gap-4">
        <Link to={`/`}>
          <img 
            src="https://picsum.photos/200?random=malek" 
            className="w-12 h-12 rounded-full"
            alt="Avatar" 
          />
        </Link>
        <div className="w-full">
          <textarea
            rows={3}
            className="w-full p-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder={placeholder}
            name="text"
            required
          />
        </div>
      </div>
      <div className="flex justify-end py-4 px-4 md:px-6">
        <button 
          className="bg-[#1DA1F2] text-white px-4 py-2 rounded-md hover:bg-[#1a91da]"
          type="submit"
        >
          Post message
        </button>
      </div>
    </form>
  );
};