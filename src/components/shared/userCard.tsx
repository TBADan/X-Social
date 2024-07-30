import { Models } from 'appwrite';
import { Button } from '../ui/button';

type UserCardProp = {
    user: Models.Document;
}

const UserCard = ( {user}: UserCardProp ) => {
  return (

    <div className="user-card">
        <div>
        <div className=" flex-start flex flex-row gap-3">
        <img
            src={user.imageUrl || "/assets/icons/profile-placeholder.svg"}
            alt="profile image"
            className="rounded-full w-14 h-14 object-cover"
        />
        <div className="flex-col gap-3 items-start">
            <p className="base-medium text-light-1 text-start line-clamp-1">{user.name}</p>
            <p className="base-light text-light-3 text-start line-clamp-1">@{user.username}</p>
        </div>

        </div>

        </div>
        <div>
            <Button className="shad-button_primary w-full">Toggle</Button>
        </div>

    </div>

  );
};

export default UserCard;
