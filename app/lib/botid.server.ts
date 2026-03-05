import { checkBotId } from "botid/server";

/**
 * Check if a request is from a bot and throw an error if it is
 * Use this in your server actions/API routes
 */
export async function requireHumanUser(): Promise<void> {
  const { isBot } = await checkBotId();

  if (isBot) {
    throw new Error("BotID: Request detected as automated bot traffic");
  }
}

/**
 * Type definitions for BotID verification response
 */
export interface BotIdVerification {
  isBot: boolean;
  score?: number;
  details?: Record<string, unknown>;
}
