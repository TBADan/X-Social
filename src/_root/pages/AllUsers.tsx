import Loader from "@/components/shared/Loader";
import UserCard from "@/components/shared/userCard";
import { useGetUsers } from "@/lib/react-query/queriesAndMutations";


const AllUsers = () => {
  const {
    data: creators,
    isLoading: isUserLoading,
  } = useGetUsers(10);

  return (
    <div className="common-container">
      <div className="flex gap-5 w-full px-3">
        <img
        src="/assets/icons/people.svg"
        alt="people icon"
        width={35}
        height={35}
        className="rounded-full stroke-slate-50"
        />
        <h3 className="h1-bold text-light-1">All Users</h3>
      </div>
    {isUserLoading && !creators ? (
      <Loader/>
    ) : (
      <ul className="user-grid">
        {creators?.documents.map((creator) => (
        <li key={creator?.$id}>
          <UserCard user={creator}/>
        </li>
        ))}
      </ul>
    )}
  </div>
  )
}

export default AllUsers
