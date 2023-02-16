import { describe, expect, it } from '@jest/globals';
import { Sendim } from 'sendim';

import {
  SendimSendinblueProvider,
  SendimSendinblueProviderConfig,
} from '../src';

describe('Sendim SendInBlue', () => {
  it('should be Defined', () => {
    expect(Sendim).toBeDefined();
  });

  it('should be able to define log', () => {
    expect(new Sendim('debug')).toBeDefined();
  });

  it('should be able to add transport', async () => {
    const sendim = new Sendim();

    try {
      await sendim.addTransport<SendimSendinblueProviderConfig>(
        SendimSendinblueProvider,
        { apiKey: '' },
      );
      // eslint-disable-next-line no-empty
    } catch (error) {}

    expect(sendim).toBeDefined();
    expect(sendim.transports).toBeDefined();
    expect(Object.keys(sendim.transports)).toHaveLength(0);

    try {
      await sendim.addTransport<SendimSendinblueProviderConfig>(
        SendimSendinblueProvider,
        { apiKey: process.env.SENDINBLUE_APIKEY! },
      );
      // eslint-disable-next-line no-empty
    } catch (error) {}

    expect(sendim).toBeDefined();
    expect(sendim.transports).toBeDefined();
    expect(Object.keys(sendim.transports)).toHaveLength(1);
  });

  it('should be able to send raw email', async () => {
    const sendim = new Sendim('debug');

    await sendim.addTransport<SendimSendinblueProviderConfig>(
      SendimSendinblueProvider,
      { apiKey: process.env.SENDINBLUE_APIKEY! },
    );

    await sendim.sendRawMail({
      textContent: 'test',
      htmlContent: '<p>test</p>',
      subject: 'test',
      to: [
        {
          email: 'test@test.fr',
        },
      ],
      sender: {
        email: 'test@test.fr',
      },
    });
  });

  it('should be able to send transactional email', async () => {
    const sendim = new Sendim('debug');

    await sendim.addTransport<SendimSendinblueProviderConfig>(
      SendimSendinblueProvider,
      { apiKey: process.env.SENDINBLUE_APIKEY! },
    );

    await sendim.sendTransactionalMail({
      templateId: '6',
      to: [
        {
          email: 'test@test.fr',
        },
      ],
      sender: {
        email: 'test@test.fr',
      },
    });
  });
});
