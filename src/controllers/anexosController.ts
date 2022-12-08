import { Request, Response } from 'express'
import Anexos from '../schemas/anexos'
import { ErrorsMongodb } from '../enums/errorsMongodb'
class AnexoController {
    async addAnexo(req: Request, res: Response) {
        const { titulo, descricao, anexo } = req.body;

        try {

            const newAnexo = new Anexos({
                anexo: anexo,
                titulo: titulo,
                descricao: descricao,
            })
            newAnexo.save().then(() => {
                return res.send({ newAnexo }).end();
            })
                .catch((err) => {
                    if (err.code === ErrorsMongodb.AlreadyExists) {
                        return res.status(400).send("Anexo já cadastrado").end();
                    }
                    return res.status(400).send({ error: err }).end();
                });

        } catch (err) {
            if (err.code === ErrorsMongodb.AlreadyExists) {
                return res.status(400).send("Anexo já cadastrado").end();
            }
            return res.status(400).send({ error: err }).end();
        }
    }

    async getAnexos(req: Request, res: Response) {
        {
            try {
                const anexos = await Anexos.find();

                return res.send({ anexos }).end();

            } catch (err) {
                return res.status(400).send({ error: err }).end();
            }
        }
    }

    async editAnexo(req: Request, res: Response) {
        {
            try {
                const id: string = req.params.id;
                const updates = req.body;
                const anexo = await Anexos.findByIdAndUpdate(id, updates)

                return res.send({ anexo }).end();
            } catch (err) {
                return res.status(400).send({ error: err }).end();
            }
        }
    }

    async deleteAnexo(req: Request, res: Response) {
        {
            try {

                const id: string = req.params.id;
                await Anexos.findByIdAndDelete(id)

                return res.send("Anexo deletado com sucesso").end();

            } catch (err) {
                return res.status(400).send({ error: err }).end();
            }
        }
    }

}

export default new AnexoController;