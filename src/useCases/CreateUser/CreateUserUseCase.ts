import { User } from "../../entities/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserRequestDto } from "./CreateUserDto";

export class CreateUserUseCase {
  private usersRepository: IUsersRepository

  constructor(usersRepository: IUsersRepository) {
    this.usersRepository = usersRepository;
  }
  
  
  async execute(data: CreateUserRequestDto) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if(userAlreadyExists) {
      throw new Error('User already exists!');
    }

    const user = new User(data);
    await this.usersRepository.save(user);
  }
}