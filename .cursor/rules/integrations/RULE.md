---
description: Guidelines for integrating with other external services
alwaysApply: false
---
### Subscriptions Integration

- External service handles:
  - Email storage
  - Opt-in / opt-out
  - Delivery

The site only submits intent.

---

### Reactions Integration

- Client-side signal → external endpoint
- Entry identified by stable ID (e.g. date)
- Optimistic UI updates

If removed, nothing breaks.

---

### Analytics (Optional)

- Aggregate only
- Removable in one step
- No influence on content or rendering

---

### Failure Matrix

| Component | Failure Effect |
|---------|---------------|
| Hosting | Site unavailable |
| Images | Missing placeholders |
| Videos | Empty embeds |
| Resume | Starts fresh |
| Reactions | No counts |
| Subscriptions | Visible error |

Nothing blocks reading.
