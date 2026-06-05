# Application Planning: Feature Roadmap

### Story 1: Cafe Creation
* **As a** User
* **I want to** Submit a cafe to the directory
* **So that** It can be publicly available for people to discover

#### Technical Implementation Checklist:
- [ ] Create Database Cafe Schema (fields: `id`, `name`, `latitude`, `longitude`, `description`)
- [ ] **Route:** `POST /v1/cafes/submit-cafe`
  - *Payload:* `{"name": "...", "latitude": "...", "longitude": "..."}
  - *Sucess Response:* `201 Created`
  - *Error Response:* `400 Bad Request`
- [ ] **Frontend:** 
  - Form for user to submit new Cafe for review and addition
  - Interface for admins/moderators to review submission

---
