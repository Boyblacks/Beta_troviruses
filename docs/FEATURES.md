عالی. الان دقیقاً در نقطه‌ای هستیم که باید جلوی شلوغ‌کاری رو بگیریم. 😄

قدم بعدی: FEATURES.md.

چرا؟ چون ARCHITECTURE.md گفتیم پروژه چطور ساخته می‌شود؛ حالا باید دقیقاً ثبت کنیم چه چیزهایی قرار است ساخته شوند. این فایل بعداً جلوی AIها رو می‌گیره که مثلاً یهو برای Others فلش‌کارت بسازن یا Worldها رو با هم قاطی کنن.

قدم ۱ — ساخت فایل

در GitHub برو:

Add file → Create new file

اسم:

docs/FEATURES.md

این فایل رو کامل با محتوای زیر پر کن:

# TROVIRUSES — FEATURES

## 1. Project Vision

TROVIRUSES is a modular personal progression application.

The application combines:

- Personal progress
- XP and levels
- Multiple Worlds
- World-specific rivals
- World-specific flashcards
- Review and learning progress
- Notes
- To-Do List
- Settings
- Future media features

The project must remain modular and easy to expand.

---

# 2. Main Navigation

The application currently has five main navigation items:

1. Home
2. Worlds
3. Others
4. Sidebar
5. Settings

The navigation remains accessible from the main application interface.

---

# 3. Home

Home is the main dashboard.

Planned features:

- Search bar
- Global XP
- Current level
- Progress overview
- Quick access
- Important information
- Future dashboard widgets

The exact visual UI is not finalized.

The final UI will be integrated from UI code/design supplied during development.

---

# 4. Worlds

TROVIRUSES currently contains four Worlds:

- World 1
- World 2
- World 3
- World 4

When the user opens Worlds, the four Worlds should be presented for selection.

The World selection interface may use a sliding / horizontal interaction.

Each World is an independent progression environment.

---

# 5. World Features

Every World can have:

- World identity
- Player XP
- Player level
- Player progress
- Rivals
- Flashcards
- Flashcard review
- Flashcard statistics

World-specific information must remain isolated from other Worlds where appropriate.

---

# 6. Rivals

Each World has its own fictional rivals.

Requirements:

- More than 10 rivals per World
- Different rivals between Worlds
- English names
- Fictional characters
- World-specific rankings

Example:

