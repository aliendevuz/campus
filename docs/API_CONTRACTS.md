Zo‘r — bu holatda arxitektura biroz o‘zgaradi:

* **public register yo‘q ❌**
* faqat **admin create qiladi ✅**
* oddiy **role system kerak (admin / student)**

Quyida senga **minimal, lekin to‘liq admin API** beraman.

---

# 🔐 AUTH (yangilangan)

### Login (hamma uchun)

```http
POST /auth/login
```

```json
{
  "email": "admin@uni.edu",
  "password": "123456"
}
```

**response:**

```json
{
  "token": "jwt",
  "role": "admin" // yoki "student"
}
```

---

# 👑 ADMIN API (protected, faqat admin)

## 1. Student yaratish

```http
POST /admin/students
```

```json
{
  "email": "student@uni.edu",
  "full_name": "Ali Valiyev",
  "faculty": "CS",
  "year": 2,
  "password": "123456"
}
```

---

## 2. Studentlar ro‘yxati

```http
GET /admin/students
```

---

## 3. Bitta student

```http
GET /admin/students/{id}
```

---

## 4. Student update

```http
PUT /admin/students/{id}
```

---

## 5. Student delete

```http
DELETE /admin/students/{id}
```

---

# 📅 ADMIN — SCHEDULE MANAGEMENT

## Schedule qo‘shish

```http
POST /admin/schedules
```

```json
{
  "user_id": "uuid",
  "subject_name": "Math",
  "day_of_week": 1,
  "start_time": "09:00",
  "end_time": "10:30",
  "room": "A101",
  "teacher_name": "Mr. John"
}
```

---

## Update

```http
PUT /admin/schedules/{id}
```

---

## Delete

```http
DELETE /admin/schedules/{id}
```

---

# 📊 ADMIN — GRADES MANAGEMENT

## Grade qo‘shish

```http
POST /admin/grades
```

```json
{
  "user_id": "uuid",
  "subject": "Math",
  "grade_value": 4.5,
  "grade_type": "exam",
  "date": "2026-04-01"
}
```

---

## Update

```http
PUT /admin/grades/{id}
```

---

## Delete

```http
DELETE /admin/grades/{id}
```

---

# 👨‍🏫 ADMIN — FACULTY

## Create faculty

```http
POST /admin/faculty
```

```json
{
  "full_name": "Dr. Smith",
  "department": "CS",
  "email": "smith@uni.edu",
  "phone": "+123"
}
```

---

## Update / Delete

```http
PUT /admin/faculty/{id}
DELETE /admin/faculty/{id}
```

---

# 📅 ADMIN — CONSULTATIONS

## Status o‘zgartirish

```http
PUT /admin/consultations/{id}
```

```json
{
  "status": "approved"
}
```

---

# 🏆 ADMIN — ACHIEVEMENTS (optional)

Agar admin ham qo‘sha olsa:

```http
POST /admin/achievements
```

---

# ⚠️ MUHIM QOIDALAR

## 1. Role middleware

Har `/admin/*` endpoint:

* faqat `role = admin`

---

## 2. Student API o‘zgarmaydi

* `/me`
* `/schedule`
* `/grades`

👉 student faqat o‘zini ko‘radi

---

## 3. Password handling

* admin yaratganda password beriladi
* keyin student login qiladi

---

## 4. Minimal admin panel uchun yetadi:

* student CRUD
* schedule CRUD
* grades CRUD

👉 boshqa hammasi optional

---

# ✅ Qisqa xulosa

Endi sizda:

* public app API ✅
* admin management API ✅
* role-based system ✅

👉 bu bilan siz **real tizimga yaqin arxitektura**ga ega bo‘ldingiz, lekin hali ham sodda.

---

Agar xohlasang, keyingi step:

* **frontend admin panel structure (qanday sahifalar bo‘ladi)**
* yoki **teamga bo‘lib berish (kim admin backend, kim student app)**

shu bosqichda juda foydali bo‘ladi















