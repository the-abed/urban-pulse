# 🏙️ UrbanPulse | Public Infrastructure Reporting System

**UrbanPulse** is a community-driven platform designed to bridge the gap between citizens and local authorities. It empowers residents to report infrastructure issues—like broken streetlights, potholes, or water leaks—directly to city management for swift resolution.

---

### 🌐 Vital Links
- **Live Site URL:** [https://urban-pulse-your-link.web.app](https://urbanpulse-cb977.web.app/)
- **Client Repo:** [https://github.com/the-abed/urban-pulse-client](https://github.com/the-abed/urban-pulse-client)
- **Server Repo:** [https://github.com/the-abed/urban-pulse-server](https://github.com/the-abed/urban-pulse-server)

### 🔑 Admin Credentials (Testing)
> [!IMPORTANT]
> For evaluation purposes, please use the following credentials to access the Admin Dashboard:
> - **Email:** `admin@urbanpulse.com`
> - **Password:** `Admin@1212`

---

### 🖼️ Project Preview



| **Hero Banner** | **Issue Feed** |
|---|---|
| ![Banner](https://i.ibb.co.com/G4xKFZ6F/high-angle-shot-bandra-worli-sealink-mumbai-enveloped-with-fog.jpg) | ![Cards](https://i.ibb.co.com/JF55bWDH/city-park-with-lake.jpg) |

---

### 🚀 Key Features

* **Real-time Issue Reporting:** Citizens can submit reports with titles, detailed descriptions, categories, and photographic evidence.
* **Firebase Authentication:** Secure login and registration system with email/password and Google One-Tap integration using Firebase ID Tokens.
* **Role-Based Access Control (RBAC):** Distinct dashboards and permissions for **Citizens**, **Staff**, and **Admins** managed via server-side verification.
* **Interactive Upvote System:** Users can support reported issues to increase their visibility and priority in the community feed.
* **Status Management:** Real-time tracking of issues through various stages: `Pending`, `In Progress`, and `Resolved`.
* **Dynamic Hero Slider:** A cinematic hero section featuring high-quality urban photography and modern glassmorphism UI.
* **Advanced Filtering & Search:** Easily sort through public reports by category (Roads, Water, Electricity) or location (District/Upazila).
* **Modern Responsive Design:** A "Mobile First" approach fully optimized for all devices using Tailwind CSS and DaisyUI.
* **Premium Boost System:** Ability for admins to "Boost" critical issues to the top of the feed for immediate attention.
* **Image Management:** Seamless image uploading and hosting integration using the ImgBB API for report evidence and user profiles.

---

### 🛠️ Tech Stack



* **Frontend:** React.js, Tailwind CSS, DaisyUI, Framer Motion (Animations).
* **Backend:** Node.js, Express.js.
* **Database:** MongoDB.
* **Auth & Hosting:** Firebase Authentication & Firebase Hosting.
* **State Management:** TanStack Query (React Query) for efficient server-state handling.

---

### ⚙️ Local Installation

1.  **Clone the repo:**
    ```bash
    git clone [https://github.com/the-abed/urban-pulse-client.git](https://github.com/the-abed/urban-pulse-client.git)
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Setup Environment Variables:**
    Create a `.env.local` file:
    ```env
    VITE_IMAGE_HOST_KEY=your_imgbb_key
    VITE_BACKEND_URL=http://localhost:5000
    VITE_FIREBASE_API_KEY=your_firebase_key
    ```
4.  **Run the app:**
    ```bash
    npm run dev
    ```

---

### 👨‍💻 Developed By
**Mohammad Abed Azim**
- [LinkedIn](https://www.linkedin.com/in/mohammad-abed-azim/)
- [Facebook](https://www.facebook.com/mdabed.azim)
- [GitHub](https://github.com/the-abed)

---
© 2025 UrbanPulse. Built for a better tomorrow.
