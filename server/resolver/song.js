import db from '../db/config/config';
import joinMonster from 'join-monster';

export default {
    Query: {
        songs: () => {
            // return db.song.findAll({})
            joinMonster(info, args, (sql) => {
                console.log('all songs');
                console.log(sql);
                db.sequelize.query(sql, { type: db.sequelize.QueryType.SELECT });
            })
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
