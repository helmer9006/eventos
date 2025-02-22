import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';
import * as nodemailer from 'nodemailer';
import * as dotenv from 'dotenv';
import { Logger } from '@nestjs/common';

dotenv.config(); // Cargar variables de entorno
const logger = new Logger('MailProcessor');
@Processor('mailQueue')
export class MailProcessor {
  private transporter;

  constructor() {
    this.initializeTransporter();
  }

  private async initializeTransporter() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    try {
      await this.transporter.verify();
      logger.log(`✅ Mail server ready`);
    } catch (error) {
      console.error('❌ Error al conectar con el servidor de correo:', error);
    }
  }

  @Process('sendEmail')
  async handleEmail(job: Job) {
    console.log(`📩 Enviando correo a: ${job.data.to}`);

    const mailOptions = {
      from: `"Notificación" <${process.env.EMAIL_USER}>`,
      to: job.data.to,
      subject: job.data.subject,
      text: job.data.text,
    };

    try {
      await this.transporter.sendMail(mailOptions);
      console.log(`✅ Correo enviado correctamente - ${job.data.subject}`);
    } catch (error) {
      console.error('❌ Error al enviar correo:', error);
      throw error;
    }
  }
}
