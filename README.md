# doode


# Multi-City African Online Restaurant Platform

## Project Vision

This application connects food lovers with authentic African meals across multiple cities. Local vendors and home cooks can post their menus, while customers browse by city, dish, or vendor. The platform focuses on authentic African cuisine, giving small vendors visibility and helping users discover diverse flavors. Vendors and customers can rate and review, ensuring trust and quality.

### Target Audience
- African students in Russia
- Food enthusiasts interested in authentic African cuisine
- Local vendors and home cooks specializing in African dishes

## Functional Requirements

- Allow food vendors (home cooks, small kitchens, local restaurants) to register, upload menus, set prices, and showcase meals
- Allow customers to browse by city, dish, or vendor, place orders, and leave reviews
- User registration and login functionality
- Users can edit and update their profiles
- Rating and review system to ensure quality and trust
- Users can save favorite meals or vendors to their personal list
- "Trending" or "Top Dishes" section showing the most popular meals based on ratings

## Tech Stack

### Frontend
- **React.js** → Web frontend
- **Swift (SwiftUI)** → Native iOS app

### Backend
- **Java (Spring Boot)** → Backend framework for building REST APIs
- **Spring Security** → Authentication & authorization
- **Hibernate (JPA)** → ORM for database interactions

### Database
- **PostgreSQL** → Relational DB for users, vendors, menus, and orders

## Project Structure

```
multi-city-african-restaurant/
├── backend/                 # Spring Boot backend application
│   ├── src/
│   ├── pom.xml
│   └── application.properties
├── frontend-web/            # React.js web application
│   ├── src/
│   ├── public/
│   └── package.json
├── frontend-ios/            # SwiftUI iOS application
│   ├── Sources/
│   ├── Resources/
│   └── Project.swift
├── docs/                    # Project documentation
└── README.md               # This file
```

## Development & Collaboration Workflow

We follow a simplified Git Flow workflow to ensure smooth collaboration between team members working on different parts of the application.

### Branching Strategy

**Main Branches:**
- `main` - Production-ready code
- `develop` - Integration branch for completed features

**Supporting Branches:**
- `feature/*` - For new features (e.g., `feature/user-auth-backend`)
- `bugfix/*` - For fixing bugs
- `hotfix/*` - For critical production fixes

### Collaboration Steps

1. **Initial Setup**
   ```bash
   git clone <repository-url>
   cd multi-city-african-restaurant
   git checkout develop
   git pull origin develop
   ```

2. **Starting a New Feature**
   - For backend features: `git checkout -b feature/feature-name-backend`
   - For web frontend: `git checkout -b feature/feature-name-react`
   - For iOS frontend: `git checkout -b feature/feature-name-ios`

3. **Regular Development Workflow**
   - Work on your specific component in its designated folder
   - Commit changes regularly with descriptive messages
   - Push your feature branch to remote regularly
   ```bash
   git add .
   git commit -m "feat(component): description of changes"
   git push origin feature/feature-name-branch
   ```

4. **Merging Completed Features**
   - Backend features should typically be merged first
   - Create a Pull Request from your feature branch to `develop`
   - Request review from your teammate
   - After approval, merge the PR

5. **Staying Updated**
   - Regularly pull the latest changes from `develop`
   - Rebase your feature branch to incorporate updates
   ```bash
   git checkout develop
   git pull origin develop
   git checkout feature/your-feature-branch
   git rebase develop
   ```

6. **Release Preparation**
   - When ready for production, create a PR from `develop` to `main`
   - Tag the release with a version number (e.g., v1.0.0)

7. **Quickest Workflow**
   - ./gradlew build -x test && docker-compose down && docker-compose up --build -d 
   ```
   ./gradlew build -x test && docker-compose down && docker-compose up --build -d
   ```

### Best Practices for Collaboration

1. **API Contracts First**: Define API endpoints and data structures before implementation
2. **Communication**: Regularly update each other on progress and changes
3. **Code Reviews**: Always review each other's pull requests
4. **Testing**: Write tests for your components to prevent regressions
5. **Documentation**: Keep documentation updated as features change

### Getting Started

1. Ensure you have the required technologies installed:
   - Java JDK 11+
   - Node.js
   - Docker
   - PostgreSQL
   - Xcode (for iOS development)

2. Clone the repository and navigate to the specific component you're working on

3. Follow the setup instructions in each component's README file

## License

This project is proprietary and confidential. All rights reserved.