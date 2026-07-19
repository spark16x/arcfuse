import { integrations, activityTimeline, unifiedFeed } from "./mock-data";

const isBrowser = typeof window !== "undefined";

let store = null;

if (isBrowser) {
  if (!window.__inMemoryDb) {
    window.__inMemoryDb = {
      activity_timeline: [...activityTimeline],
      unified_feed: [...unifiedFeed],
      integrations: [...integrations],
      workspace_settings: []
    };
  }
  store = window.__inMemoryDb;
} else {
  store = {
    activity_timeline: [...activityTimeline],
    unified_feed: [...unifiedFeed],
    integrations: [...integrations],
    workspace_settings: []
  };
}

export const inMemoryDb = store;
