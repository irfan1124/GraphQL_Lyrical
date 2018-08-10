import db from '../db/config/config';

export default {
    lyrics: () => {
        return db.lyric.findAll({ })
    }
}
