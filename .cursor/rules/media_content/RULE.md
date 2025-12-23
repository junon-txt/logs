---
description: General Guidelines for media content
alwaysApply: false
---

### Media Contract

#### Images

- Referenced semantically, not embedded with HTML
- Content declares *that an image exists*, not how it is shown
- Optional captions allowed
- No layout, size, or styling hints in content

#### Videos

- External references only (e.g. YouTube)
- Content stores platform + identifier
- No iframe or embed logic in content

---

### Media Abstraction Rule

- Content must not hardcode final media URLs
- Media references are logical paths or identifiers
- Resolution to actual URLs happens outside content

This enables future migration to CDNs or external storage.

---