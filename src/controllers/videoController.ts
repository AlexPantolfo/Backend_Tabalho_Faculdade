import { Request, Response } from 'express'
import Videos from '../database/Schemas/videos'

class VideoController {

    async addVideo(req: Request, res: Response) {
        {
            try {
                const video = await Videos.create(req.body);

                return res.send({ video }).end();
            } catch (err) {
                if (err.code === 11000) {
                    return res.status(400).send("Vídeo já cadastrado").end();
                }
                return res.status(400).send({ error: err }).end();
            }
        }
    }

    async getVideos(req: Request, res: Response) {
        {
            try {
                const videos = await Videos.find();

                return res.send({ videos }).end();

            } catch (err) {
                return res.status(400).send({ error: err }).end();
            }
        }
    }

    async editVideo(req: Request, res: Response) {
        {
            try {
                const id: string = req.params.id;
                const updates = req.body;
                const video = await Videos.findByIdAndUpdate(id, updates)

                return res.send({ video }).end();
            } catch (err) {
                return res.status(400).send({ error: err }).end();
            }
        }
    }

    async deleteVideo(req: Request, res: Response) {
        {
            try {

                const id: string = req.params.id;
                await Videos.findByIdAndDelete(id)

                return res.send("Vídeo deletado com sucesso").end();

            } catch (err) {
                return res.status(400).send({ error: err }).end();
            }
        }
    }

}

export default new VideoController;