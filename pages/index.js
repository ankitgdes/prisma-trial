import { getAllUsers } from '../prisma/user'

export default function Home({ users }) {
  return (
    <div>
      {users.map((user) => (
        <div key={user.id}>{user.name}</div>
      ))}
    </div>
  )
}

export const getServerSideProps = async ({ req }) => {
  const users = await getAllUsers()
  const updatedUsers = users.map((user) => ({
    ...user,
    updatedAt: user.updatedAt.toString(),
    createdAt: user.createdAt.toString(),
  }))

  return { props: { users: updatedUsers } }
}
