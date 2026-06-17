@AGENTS.md


# Mobile Portfolio App Project Requirements

## Objective

Create a single-screen or multi-tab interactive mobile portfolio application using **React Native** and **TypeScript (.tsx)**. The application should showcase the developer's background, technical skills, and featured projects in a clean, professional, and mobile-friendly interface.

---

## Technical Requirements

### Framework
- React Native
- Expo template is recommended

### Language
- TypeScript (`.tsx`)
- Strict typing is required
- Do not use the `any` type

### UI/UX
- Design a clean and professional interface
- Ensure mobile responsiveness
- Follow modern mobile design principles
- Use reusable and modular components

---

## Required UI Sections

The application must render the following sections within a structured and scrollable layout.

### 1. Header Section
Display:
- Avatar image or placeholder
- Full name
- Professional tagline

### 2. About Me Section
Display:
- A concise professional summary
- Educational background or career goals (optional)

### 3. Skills Matrix
Display:
- Technical skills using chips, badges, icons, or cards
- Example skills:
  - React Native
  - TypeScript
  - JavaScript
  - HTML
  - CSS
  - Node.js
  - Git

### 4. Projects List
Display project cards containing:
- Project title
- Brief description
- Technologies used
- Optional project image or icon

### 5. Interactive Action
Include a functional contact button using:
- `TouchableOpacity`, or
- `Pressable`

When pressed:
- Show an Alert, or
- Open a Modal

---

## Development Standards

### TypeScript
- Use interfaces for props and data models
- Avoid the `any` type
- Apply proper type annotations throughout the application

### Components
- Use functional components only
- Keep components modular and reusable
- Separate UI sections into individual components when appropriate

### Styling
- Use `StyleSheet.create()`
- Avoid excessive inline styling
- Maintain consistent spacing, typography, and colors

### Code Quality
- Write clean, readable, and maintainable code
- Follow React Native best practices
- Use meaningful variable and component names

---

## Evaluation Criteria

The project will be assessed based on the following:

### TypeScript Implementation
- Proper use of TypeScript
- Strict typing
- No use of `any`

### Component Layout
- Well-structured components
- Logical organization of sections

### UI/UX & Styling
- Professional appearance
- Consistent design
- Mobile responsiveness

### Interactivity
- Functional button interactions
- Proper use of Alerts or Modals
- Smooth user experience

---

## Expected Outcome

Produce a polished React Native portfolio application that demonstrates:
- TypeScript proficiency
- React Native component development
- Mobile UI/UX design skills
- Interactive application functionality