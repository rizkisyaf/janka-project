'use client'

export const TelegramWrapper = () => {
  if (typeof window === 'undefined') {
    const TelegramClient = require('telegram').TelegramClient;
    const StringSession = require('telegram/sessions').StringSession;
    
    const apiId = process.env.TELEGRAM_API_ID ?? '';
    const apiHash = process.env.TELEGRAM_API_HASH ?? '';
    const botToken = process.env.TELEGRAM_BOT_TOKEN ?? '';
    const stringSession = new StringSession('');
    const telegramClient = new TelegramClient(stringSession, Number(apiId), apiHash, { connectionRetries: 5 });
  }
  return null;
} 