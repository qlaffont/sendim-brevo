import {
  RawMailOptions,
  SendimTransportInterface,
  TransactionalMailOptions,
} from 'sendim';
import * as Brevo from 'sib-api-v3-typescript';
import { AccountApiApiKeys } from 'sib-api-v3-typescript/api/accountApi';
import { TransactionalEmailsApiApiKeys } from 'sib-api-v3-typescript/api/transactionalEmailsApi';

export interface SendimBrevoProviderConfig {
  apiKey: string;
}
export class SendimBrevoProvider implements SendimTransportInterface {
  private accountApi: Brevo.AccountApi;
  private smtpTransactionalApi: Brevo.TransactionalEmailsApi;

  providerName = 'brevo';

  constructor(public config: SendimBrevoProviderConfig) {
    this.accountApi = new Brevo.AccountApi();
    this.smtpTransactionalApi = new Brevo.TransactionalEmailsApi();

    this.accountApi.setApiKey(AccountApiApiKeys.apiKey, config.apiKey);
    this.smtpTransactionalApi.setApiKey(
      TransactionalEmailsApiApiKeys.apiKey,
      config.apiKey,
    );
  }

  async isHealthy() {
    const account = await this.accountApi.getAccount();
    return account?.response?.statusCode === 200;
  }

  async sendRawMail({ attachments, ...options }: RawMailOptions) {
    const send = await this.smtpTransactionalApi.sendTransacEmail({
      ...options,
      attachment: attachments,
    });

    if (!send?.body?.messageId) {
      throw new Error(send.response.statusMessage);
    }
  }

  async sendTransactionalMail({
    attachments,
    ...options
  }: TransactionalMailOptions) {
    const templateId = parseInt(options?.templateId, 10);

    const send = await this.smtpTransactionalApi.sendTransacEmail({
      ...options,
      templateId,
      attachment: attachments,
    });

    if (!send?.body?.messageId) {
      throw new Error(send.response.statusMessage);
    }
  }
}
