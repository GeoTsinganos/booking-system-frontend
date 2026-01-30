# Booking System – Frontend

Frontend εφαρμογή για το **Booking System**, υλοποιημένη με **React** + **TypeScript**, που επικοινωνεί με το Django REST API backend και παρέχει πλήρες UI για **χρήστες** και **διαχειριστές (admin)**.

Η εφαρμογή δίνει έμφαση σε:
- καθαρό UI,
- σωστή εμπειρία χρήστη,
- role-based navigation,
- και ασφαλή διαχείριση sessions.

---

## 🚀 Live Deployment (Railway)

- **Live App:** https://booking-system-frontend-production.up.railway.app
- **Backend API:** https://booking-system.up.railway.app
- **Swagger (API Docs):** https://booking-system.up.railway.app/swagger/

Το frontend είναι deployed στο Railway ως production build.

---

## ✨ Χαρακτηριστικά

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
4. [ ] ├── assets/
5. [ ] │   └── react.svg
6. [ ] ├── auth/
7. [ ] │   ├── AdminRoute.tsx
8. [ ] │   ├── ProtectedRoute.tsx
9. [ ] │   └── AuthContext.tsx
10. [ ] ├── components/
11. [ ] │   ├── PrivateLayout.tsx
12. [ ] │   ├── PageHeader.tsx
13. [ ] │   └── Navbar.tsx
14. [ ] ├── pages/
15. [ ] │   ├── Login.tsx
16. [ ] │   ├── Register.tsx
17. [ ] │   ├── Dashboard.tsx
18. [ ] │   ├── CreateBooking.tsx
19. [ ] │   ├── MyBookings.tsx
20. [ ] │   └── AdminBookings.tsx
21. [ ] ├── ui/
22. [ ] │   └── styles.ts
23. [ ] ├── utils/
24. [ ] │   └── date.ts
25. [ ] ├── App.tsx
26. [ ] ├── Index.css
27. [ ] └── main.tsx

---

## 🔐 Πρόσβαση & Ασφάλεια
- Protected routes για authenticated users
- Admin-only routes προστατευμένα στο frontend
- Αυτόματο redirect στο `/login` όταν:
- - ο χρήστης κάνει logout
- - λήξει το session
- - επιστραφεί 401 από το backend

---

## 🔗 Επικοινωνία με Backend API

Η εφαρμογή επικοινωνεί με το backend μέσω μεταβλητής περιβάλλοντος.

### Environment Variable

    VITE_API_BASE_URL=https://booking-system.up.railway.app

Η μεταβλητή γίνεται inject στο build time και πρέπει να είναι σωστή για production.

---

## ⚙️ Εγκατάσταση & Εκτέλεση
1. Κλωνοποίησε το repository
2. Εγκατάσταση dependencies:
    
       npm install

3. Δημιούργησε αρχείο `.env`:

       VITE_API_BASE_URL=http://127.0.0.1:8000

4. Εκκίνηση development server: 

       npm run dev

5. Άνοιξε:

       http://localhost:5173

⚠️ Απαιτείται το backend API να τρέχει και να είναι σωστά ρυθμισμένο (CORS, base URL).

---

## 🏗️ Build για Production

    npm run build

Τα production αρχεία δημιουργούνται στον φάκελο `dist/`.

Για local preview του production build:

    npm run preview

---

## 🛠️ Σημειώσεις για Railway
- Το frontend γίνεται build με npm run build
- Το `dist/` σερβίρεται ως static application
- Τα environment variables πρέπει να ορίζονται πριν το build
- Αλλαγή στο `VITE_API_BASE_URL` απαιτεί redeploy

---

## 🎓 Δημιουργός
Το frontend αναπτύχθηκε ως μέρος ολοκληρωμένου full-stack booking system, με στόχο:
- καθαρή αρχιτεκτονική React
- σωστή διαχείριση κατάστασης & auth
- ρεαλιστική εμπειρία χρήστη
- production-ready UI
- production deployment

---




