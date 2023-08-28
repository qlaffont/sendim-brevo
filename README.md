[![Test Coverage](https://api.codeclimate.com/v1/badges/1cba2b8c3c1a4b96782c/test_coverage)](https://codeclimate.com/github/qlaffont/sendim-brevo/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/1cba2b8c3c1a4b96782c/maintainability)](https://codeclimate.com/github/qlaffont/sendim-brevo/maintainability) ![npm](https://img.shields.io/npm/v/sendim-brevo) ![npm](https://img.shields.io/npm/dm/sendim-brevo) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/sendim-brevo) ![NPM](https://img.shields.io/npm/l/sendim-brevo)

# sendim-brevo

A simple library to send email with Sendim for Brevo. Old Owner: [@flexper](https://github.com/flexper)

## Usage

```typescript
import { Sendim } from 'sendim';
import { SendimBrevoProviderConfig, SendimBrevoProvider } from 'sendim-brevo';

const sendim = new Sendim();

await sendim.addTransport<SendimBrevoProviderConfig>(
  SendimBrevoProvider,
  { apiKey: process.env.BREVO_APIKEY! },
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
```

## Tests

To execute jest tests (all errors, type integrity test)

```
pnpm test
```

## Maintain

This package use [TSdx](https://github.com/jaredpalmer/tsdx). Please check documentation to update this package.
