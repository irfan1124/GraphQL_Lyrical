export default {

    song: {
        //map the song object type to its SQL table
        sqlTable: 'song',
        uniqueKey: 'id',
        fields: {
            title: {
                sqlColumn: 'title'
            }
        }
    }

}