# Booking System – Frontend

Frontend εφαρμογή για το **Booking System**, υλοποιημένη με **React** + **TypeScript**, που επικοινωνεί με το Django REST API backend και παρέχει πλήρες UI για **χρήστες** και **διαχειριστές (admin)**.

Η εφαρμογή δίνει έμφαση σε:
- καθαρό UI,
- σωστή εμπειρία χρήστη,
- role-based navigation,
- και ασφαλή διαχείριση sessions.

## 🚀 Λειτουργίες

### Αυθεντικοποίηση
- Login με username & password
- Sign up νέου χρήστη με:
- - Username
- - First name
- - Last name
- - Email
- JWT authentication (μέσω backend)
- Αυτόματο redirect στο `/login` σε logout ή expired session
- Προβολή / απόκρυψη password κατά την πληκτρολόγηση

---

### Dashboard
- Αρχική σελίδα μετά το login
- Κάρτες ενεργειών:
- - **My Bookings**
- - **Create Booking**
- - **Admin Bookings** (μόνο για admin)
- Role-based εμφάνιση επιλογών

---

### Create Booking
- Επιλογή υπηρεσίας
- Επιλογή ημερομηνίας μέσω calendar
- **Δυναμική φόρτωση διαθέσιμων time slots**
- Grid προβολή slots (09:00–17:00)
- Αυτόματη απόκρυψη:
- - παρελθοντικών slots
- - ήδη booked slots
- Επιβεβαίωση επιλογής slot
- Success / error feedback messages

---

### My Bookings
- Προβολή κρατήσεων χρήστη
- Πληροφορίες:
- - Υπηρεσία
- - Ημερομηνία
- - Ώρα
- - Κατάσταση
- Χρωματική ένδειξη κατάστασης:
- - 🟡 PENDING
- - 🟢 CONFIRMED
- - ⚪ CANCELLED
- Δυνατότητα ακύρωσης μελλοντικών κρατήσεων

---

### Admin Bookings (μόνο admin)
- Προβολή **όλων των κρατήσεων**
- Πίνακας με:
- - Username
- - Υπηρεσία
- - Ημερομηνία
- - Ώρα
- - Status
- Ενέργειες:
- - Confirm booking
- - Cancel booking
- Φίλτρα:
- - Υπηρεσία
- - Κατάσταση
- - Ημερομηνία
- - Username
- Responsive layout & polished UI
- Sticky header στον πίνακα

---

## 🎨 UI / UX Χαρακτηριστικά
- Καθαρό layout με cards & grids
- Icons για καλύτερη αναγνωσιμότητα
- Auto-dismiss success & error messages
- Disabled states για buttons
- Responsive σχεδίαση
- Consistent ημερομηνίες σε format `dd-MM-yyyy`

---

## Τεχνολογίες
- React
- TypeScript
- Vite
- Axios
- React Router
- React Datepicker
- JWT (μέσω backend)
- CSS-in-JS (inline styling)

---

## 📂 Δομή Project

1. [ ] src/
2. [ ] ├── api/
3. [ ] │   └── axios.ts
4. [ ] ├── auth/
5. [ ] │   └── AuthContext.tsx
6. [ ] ├── components/
7. [ ] │   ├── PrivateLayout.tsx
8. [ ] │   ├── PageHeader.tsx
9. [ ] │   └── ...
10. [ ] ├── pages/
11. [ ] │   ├── Login.tsx
12. [ ] │   ├── Register.tsx
13. [ ] │   ├── Dashboard.tsx
14. [ ] │   ├── CreateBooking.tsx
15. [ ] │   ├── MyBookings.tsx
16. [ ] │   └── AdminBookings.tsx
17. [ ] ├── routes/
18. [ ] │   ├── ProtectedRoute.tsx
19. [ ] │   └── AdminRoute.tsx
20. [ ] └── main.tsx

---

## 🔐 Πρόσβαση & Ασφάλεια
- Protected routes για authenticated users
- Admin-only routes προστατευμένα στο frontend
- Αυτόματο redirect στο `/login` όταν:
- - ο χρήστης κάνει logout
- - λήξει το session
- - επιστραφεί 401 από το backend

---

## ⚙️ Εγκατάσταση & Εκτέλεση
1. Κλωνοποίησε το repository
2. Εγκατάσταση dependencies:
    
       npm install
3. Εκκίνηση development server: 

       npm run dev
4. Άνοιξε:

http://localhost:5173

⚠️ Απαιτείται το backend API να τρέχει και να είναι σωστά ρυθμισμένο (CORS, base URL).

---

## 🔗 Backend
Το frontend συνδέεται με το **Booking System API** backend:
- Django REST Framework 
- JWT authentication
- Swagger/OpenAPI documentation

---

## 🎓 Δημιουργός
Το frontend αναπτύχθηκε ως μέρος ολοκληρωμένου full-stack booking system, με στόχο:
- καθαρή αρχιτεκτονική React
- σωστή διαχείριση κατάστασης & auth
- ρεαλιστική εμπειρία χρήστη
- production-ready UI

---




