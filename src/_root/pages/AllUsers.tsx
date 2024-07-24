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
      <div className="user-container">
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
