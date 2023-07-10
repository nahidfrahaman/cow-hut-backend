# Cow-Hut-BackeEnd-with-auth

The Cow Hut Backend project aims to create a platform for users to buy and sell cows, providing detailed information about each cow. Users can create accounts, search for cows using various filters, and complete simple transaction orders.with buyer,seller,admin role

## 🔗 Links

[live Site Link 🙌](https://cow-hut-backend-with-auth-nahidfrahaman.vercel.app)

[github repository Link 🙌](https://github.com/Porgramming-Hero-web-course/l2b1a4-cow-hut-admin-auth-nahidfrahaman)

### Application Routes

## Main Part

### Auth (User):

- route : https://cow-hut-backend-with-auth-nahidfrahaman.vercel.app/api/v1/auth/signup (post)
- route : https://cow-hut-backend-with-auth-nahidfrahaman.vercel.app/api/v1/auth/login (post)
- route : https://cow-hut-backend-with-auth-nahidfrahaman.vercel.app/api/v1/auth/refresh-token (post)

### Auth (Admin)

- route : https://cow-hut-backend-with-auth-nahidfrahaman.vercel.app/api/v1/admins/create-admin (post)

- route : https://cow-hut-backend-with-auth-nahidfrahaman.vercel.app/api/v1/admins/login (post)

- route : https://cow-hut-backend-with-auth-nahidfrahaman.vercel.app/api/v1/admins/refresh-token (post)

### User

-route : https://cow-hut-backend-with-auth-nahidfrahaman.vercel.app/api/v1/users/ (get) all user

- route : https://cow-hut-backend-with-auth-nahidfrahaman.vercel.app/api/v1/users/6497d4b5702c63af86903191 (get) single user

- route : https://cow-hut-backend-with-auth-nahidfrahaman.vercel.app/api/v1/users/6497d4b5702c63af86903191 (patch) updateUser

- route : https://cow-hut-backend-with-auth-nahidfrahaman.vercel.app/api/v1/users/6497d4b5702c63af86903191 (delete) delete user

### Cow

-route : https://cow-hut-backend-with-auth-nahidfrahaman.vercel.app/api/v1/cows/ (post)

-route : https://cow-hut-backend-with-auth-nahidfrahaman.vercel.app/api/v1/cows/ (get)

-route : https://cow-hut-backend-with-auth-nahidfrahaman.vercel.app/api/v1/cows/6497daa69b1ebe899efb40df (get) single cow

-route : https://cow-hut-backend-with-auth-nahidfrahaman.vercel.app/api/v1/cows/6497daa69b1ebe899efb40df (patch) updateCow

-route : https://cow-hut-backend-with-auth-nahidfrahaman.vercel.app/api/v1/cows/6497daa69b1ebe899efb40df (delete)

### orders

-route : https://cow-hut-backend-with-auth-nahidfrahaman.vercel.app/api/v1/orders/post (post)

- route : https://cow-hut-backend-with-auth-nahidfrahaman.vercel.app/api/v1/orders/ (get) specifiq admin

### Bounus part

### Admin

- route : https://cow-hut-backend-with-auth-nahidfrahaman.vercel.app/api/v1/admins/create-admin (post)

### My profile

- route : https://cow-hut-backend-with-auth-nahidfrahaman.vercel.app/api/v1/users/my-profile (get)

-route : https://cow-hut-backend-with-auth-nahidfrahaman.vercel.app/api/v1/users/my-profile (patch)

### order

- route : https://cow-hut-backend-with-auth-nahidfrahaman.vercel.app/api/v1/orders/6497ddcf9b1ebe899efb40fb (get) specifiq seller , buyer
