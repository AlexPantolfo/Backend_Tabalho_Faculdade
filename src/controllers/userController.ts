import { Request, Response } from 'express'
import User from '../database/Schemas/user'

class UserController {
    async create(req: Request, res: Response) {
        {
            try {
                const user = await User.create(req.body);
                return res.send({ user })
            } catch (err) {
                return res.status(400).send({ error: err })
            }
        }
    }
}

export default new UserController;