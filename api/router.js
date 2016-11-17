import express from 'express';
import colors from 'colors/safe';


import {
    albumController, artistController, commentController,
    bandController, trackController
} from './controllers';


export const router = express.Router();



// API Routes
router.get('/albums', albumController.getList);
router.get('/albums/:id', albumController.getById);
router.get('/albums/:id/tracks', albumController.getTracks);

router.get('/artists', artistController.getList);
router.get('/artists/:id', artistController.getById);

router.get('/bands', bandController.getList);
router.get('/bands/:id', bandController.getById);
router.get('/bands/:id/albums', bandController.getAlbums);
router.get('/bands/:id/artists', bandController.getArtists);

router.get('/tracks', trackController.getList);
router.get('/tracks/:id', trackController.getById);
router.get('/tracks/:id/comments', trackController.getComments);

router.get('/comments/:id', commentController.getById);
router.post('/comments', commentController.addComment);
router.delete('/comments/:id', commentController.deleteComment);
