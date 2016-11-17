import {commentModel} from '../models';


class CommentControllerClass {
    getById (req, res) {
        return commentModel.getById(req.params.id)
            .then(document => res.json(document || {}))
            .catch(error => res.json({error: error.message}));
    }

    addComment (req, res) {
        const payload = {
            message: req.body.message,
            name: req.body.name,
            trackId: req.body.trackId
        };

        return commentModel.addCommentToTrack(payload)
            .then(response => res.json(response || {}))
            .catch(error => res.json({error: error.message}));
    }

    deleteComment (req, res) {
        return commentModel.deleteComment(req.params.id)
            .then(response => res.json(response || {}))
            .catch(error => res.json({error: error.message}));
    }
}


export const commentController = new CommentControllerClass();
