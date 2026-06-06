# Application Planning: Feature Roadmap

## Story 1: Cafe Directory Main Page
* **As a** User
* **I want to** See all available cafes in the directory
* **So that** I can find a good cafe to go to in my area

### Technical Implmentation Checklist:
- [ ] Create Database Cafe Schema (fields: `id`, `name`, `latitude`, `longitude`, `description`)
- [ ] **Route:** `GET /v1/cafes`
  - *Sucess Response:* `200 Sucess` [list of cafes]
  - *Error Response:* `400 Bad Request`
- [ ] **Frontend:**
  - List of all cafes
  - Search bar at top for easy searching
  - Filter section to filter
  - Location can be captured to only show nearby cafes
  - Highlighted cafe section at the top potentially? 

## Story 2: Cafe Details Page
* **As a** User
* **I want to** See details on a specific cafe
* **So that** I can decide if its worth going to, leave reviews, submit updated information

## Story 3: Cafe Submission
* **As a** User
* **I want to** Submit a cafe to the directory
* **So that** It can be publicly available for people to discover

### Technical Implementation Checklist:
- [ ] **Route:** `POST /v1/cafes/submit-cafe`
  - *Payload:* `{"name": "...", "latitude": "...", "longitude": "..."}
  - *Sucess Response:* `201 Created`
  - *Error Response:* `400 Bad Request`
- [ ] **Frontend:** 
  - Form for user to submit new Cafe for review and addition
  - Interface for admins/moderators to review submission

---
