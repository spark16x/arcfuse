## 2024-06-03 - [IntersectionObserver over Scroll Event Listeners]
**Learning:** Using `getBoundingClientRect` inside a synchronous `scroll` event handler can cause severe layout thrashing and drop frames, as it forces the browser to recalculate layouts continuously.
**Action:** Replace `scroll` event listeners that check element positions with `IntersectionObserver` to allow the browser to asynchronously track visibility without blocking the main thread.
