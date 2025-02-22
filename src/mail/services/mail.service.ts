import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class MailService {
  constructor(@InjectQueue('mailQueue') private mailQueue: Queue) {}

  async sendMail(to: string, subject: string, text: string) {
    await this.mailQueue.add(
      'sendEmail',
      { to, subject, text },
      {
        attempts: 3, // Reintentar hasta 3 veces en caso de fallo
        delay: 5000, // Retrasar 5 segundos antes de enviar
      },
    );
    return { message: 'Correo encolado correctamente' };
  }
}
