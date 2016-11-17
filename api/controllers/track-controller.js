import {trackModel} from '../models';


class TrackControllerClass {
    getList (req, res) {
        return trackModel.getList()
            .then(documents => res.json(documents))
            .catch(error => res.json({error: error.message}));
    }

    getComments (req, res) {
        return trackModel.getTrackComments(req.params.id)
            .then(documents => res.json(documents))
            .catch(error => res.json({error: error.message}));
    }

    getById (req, res) {
        return trackModel.getById(req.params.id)
            .then(document => res.json(document || {}))
            .catch(error => res.json({error: error.message}));
    }
}

export const trackController = new TrackControllerClass();
