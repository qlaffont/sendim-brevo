import { beforeEach, describe, expect, it, jest } from '@jest/globals';
import { Sendim } from 'sendim';

const mockSendTransacEmail = jest.fn().mockImplementation(() => {
  return { body: { messageId: 'test' } };
});
jest.mock('sib-api-v3-typescript', () => {
  return {
    TransactionalEmailsApi: jest.fn().mockImplementation(() => {
      return {
        sendTransacEmail: mockSendTransacEmail,
        setApiKey: jest.fn(),
      };
    }),
    AccountApi: jest.fn().mockImplementation(() => {
      return {
        getAccount: jest.fn(() => ({
          response: {
            statusCode: process.env.FAILED === 'true' ? 400 : 200,
          },
        })),
        setApiKey: jest.fn(),
      };
    }),
  };
});

import {
  SendimSendinblueProvider,
  SendimSendinblueProviderConfig,
} from '../src';

describe('Sendim SendInBlue', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should be Defined', () => {
    expect(Sendim).toBeDefined();
  });

  it('should be able to define log', () => {
    expect(new Sendim('debug')).toBeDefined();
  });

  it('should be able to add transport', async () => {
    const sendim = new Sendim();

    try {
      process.env.FAILED = 'true';
      await sendim.addTransport<SendimSendinblueProviderConfig>(
        SendimSendinblueProvider,
        { apiKey: '' },
      );
    } catch (error) {
      expect(sendim).toBeDefined();
      expect(sendim.transports).toBeDefined();
      expect(Object.keys(sendim.transports)).toHaveLength(0);
    }

    process.env.FAILED = 'false';
    await sendim.addTransport<SendimSendinblueProviderConfig>(
      SendimSendinblueProvider,
      { apiKey: process.env.SENDINBLUE_APIKEY! },
    );
    // eslint-disable-next-line no-empty

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

    expect(mockSendTransacEmail).toBeCalledWith({
      attachment: undefined,
      htmlContent: '<p>test</p>',
      sender: {
        email: 'test@test.fr',
      },
      subject: 'test',
      textContent: 'test',
      to: [
        {
          email: 'test@test.fr',
        },
      ],
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
