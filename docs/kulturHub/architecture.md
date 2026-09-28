---
title: System Architecture
description: Complete architectural overview of KulturHub platform
icon: material/layers-triple
---

# :material-layers-triple: System Architecture

## Overview

I designed KulturHub as a Next.js application on Azure App Service with MongoDB Atlas and Blob Storage. I used a separate notification-function integration; the other function implementations below illustrate possible service boundaries. The earlier Azure-native network and database layout remains documented as a historical design.

## High-Level Architecture

```mermaid
graph TB
    subgraph "Client Layer"
        A[Web Browser]
        B[Mobile Browser]
    end
    
    subgraph "Application Layer"
        C[Next.js Frontend<br/>React + TypeScript]
        D[API Routes<br/>Server-Side Logic]
        E[Static Assets<br/>CDN-Ready]
    end
    
    subgraph "Service Layer"
        F[Authentication<br/>Session + RBAC]
        G[Business Logic<br/>Event Management]
        H[Email Service<br/>Azure Function]
    end
    
    subgraph "Data Layer"
        I[MongoDB Atlas<br/>Document Store]
        J[Azure Blob<br/>Image Storage]
    end
    
    subgraph "Infrastructure Layer"
        L[Docker Containers]
        M[Azure App Service]
    end
    
    A --> C
    B --> C
    C --> D
    D --> F
    D --> G
    G --> H
    F --> I
    G --> I
    G --> J
    
    L --> M
    
    style C fill:#667eea,stroke:#fff,stroke-width:2px,color:#fff
    style I fill:#00a86b,stroke:#fff,stroke-width:2px,color:#fff
    style M fill:#0078d4,stroke:#fff,stroke-width:2px,color:#fff
```

The session collection is stored in MongoDB Atlas. The separate VNet/NSG design is documented in the historical network section below; the simplified public App Service diagram does not imply that App Service is isolated inside that VNet.

## Component Architecture

### Frontend Architecture

The frontend uses Next.js 15 with the App Router for optimal performance and SEO.

**Key Technologies:**<br>
- **Framework:** Next.js 15 (App Router)<br>
- **Language:** TypeScript for type safety<br>
- **Styling:** Tailwind CSS for utility-first design<br>
- **Components:** shadcn/ui for consistent UI<br>
- **State Management:** React Context + Hooks<br>
- **Forms:** React Hook Form + Zod validation

**Directory Structure:**
```
app/
├── (auth)/          # Authentication pages
├── (public)/        # Public routes
├── admin/           # Admin dashboard
├── api/             # API routes
├── events/          # Event pages
└── profile/         # User profiles
```

### Backend Architecture

The backend leverages Next.js API routes with a clear separation of concerns.

**API Structure:**
```
api/
├── auth/            # Authentication endpoints
├── events/          # Event CRUD operations
├── users/           # User management
├── admin/           # Admin operations
└── notifications/   # Email triggers
```

**Key Features:**<br>
- RESTful API design<br>
- Server-side cookie session authentication<br>
- Role-based access control<br>
- Request validation middleware<br>
- Error handling middleware<br>
- Rate limiting

### Database Design

MongoDB Atlas provides flexible document storage with the following collections:

```mermaid
erDiagram
    USERS ||--o{ EVENTS : creates
    USERS ||--o{ RSVPS : makes
    EVENTS ||--o{ RSVPS : has
    USERS ||--o{ APPLICATIONS : submits
    
    USERS {
        ObjectId _id
        string email
        string password_hash
        string name
        string role
        boolean isOrganizer
        Date createdAt
    }
    
    EVENTS {
        ObjectId _id
        string title
        string description
        Date date
        string location
        ObjectId organizerId
        string category
        number capacity
        string imageUrl
        array attendees
    }
    
    RSVPS {
        ObjectId _id
        ObjectId userId
        ObjectId eventId
        Date createdAt
        string status
    }
    
    APPLICATIONS {
        ObjectId _id
        ObjectId userId
        string reason
        string status
        Date createdAt
    }
```

## Network Architecture

### Original Azure-Native Design

The initial implementation used comprehensive Azure networking:

