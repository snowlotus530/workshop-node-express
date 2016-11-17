import {albumModel} from '../models/album-model';


export class AlbumControllerClass {
    getList (req, res) {
        return albumModel.getList()
            .then(documents => res.json(documents))
            .catch(error => res.json({error: error}));
    }

    getById (req, res) {
        return albumModel.getById(req.params.id)
            .then(document => res.json(document || {}))
            .catch(error => res.json({error: error.message}));
    }

    getTracks (req, res) {
        return albumModel.getAlbumTracks(req.params.id)
            .then(documents => res.json(documents))
            .catch(error => res.json({error: error.message}));
    }
}


export const albumController = new AlbumControllerClass();