Ha, endi student tomoni uchun **toza va minimal API contract** beraman. Admindan farqli ravishda bu yerda user **faqat o‘z ma’lumotlari bilan ishlaydi**.

---

# 🌐 BASE

```
/api/v1
Auth: Bearer JWT
```

---

# 🔐 AUTH

### Login

```
POST /auth/login
```

```json
{
  "email": "student@uni.edu",
  "password": "123456"
}
```

---

# 👤 PROFILE

### Get my profile

```
GET /me
```

**response:**

```json
{
  "id": "uuid",
  "email": "student@uni.edu",
  "full_name": "Ali Valiyev",
  "faculty": "CS",
  "year": 2,
  "phone": "+998...",
  "bio": "...",
  "avatar_url": "..."
}
```

---

### Update profile

```
PUT /me
```

```json
{
  "full_name": "Ali Valiyev",
  "phone": "+998...",
  "bio": "...",
  "avatar_url": "..."
}
```

---

# 📅 SCHEDULE

### Get my schedule

```
GET /schedule
```

```json
[
  {
    "id": "uuid",
    "subject_name": "Math",
    "day_of_week": 1,
    "start_time": "09:00",
    "end_time": "10:30",
    "room": "A101",
    "teacher_name": "Mr. John"
  }
]
```

👉 student **create/update qilmaydi** (admin boshqaradi)

---

# 📊 GRADES

### Get my grades

```
GET /grades
```

```json
[
  {
    "id": "uuid",
    "subject": "Math",
    "grade_value": 4.5,
    "grade_type": "exam",
    "date": "2026-04-01"
  }
]
```

---

# 📈 ACADEMIC PROGRESS

### Get progress (auto-calculated)

```
GET /progress
```

```json
{
  "gpa": 4.2,
  "total_credits": 120
}
```

👉 backend hisoblaydi (grades asosida)

---

# 👨‍🏫 FACULTY (⏳)

### Get all faculty

```
GET /faculty
```

```json
[
  {
    "id": "uuid",
    "full_name": "Dr. Smith",
    "department": "CS",
    "email": "smith@uni.edu"
  }
]
```

---

### Get one faculty

```
GET /faculty/{id}
```

---

# 📅 CONSULTATIONS (⏳)

### Book consultation

```
POST /consultations
```

```json
{
  "faculty_id": "uuid",
  "scheduled_at": "2026-04-25T10:00:00"
}
```

---

### Get my consultations

```
GET /consultations
```

```json
[
  {
    "id": "uuid",
    "faculty_name": "Dr. Smith",
    "scheduled_at": "2026-04-25T10:00:00",
    "status": "pending"
  }
]
```

---

# 🏆 PORTFOLIO / ACHIEVEMENTS (⏳)

### Get my achievements

```
GET /achievements
```

---

### Add achievement

```
POST /achievements
```

```json
{
  "title": "Hackathon Winner",
  "description": "1st place",
  "date": "2025-12-01"
}
```

---

### Delete achievement

```
DELETE /achievements/{id}
```

---

# ⚠️ MUHIM QOIDALAR

### 1. User isolation

* student faqat **o‘z data**sini ko‘radi
* `user_id` hech qachon frontenddan kelmaydi

---

### 2. Read-only qismlar

* schedule ❗
* grades ❗

👉 faqat admin boshqaradi

---

### 3. Error format

```json
{
  "error": "Something went wrong"
}
```

---

### 4. Minimal validation

* email format
* required fieldlar

---

# ✅ Qisqa xulosa

Bu API:

* senga kerak bo‘lgan barcha student featurelarni yopadi
* admin bilan to‘liq mos ishlaydi
* ortiqcha complexity yo‘q
* frontend qilish oson

---

Agar xohlasang keyingi bosqich:

* **frontend page structure (qaysi sahifa nimani chaqiradi)**
* yoki **Postman collection / Swagger format**

qilib beraman — implementatsiya yanada tezlashadi
