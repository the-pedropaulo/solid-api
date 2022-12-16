import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { CreateUserRequestDto } from "./CreateUserDto";

export class CreateUserUseCase {
  // private usersRepository: IUsersRepository

  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}
  
  
  async execute(data: CreateUserRequestDto) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email);

    if(userAlreadyExists) {
      throw new Error('User already exists!');
    }

    const user = new User(data);
    await this.usersRepository.save(user);
    
    this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email
      },
      from: {
        name: 'Equipe do Meu App',
        email: 'quipedjshadj2@mgila.com'
      },
      subject: 'Seja bem vindo!',
      body: '<p>Voce ja pode fazer login</p>'
    })
  }
}