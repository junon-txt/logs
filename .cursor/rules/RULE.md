---
description: Core Philosophy
alwaysApply: false
---
# Personal Diary Website – Architecture & Guidelines

This document consolidates the full architectural guidelines for building a **content-first, long-lived, static diary website**. It is framework-agnostic and intentionally conservative, prioritizing durability, clarity, and future maintainability.

---

## Core Philosophy

- The diary is **content**, not a UI.
- The website is a **view** over that content.
- Content must survive independently of frameworks, tooling, and hosting providers.
- Everything dynamic is optional and replaceable.

> If the website disappears, the diary must remain readable and meaningful.

---
