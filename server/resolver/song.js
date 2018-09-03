import db from '../db/config/config';

export default {
    Query: {
        songs: () => {
            return db.song.findAll({})
        },
        song: (args) => {
            return db.song.findOne({
                    where: {
                        id: args.id
                    }
                })
                .then(song => {
                    console.log(song)
                    return song;
                });
        }
    },
	Mutation: {
        addSong: (args) => {
            console.log(args);
            return db.song.create(args);
        }
    }
}
