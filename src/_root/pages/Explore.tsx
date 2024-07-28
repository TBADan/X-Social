import GridPostList from '@/components/shared/GridPostList'
import Loader from '@/components/shared/Loader'
import SearchResults from '@/components/shared/SearchResults'
import { Input } from '@/components/ui/input'
import useDebounce from '@/hooks/useDebounce'
import { useGetPosts, useSearchPosts } from '@/lib/react-query/queriesAndMutations'
import { useEffect, useState } from 'react'
import { useInView } from "react-intersection-observer"



const Explore = () => {
  const { ref, inView } = useInView();
  const { data: posts, fetchNextPage, hasNextPage } = useGetPosts();

  ///Search Values
  const [searchValue, setSearchValue] = useState("");
  const debouncedValue = useDebounce(searchValue, 500);
  const {data: searchedPosts, isFetching: isSearchFetching} = useSearchPosts(debouncedValue);
  
  useEffect(() => {
    if (inView && !searchValue) {
      fetchNextPage();
    }
  }, [inView, searchValue]);


  if(!posts) {
    return (
      <div className="flex-center w-full h-full">
        <Loader/>
      </div>
    )
  }
  


  const shouldShowSearchResults = searchValue !=="";
  const shouldShowPosts = !shouldShowSearchResults &&
  posts.pages.every((item) => 
    item?.documents.length === 0);

  return (
    <div className="explore-container">
      <div className='explore-inner_container'>
        <h2 className="h3-bold md:h2-bold w-full">Search Posts</h2>
        <div className="flex gap-1 px-4 w-full rounded-full bg-dark-4 outline-1">
          <img
          src="/assets/icons/search.svg"
          width={20}
          height={20}
          alt="search"
          />
          <Input
          type="text"
          placeholder='search'
          className="explore-search"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          />

        </div>
      </div>
      <div className="flex-between w-full max-w-5xl mt-16 mb-7">
        <h3 className="body-bold md:h3-bold">Popular Today</h3>
      </div>
      <div className="flex flex-wrap gap-9 w-full max-w-5xl">
        {shouldShowSearchResults ? (
          <SearchResults
          isSearchFetching={isSearchFetching}
          searchedPosts={searchedPosts}

          />
        ) : shouldShowPosts ? (
          <p className="text-light-4 mt-10 text-center w-full">End of Posts</p>
        ) : (
          posts.pages.map((item, index) => (
          <GridPostList key={`page-${index}`} posts={item?.documents || []}/>
        ))
      )}
      </div>
      {hasNextPage && !searchValue && (
        <div ref={ref} className="mt-10">
          <Loader/>

        </div>
      )}
    </div>
  )
}

export default Explore
