# VideoHero Component Integration Guide

## Overview
The VideoHero component provides a modern, video-background hero section matching the design requirements for Lushful Aesthetics. It features elegant typography, responsive design, and a professional aesthetic suitable for a medical spa website.

## Features
- **Video Background**: Supports looping video with fallback design
- **Text Overlay**: Exact content matching the provided mockup
- **Interactive Elements**: "Watch Overview Video" button with hover effects
- **Responsive Design**: Optimized for all screen sizes
- **Accessibility**: Proper ARIA labels and semantic HTML

## Usage

### Basic Implementation
```jsx
import VideoHero from "../components/VideoHero";

function HomePage() {
  return (
    <div>
      <VideoHero videoSrc="/path/to/video.mp4" />
      {/* Rest of your page content */}
    </div>
  );
}
```

### With Custom Props
```jsx
<VideoHero 
  videoSrc="/videos/clinic-hero.mp4"
  fallbackImage="/images/hero-fallback.jpg"
  onVideoPlay={() => console.log('Video play clicked')}
/>
```

## Integration Steps

### 1. Replace Existing Hero
In `src/pages/index.js`, replace the current hero section:

```jsx
// OLD: 
<div className="relative w-full max-w-[1536px] mx-auto overflow-hidden">
  <GatsbyImage image={image} alt={`${heroImage.description}`} />
  {/* ... existing content */}
</div>

// NEW:
<VideoHero />
```

### 2. Add Video Assets
1. Create a `public/videos/` directory
2. Add your hero video file (recommended: MP4 format, optimized for web)
3. Update the `videoSrc` prop accordingly

### 3. Contentful Integration (Optional)
To make the video configurable via Contentful:

```jsx
// In your GraphQL query
heroVideo {
  file {
    url
  }
}

// In your component
<VideoHero videoSrc={heroVideo?.file?.url} />
```

## Content Structure
The component displays:
- **Main Heading**: "The Art Of Aesthetic Innovation"
- **Subtitle**: "SHAFER CLINIC FIFTH AVENUE BY DR. DAVID SHAFER MD, FACS"
- **Description**: "PLASTIC SURGERY, DERMATOLOGY & MEDICAL SPA IN NYC"
- **Call-to-Action**: Circular play button with "Watch Overview Video" label

## Styling
The component uses:
- **Fonts**: Playfair Display (serif) for headings, Roboto for body text
- **Colors**: White text with black overlay for readability
- **Layout**: Centered content with responsive spacing
- **Animations**: Smooth hover transitions and scale effects

## Browser Support
- All modern browsers
- Fallback design for browsers without video support
- Progressive enhancement approach

## Performance
- Video loads asynchronously
- Optimized for Core Web Vitals
- Lazy loading compatible
- Mobile-first responsive design

## Testing
A standalone demo is available at `video-hero-demo.html` for testing and preview purposes.

## Dependencies
- React
- FontAwesome (for play icon)
- Tailwind CSS (for styling)
- Gatsby (for integration)