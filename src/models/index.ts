import { SchemaOptions } from 'mongoose';
import User from './definitions/User';
import Tree from './definitions/Tree';


const schema: { schemaOptions: SchemaOptions } = {
  schemaOptions: { timestamps: { createdAt: 'createdAt', updatedAt: 'createdAt' } },
};

// tslint:disable:variable-name
export const UserModel = new User().getModelForClass(User, schema);
export const TreeModel = new Tree().getModelForClass(Tree, schema);

