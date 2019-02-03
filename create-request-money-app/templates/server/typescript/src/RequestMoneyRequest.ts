import express = require('express');
export interface RequestMoneyRequest extends express.Request {
  body: {
    amount: number;
    contactName: string;
    email: string;
    memo?: string;
  };
}
