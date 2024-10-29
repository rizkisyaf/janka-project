'use client'

export const TelegramWrapper = async () => {
  if (typeof window === 'undefined') {
    const { TelegramClient } = await import('telegram');
    const { StringSession } = await import('telegram/sessions');
    
    const apiId = process.env.TELEGRAM_API_ID ?? '';
    const apiHash = process.env.TELEGRAM_API_HASH ?? '';
    const botToken = process.env.TELEGRAM_BOT_TOKEN ?? '';
    const stringSession = new StringSession('');
    const telegramClient = new TelegramClient(stringSession, Number(apiId), apiHash, { connectionRetries: 5 });
  }
  return null;
}