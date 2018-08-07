import db from '../db/config/config';

export default {
    songs: () => {
        return db.song.findAll({ })
    },
    song: (param) => {
        return db.song.findOne({ where: {id: param.id} }).then(song => {
            console.log(song)
            return song;
          });
    },
    addSong: () => {
        return db.song.create(song);
    }
}
