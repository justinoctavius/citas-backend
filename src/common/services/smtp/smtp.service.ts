import { Injectable } from '@nestjs/common';
import { ConfigService } from 'src/config/config.service';
import { SendEmailDto } from './types';
import axios from 'axios';

@Injectable()
export class SMTPServices {
  constructor(private readonly configService: ConfigService) {}

  sendEmail = async ({
    htmlContent,
    to,
    subject,
    sender = {
      email: this.configService.get('SMTP_SENDER_EMAIL'),
      name: this.configService.get('SMTP_SENDER_NAME'),
    },
  }: SendEmailDto) => {
    await axios.post(
      `${this.configService.get('SMTP_API_URL')}/v3/smtp/email`,
      {
        htmlContent,
        to,
        subject,
        sender: {
          email: sender.email,
          name: sender.name,
        },
      },
      {
        headers: {
          'api-key': this.configService.get('SMTP_API_KEY') || '',
        },
      },
    );
  };
}
