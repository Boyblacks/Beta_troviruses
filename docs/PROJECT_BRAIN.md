عالی. این دقیقاً همون جاییه که باید مغز پروژه رو بسازیم. 🧠

مرحله ۶ — محتوای PROJECT_BRAIN.md

چون این فایل قراره مرجع اصلی همه AIها باشه، از همین اول باید دقیق و قابل‌فهم باشه.

کل محتوای فعلی PROJECT_BRAIN.md رو پاک کن و متن زیر رو دقیقاً بذار:

# TROVIRUSES — PROJECT BRAIN

> This file is the central source of truth for the TROVIRUSES project.
> Every developer or AI working on this project must read this file before making changes.

---

## 1. Project Identity

**Project Name:** TROVIRUSES

**Project Type:** Modular mobile-first web application

**Current Status:** Architecture / Initial Setup

**Primary Goal:**
Build a polished, modular, expandable personal development application with gamification, productivity, learning, and self-improvement systems.

---

## 2. Core Development Philosophy

TROVIRUSES must be developed as a modular software project.

The project must NOT become one giant HTML file or one giant JavaScript file.

Every major feature should be isolated into its own module while still communicating with the rest of the application through shared systems.

### Golden Rules

1. Do not rewrite unrelated code.
2. Do not remove existing functionality unless explicitly requested.
3. Do not change the architecture without documenting the reason.
4. Do not duplicate global state.
5. Do not create hidden dependencies between modules.
6. Keep modules small and focused.
7. Prefer simple solutions over unnecessary complexity.
8. Every major change must be tested before moving to the next feature.
9. Never assume a feature is safe to modify without checking its dependencies.
10. Preserve existing UI and behavior unless a change is explicitly requested.

---

## 3. Technology Rules

### Allowed

- HTML5
- CSS3
- Vanilla JavaScript
- SVG
- Browser APIs
- LocalStorage / IndexedDB when appropriate
- Git
- GitHub

### Not Allowed Without Explicit Approval

- React
- Vue
- Angular
- Svelte
- TypeScript
- Node.js
- npm
- Large build systems
- Unnecessary external dependencies
- External APIs unless explicitly approved

The application should remain lightweight and capable of running directly in a browser.

---

## 4. Design Direction

### Visual Style

- Dark OLED interface
- Pure black main background
- Dark gray surfaces
- White primary text
- Clear accent color
- Rounded UI elements
- Mobile-first design
- Clean spacing
- Smooth but lightweight animations
- Modern application-like interface

### UX Principles

- Fast
- Simple
- Responsive
- Touch-friendly
- Clear visual hierarchy
- Minimal unnecessary navigation
- Consistent components

---

## 5. Application Architecture

The application is divided into several layers.

### Core

Responsible for application-wide systems.

- State
- Storage
- Events
- Routing
- Application initialization

### Components

Reusable UI components.

Examples:

- Bottom navigation
- Bottom sheets
- Modals
- Toasts
- Cards
- Buttons
- Dialogs

### Sections

Major application areas.

Initial sections:

- Home
- Worlds
- Others
- Sidebar
- Settings

Future sections may be added without restructuring the entire application.

---

## 6. Communication Between Modules

Modules must communicate through controlled interfaces.

Avoid directly modifying another module's internal state.

Preferred communication methods:

1. Shared application state
2. Event system
3. Public module methods

Example:

```text
Settings
    ↓
Event
    ↓
Global State
    ↓
Other Modules

Example:

Worlds
    ↓
Reward / XP Event
    ↓
State
    ↓
Home / Character / Progress


---

7. Global State

There must be one central source of truth for application state.

Example structure:

AppState = {
    user: {},
    character: {},
    worlds: {},
    habits: {},
    quests: {},
    inventory: {},
    settings: {},
    progress: {}
};

This structure is only a conceptual starting point.

The actual state architecture must be documented before implementation.


---

8. Storage

Persistent data must be handled through a dedicated storage layer.

Modules should NOT directly manipulate LocalStorage or IndexedDB unless explicitly approved.

Preferred architecture:

Module
   ↓
State
   ↓
Storage Layer
   ↓
Browser Storage


---

9. Module Structure

Each major module should expose a small public API.

Example:

Home.init();
Home.render();
Home.refresh();
Home.destroy();

The exact API may change when the architecture is finalized.


---

10. Current Features

Implemented

None.

In Development

Architecture and project foundation.

Planned

Home

Worlds

Others

Sidebar

Settings

Character system

XP

Levels

Stats

Coins

Store

Inventory

Habits

Quests

Achievements

Progress tracking

Flashcards

Notifications

Gamification systems


This list is not final.


---

11. Current Development Stage

We are currently at:

Stage 0 — Project Foundation

Current tasks:

Create repository

Create project documentation

Define architecture

Define design system

Build core systems

Build application shell

Build sections one by one


No major feature should be implemented before the architecture foundation is ready.


---

12. Development Workflow

Every feature follows this process:

Plan
  ↓
Define dependencies
  ↓
Implement
  ↓
Test
  ↓
Review
  ↓
Document
  ↓
Commit

Never implement multiple unrelated major features simultaneously.


---

13. Git Rules

Use small, meaningful commits.

Examples:

docs: add project brain
core: add application state
core: add storage layer
core: add event system
ui: add application shell
ui: add bottom navigation
feature: add home section
feature: add worlds section

Do not use vague commit messages such as:

update
changes
fix stuff
final
final2
final-final


---

14. AI Development Rules

Any AI working on TROVIRUSES must:

1. Read PROJECT_BRAIN.md first.


2. Inspect the relevant files before changing them.


3. Identify dependencies.


4. Change only what is necessary.


5. Preserve unrelated functionality.


6. Explain which files are affected.


7. Avoid full-project rewrites unless explicitly requested.


8. Never invent existing architecture.


9. Update documentation when architecture changes.


10. Never claim a feature works without testing it.




---

15. Change Safety

Before modifying a file, determine:

What depends on this file?

What does this file depend on?

What functionality could be affected?

Is the requested change local or architectural?


If the change may affect multiple modules, document the dependency before implementation.


---

16. Current Decisions

Confirmed

Project will be modular.

Project will be mobile-first.

Vanilla HTML/CSS/JavaScript will be used.

GitHub will be the primary repository.

Git will be used for version control.

Lightweight development tools are preferred.

The project should remain suitable for low-end hardware.

PROJECT_BRAIN.md is the central project reference.


Not Yet Decided

Exact folder structure

Exact state architecture

Exact event architecture

Exact storage architecture

Final design system

Final feature list

Final navigation structure


These decisions must be made before implementation.


---

17. Important Rule

When uncertain, DO NOT guess.

Stop and inspect the project, documentation, dependencies, or ask for clarification.

The stability of the project is more important than implementing a feature quickly.


---

18. Change Log

2026-08-15

Created TROVIRUSES repository.

Created PROJECT_BRAIN.md.

Established modular architecture philosophy.

Established AI development rules.

Established Git workflow.

Established technology constraints.


بعد از وارد کردنش:

1. پایین صفحه برو.
2. قسمت **Commit changes** رو پیدا کن.
3. پیام commit رو بذار:

```text
docs: create project brain

4. بعد Commit changes رو بزن.



بعد از Commit

هیچ فایل دیگه‌ای نساز.

فقط بهم بگو:

> PROJECT_BRAIN کامیت شد



بعد می‌ریم سراغ ARCHITECTURE.md و اونجا دقیقاً مشخص می‌کنیم بخش‌های TROVIRUSES چطور به هم وصل بشن.
