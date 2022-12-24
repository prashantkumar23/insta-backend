import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDto } from './user.dto';
import { UserSchema } from './user.schema';

@Injectable()
export class UserDtoRepository {
  constructor(
    @InjectModel(UserSchema.name)
    private readonly userModel: Model<UserSchema>,
  ) {}

  async findAll(): Promise<UserDto[]> {
    const users = await this.userModel.find({}, {}, { lean: true });
    
    return users
    // return campers.map(camper => {
    //   // const allergiesLower = camper.allergies.map(allergy =>
    //   //   allergy.toLocaleLowerCase(),
    //   // );
    //   const isAllergicToPeanuts = allergiesLower.includes('peanuts');
    //   return {
    //     ...camper,
    //     isAllergicToPeanuts,
    //   };
    // });
  }
}
