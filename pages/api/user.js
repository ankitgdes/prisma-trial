import {
  createUser,
  deleteUser,
  getAllUsers,
  getUser,
  updateUser,
} from '../../prisma/user'

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case 'GET': {
        if (req.query.id) {
          const user = await getUser(req.query.id)
          return res.status(200).json(user)
        } else {
          const users = await getAllUsers()
          return res.json(users)
        }
      }

      case 'POST': {
        const { email, name, birthYear } = req.body
        const user = await createUser(email, name, birthYear)
        return res.json(user)
      }

      case 'PUT': {
        const { id, ...updateData } = req.body
        const user = await updateUser(id, updateData)
        return res.json(user)
      }

      case 'DELETE': {
        const { id } = req.body
        const user = await deleteUser(id)
        return res.json(user)
      }

      default:
        break
    }
  } catch (error) {
    return res.status(500).json({ ...error, message: error.message })
  }
}
