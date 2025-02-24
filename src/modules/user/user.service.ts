import { IUser} from "./user.model";
import { UserRepository } from "./user.repository";

export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(newUser: IUser): Promise<IUser> {
    return this.userRepository.create(newUser);
  }

  async getUserById(id: string): Promise<IUser | null> {
    return this.userRepository.findById(id);
  }

  async getAllUser(): Promise<IUser[]> {
    return this.userRepository.findAll();
  }

  async updateUser(userUpdated: IUser): Promise<void | null>{
    return this.userRepository.update(userUpdated)
  }

  async getUserByUserName(userName: string): Promise<IUser | null> {
    return this.userRepository.findByUsername(userName);
  }
}
