## 2024-05-13 - Missing React.memo
**Learning:** The dashboard components, specifically `UnifiedFeed` which loops over mock-data without memoization and `OverviewCards` which loops over metrics, don't use React.memo and have inline random math operations and map loops that are rendering on every update.
**Action:** Add React.memo to `UnifiedFeed` or avoid inline `Math.random()` which breaks hydration and causes unnecessary recalculations.
