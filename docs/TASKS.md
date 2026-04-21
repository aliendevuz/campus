Zo‘r — endi buni **real bajariladigan Jira tasklarga** aylantiramiz. Minimal, aniq va jamoaga tushunarli qilib.

---

# 🎯 EPIC 1: AUTH & USER MANAGEMENT

### 🟢 TASK 1: Login API

**Description:**

* `/auth/login` endpoint yozish
* JWT token qaytarish
* role (admin/student) qo‘shish

**Acceptance:**

* noto‘g‘ri login → error
* to‘g‘ri login → token qaytadi

---

### 🟢 TASK 2: Auth Middleware

**Description:**

* protected route lar uchun middleware
* JWT validate

**Acceptance:**

* token yo‘q → 401
* noto‘g‘ri token → 401

---

### 🟢 TASK 3: Role Middleware

**Description:**

* admin route larni himoyalash

**Acceptance:**

* student admin endpointga kira olmaydi

---

# 🎯 EPIC 2: ADMIN — STUDENT MANAGEMENT

### 🟢 TASK 4: Create Student

* POST `/admin/students`

### 🟢 TASK 5: Get Students List

* GET `/admin/students`

### 🟢 TASK 6: Update Student

* PUT `/admin/students/{id}`

### 🟢 TASK 7: Delete Student

* DELETE `/admin/students/{id}`

👉 Acceptance (hammasiga):

* CRUD to‘liq ishlaydi
* validation bor

---

# 🎯 EPIC 3: ADMIN — SCHEDULE

### 🟢 TASK 8: Create Schedule

* POST `/admin/schedules`

### 🟢 TASK 9: Update Schedule

* PUT `/admin/schedules/{id}`

### 🟢 TASK 10: Delete Schedule

* DELETE `/admin/schedules/{id}`

---

# 🎯 EPIC 4: ADMIN — GRADES

### 🟢 TASK 11: Create Grade

* POST `/admin/grades`

### 🟢 TASK 12: Update Grade

* PUT `/admin/grades/{id}`

### 🟢 TASK 13: Delete Grade

* DELETE `/admin/grades/{id}`

---

# 🎯 EPIC 5: STUDENT — CORE FEATURES

### 🟢 TASK 14: Get Profile

* GET `/me`

### 🟢 TASK 15: Update Profile

* PUT `/me`

---

### 🟢 TASK 16: Get Schedule

* GET `/schedule`

---

### 🟢 TASK 17: Get Grades

* GET `/grades`

---

### 🟢 TASK 18: Get Academic Progress

* GET `/progress`
* GPA hisoblash (backend)

---

# 🎯 EPIC 6: FACULTY (⏳)

### 🟡 TASK 19: CRUD Faculty (Admin)

* create/update/delete

### 🟡 TASK 20: Get Faculty (Student)

* list + detail

---

# 🎯 EPIC 7: CONSULTATIONS (⏳)

### 🟡 TASK 21: Book Consultation

* POST `/consultations`

### 🟡 TASK 22: Get My Consultations

* GET `/consultations`

### 🟡 TASK 23: Update Status (Admin)

* approve/reject

---

# 🎯 EPIC 8: PORTFOLIO (⏳)

### 🟡 TASK 24: Add Achievement

* POST `/achievements`

### 🟡 TASK 25: Get Achievements

* GET `/achievements`

### 🟡 TASK 26: Delete Achievement

* DELETE `/achievements/{id}`

---

# 🎯 EPIC 9: FRONTEND — ADMIN PANEL

### 🟢 TASK 27: Admin Login Page

### 🟢 TASK 28: Students Page (table + modal CRUD)

### 🟢 TASK 29: Schedule Page

### 🟢 TASK 30: Grades Page

---

# 🎯 EPIC 10: FRONTEND — STUDENT APP

### 🟢 TASK 31: Login Page

### 🟢 TASK 32: Dashboard

### 🟢 TASK 33: Schedule Page

### 🟢 TASK 34: Grades Page

### 🟢 TASK 35: Profile Page

---

# 🧠 QO‘SHIMCHA (TEAM LEAD UCHUN)

## Task taqsimlash:

* Backend 1 → Auth + User
* Backend 2 → Schedule + Grades
* Frontend 1 → Student UI
* Frontend 2 → Admin UI

---

## Sprint bo‘lish:

**Sprint 1:**

* Auth
* Student CRUD
* Basic UI

**Sprint 2:**

* Schedule
* Grades
* Integration

---

## Definition of Done (har task uchun):

* endpoint ishlaydi
* test qilindi (Postman)
* frontend ulanadi
* error handling bor

---

# ✅ Qisqa xulosa

Bu Jira structure:

* ortiqcha emas
* aniq bo‘lingan
* parallel ishlashga mos
* DSDM timeboxga mos

---

Agar xohlasang:

* buni **Jira import format (CSV / JSON)** qilib beraman
* yoki **har taskga time estimate qo‘shib beraman**
