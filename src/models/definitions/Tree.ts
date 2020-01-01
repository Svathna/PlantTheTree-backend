import { Typegoose, prop, Ref } from 'typegoose';
import User from './User';

export enum UserType {
  NORMAL_USER = 1,
  ADMIN = 2,
}

export interface GeoLocation {
  lat: string;
  long: string;
}

class Tree extends Typegoose {
  // Need time to things about relationship between user and tree
  @prop({ ref: User, required: true })
  owner: Ref<User>;

  @prop({ required: true })
  name: string;

  @prop({ required: true })
  description: string;

  @prop({ required: true })
  photo?: string;

  @prop({ required: true })
  location: GeoLocation;

  @prop({ required: true, default: false })
  deleted: boolean;
}

export default Tree;
