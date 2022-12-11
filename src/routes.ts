import Router from 'express'
import { Request, Response } from 'express'
import userController from './controllers/userController';
import videoController from './controllers/videoController';
import anexoController from './controllers/anexosController';
import jwt from "jsonwebtoken";
const routes = Router();

function checkToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) return res.status(401).json({ msg: "Acesso negado!" }).end();

    try {
        const secret = process.env.SECRET;

        jwt.verify(token, secret);

        next();
    } catch (err) {
        res.status(400).json({ msg: "O Token é inválido!" }).end();
    }
}

routes.get("/", (req: Request, res: Response) => {
    res.json({ message: "Hello world!" });
});

routes.get("/teste", checkToken, (req: Request, res: Response) => {
    res.json({ message: "essa rota funciona" });
});

routes.post('/addUser', userController.addUser)
routes.post('/login', userController.login)

routes.post('/addVideo', checkToken, videoController.addVideo)
routes.get('/getVideos', videoController.getVideos)
routes.get('/getVideo/:id', videoController.getVideo)
routes.put('/editVideo/:id', checkToken, videoController.editVideo)
routes.delete('/deleteVideo/:id', checkToken, videoController.deleteVideo)

routes.post('/addAnexo', checkToken, anexoController.addAnexo)
routes.get('/getAnexos', anexoController.getAnexos)
routes.get('/getAnexo/:id', anexoController.getAnexo)
routes.put('/editAnexo/:id', checkToken, anexoController.editAnexo)
routes.delete('/deleteAnexo/:id', checkToken, anexoController.deleteAnexo)


export default routes;
