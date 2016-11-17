import {bandModel} from '../models';


export class BandControllerClass {
    getList (req, res) {
        return bandModel.getList()
            .then(documents => res.json(documents))
            .catch(error => res.json({error: error.message}));
    }

    getById (req, res) {
        return bandModel.getById(req.params.id)
            .then(document => res.json(document || {}))
            .catch(error => res.json({error: error.message}));
    }

    getAlbums (req, res) {
        return bandModel.getBandAlbums(req.params.id)
            .then(documents => res.json(documents))
            .catch(error => res.json({error: error.message}));
    }

    getArtists (req, res) {
        return bandModel.getBandArtists(req.params.id)
            .then(documents => res.json(documents))
            .catch(error => res.json({error: error.message}));
    }
}


export const bandController = new BandControllerClass();
