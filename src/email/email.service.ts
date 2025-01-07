import Mail= require('nodemailer/lib/mailer');
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

interface EmailOptions { //메일 옵션 타입
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({ //nodemailer에서 제공하는 transporter 객체 생성
      host: 'Gmail',
      auth: {
        user: 'YOUR_GMAIL',
        pass: 'YOUR_PASSWORD',
      },
    });
  }
  
  async sendMemberJoinVerification(emailAddress: string, signupVerifyToken: string) {
    const baseUrl = 'http://localhost:3000';

    const url = `${baseUrl}/users/email-verify?signupVerifyToken=${signupVerifyToken}`; //유저가 누를 버튼 링크
    const mailOptions: EmailOptions = {
      to: emailAddress,
      subject: '가입 인증 메일',
      html: `
        가입확인 버튼을 누르시면 가입 인증이 완료됩니다.<br/>
        <form action="${url}" method="POST">
          <button>가입확인</button>
        </form>
      `,
    }
    return await this.transporter.sendMail(mailOptions); // transporter 객체의 sendMail 메서드를 통해 메일 발송
  }
}
