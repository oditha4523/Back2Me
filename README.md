# Back2Me

> A smart and secure platform for managing lost and found items with location-based search, QR code identification, and user verification.

---

## Overview

**Back2Me** is a full-stack web application that helps users report, find, and claim lost or found items. It uses geolocation, QR codes, and secure user authentication to make the lost & found process easier, safer, and more reliable.

---

## Live Demo

Coming soon...

---

## Key Features

- 🗺️ **Interactive Map View** to browse nearby found items by category
- ➕ **Post Found Items** with images, details, and precise location
- 🔍 **Search Lost Items** using filters like category
- ✅ **Claim Verification** through call, email or item-specific security questions
- 🧾 **QR Code Identification** printed and attached to personal belongings

---

## Tech Stack

| Layer         | Technology                                         |
|---------------|----------------------------------------------------|
| Frontend      | React.js, Tailwind CSS                             |
| Backend       | Node.js, Express.js                                |
| Database      | MongoDB, Mongoose                                  |
| Maps & Geo    | Leaflet.js                                         |
| QR Code       | qrcode (backend), qrcode.react (frontend)          |
| Authentication| JWT                                                |
| SMS           | Twilio (for claim notifications)                   |

---

## Project Structure
```
Back2Me/
├── backend/ # Backend (Node.js + Express)
│ ├── controllers/ # Business logic for routes
│ ├── middleware/ # Auth, file upload, etc.
│ ├── models/ # Mongoose schemas
│ ├── routes/ # Express route definitions
│ ├── uploads/ # Uploaded images
│ ├── utils/ # Helper functions
│ └── server.js # Main server file
│
├── frontend/ # Frontend (React.js + Tailwind CSS)
│ ├── public/ # Static assets
│ └── src/
│ ├── assets/ # Images, icons
│ ├── components/ # Reusable React components
│ ├── pages/ # Main app pages (Home, FindItem, ReportItem, Profile, etc.)
│ ├── utils/ # Auth helpers, API calls
│ ├── App.jsx # Main app component
│ ├── index.css # Global styles
│ └── main.jsx # Entry point
│
└── README.md # Project documentation
```
---

## QR Code Feature
Each registered user will receive a unique QR code. Users are encouraged to:

 - Print and attach the QR code to items like wallets, bags, or keychains

 - If someone finds a tagged item, they can scan the code to identify and return it to the rightful owner

---

## Future Improvements

- Multilingual support (Sinhala, Tamil)
- AI-powered image match for items
- Push notifications
- Mobile app (React Native)

## Contributing
We welcome contributions! To contribute:
  - **Fork** the repo
  - **Create a new branch**
    ``` git checkout -b feature-name ```
  - Commit your changes
    ```git commit -m 'add feature'```
  - Push to the branch
    ```git push origin feature-name```
  - Open a Pull Request

## Authors
OC Weerasekara
<br>
RMTC Rathnayake

Special thanks to everyone contributing to Back2Me – for making the world a little more helpful.
