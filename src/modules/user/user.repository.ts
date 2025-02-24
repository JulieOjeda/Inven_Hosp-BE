import User, { IUser} from "./user.model";
import { BaseRepository } from "../../shared/base.repository";

export class UserRepository extends BaseRepository<IUser> {
  async create(data: IUser): Promise<IUser> {
    return User.create(data);
  }

  async findById(id: string): Promise<IUser | null> {
    return User.findOne({userId: id});
  }

  async findAll(): Promise<IUser[]> {
    return User.find();
  }

  async update(area: IUser): Promise<void | null> {
    let updatedGear = await User.findByIdAndUpdate(area._id, area,{
      new: true,
      runValidators: true,
    })
    if (!updatedGear) {
      console.log("Gear no encontrado");
      return null;
    }

    return
  }

  async findByUsername(userName: string): Promise<IUser | null> {
    return User.findOne({userName: userName});
  }
}