```mermaid
graph LR
    subgraph "Internet"
        A[Users]
    end
    
    subgraph "Azure Front Door"
        B[WAF]
        C[CDN]
    end
    
    subgraph "Virtual Network"
        D[App Service<br/>Subnet]
        E[Database<br/>Subnet]
        F[Management<br/>Subnet]
    end
    
    subgraph "Private Endpoints"
        G[Cosmos DB PE]
        H[Storage PE]
    end
    
    A --> B
    B --> C
    C --> D
    D --> G
    D --> H
    E --> G
    F --> E
    
    style B fill:#ff6b6b,stroke:#fff,stroke-width:2px,color:#fff
    style D fill:#0078d4,stroke:#fff,stroke-width:2px,color:#fff
    style G fill:#00a86b,stroke:#fff,stroke-width:2px,color:#fff
```

### Optimized Architecture (Current)

Post-optimization, the network design focuses on simplicity:

```mermaid
graph LR
    A[Internet] --> B[Azure App Service]
    B --> C[MongoDB Atlas<br/>IP Whitelist]
    B --> D[Azure Blob<br/>Public Access]
    B --> E[SendGrid API<br/>HTTPS]
    
    style B fill:#0078d4,stroke:#fff,stroke-width:2px,color:#fff
    style C fill:#00a86b,stroke:#fff,stroke-width:2px,color:#fff
```

## Security Architecture

### Authentication and authorization flow

```mermaid
sequenceDiagram
    participant Visitor
    participant App as Next.js API
    participant DB as MongoDB Atlas
    Visitor->>App: POST /api/auth (credentials)
    App->>DB: Verify password hash
    App->>DB: Store hash of random session token
    App-->>Visitor: HttpOnly session cookie
    Visitor->>App: Protected API request with cookie
    App->>DB: Check session, expiry and current user role
    App-->>Visitor: 200, 401 or 403
```

I enforce authorization in the route handlers, where the mutation occurs. The cookie holds an opaque random token; the database stores its SHA-256 hash and expiry. `SameSite=Lax` and `Secure` in production reduce cookie exposure. This is a server-side session design, not JWT. See [the implementation](https://github.com/mvulcu/kulturhub_6/blob/codex/kulturhub-core-hardening/lib/session.ts) and [Security](security.md).

### Security Layers

1. **Application Security**
   - Opaque server-side sessions in httpOnly cookies
   - CORS configuration
   - Input validation and sanitization
   - MongoDB query validation and parameterized repository calls
   - XSS protection headers

2. **Network Security**
   - HTTPS everywhere
   - IP whitelisting for database
   - Azure NSG rules
   - Private endpoints (original design)

3. **Data Security**
   - Passwords hashed with bcrypt
   - Environment variables for secrets
   - Avoid logging sensitive identifiers; review existing application logs
   - Encrypted data at rest

## Deployment Architecture

### Container Strategy

The following is a historical design sketch. The tested build recipe is in [CI/CD](cicd.md) and the actual application Dockerfile.

```dockerfile
# Multi-stage build for optimization
FROM node:18-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:18-alpine AS runner
WORKDIR /app
ENV NODE_ENV production
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static

EXPOSE 3000
CMD ["node", "server.js"]
```

### CI/CD Pipeline Architecture

```mermaid
graph LR
    subgraph "Development"
        A[Local Dev] --> B[Git Push]
    end
    
    subgraph "GitHub"
        B --> C[Actions Trigger]
        C --> D[Build & Test]
        D --> E[Docker Build]
    end
    
    subgraph "Registry"
        E --> F[GHCR Push]
        F --> G[Tagged Image]
    end
    
    subgraph "Deployment"
        G --> H[Azure Deploy]
        H --> I[App Service]
    end
    
    style C fill:#1f883d,stroke:#fff,stroke-width:2px,color:#fff
    style F fill:#1f883d,stroke:#fff,stroke-width:2px,color:#fff
    style I fill:#0078d4,stroke:#fff,stroke-width:2px,color:#fff
```

## Scalability Considerations

### Horizontal Scaling

The architecture supports horizontal scaling through:

- **Stateless application design**
- **External session storage**
- **Database connection pooling**
- **CDN for static assets**
- **Load balancer ready**

### Performance Optimizations

1. **Frontend Performance**
   - Next.js automatic code splitting
   - Image optimization with next/image
   - Static generation where possible
   - Client-side caching

2. **Backend Performance**
   - Connection pooling
   - Query optimization
   - Caching strategies
   - Async operations

3. **Database Performance**
   - Indexed queries
   - Aggregation pipelines
   - Connection limits
   - Query monitoring

---

<div class="text-center" markdown>

[:material-arrow-left: Overview](index.md){ .md-button }
[:material-arrow-right: Infrastructure](infrastructure.md){ .md-button .md-button--primary }

</div>