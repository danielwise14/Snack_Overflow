import express = require('express');
import dotenv = require('dotenv');
import debug = require('debug');
import { RequestMoneyRequest } from './RequestMoneyRequest';
import { checkSchema, validationResult } from 'express-validator/check';
import axios from 'axios';
import { v4 as uuid } from 'uuid';
import moment = require('moment');
import HttpStatus = require('http-status-codes');
import bodyParser = require('body-parser');
import socketio = require('socket.io');
import http = require('http');

const log = (message: any) => debug('server')(message);

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(bodyParser.json());
app.use(express.static('dist'));
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
const v1 = express.Router();
app.use('/v1', v1);

const REQUEST_MONEY_ENDPOINT =
  'https://gateway-web.beta.interac.ca/publicapi/api/v2/money-requests/send';

v1.post(
  '/request-money',
  checkSchema({
    amount: {
      in: ['body'],
      exists: {
        errorMessage: 'amount must exist',
      },
      isNumeric: {
        errorMessage: 'amount must be numeric',
      },
    },
    contactName: {
      in: ['body'],
      exists: {
        errorMessage: 'contactName must exist',
      },
    },
    email: {
      in: ['body'],
      exists: {
        errorMessage: 'email must exist',
      },
    },
  }),
  async (req: RequestMoneyRequest, res: express.Response) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(HttpStatus.BAD_REQUEST);
      res.send(errors.array());
    }

    const {
      body: { amount, contactName, email, memo },
    } = req;

    try {
      const response = await axios.post(
        REQUEST_MONEY_ENDPOINT,
        {
          sourceMoneyRequestId: uuid().replace(/-/g, ''),
          requestedFrom: {
            contactName,
            language: 'en',
            notificationPreferences: [
              {
                handle: email,
                handleType: 'email',
                active: true,
              },
            ],
          },
          amount,
          currency: 'CAD',
          editableFulfillAmount: false,
          requesterMessage: memo,
          expiryDate: moment()
            .hour(23)
            .minute(59)
            .second(59)
            .utc()
            .toISOString(),
          supressResponderNotifications: false,
        },
        {
          headers: {
            accessToken: `Bearer ${process.env.ACCESS_TOKEN}`,
            thirdPartyAccessId: process.env.THIRD_PARTY_ACCESS_ID,
            apiRegistrationId: process.env.API_REGISTRATION_ID,
            requestId: uuid(),
            deviceId: uuid(),
            'Content-Type': 'application/json; charset=UTF-8',
          },
        },
      );

      res.status(HttpStatus.ACCEPTED);
      res.send(response.data);
    } catch (err) {
      log(err.response.data);
      res.status(HttpStatus.BAD_REQUEST);
      res.send(err.response.data);
    }
  },
);

v1.post('/notifications', (req, res) => {
  log(req.body);
  io.emit('notifications', { data: JSON.stringify(req.body) });

  res.status(HttpStatus.ACCEPTED);
  res.send('');
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  log(`Server listening on port ${PORT}`);
  log('Press Ctrl+C to quit.');
});
