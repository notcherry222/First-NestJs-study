import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as uuid from 'uuid';
import { EmailService } from 'src/email/email.service';
import { UserInfo } from './interfaces/user-info.interface';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private emailService: EmailService,
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

  findAll() {
    return `This action returns all users`;
  }
  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async createUser(name: string, email: string, password: string) {
    const userExists = await this.checkUserExists(email);
    if (userExists) {
      throw new UnprocessableEntityException('해당 이메일로는 가입할 수 없습니다.');
    }
    
    const signupVerifyToken = uuid.v1();
    
    await this.saveUser(name, email, password, signupVerifyToken);
    await this.sendMemberJoinEmail(email, signupVerifyToken);
  }

  private async checkUserExists(emailAddress: string): Promise<boolean> {
    const user = await this.usersRepository.findOne(
      {
        where: { email: emailAddress}
      }
    );
    return user != null;
  }

  private async saveUser(name: string, email: string, password: string, signupVerifyToken: string) {
    const user = new User();
    user.id = uuid.v1();
    user.name = name;
    user.email = email;
    user.password = password;
    user.signupVerifyToken = signupVerifyToken;

    await this.usersRepository.save(user);
  }

  private async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    await this.emailService.sendMemberJoinVerification(email, signupVerifyToken);
  }

  async verifyEmail(signupVerifyToken: string): Promise<string>{
    // TODO: DB 연동 후 구현
    throw new Error('Method not implemented.');
  }

  async login(email: string, password: string): Promise<string> {
    // TODO: 실제 로그인 로직 구현
    throw new Error('Method not implemented.');
    return 'login successful';
  }

  async getUserInfo(userId: string): Promise<UserInfo> {
    // TODO: 실제 유저 정보 조회 로직 구현
    throw new Error('Method not implemented.');
  }
}
