DB Design:

user:
id
email
password_hash
created_at

profile:
id
user_id
phone
fullname
avatar_url

session:
id
created_at
expires_at
