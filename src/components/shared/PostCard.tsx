import { Models } from "appwrite";
import { Link } from 'react-router-dom';


import PostStats from "./PostStats";
import { multiFormatDateString } from "@/lib/utils";
import { useUserContext } from "@/context/AuthContext";
import { Button, buttonVariants } from "../ui/button";
import { VariantProps } from "class-variance-authority";


type PostCardProps = {
    post : Models.Document;
}

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	asChild?: boolean;
	role?: 'button' | 'link';
	to?: string;
	ctaText?: string;
}


const PostCard = ({ post }: PostCardProps) => {
    const {user} = useUserContext();
    
    if(!post.creator) return;
    


  return (
    <div className="post-card">
        <div className="flex-between">
            <div className="flex items-center gap-3">
                <Link to={`/profile/${post.creator.$id}`}>
                    <img
                    src={post?.creator?.imageUrl || '/assets/icons/profile-placeholder.svg'}
                    alt='creator'
                    className="rounded-full w-12 lg:h-12 object-cover"
                    />
                </Link>
                
                <div className="flex flex-col">
                    <p className="base-medium lg:body-bold text-light-1">{post.creator.name}</p>
                    <div className="gap-2 text-light-3 items-start">
                        <p className="subtle-semibold lg:small-regular">{multiFormatDateString(post.$createdAt)}</p>
                </div>
            </div>
        </div>
        <div className=" flex gap-3 justify-end items-center">
            <Link to={`/update-post/${post.$id}`}
            className={`${user.id !== post.creator.$id && "hidden"}`}>
            <img src="/assets/icons/edit.svg" alt="edit" width={20} height={20}/>
            </Link>
            <Button>
                <img src="/assets/icons/Download.svg" width={23} height={23}/>
            </Button>
            <Button asChild type="button" size="sm" className="shad-button_primary px-5 w-1/2 ">
                <Link to={post.location}>See More</Link>
            </Button>

        </div>
    </div>
    <Link to={`/posts/${post.$id}`}>
    <div className="small-medium lg:base-medium py-5">
        <p>{post.caption}</p>
        <ul className="flex gap-1 mt-2">
            {post.tags.map((tag: string) => (
                <li key={tag} className="text-light-3">
                    #{tag}
                </li>
            ))}
        </ul>

    </div>
    <div className="pt-1 pb-4">
    </div>
    <img
    src={post.imageUrl || '/assets/icons/profile-placeholder.svg'}
    className="post-card_img"
    alt="post image"
    />
    </Link>
    <PostStats post={post} userId={user.id} />
    
    
</div>
  )
};

export default PostCard;
