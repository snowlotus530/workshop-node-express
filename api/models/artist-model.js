import {database, docTypes} from '../../database';

export class ArtistModelClass {
    getList () {
        return this.getListFiltered();
    }

    getById (id) {
        return database.findOne({_id: id, docType: docTypes.ARTIST});
    }

    getListFiltered (filter) {
        const query = Object.assign({}, {docType: docTypes.ARTIST}, filter || {});

        return database.find(query);
    }
}


export const artistModel = new ArtistModelClass();
