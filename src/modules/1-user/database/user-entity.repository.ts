import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { User } from '../User';
import { UserSchema } from './user.schema';
import { UserSchemaFactory } from './user-schema.factory';
import { BaseEntityRepository } from '../../../infrastructure/database/base-entity.repository';

@Injectable()   
export class UserEntityRepository extends BaseEntityRepository<
  UserSchema,
  User
> {
  constructor(
    @InjectModel(UserSchema.name)
    userModel: Model<UserSchema>,
    userSchemaFactory: UserSchemaFactory,
  ) {
    super(userModel, userSchemaFactory);
  }
}
