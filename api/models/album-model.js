import {database, docTypes} from '../../database';

export class AlbumModelClass {
    getList () {
        return this.getListFiltered();
    }

    getById (id) {
        return database.findOne({_id: id, docType: docTypes.ALBUM});
    }

    getListFiltered (filter = {}) {
        const query = Object.assign({}, {docType: docTypes.ALBUM}, filter);

        return database.find(query)
    }

    getAlbumTracks (albumId) {
        return new Promise ((resolve, reject) => {
            this.getById(albumId)
                .then(band => {
                    const trackIds = band.tracks;

                    return database.find({_id: {$in: trackIds}, docType: docTypes.TRACK});
                })
                .then(artists => resolve(artists))
                .catch(error => reject(error));
        });
    }
}


export const albumModel = new AlbumModelClass();
