import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import ReactPaginate from "react-paginate"
import { HashLoader } from "react-spinners"
import UserCard from "./Components/UserCard/UserCard"
import './App.css'

function App() {
  const [selectedUser, setSelectedUser] = useState('')
  const [pageNumber, setPageNumber] = useState(0);

  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('https://602e7c2c4410730017c50b9d.mockapi.io/users')
      const data = await res.json()
      return data
    }
  })

  const usersPerPage = 7;
  const pagesVisited = pageNumber * usersPerPage;


  const pageCount = Math.ceil(users?.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };


console.log(users)
  return (
    <div className="max-w-[1200px] mx-auto grid px-20 grid-cols-1  md:grid-cols-2 pt-20 gap-20">
      <div>
        <h1 className="text-xl text-center rounded-t bg-[#C5DFFF] w-full py-4">USERS LIST</h1>

        {
          isLoading ?
            <div className="h-[200px] flex justify-center items-center">
              <HashLoader color="#367fd6" />
            </div>
            :
            <>
              <div>
                {
                  users?.slice(pagesVisited, pagesVisited + usersPerPage).map(user => <UserCard
                    key={user.id}
                    user={user}
                    setSelectedUser={setSelectedUser}
                  />)
                }

              </div>
              <div>
                <ReactPaginate
                  previousLabel={"Previous"}
                  nextLabel={"Next"}
                  pageCount={pageCount}
                  onPageChange={changePage}
                  containerClassName={"paginationBttns"}
                  previousLinkClassName={"previousBttn"}
                  nextLinkClassName={"nextBttn"}
                  disabledClassName={"paginationDisabled"}
                  activeClassName={"paginationActive"}
                />
              </div>
            </>
        }
      </div>
      <div>
        <h1 className="text-xl text-center  rounded-t bg-[#C5DFFF] w-full py-4">USER DETAILS</h1>

        {
          selectedUser ?
            <div className="flex flex-col gap-y-2 font-semibold  justify-center">
              <img className="w-40 mx-auto" src='https://cdn.vectorstock.com/i/preview-1x/53/42/user-member-avatar-face-profile-icon-vector-22965342.jpg' alt="" />
              <p className="text-center font-semibold text-2xl">@{selectedUser.profile.username}</p>
              <p className="p-2 bg-[#DBDBDB] font-semibold">{selectedUser.Bio}</p>
              <p>Full Name</p>
              <p className="p-2 bg-[#DBDBDB]">{selectedUser.profile.firstName} {selectedUser.profile.lastName}</p>
              <p>Job Title</p>
              <p className="p-2 bg-[#DBDBDB]">{selectedUser.jobTitle}</p>
              <p>Email</p>
              <p className="p-2 bg-[#DBDBDB]">{selectedUser.profile.email}</p>
            </div>
            :
            <div className="h-[400px] flex justify-center text-center items-center">
              <p className="font-semibold text-xl text-gray-700">Please Select a User</p>
            </div>
        }
      </div>
    </div>
  )
}

export default App
