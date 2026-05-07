/// <reference types="vitest" />
import '@testing-library/jest-dom/vitest';

// ─── Chrome API Mock ────────────────────────────────────

const storage: Record<string, unknown> = {};

const chromeMock = {
  runtime: {
    sendMessage: vi.fn(),
    onMessage: {
      addListener: vi.fn(),
      removeListener: vi.fn(),
    },
    getURL: (path: string) => `chrome-extension://mock-id/${path}`,
  },
  storage: {
    local: {
      get: vi.fn((keys: string | string[] | null) => {
        const result: Record<string, unknown> = {};
        if (!keys) return Promise.resolve(result);
        const keyList = typeof keys === 'string' ? [keys] : keys;
        for (const k of keyList) {
          if (k in storage) result[k] = storage[k];
        }
        return Promise.resolve(result);
      }),
      set: vi.fn((items: Record<string, unknown>) => {
        Object.assign(storage, items);
        return Promise.resolve();
      }),
      remove: vi.fn((keys: string | string[]) => {
        const keyList = typeof keys === 'string' ? [keys] : keys;
        for (const k of keyList) delete storage[k];
        return Promise.resolve();
      }),
      getBytesInUse: vi.fn(() => Promise.resolve(0)),
    },
    onChanged: {
      addListener: vi.fn(),
      removeListener: vi.fn(),
    },
  },
  tabs: {
    query: vi.fn(),
    sendMessage: vi.fn(),
  },
};

Object.assign(globalThis, { chrome: chromeMock });

// Reset storage between tests
afterEach(() => {
  for (const key of Object.keys(storage)) {
    delete storage[key];
  }
});
