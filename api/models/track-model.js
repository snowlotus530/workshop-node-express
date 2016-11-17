import {database, docTypes} from '../../database';


export class TrackModelClass {
    getList () {
        return this.getListFiltered();
    }

    getById (id) {
        return database.findOne({_id: id, docType: docTypes.TRACK});
    }

    getTrackComments (trackId) {
        return new Promise ((resolve, reject) => {
            this.getById(trackId)
                .then(track => {
                    const commentIds = track.comments;
                    return database.find({_id: {$in: commentIds}, docType: docTypes.COMMENT});
                })
                .then(comments => resolve(comments))
                .catch(error => reject(error));
        });
    }

    getListFiltered (filter) {
        const query = Object.assign({}, {docType: docTypes.TRACK}, filter || {});

        return database.find(query);
    }
}


export const trackModel = new TrackModelClass();
