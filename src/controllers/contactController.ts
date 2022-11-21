import { Request, Response } from 'express'
import Contact from '../database/Schemas/contact'

class ContactController {

    async addContact(req: Request, res: Response) {
        {
            try {
                const contact = await Contact.create(req.body);

                return res.send({ contact }).end();
            } catch (err) {
                return res.status(400).send({ error: err }).end();
            }
        }
    }

    async editContact(req: Request, res: Response) {
        {
            try {
                const id: string = "637bd60062ae50119e5753c7";
                const updates = req.body;
                const contact = await Contact.findByIdAndUpdate(id, updates)

                return res.send({ contact }).end();
            } catch (err) {
                return res.status(400).send({ error: err }).end();
            }
        }
    }

}

export default new ContactController;