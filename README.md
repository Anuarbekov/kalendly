# Kalendly - Open Source Scheduling Tool

A modern, full-stack scheduling platform clone (similar to Calendly) that allows users to create event types and lets guests book time slots. It syncs directly with Google Calendar to prevent double bookings.

## 🚀 Features

* **Public Booking Pages:** unique links for different event types (e.g., "30 Min Meeting").
* **Google Calendar Sync:** Real-time availability checks and automatic event creation with Google Meet links.
* **Admin Dashboard:** Manage event types, toggle availability, and copy booking links.
* **Timezone Intelligence:** Automatic timezone detection and conversion for guests.
* **Dark Mode:** Fully responsive UI with light/dark theme toggle.

## 🛠 Tech Stack

**Frontend:**
* React (Vite)
* Tailwind CSS (Styling)
* Lucide React (Icons)
* Date-fns (Date manipulation)

**[Backend:](https://github.com/Anuarbekov/kalendly-backend)**
* FastAPI (Python)
* SQLAlchemy (ORM)
* Google OAuth2 & Calendar API

---

## ⚙️ Google OAuth Configuration
To make the Google Login and Calendar Sync work:

1. Go to **Google Cloud Console**.

2. Create a project and enable **Google Calendar API**.

3. Create OAuth 2.0 Credentials (Web Application).

4. **Authorized Javascript Origins**: http://localhost:5173

5. **Authorized Redirect URIs**: http://localhost:5173 and http://localhost:8000/auth/callback (depending on your flow).

## 📂 Project Structure

```
├── backend/
│   ├── api/         # API Endpoints (public, auth, event_types)
│   ├── services/        # Google Calendar logic
│   ├── models.py        # Database Models
│   ├── main.py          # Main File
│   └── schemas.py       # Database Schemas
├── frontend/
│   ├── src/
│   │   ├── components/  # Reusable UI (booking, themeToggle, etc.)
│   │   ├── pages/       # Dashboard, BookingPage, Welcome
│   │   ├── contexts/    # ThemeContext
│   │   └── lib/         # API helpers/utils
```

## 🤝 Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## 📄 License
For educational use.