```text
World 1
├── Rival A
├── Rival B
├── Rival C
└── ...

World 2
├── Rival A
├── Rival B
├── Rival C
└── ...

The actual names and data will be created later.


---

7. XP System

TROVIRUSES has a global XP system.

XP represents the user's overall progression.

Potential XP sources may include:

Flashcard activity

World activities

Future quests

Future habits

Future achievements


The exact XP rules will be defined during implementation.


---

8. Level System

The user has a global level.

Concept:

XP
 ↓
Level Progress
 ↓
Level Up

The level system must work with the central XP system.

Different modules must not create incompatible level systems.


---

9. World Flashcards

Flashcards exist ONLY inside the four Worlds.

There are currently no Flashcards inside:

Home

Others

Sidebar

Settings


Structure:

World 1
└── Flashcards

World 2
└── Flashcards

World 3
└── Flashcards

World 4
└── Flashcards


---

10. World-Specific Flashcard Data

Each World has its own Flashcard collection.

Example:

World 1
├── Card 1
├── Card 2
└── Card ...

World 2
├── Card 1
├── Card 2
└── Card ...

Cards from different Worlds must remain separated.


---

11. Flashcard Review

Review belongs to the World containing the cards.

Example:

World 1
├── Flashcards
├── Review
├── Progress
└── Statistics

The same structure applies to World 2, World 3, and World 4.

World 1 Review must only review World 1 cards.

World 2 Review must only review World 2 cards.

And so on.

There must not be an accidental global review session that mixes all four Worlds.


---

12. Flashcard Progress

Each World tracks its own Flashcard progress.

Potential statistics:

Total cards

New cards

Learning cards

Review cards

Completed cards

Review history

Accuracy

Progress percentage


The exact review algorithm will be decided during Flashcard Engine development.


---

13. Others

Others is currently empty.

Others
└── Empty

No Flashcard system should be added to Others.

No placeholder features should be invented.

Features can be added to Others in the future.


---

14. Sidebar

Sidebar is a utility launcher.

When activated, it should open a dedicated panel / bottom sheet.

Initial utilities:

Notes

To-Do List


Future utilities may be added.


---

15. Notes

Notes are accessible through Sidebar.

Notes should eventually support:

Creating notes

Editing notes

Deleting notes

Saving notes

Viewing notes


The exact UI will be decided later.


---

16. To-Do List

To-Do List is accessible through Sidebar.

Potential features:

Create task

Complete task

Edit task

Delete task

Task persistence

Future task categories


The exact feature set will be finalized later.


---

17. Settings

Settings must be a professional and structured section.

Potential categories:

Appearance

Notifications

Gameplay

Data

Privacy

About


The exact settings will be defined during implementation.

Settings should integrate with global application state.


---

18. Search

Home will contain a search bar.

The search system is intended to provide access to relevant application content.

The exact search scope is not finalized.

The search system should be modular so that additional searchable content can be added later.


---

19. Media

Music and Video functionality is planned for a future phase.

It is NOT part of the current implementation.

Future concept:

Media
├── Music
└── Video

No Media code should be implemented until explicitly requested.


---

20. UI Development

The UI for each major section will be supplied separately during development.

Workflow:

UI provided
 ↓
UI inspected
 ↓
UI adapted to architecture
 ↓
Logic connected
 ↓
Data connected
 ↓
Testing

The existing UI should be preserved whenever possible.

Do not replace supplied UI with an unrelated design.


---

21. Modularity

Each major feature should be independently editable.

Examples:

Worlds
World Engine
Flashcard Engine
Notes
To-Do
Settings

Changing one feature should not require rewriting unrelated features.


---

22. Reusability

Similar features must use shared engines/components where appropriate.

For example:

One World Engine
    +
Four World Data Sets

and:

One Flashcard Engine
    +
Four World Flashcard Data Sets

Do not duplicate complete logic for each World.


---

23. Current Feature Status

Foundation

[x] Repository

[x] Project Brain

[x] Architecture

[ ] Feature Map


Core

[ ] Application State

[ ] Storage

[ ] Events

[ ] Router


UI

[ ] App Shell

[ ] Bottom Navigation

[ ] Search

[ ] Global UI Components


Home

[ ] Home UI

[ ] XP overview

[ ] Level overview

[ ] Dashboard


Worlds

[ ] World selector

[ ] World Engine

[ ] World 1

[ ] World 2

[ ] World 3

[ ] World 4

[ ] Rivals

[ ] World progression


Flashcards

[ ] Flashcard Engine

[ ] Review Engine

[ ] World 1 Flashcards

[ ] World 2 Flashcards

[ ] World 3 Flashcards

[ ] World 4 Flashcards

[ ] World-specific progress

[ ] World-specific statistics


Sidebar

[ ] Sidebar UI

[ ] Notes

[ ] To-Do List


Settings

[ ] Settings UI

[ ] Appearance

[ ] Notifications

[ ] Gameplay

[ ] Data

[ ] Privacy

[ ] About


Future

[ ] Music

[ ] Video



---

24. Feature Rules

The following rules are mandatory:

1. Only Worlds contain Flashcards.


2. There are currently four Worlds.


3. Every World has independent Flashcard data.


4. Review is scoped to the selected World.


5. Every World has its own rivals.


6. Rivals use English names.


7. Others is currently empty.


8. Media is postponed.


9. UI will be integrated incrementally.


10. Features must remain modular.


11. Similar systems should use shared engines.


12. Do not rewrite unrelated features.


13. Do not invent unrequested features.


14. Do not replace supplied UI without a reason.


15. Do not mix World data.




---

25. Development Philosophy

TROVIRUSES should be built incrementally.

Each completed module should become a stable foundation for the next module.

Plan
 ↓
Build
 ↓
Test
 ↓
Commit
 ↓
Next Module

Never build the entire application in one uncontrolled step.


---

26. Current Phase

Current phase:

FOUNDATION

Completed:

Project Brain

Architecture


Current task:

Feature Map


Next major task:

Core project structure


### بعدش

پایین صفحه:

**Commit changes**

پیام Commit:

```text
docs: define project features

و Commit changes رو بزن.

بعد فقط بگو:

> Feature Map هم کامیت شد



بعد می‌ریم سراغ ساخت خودِ پوشه‌ها و فایل‌های پروژه — ولی اونجا خیلی بااحتیاط جلو می‌ریم: اول فقط اسکلت خالی، بدون اینکه حتی یک UI حدسی یا سیستم اضافه بسازیم.
