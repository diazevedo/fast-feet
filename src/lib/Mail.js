import nodemailer from 'nodemailer';
import { resolve } from 'path';
import expHbs from 'express-handlebars';
import nodemailHbs from 'nodemailer-express-handlebars';

import mailConfig from '~config/mail';

class Mail {
  constructor() {
    const { host, port, secure, auth } = mailConfig;

    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      // some mail services does not require user. So we test it
      auth: auth.user ? auth : null,
    });

    this.configureTemplates();
  }

  sendMail(message) {
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message,
    });
  }

  configureTemplates() {
    const viewsPath = resolve(__dirname, '..', 'app', 'views');

    this.transporter.use(
      'compile',
      nodemailHbs({
        viewEngine: expHbs.create({
          layoutsDir: resolve(viewsPath, 'emails', 'layouts'),
          partialsDir: resolve(viewsPath, 'partials'),
          defaultLayout: 'default',
          extname: '.handlebars',
        }),
        viewPath: viewsPath,
        extname: '.handlebars',
      })
    );
  }
}

export default new Mail();
