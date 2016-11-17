import Promise from 'bluebird';

import {database, docTypes} from '../../database';

export class BandModelClass {
    getList () {
        return this.getListFiltered();
    }

    getById (id) {
        return database.findOne({_id: id, docType: docTypes.BAND});
    }

    getListFiltered (filter) {
        const query = Object.assign({}, {docType: docTypes.BAND}, filter || {});

        return database.find(query);
    }

    getBandArtists (bandId) {
        return new Promise ((resolve, reject) => {
            this.getById(bandId)
                .then(band => {
                    const artistIds = band.artists;
                    return database.find({_id: {$in: artistIds}, docType: docTypes.ARTIST});
                })
                .then(artists => resolve(artists))
                .catch(error => reject(error));
        });
    }

    getBandAlbums (bandId) {
        return new Promise ((resolve, reject) => {
            this.getById(bandId)
                .then(band => {
                    const albumIds = band.albums;
                    return database.find({_id: {$in: albumIds}, docType: docTypes.ALBUM});
                })
                .then(albums => resolve(albums))
                .catch(error => reject(error));
        });
    }
}

export const bandModel = new BandModelClass();
