# DB Design

# 🧱 Asosiy strukturasi (relational DB)

## 1. Users (student)

```sql
users (
  id UUID PRIMARY KEY,
  university_email VARCHAR UNIQUE NOT NULL,
  password_hash VARCHAR NOT NULL,
  full_name VARCHAR NOT NULL,
  faculty VARCHAR,
  year INT,
  created_at TIMESTAMP
)
```

---

## 2. Student Profile

(alohida table qilish — toza arxitektura)

```sql
profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  phone VARCHAR,
  bio TEXT,
  avatar_url VARCHAR
)
```

---

## 3. Schedule

```sql
schedules (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  subject_name VARCHAR NOT NULL,
  day_of_week INT, -- 1-7
  start_time TIME,
  end_time TIME,
  room VARCHAR,
  teacher_name VARCHAR
)
```

👉 oddiy va yetarli (group system qilmaymiz hozir)

---

## 4. Subjects

```sql
subjects (
  id UUID PRIMARY KEY,
  name VARCHAR NOT NULL
)
```

---

## 5. Grades (Digital grade book)

```sql
grades (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  subject_id UUID REFERENCES subjects(id),
  grade_value FLOAT,
  grade_type VARCHAR, -- exam, midterm, hw
  date DATE
)
```

---

## 6. Academic Progress (hisoblash mumkin, lekin saqlash ham mumkin)

```sql
academic_progress (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  gpa FLOAT,
  total_credits INT,
  updated_at TIMESTAMP
)
```

👉 agar xohlasang, buni DB’da saqlamasdan backendda hisoblash ham mumkin

---

# ⏳ SHOULD FEATURELAR

## 7. Faculty directory

```sql
faculty (
  id UUID PRIMARY KEY,
  full_name VARCHAR,
  department VARCHAR,
  email VARCHAR,
  phone VARCHAR
)
```

---

## 8. Consultation booking

```sql
consultations (
  id UUID PRIMARY KEY,
  student_id UUID REFERENCES users(id),
  faculty_id UUID REFERENCES faculty(id),
  scheduled_at TIMESTAMP,
  status VARCHAR -- pending, approved, rejected
)
```

---

## 9. Portfolio / achievements

```sql
achievements (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR,
  description TEXT,
  date DATE
)
```

---

# 🔗 Relationship overview (oddiy qilib)

* user → profile (1:1)
* user → schedules (1:N)
* user → grades (1:N)
* subject → grades (1:N)
* user → achievements (1:N)
* faculty → consultations (1:N)
* user → consultations (1:N)

---

# ⚠️ Muhim soddalashtirishlar

Bu design intentionally:

* group system yo‘q
* role system yo‘q
* admin panel yo‘q
* real university integration yo‘q

👉 sababi: sizda **time + skill constraint**

---

# 💡 Tavsiya (juda muhim)

Agar jamoa qiynalsa:

* `academic_progress` ni olib tashla (dynamic hisobla)
* `subjects` ni ham olib tashlab, `grades` ichida `subject_name` saqla

👉 yanada soddalashadi
