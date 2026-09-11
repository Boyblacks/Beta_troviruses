عالی. حالا این فایل می‌شه نقشه فنی TROVIRUSES؛ ولی یک قانون: چیزی که الان می‌ذاریم، معماری پایه‌ست و UI نهایی رو هنوز قفل نمی‌کنیم چون گفتی برای هر بخش کد UI خودت رو میاری.

الان docs/ARCHITECTURE.md رو کامل خالی کن و اینو بذار:

# TROVIRUSES — ARCHITECTURE

> This document defines how TROVIRUSES is structured and how its modules communicate.
> It is a technical architecture document, not a visual design specification.

---

## 1. Architecture Goals

TROVIRUSES must be:

- Modular
- Lightweight
- Maintainable
- Expandable
- Mobile-first
- Easy to modify
- Safe for incremental development

A feature must be replaceable or editable without requiring a rewrite of unrelated parts of the application.

---

## 2. Core Principle

The application is divided into independent modules.

```text
Application
    │
    ├── Core
    ├── Systems
    ├── Components
    └── Sections

Modules should communicate through controlled interfaces rather than directly modifying each other's internal implementation.


---

3. High-Level Architecture

TROVIRUSES
                              │
              ┌───────────────┼───────────────┐
              │               │               │
             Core             UI             Data
              │               │               │
       ┌──────┼──────┐   ┌────┼────┐     Storage Layer
       │      │      │   │    │    │          │
     State  Events Storage Nav Search       Browser


---

4. Application Core

The Core layer contains systems required by the entire application.

js/core/
├── app.js
├── state.js
├── events.js
├── storage.js
└── router.js

app.js

Responsible for application initialization and startup.

state.js

Responsible for centralized application state.

No major module should create its own independent global application state.

events.js

Provides communication between modules without creating unnecessary direct dependencies.

storage.js

Provides the application's persistent storage interface.

Sections should not directly manipulate browser storage unless explicitly approved.

router.js

Responsible for navigation between application views when routing is required.


---

5. Global State

TROVIRUSES uses a centralized state architecture.

Conceptual structure:

AppState = {
    user: {},
    character: {},
    xp: {},
    worlds: {},
    settings: {},
    ui: {}
};

This structure is a starting point and may evolve as the real systems are implemented.

The actual state schema must remain documented.


---

6. UI Architecture

The UI has three major levels:

UI
│
├── App Shell
├── Shared Components
└── Sections

App Shell

The App Shell contains the persistent application structure.

Examples:

Main application container

Navigation

Global overlays

Global search

Global notifications


Shared Components

Reusable UI elements should exist independently from sections.

Examples:

Bottom Navigation

Modal

Bottom Sheet

Toast

Search

Cards

Buttons


Sections

Major application areas are independent modules.

Current sections:

Home
Worlds
Others
Sidebar
Settings


---

7. Navigation

The main application uses a bottom navigation system.

Current navigation targets:

1. Home


2. Worlds


3. Others


4. Sidebar


5. Settings



Navigation must not duplicate application logic.

The navigation component should communicate with the application router/state rather than directly manipulating every section.


---

8. Home

Home is the primary application screen.

Planned responsibilities include:

Main dashboard

Global progress overview

XP / Level overview

Search access

Quick access to important application features


The final Home UI will be determined from the UI implementation supplied during development.

Home must not contain the internal implementation of other major systems.


---

9. Worlds

Worlds is a dedicated application section.

There are currently four Worlds:

World 1
World 2
World 3
World 4

Selecting Worlds should allow the user to choose one of the four Worlds before entering its content.

The World selection interface may use a horizontal / sliding interaction.

The exact visual implementation is intentionally not fixed in this document.


---

10. World Architecture

Worlds use a shared World Engine rather than four completely duplicated implementations.

World Engine
      │
      ├── World 1 Data
      ├── World 2 Data
      ├── World 3 Data
      └── World 4 Data

Each World has independent data.

A World may contain:

World identity

World progress

Player progress

XP

Level

Rivals

Flashcards

Flashcard review

Flashcard statistics


The engine should provide common functionality while World-specific data remains separate.


---

11. Rivals

Each World has its own fictional rivals.

Requirements:

More than 10 rivals per World

Different rivals between Worlds

English names

Rivals are fictional

Rival data is independent from other Worlds


Example conceptual structure:

worlds: {
    world1: {
        rivals: []
    },

    world2: {
        rivals: []
    },

    world3: {
        rivals: []
    },

    world4: {
        rivals: []
    }
}

The actual rival data will be defined separately from the World engine.


---

12. XP and Level System

XP and Level are application systems rather than World-specific duplicated systems.

Conceptually:

Activity
   ↓
XP System
   ↓
Player Progress
   ↓
Level

Potential XP sources include:

Flashcard activity

World activities

Future quests

Future habits

Future achievements


The exact XP rules will be defined when the relevant features are implemented.

No module should independently implement its own incompatible XP calculation.


---

13. Flashcard Architecture

Only the four Worlds currently contain Flashcards.

The Others section does NOT currently contain Flashcards.

World 1
└── Flashcards

World 2
└── Flashcards

World 3
└── Flashcards

World 4
└── Flashcards

There should be one reusable Flashcard Engine.

Flashcard Engine
       │
       ├── World 1 Deck
       ├── World 2 Deck
       ├── World 3 Deck
       └── World 4 Deck

The engine provides common functionality.

World data provides the actual cards.


---

14. World-Scoped Flashcard Review

Flashcard review is strictly scoped to the selected World.

Example:

World 1
├── Cards
├── Review
├── Progress
└── Statistics

World 1 review must never automatically include cards from World 2, World 3, or World 4.

The same rule applies to every World.

World 1 Review → World 1 Cards only
World 2 Review → World 2 Cards only
World 3 Review → World 3 Cards only
World 4 Review → World 4 Cards only


---

15. Flashcard Data Isolation

Flashcard data must remain associated with its World.

Conceptual structure:

flashcards: {
    world1: {},
    world2: {},
    world3: {},
    world4: {}
}

Review progress must also remain World-scoped.

This prevents accidental cross-World review sessions.


---

16. Others

The Others section is currently empty.

Others
└── Empty

No placeholder features should be implemented until a real feature is defined.

Future features may be added without changing the existing World architecture.


---

17. Sidebar

Sidebar is a launcher for utility features.

When activated, it should open a dedicated UI panel / bottom sheet rather than behaving like a normal content section.

Initial planned utilities include:

Sidebar
├── Notes
├── To-Do List
└── Future utilities

Each utility should be independently modular.

Example:

Sidebar
    ↓
Utility Selection
    ↓
Notes / To-Do / Future Utility

Sidebar itself should not contain the internal implementation of every utility.


---

18. Settings

Settings is a dedicated application section.

The Settings interface should be professional, structured, and scalable.

Potential categories include:

Settings
├── Appearance
├── Notifications
├── Gameplay
├── Data
├── Privacy
└── About

These categories are architectural placeholders and are not yet final feature requirements.

Settings should communicate with centralized state rather than directly modifying unrelated modules.


---

19. Future Media System

A Music / Video system is planned for a later development phase.

It is intentionally excluded from the current implementation.

Future architecture may contain:

Media
├── Music
└── Video

No Media implementation should be added until explicitly requested.


---

20. Module Communication

Preferred communication flow:

Module
   ↓
Public API / Event
   ↓
Core System
   ↓
State
   ↓
Other Modules

Avoid:

Module A
   ↓
directly changes
   ↓
Module B internal variables

Modules should expose only what other modules actually need.


---

21. Storage Architecture

Persistent data should follow:

Section / System
        ↓
Application State
        ↓
Storage Layer
        ↓
Browser Storage

The storage implementation may use LocalStorage or IndexedDB depending on future requirements.

The choice will be made when the storage system is implemented.


---

22. UI Integration Workflow

The visual implementation of each major section will be provided incrementally.

For each section:

User provides UI code/design
            ↓
Inspect UI
            ↓
Map UI to TROVIRUSES architecture
            ↓
Separate HTML / CSS / JS
            ↓
Connect to application systems
            ↓
Test
            ↓
Commit

The architecture must adapt to the provided UI where possible.

The UI should not force unnecessary rewrites of unrelated systems.


---

23. Feature Independence

Each major feature should be independently editable.

Example:

Worlds
├── World Engine
├── World Data
└── Flashcard System

Settings
└── Settings System

Sidebar
├── Notes
└── To-Do

Changing Notes should not require rewriting Worlds.

Changing World 2 should not require rewriting World 1.

Changing the Settings UI should not require rewriting the XP engine.


---

24. Duplication Rule

Do not copy complete implementations for similar features.

Bad:

world1.js
world2.js
world3.js
world4.js

where each contains the same logic.

Preferred:

World Engine
     +
World-specific data

The same principle applies to:

Flashcards

Rivals

XP

Levels

Settings categories

Sidebar utilities



---

25. Development Rule

Build one layer at a time.

Architecture
    ↓
Core
    ↓
UI Components
    ↓
App Shell
    ↓
Sections
    ↓
Feature Systems
    ↓
Polish

Do not build several unrelated systems simultaneously.


---

26. Testing Rule

After every meaningful change:

1. Run the application.


2. Test the changed feature.


3. Test the most likely affected feature.


4. Check browser console for errors.


5. Confirm unrelated navigation still works.


6. Commit only after verification.




---

27. AI Safety Rules

Any AI modifying TROVIRUSES must:

1. Read PROJECT_BRAIN.md.


2. Read this architecture document.


3. Inspect relevant files before editing.


4. Identify dependencies.


5. Modify only required files.


6. Never rewrite unrelated modules.


7. Never replace the entire project unless explicitly requested.


8. Never invent files or functionality.


9. Preserve existing behavior.


10. Explain affected files before major changes.


11. Test changes.


12. Update documentation when architecture changes.




---

28. Current Architecture Status

Implemented

Project repository

Project Brain

Architecture document


Not Yet Implemented

App Core

State system

Event system

Storage system

Router

UI component system

App Shell

Bottom Navigation

Home

Worlds

World Engine

XP system

Level system

Rivals

Flashcard Engine

World-specific Flashcards

Sidebar utilities

Settings

Media



---

29. Architecture Change Policy

Architecture may evolve as TROVIRUSES grows.

However, architectural changes must:

1. Have a clear reason.


2. Avoid unnecessary rewrites.


3. Preserve existing functionality.


4. Be documented.


5. Be tested before continuing development.



The goal is not to create a perfect architecture immediately.

The goal is to create an architecture that can evolve safely.


---

30. Current Development Phase

PHASE 0 — FOUNDATION

[✓] Repository
[✓] Project Brain
[✓] Architecture

Next:

[ ] Feature Map
[ ] Core architecture implementation
[ ] UI component architecture
[ ] App Shell
[ ] Bottom Navigation
[ ] Home UI
[ ] Worlds UI
[ ] World Engine
[ ] Flashcard Engine
[ ] Remaining sections


---

Final Principle

TROVIRUSES should grow by adding and modifying modules.

It should NOT grow by repeatedly rewriting the entire application.

ADD
  ↓
CONNECT
  ↓
TEST
  ↓
IMPROVE

NOT

REWRITE
  ↓
BREAK
  ↓
REWRITE AGAIN

### بعدش

پایین صفحه:

**Commit changes**

پیام commit:

```text
docs: define project architecture

و Commit changes رو بزن.

بعد از Commit، هیچ فایل و کدی نساز.

فقط بگو:

«Architecture کامیت شد»

بعد می‌ریم سراغ یک مرحله خیلی مهم‌تر: ساختار واقعی پوشه‌ها؛ و اونجا تصمیم می‌گیریم دقیقاً کدوم فایل‌ها رو بسازیم، بدون اینکه هنوز UI رو حدس بزنیم.
