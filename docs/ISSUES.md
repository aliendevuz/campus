Zo‘r, endi **GitHub Issues (backend focus)** ni real implementatsiyaga mos qilib yozamiz. Bu yerda Jira’dan farqli ravishda tasklar **texnik va bajariladigan bo‘lishi kerak**.

---

# ⚙️ BACKEND — ISSUE LIST (GitHub)

## 🧱 SETUP & CORE

### 🟢 Issue 1: Initialize backend project

**Tasks:**

* project init (Express / Nest / Django — tanlangan stack)
* folder structure
* env config (.env)
* basic server run

**Done:**

* server ishlayapti (`/health` endpoint)

---

### 🟢 Issue 2: Database setup

**Tasks:**

* DB tanlash (PostgreSQL tavsiya)
* connection config
* ORM (Prisma / Sequelize / TypeORM)

**Done:**

* DB ulanadi
* migration ishlaydi

---

### 🟢 Issue 3: Define database schema

**Tasks:**

* users
* profiles
* schedules
* grades
* faculty (⏳)
* consultations (⏳)
* achievements (⏳)

**Done:**

* barcha tablelar migration orqali yaratilgan

---

# 🔐 AUTH

### 🟢 Issue 4: Implement login

**Tasks:**

* `/auth/login`
* password hash check (bcrypt)
* JWT generate

**Done:**

* token qaytadi
* noto‘g‘ri login error beradi

---

### 🟢 Issue 5: Auth middleware

**Tasks:**

* JWT verify
* requestga user qo‘shish

**Done:**

* protected route ishlaydi

---

### 🟢 Issue 6: Role middleware

**Tasks:**

* admin check
* `/admin/*` ni himoyalash

---

# 👑 ADMIN — STUDENTS

### 🟢 Issue 7: Create student API

* POST `/admin/students`

---

### 🟢 Issue 8: Get students list

* GET `/admin/students`

---

### 🟢 Issue 9: Update student

* PUT `/admin/students/{id}`

---

### 🟢 Issue 10: Delete student

* DELETE `/admin/students/{id}`

---

# 📅 ADMIN — SCHEDULE

### 🟢 Issue 11: Create schedule

* POST `/admin/schedules`

---

### 🟢 Issue 12: Update schedule

* PUT `/admin/schedules/{id}`

---

### 🟢 Issue 13: Delete schedule

* DELETE `/admin/schedules/{id}`

---

# 📊 ADMIN — GRADES

### 🟢 Issue 14: Create grade

* POST `/admin/grades`

---

### 🟢 Issue 15: Update grade

* PUT `/admin/grades/{id}`

---

### 🟢 Issue 16: Delete grade

* DELETE `/admin/grades/{id}`

---

# 🎓 STUDENT — CORE

### 🟢 Issue 17: Get profile

* GET `/me`

---

### 🟢 Issue 18: Update profile

* PUT `/me`

---

### 🟢 Issue 19: Get schedule

* GET `/schedule`

---

### 🟢 Issue 20: Get grades

* GET `/grades`

---

### 🟢 Issue 21: Academic progress

**Tasks:**

* GPA hisoblash (grades asosida)
* GET `/progress`

---

# ⏳ FACULTY

### 🟡 Issue 22: Faculty CRUD (admin)

* create/update/delete

---

### 🟡 Issue 23: Get faculty (student)

* list + detail

---

# ⏳ CONSULTATIONS

### 🟡 Issue 24: Book consultation

* POST `/consultations`

---

### 🟡 Issue 25: Get consultations

* GET `/consultations`

---

### 🟡 Issue 26: Update consultation status

* admin approve/reject

---

# ⏳ PORTFOLIO

### 🟡 Issue 27: Add achievement

* POST `/achievements`

---

### 🟡 Issue 28: Get achievements

* GET `/achievements`

---

### 🟡 Issue 29: Delete achievement

* DELETE `/achievements/{id}`

---

# 🧪 QUALITY / SUPPORT

### 🟢 Issue 30: Error handling middleware

* global error handler

---

### 🟢 Issue 31: Validation layer

* request validation (zod / joi / dto)

---

### 🟢 Issue 32: API testing (Postman)

* barcha endpointlarni test qilish

---

# 📦 BONUS (agar vaqt qolsa)

### 🟡 Issue 33: Seed data

* test user/admin
* sample schedule/grades

---

# 🧠 MUHIM QOIDALAR (GitHub workflow)

* Har issue = **1 endpoint yoki 1 aniq vazifa**
* PR kichik bo‘lsin (1–2 issue)
* Har PR:

  * test qilinadi
  * review qilinadi

---

# ✅ Qisqa xulosa

Bu ro‘yxat:

* real implementatsiyaga tayyor
* jamoa bo‘lib parallel ishlashga mos
* ortiqcha complexity yo‘q
* DSDM scope’ga to‘liq mos

---

Agar xohlasang:

* shu issue’larni **GitHub markdown template**ga o‘girib beraman
* yoki **branch naming + PR qoidalari** yozib beraman

