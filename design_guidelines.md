# Premium Real Estate Platform - Design Guidelines

## Design Approach
**Reference-Based Approach** inspired by modern real estate platforms (Airbnb, Zillow, Redfin) combined with clean dashboard patterns from Linear and Notion. Focus on showcasing properties beautifully while maintaining functional, efficient dashboards.

## Core Design Principles
1. **Visual Hierarchy**: Property photos take center stage, supported by clean typography
2. **Breathing Room**: Generous whitespace to convey premium feel
3. **Clarity**: Clear distinction between admin tools and client browsing experience
4. **Trust**: Professional, polished interface that builds confidence

## Typography System
**Font Stack**: Use Google Fonts
- **Primary**: Inter (headings, UI elements, navigation)
  - Hero/H1: text-5xl md:text-6xl, font-bold
  - H2: text-3xl md:text-4xl, font-semibold
  - H3: text-xl md:text-2xl, font-semibold
  - Body: text-base, font-normal
- **Secondary**: Lora (property descriptions, elegant accents)
  - Property titles: text-2xl, font-medium
  - Descriptions: text-lg, font-normal

## Layout System
**Spacing Primitives**: Tailwind units of 2, 4, 6, 8, 12, 16, 24
- Section padding: py-16 md:py-24
- Card padding: p-6 md:p-8
- Component gaps: gap-4 for tight groups, gap-8 for sections

**Grid System**:
- Property cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3
- Dashboard layout: Fixed sidebar (w-64) + main content area
- Max container width: max-w-7xl for content areas

## Component Library

### Navigation
**Header**:
- Fixed top navigation with backdrop blur (backdrop-blur-md)
- Logo left, auth/profile right
- Height: h-16 md:h-20
- Minimal border bottom for separation

### Property Cards (Client Dashboard)
**Premium Card Design**:
- Rounded corners: rounded-2xl
- Subtle shadow: shadow-lg hover:shadow-xl transition
- Image aspect ratio: aspect-[4/3] with object-cover
- Image carousel indicators at bottom of image
- Property info overlay on image with gradient backdrop
- Like/dislike icons: positioned top-right of image with blurred background (backdrop-blur-sm bg-white/30 rounded-full p-2)
- View counter: Small badge bottom-left of image
- Property details below image: title, location, price, specs (beds/baths/sqft)

### Admin Dashboard
**Property Management Table/Grid**:
- Hybrid view toggle (table/grid)
- Grid view: Smaller cards (grid-cols-2 md:grid-cols-3 xl:grid-cols-4)
- Table view: Compact rows with thumbnail, key info, action buttons
- Quick actions: Edit (pencil icon), Delete (trash icon), Preview (eye icon)

**Property Form**:
- Multi-step form or single scrolling form
- Photo upload zone: Drag-and-drop area with grid preview
- Thumbnail grid showing uploaded images with remove option
- Form sections clearly separated with dividers

### Chat Interface
**Chat Window**:
- Slide-in panel from right (w-96)
- Fixed header with realtor info
- Messages container: flex-1 overflow-y-auto
- Message bubbles: Different alignment for sent (right) vs received (left)
- Input bar: Fixed at bottom with rounded input field and send button
- Online status indicator for realtor

### Buttons & CTAs
**Primary Button** (View Details, Contact, Save):
- Rounded: rounded-lg
- Padding: px-6 py-3
- Font: font-semibold
- Shadow: shadow-md
- When on images: backdrop-blur-md bg-white/90 with minimal shadow

**Icon Buttons** (Like, Delete, Edit):
- Circular: rounded-full
- Size: w-10 h-10 flex items-center justify-center
- On images: backdrop-blur-md bg-white/30

### Forms & Inputs
**Input Fields**:
- Rounded: rounded-lg
- Border: border-2
- Padding: px-4 py-3
- Focus state with ring
- Labels above inputs with small margin (mb-2)

**File Upload**:
- Dashed border zone for drag-drop
- Grid preview of selected images (grid-cols-4 gap-4)
- Remove button overlay on hover

## Images & Media

**Hero Section** (Landing/Home):
- Full-width hero with premium property image
- Height: h-[70vh] md:h-[80vh]
- Centered overlay content with search bar
- CTA buttons with blurred backgrounds

**Property Images**:
- High-quality photography showcasing properties
- Multiple images per property (carousel)
- Maintain consistent aspect ratios
- Admin upload: Support 5-10 images per property

**Placeholder Strategy**:
- Use semantic property images (modern homes, luxury interiors, cityscapes)
- Profile avatars for admin/client users
- Realtor photos in chat interface

## Responsive Behavior
**Breakpoints**:
- Mobile (base): Single column, simplified nav (hamburger)
- Tablet (md: 768px): 2-column grids, expanded sidebar
- Desktop (lg: 1024px): 3-column grids, full dashboard layout

**Mobile-Specific**:
- Bottom navigation for client dashboard
- Collapsible sidebar for admin
- Full-screen chat overlay instead of side panel
- Stacked property details

## Accessibility
- Consistent focus states with visible rings
- ARIA labels for icon-only buttons
- Proper heading hierarchy (h1 → h2 → h3)
- Sufficient contrast ratios throughout
- Keyboard navigation support for all interactive elements

## Animation Guidelines
**Minimal, Purposeful Animations**:
- Card hover: Subtle scale (scale-105) and shadow elevation
- Page transitions: Simple fade-in
- Chat messages: Slide-in animation for new messages
- Loading states: Skeleton screens for property cards
- NO complex scroll animations or parallax effects