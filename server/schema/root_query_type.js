const mongoose = require('mongoose');
const graphql = require('graphql');
const { GraphQLObjectType, GraphQLList, GraphQLID, GraphQLNonNull } = graphql;
const SongType = require('./song_type');
const LyricType = require('./lyric_type');
const Lyric = mongoose.model('lyric');
const models = require('../db/config/config')

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    songs: {
      type: new GraphQLList(SongType),
      resolve() {
        return models.song.findAll({});
      }
    },
    song: {
      type: SongType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return models.song.findById(id);
      }
    },
    lyrics: {
      type: new GraphQLList(LyricType),
      resolve() {
        console.log('root resolve')
        return models.lyric.findAll({include: [models.song]});
      }
    },
    lyric: {
      type: LyricType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parnetValue, { id }) {
        console.log('root resolve')
        return models.lyric.findById(id);
      }
    }
  })
});

module.exports = RootQuery;