bu jamoani yanada tartibli qiladi






Zo‘r, endi **frontend uchun GitHub Issues** — backend bilan 1:1 mos, real implementatsiyaga tayyor va jamoa uchun tushunarli qilib yozaman.

---

# 🎨 FRONTEND — ISSUE LIST

## 🧱 SETUP

### 🟢 Issue 1: Initialize frontend project

**Tasks:**

* React / Vue project init
* routing setup
* basic folder structure

**Done:**

* app ishlaydi
* `/login` route mavjud

---

### 🟢 Issue 2: UI base setup

**Tasks:**

* global styles
* layout (header/sidebar)
* basic components (Button, Input, Modal)

**Done:**

* reusable componentlar bor

---

### 🟢 Issue 3: API service layer

**Tasks:**

* axios/fetch wrapper
* base URL config
* error handling

**Done:**

* API chaqirish bitta joydan boshqariladi

---

### 🟢 Issue 4: Auth state management

**Tasks:**

* token saqlash (localStorage)
* user state
* logout

**Done:**

* login bo‘lgandan keyin state saqlanadi

---

# 🔐 AUTH

### 🟢 Issue 5: Login page (Student + Admin)

**Tasks:**

* login form
* API ulash (`/auth/login`)
* redirect (role asosida)

**Done:**

* login ishlaydi
* admin → admin panel
* student → app

---

# 👑 ADMIN PANEL

## 🧭 Layout

### 🟢 Issue 6: Admin layout

**Tasks:**

* sidebar (Students, Schedule, Grades)
* header

---

## 👥 Students

### 🟢 Issue 7: Students page (list)

**Tasks:**

* table render
* GET `/admin/students`

---

### 🟢 Issue 8: Add/Edit student modal

**Tasks:**

* form
* POST / PUT integration

---

### 🟢 Issue 9: Delete student

**Tasks:**

* delete button
* confirm dialog

---

### 🟢 Issue 10: Student details page

**Tasks:**

* profile info
* schedule list
* grades list

---

## 📅 Schedule (Admin)

### 🟢 Issue 11: Schedule page

**Tasks:**

* list view
* filter by student

---

### 🟢 Issue 12: Add/Edit schedule modal

**Tasks:**

* form
* API integration

---

### 🟢 Issue 13: Delete schedule

**Tasks:**

* delete action

---

## 📊 Grades (Admin)

### 🟢 Issue 14: Grades page

**Tasks:**

* table view

---

### 🟢 Issue 15: Add/Edit grade modal

**Tasks:**

* form
* API integration

---

### 🟢 Issue 16: Delete grade

**Tasks:**

* delete action

---

# 🎓 STUDENT APP

## 🧭 Layout

### 🟢 Issue 17: Student layout

**Tasks:**

* navbar
* sidebar (Schedule, Grades, Profile)

---

## 🏠 Dashboard

### 🟢 Issue 18: Dashboard page

**Tasks:**

* bugungi darslar
* oxirgi baholar

---

## 📅 Schedule

### 🟢 Issue 19: Schedule page

**Tasks:**

* list view
* haftalik ko‘rinish (optional)

---

## 📊 Grades

### 🟢 Issue 20: Grades page

**Tasks:**

* subject bo‘yicha list

---

## 📈 Progress

### 🟢 Issue 21: Academic progress page

**Tasks:**

* GPA ko‘rsatish
* credits

---

## 👤 Profile

### 🟢 Issue 22: Profile page

**Tasks:**

* user info display

---

### 🟢 Issue 23: Edit profile modal

**Tasks:**

* form
* PUT `/me`

---

# ⏳ FACULTY

### 🟡 Issue 24: Faculty page

* list view

---

# ⏳ CONSULTATIONS

### 🟡 Issue 25: Consultations page

* list

---

### 🟡 Issue 26: Book consultation modal

* form + POST

---

# ⏳ PORTFOLIO

### 🟡 Issue 27: Portfolio page

* achievements list

---

### 🟡 Issue 28: Add achievement modal

* form

---

### 🟡 Issue 29: Delete achievement

* delete action

---

# 🧪 SUPPORT

### 🟢 Issue 30: Route protection

**Tasks:**

* auth required routes
* redirect if not logged in

---

### 🟢 Issue 31: Error handling UI

**Tasks:**

* API error ko‘rsatish
* toast / alert

---

### 🟢 Issue 32: Loading states

**Tasks:**

* spinner
* button loading

---

# 🧠 MUHIM QOIDALAR

* Har issue → **1 sahifa yoki 1 modal**
* Backend bilan parallel ishlang
* Mock data ishlatish mumkin (backend tayyor bo‘lguncha)

---

# ✅ Qisqa xulosa

Bu frontend issue list:

* backend bilan to‘liq mos
* jamoaga bo‘lish oson
* ortiqcha UI complexity yo‘q
* tez implementatsiya qilinadi

---

Agar xohlasang:

* **component structure (React/Vue folder tree)**
* yoki **design system (UI kit minimal)**

qilib beraman — bu developmentni yanada tezlashtiradi
