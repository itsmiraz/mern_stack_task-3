import { useQuery } from "@tanstack/react-query"


function App() {




  const { data: users, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await fetch('https://602e7c2c4410730017c50b9d.mockapi.io/users')
      const data = await res.json()
      return data
    }
  })


  console.log(users)

  return (
    <div>

    </div>
  )
}

export default App
