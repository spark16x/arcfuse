import { test, mock } from 'node:test';
import assert from 'node:assert';

// Mock @supabase/ssr BEFORE importing the client
mock.module('@supabase/ssr', {
  namedExports: {
    createBrowserClient: (url, key) => {
      return { url, key, isMock: true };
    }
  }
});

// Import createClient AFTER mocking
const { createClient } = await import('./client.js');

/**
 * Helper to run a test with a clean environment and restore it afterwards.
 */
function testWithEnv(name, envOverrides, fn) {
  test(name, (t) => {
    const originalEnv = { ...process.env };

    // Apply overrides
    for (const [key, value] of Object.entries(envOverrides)) {
      if (value === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = value;
      }
    }

    try {
      fn(t);
    } finally {
      // Restore environment variables
      // First, delete any keys that were added or modified
      for (const key in process.env) {
        if (!(key in originalEnv)) {
          delete process.env[key];
        }
      }
      // Then restore original values
      for (const [key, value] of Object.entries(originalEnv)) {
        process.env[key] = value;
      }
    }
  });
}

testWithEnv('createClient uses SUPABASE_URL and SUPABASE_ANON_KEY', {
  SUPABASE_URL: 'https://example.supabase.co',
  SUPABASE_ANON_KEY: 'service-role-key',
  NEXT_PUBLIC_SUPABASE_URL: undefined,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: undefined,
}, () => {
  const client = createClient();
  assert.strictEqual(client.url, 'https://example.supabase.co');
  assert.strictEqual(client.key, 'service-role-key');
  assert.strictEqual(client.isMock, true);
});

testWithEnv('createClient falls back to NEXT_PUBLIC_ variables', {
  SUPABASE_URL: undefined,
  SUPABASE_ANON_KEY: undefined,
  NEXT_PUBLIC_SUPABASE_URL: 'https://public.supabase.co',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'anon-key',
}, () => {
  const client = createClient();
  assert.strictEqual(client.url, 'https://public.supabase.co');
  assert.strictEqual(client.key, 'anon-key');
});

testWithEnv('createClient prioritizes non-prefixed variables', {
  SUPABASE_URL: 'https://private.supabase.co',
  SUPABASE_ANON_KEY: 'private-key',
  NEXT_PUBLIC_SUPABASE_URL: 'https://public.supabase.co',
  NEXT_PUBLIC_SUPABASE_ANON_KEY: 'public-key',
}, () => {
  const client = createClient();
  assert.strictEqual(client.url, 'https://private.supabase.co');
  assert.strictEqual(client.key, 'private-key');
});
