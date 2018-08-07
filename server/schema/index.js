import path from 'path';
import { fileLoader, mergeTypes } from 'merge-graphql-schemas';
import { buildSchema } from 'graphql'
 
const typesArray = fileLoader(path.join(__dirname, './types'));
 
export default buildSchema( mergeTypes(typesArray, { all: true }));