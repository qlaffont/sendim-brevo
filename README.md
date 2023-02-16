[![Test Coverage](https://api.codeclimate.com/v1/badges/0505e350e23c43359432/test_coverage)](https://codeclimate.com/github/flexper/sendim-sendinblue/test_coverage) [![Maintainability](https://api.codeclimate.com/v1/badges/0505e350e23c43359432/maintainability)](https://codeclimate.com/github/flexper/sendim-sendinblue/maintainability) ![npm](https://img.shields.io/npm/v/sendim-sendinblue) ![npm](https://img.shields.io/npm/dm/sendim-sendinblue) ![Snyk Vulnerabilities for npm package](https://img.shields.io/snyk/vulnerabilities/npm/sendim-sendinblue) ![NPM](https://img.shields.io/npm/l/sendim-sendinblue)

# sendim-sendinblue

A simple library to send email with Sendim for Sendinblue.

## Usage

```typescript
import { Sendim } from 'sendim';
import { SendimSendinblueProviderConfig, SendimSendinblueProvider } from 'sendim-sendinblue';

const sendim = new Sendim();

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
```

## Tests

To execute jest tests (all errors, type integrity test)

```
pnpm test
```

## Maintain

This package use [TSdx](https://github.com/jaredpalmer/tsdx). Please check documentation to update this package.
