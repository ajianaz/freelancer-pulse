/**
 * Freelancer Pulse — Background Service Worker
 * v0.0.1 — Message routing
 */

import { addJob, findJobByUrl } from '$lib/storage';
import { generateId } from '$lib/utils';
import type { ExtensionMessage, ParserResult } from '$lib/types';

/** Handle incoming messages from content scripts and popup */
chrome.runtime.onMessage.addListener(
  (message: ExtensionMessage, _sender, sendResponse) => {
    switch (message.type) {
      case 'PING':
        sendResponse({ type: 'PING', pong: true });
        return false; // synchronous

      case 'CLIP_JOB':
        handleClipJob(message.data, sendResponse);
        return true; // async — keep channel open

      case 'CHECK_JOB':
        handleCheckJob(message.data, sendResponse);
        return true; // async

      default:
        sendResponse({ error: `Unknown message type: ${(message as { type: string }).type}` });
        return false;
    }
  },
);

/** Handle CLIP_JOB message */
async function handleClipJob(
  data: ParserResult,
  sendResponse: (response: unknown) => void,
): Promise<void> {
  try {
    // Dedup check
    const existing = await findJobByUrl(data.url);
    if (existing) {
      sendResponse({
        type: 'CLIP_RESULT',
        data: { ok: false, error: 'Already clipped' },
      });
      return;
    }

    // Create new job
    const job = {
      id: generateId(),
      platform: data.platform,
      title: data.title,
      url: data.url,
      description: data.description ?? '',
      budget: {
        raw: data.budgetRaw ?? '',
        min: data.budgetMin ?? null,
        max: data.budgetMax ?? null,
        currency: 'USD' as const,
        type: data.budgetType ?? ('unknown' as const),
      },
      clientName: data.clientName ?? '',
      postedDate: data.postedDate ?? '',
      clippedAt: new Date().toISOString(),
      status: 'clipped' as const,
      tags: data.tags,
      notes: '',
    };

    await addJob(job);

    sendResponse({
      type: 'CLIP_RESULT',
      data: { ok: true, job },
    });
  } catch (err) {
    sendResponse({
      type: 'CLIP_RESULT',
      data: { ok: false, error: err instanceof Error ? err.message : 'Unknown error' },
    });
  }
}

console.log('[Freelancer Pulse] Service worker loaded — v0.0.1');

/** Handle CHECK_JOB message — check if URL already clipped */
async function handleCheckJob(
  data: { url: string },
  sendResponse: (response: unknown) => void,
): Promise<void> {
  try {
    const existing = await findJobByUrl(data.url);
    sendResponse({
      type: 'CHECK_RESULT',
      data: { exists: !!existing },
    });
  } catch {
    sendResponse({ type: 'CHECK_RESULT', data: { exists: false } });
  }
}
