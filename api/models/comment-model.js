import Promise from 'bluebird';

import {database, docTypes} from '../../database';


export class CommentModelClass {
    getById (id) {
        return database.findOne({_id: id, docType: docTypes.COMMENT});
    }

    getListFiltered (filter) {
        console.log('filte',filter);
        const query = Object.assign({}, {docType: docTypes.COMMENT}, filter || {});
        return database.find(query);
    }

    addCommentToTrack (payload) {
        return new Promise ((resolve, reject) => {
            const comment = {
                docType: docTypes.COMMENT,
                message: payload.message,
                name: payload.name
            };
            const trackId = payload.trackId;
            var insertedComment;

            if (!comment.name || !comment.message) {
                return reject(new Error('Should send a valid name and message'));
            }
            
            database.findOne({_id: trackId, docType: docTypes.TRACK})
                .then(track => {
                    if (!track) {
                        return reject(new Error('Invalid track id'));
                    }

                    return database.insert(comment)
                })
                .then(newComment => {
                    insertedComment = newComment;

                    return database.update({_id: trackId, docType: docTypes.TRACK}, {$inc: {commentsCount: 1}, $push: {comments: insertedComment._id}});
                })
                .then(updatedTrack => resolve(insertedComment))
                .catch(error => reject(error));
        });
    }

    deleteComment (id) {
        const commentQuery = {_id: id, docType: docTypes.COMMENT};

        return new Promise ((resolve, reject) => {
            database.findOne(commentQuery)
                .then(comment => {
                    if (!comment) {
                        return reject(new Error('Invalid comment id'));
                    }

                    return database.remove(commentQuery)
                })
                .then((affectedDocuments) => {
                    if (affectedDocuments) {
                        return resolve("Comment removed");
                    }
                    return reject(new Error('No comments were deleted'));
                })
                .catch(error => reject(error));
        });
    }
}

export const commentModel = new CommentModelClass();
