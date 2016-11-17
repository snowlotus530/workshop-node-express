import {artistModel} from '../models';


export class ArtistControllerClass {
    getList (req, res) {
        return artistModel.getList()
            .then(documents => res.json(documents))
            .catch(error => res.json({error: error}));
    }

    getById (req, res) {
        return artistModel.getById(req.params.id)
            .then(document => res.json(document || {}))
            .catch(error => res.json({error: error.message}));
    }
}


export const artistController = new ArtistControllerClass();
