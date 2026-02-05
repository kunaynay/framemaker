# FRAME MAKER Design System
## Cinematic Lab — A Comprehensive Media Suite Design Language

This design system documents the visual language and component patterns used in Frame Maker. It is designed to be robust, scalable, and applicable to any media-focused application.

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Shadows & Elevation](#shadows--elevation)
6. [Border Radius](#border-radius)
7. [Transitions & Motion](#transitions--motion)
8. [Components](#components)
   - [Buttons](#buttons)
   - [Cards](#cards)
   - [Forms & Inputs](#forms--inputs)
   - [Modals](#modals)
   - [Progress Indicators](#progress-indicators)
   - [Badges](#badges)
   - [Toast Notifications](#toast-notifications)
   - [Upload Areas](#upload-areas)
9. [Layout Patterns](#layout-patterns)
10. [Animation Library](#animation-library)
11. [Responsive Breakpoints](#responsive-breakpoints)
12. [CSS Variable Reference](#css-variable-reference)
13. [Implementation Examples](#implementation-examples)

---

## Design Philosophy

### Core Principles

1. **Cinematic Depth** — Deep black backgrounds create a theater-like viewing environment that makes media content the star.

2. **Warm Accents on Dark Canvas** — The amber/gold accent color (`#ffb347`) provides warmth against the cold blacks, creating visual hierarchy without harshness.

3. **Technical Precision** — Monospace typography for technical elements evokes a professional editing suite aesthetic.

4. **Subtle Animation** — Motion is purposeful, never gratuitous. Animations guide attention and provide feedback.

5. **Functional Elegance** — Every element serves a purpose. Decoration supports usability.

### Visual Identity

| Attribute | Description |
|-----------|-------------|
| **Mood** | Professional, cinematic, focused |
| **Era** | Modern with film industry influence |
| **Density** | Spacious, breathing room for content |
| **Contrast** | High — light text on dark backgrounds |

---

## Color System

### Background Hierarchy

Use progressively lighter backgrounds to create depth and elevation:

```css
--color-bg-primary: #050505;     /* Base canvas — deepest black */
--color-bg-secondary: #0d0d0d;   /* Cards, panels, header */
--color-bg-tertiary: #151515;    /* Nested elements, form fields */
--color-bg-elevated: #1a1a1a;    /* Hover states, elevated cards */
--color-bg-hover: #202020;       /* Interactive hover states */
```

### Accent Colors

The warm amber accent creates visual interest against the dark theme:

```css
--color-accent: #ffb347;         /* Primary accent — buttons, highlights */
--color-accent-bright: #ffc266;  /* Hover state — slightly lighter */
--color-accent-dim: #cc8f39;     /* Borders, secondary accents */
--color-accent-glow: rgba(255, 179, 71, 0.15);  /* Glow effects, overlays */
```

### Border Colors

Borders create subtle separation without harsh contrast:

```css
--color-border-subtle: #252525;  /* Barely visible dividers */
--color-border: #2a2a2a;         /* Standard borders */
--color-border-strong: #353535;  /* Emphasized separators */
```

### Text Colors

Three-tier text hierarchy for readability and visual weight:

```css
--color-text-primary: #e8e8e8;   /* Main content — high emphasis */
--color-text-secondary: #a0a0a0; /* Supporting text — medium emphasis */
--color-text-tertiary: #6a6a6a;  /* Subtle labels — low emphasis */
```

### Semantic Colors

Communicate status and feedback:

```css
--color-success: #4ade80;  /* Completion, confirmation — green */
--color-error: #f87171;    /* Errors, destructive actions — red */
--color-warning: #fbbf24;  /* Warnings, caution — yellow */
```

### Color Usage Examples

| Context | Color Variable | Hex |
|---------|---------------|-----|
| Page background | `--color-bg-primary` | #050505 |
| Card background | `--color-bg-secondary` | #0d0d0d |
| Primary button | `--color-accent` | #ffb347 |
| Primary button hover | `--color-accent-bright` | #ffc266 |
| Body text | `--color-text-primary` | #e8e8e8 |
| Captions | `--color-text-secondary` | #a0a0a0 |
| Timestamps | `--color-text-tertiary` | #6a6a6a |

---

## Typography

### Font Families

Two complementary typefaces create visual hierarchy:

```css
--font-display: 'IBM Plex Mono', monospace;  /* Headings, labels, technical */
--font-body: 'DM Sans', sans-serif;          /* Body text, descriptions */
```

### Font Import

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;500;600&family=DM+Sans:wght@400;500;600&display=swap" rel="stylesheet">
```

### Type Scale

| Element | Font | Size | Weight | Line Height | Letter Spacing |
|---------|------|------|--------|-------------|----------------|
| H1 | IBM Plex Mono | 2rem (32px) | 600 | 1.2 | -0.02em |
| H2 | IBM Plex Mono | 1.5rem (24px) | 600 | 1.2 | -0.02em |
| H3 | IBM Plex Mono | 1.125rem (18px) | 600 | 1.2 | -0.02em |
| Body | DM Sans | 1rem (16px) | 400 | 1.6 | normal |
| Small | DM Sans | 0.875rem (14px) | 400 | 1.6 | normal |
| Caption | IBM Plex Mono | 0.8125rem (13px) | 500 | 1.4 | 0.05em |
| Label | IBM Plex Mono | 0.75rem (12px) | 500 | 1.4 | 0.05em |

### Typography CSS

```css
/* Headings */
h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-display);
    font-weight: 600;
    line-height: 1.2;
    letter-spacing: -0.02em;
}

/* Body text */
p, .body-text {
    font-family: var(--font-body);
    line-height: 1.6;
}

/* Technical labels */
.label, .caption {
    font-family: var(--font-display);
    text-transform: uppercase;
    letter-spacing: 0.05em;
}
```

---

## Spacing & Layout

### Spacing Scale

A consistent spacing scale creates rhythm and harmony:

```css
--spacing-xs: 0.25rem;   /* 4px  — Tight spacing */
--spacing-sm: 0.5rem;    /* 8px  — Small gaps */
--spacing-md: 1rem;      /* 16px — Default spacing */
--spacing-lg: 1.5rem;    /* 24px — Section spacing */
--spacing-xl: 2rem;      /* 32px — Large sections */
--spacing-2xl: 3rem;     /* 48px — Major divisions */
--spacing-3xl: 4rem;     /* 64px — Page-level spacing */
```

### Spacing Usage Guidelines

| Context | Spacing Variable | Value |
|---------|------------------|-------|
| Inline elements | `--spacing-sm` | 8px |
| Form field gaps | `--spacing-md` | 16px |
| Card padding | `--spacing-lg` to `--spacing-xl` | 24-32px |
| Section margins | `--spacing-2xl` | 48px |
| Hero sections | `--spacing-3xl` | 64px |

### Container Widths

```css
/* Maximum content width */
max-width: 1600px;
margin: 0 auto;
padding: 0 var(--spacing-xl);
```

---

## Shadows & Elevation

### Shadow Scale

Shadows create depth and hierarchy:

```css
--shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);    /* Subtle lift */
--shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);   /* Cards, dropdowns */
--shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);   /* Modals, overlays */
--shadow-glow: 0 0 20px var(--color-accent-glow);  /* Accent emphasis */
```

### Elevation Levels

| Level | Use Case | Shadow | Background |
|-------|----------|--------|------------|
| 0 | Base page | None | `--color-bg-primary` |
| 1 | Cards, panels | `--shadow-sm` | `--color-bg-secondary` |
| 2 | Elevated cards, hover | `--shadow-md` | `--color-bg-elevated` |
| 3 | Modals, dialogs | `--shadow-lg` | `--color-bg-secondary` |

---

## Border Radius

Minimal, sharp corners for a technical aesthetic:

```css
--radius-sm: 2px;   /* Buttons, badges */
--radius-md: 4px;   /* Cards, inputs */
--radius-lg: 6px;   /* Modals, large containers */
```

### Radius Usage

| Element | Radius |
|---------|--------|
| Buttons | `--radius-sm` (2px) |
| Cards | `--radius-md` (4px) |
| Modals | `--radius-lg` (6px) |
| Circular elements | `50%` |

---

## Transitions & Motion

### Timing Functions

```css
--transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);   /* Micro-interactions */
--transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);   /* Standard transitions */
--transition-slow: 400ms cubic-bezier(0.4, 0, 0.2, 1);   /* Page transitions */
```

### Transition Usage

| Context | Duration | Timing Function |
|---------|----------|-----------------|
| Hover states | `--transition-fast` | 150ms ease-out |
| Color changes | `--transition-base` | 250ms ease-out |
| Layout shifts | `--transition-slow` | 400ms ease-out |
| Page enter | 400ms | cubic-bezier(0.16, 1, 0.3, 1) |

---

## Components

### Buttons

#### Primary Button

High-emphasis actions with accent color:

```css
.btn {
    font-family: var(--font-display);
    font-size: 0.875rem;
    font-weight: 500;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: all var(--transition-base);
    display: inline-flex;
    align-items: center;
    gap: var(--spacing-sm);
    white-space: nowrap;
    text-transform: uppercase;
    letter-spacing: 0.05em;
}

.btn-primary {
    background-color: var(--color-accent);
    color: var(--color-bg-primary);
}

.btn-primary:hover {
    background-color: var(--color-accent-bright);
    box-shadow: var(--shadow-glow);
    transform: translateY(-1px);
}

.btn-primary:active {
    transform: translateY(0);
}
```

#### Secondary Button

Lower emphasis, outline style:

```css
.btn-secondary {
    background-color: transparent;
    color: var(--color-text-primary);
    border: 1px solid var(--color-border-strong);
}

.btn-secondary:hover {
    background-color: var(--color-bg-elevated);
    border-color: var(--color-accent-dim);
}
```

#### Small Button

Compact variant for tight spaces:

```css
.btn-small {
    padding: 0.5rem 1rem;
    font-size: 0.8125rem;
}
```

#### Icon Button

Square button for icons only:

```css
.btn-icon {
    padding: 0.625rem;
    background-color: transparent;
    color: var(--color-text-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-sm);
}

.btn-icon:hover:not(:disabled) {
    background-color: var(--color-bg-elevated);
    color: var(--color-accent);
    border-color: var(--color-accent-dim);
}
```

#### Destructive Button

For dangerous actions like delete:

```css
.btn-destructive {
    color: var(--color-error);
    border: 1px solid var(--color-error);
}

.btn-destructive:hover {
    background-color: var(--color-error);
    color: var(--color-bg-primary);
}
```

#### Disabled State

```css
.btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
}
```

#### Button with Icon

```html
<button class="btn btn-primary">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
        <polyline points="7 10 12 15 17 10"></polyline>
        <line x1="12" y1="15" x2="12" y2="3"></line>
    </svg>
    Download
</button>
```

---

### Cards

#### Base Card

Container for grouped content:

```css
.card {
    background-color: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    overflow: hidden;
    transition: all var(--transition-base);
}

.card:hover {
    border-color: var(--color-accent-dim);
    transform: translateY(-4px);
    box-shadow: var(--shadow-md);
}
```

#### Media Card

Card with image container:

```css
.media-card {
    background-color: var(--color-bg-secondary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    overflow: hidden;
    cursor: pointer;
    transition: all var(--transition-base);
}

.media-card-image-container {
    position: relative;
    width: 100%;
    padding-top: 56.25%; /* 16:9 aspect ratio */
    background-color: var(--color-bg-tertiary);
    overflow: hidden;
}

.media-card-image {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: contain;
    background-color: var(--color-bg-primary);
    transition: transform var(--transition-base);
}

.media-card:hover .media-card-image {
    transform: scale(1.05);
}

.media-card-info {
    padding: var(--spacing-md);
    display: flex;
    justify-content: space-between;
    align-items: center;
}
```

---

### Forms & Inputs

#### Text Input

```css
.input {
    font-family: var(--font-body);
    font-size: 0.9375rem;
    padding: 0.75rem 1rem;
    background-color: var(--color-bg-tertiary);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    color: var(--color-text-primary);
    transition: all var(--transition-base);
    width: 100%;
}

.input:hover {
    border-color: var(--color-border-strong);
}

.input:focus {
    outline: none;
    border-color: var(--color-accent);
    box-shadow: 0 0 0 2px var(--color-accent-glow);
}

.input::placeholder {
    color: var(--color-text-tertiary);
}
```

#### Range Slider

```css
.slider {
    width: 100%;
    height: 4px;
    -webkit-appearance: none;
    appearance: none;
    background: var(--color-bg-tertiary);
    border-radius: var(--radius-sm);
    outline: none;
    cursor: pointer;
}

.slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 16px;
    height: 16px;
    background: var(--color-accent);
    border-radius: 50%;
    cursor: pointer;
    transition: all var(--transition-fast);
    box-shadow: 0 0 0 0 var(--color-accent-glow);
}

.slider::-webkit-slider-thumb:hover {
    transform: scale(1.2);
    box-shadow: 0 0 0 4px var(--color-accent-glow);
}
```

#### Checkbox

```css
.checkbox {
    width: 24px;
    height: 24px;
    border: 2px solid var(--color-border-strong);
    background-color: rgba(5, 5, 5, 0.7);
    backdrop-filter: blur(4px);
    border-radius: var(--radius-sm);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all var(--transition-fast);
    cursor: pointer;
}

.checkbox:hover {
    border-color: var(--color-accent-dim);
    background-color: rgba(5, 5, 5, 0.85);
}

.checkbox.checked {
    background-color: var(--color-accent);
    border-color: var(--color-accent);
}

.checkbox.checked svg {
    color: var(--color-bg-primary);
}
```

#### Control Label

```css
.control-label {
    font-family: var(--font-display);
    font-size: 0.8125rem;
    color: var(--color-text-secondary);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--spacing-md);
}

.control-value {
    color: var(--color-accent);
    font-weight: 600;
}
```

---

### Modals

#### Modal Structure

```css
.modal {
    position: fixed;
    inset: 0;
    z-index: 500;
    display: none;
    align-items: center;
    justify-content: center;
    padding: var(--spacing-xl);
}

.modal.active {
    display: flex;
}

.modal-backdrop {
    position: absolute;
    inset: 0;
    background-color: rgba(5, 5, 5, 0.92);
    backdrop-filter: blur(8px);
    animation: fadeIn 300ms ease-out;
}

.modal-content {
    position: relative;
    background-color: var(--color-bg-secondary);
    border: 1px solid var(--color-border-strong);
    border-radius: var(--radius-lg);
    width: 100%;
    max-width: 1400px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    animation: slideUp 400ms cubic-bezier(0.16, 1, 0.3, 1);
    box-shadow: var(--shadow-lg);
}

.modal-header {
    padding: var(--spacing-xl);
    border-bottom: 1px solid var(--color-border);
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: var(--spacing-xl);
}

.modal-body {
    flex: 1;
    overflow-y: auto;
    padding: var(--spacing-xl);
}

.modal-footer {
    padding: var(--spacing-xl);
    border-top: 1px solid var(--color-border);
    display: flex;
    justify-content: flex-end;
    gap: var(--spacing-md);
}
```

---

### Progress Indicators

#### Progress Bar

```css
.progress-container {
    width: 100%;
}

.progress-bar {
    height: 4px;
    background-color: var(--color-bg-tertiary);
    border-radius: var(--radius-sm);
    overflow: hidden;
    margin-bottom: var(--spacing-md);
}

.progress-fill {
    height: 100%;
    background: linear-gradient(90deg, var(--color-accent-dim), var(--color-accent));
    border-radius: var(--radius-sm);
    transition: width 300ms ease-out;
    box-shadow: 0 0 12px var(--color-accent-glow);
}

.progress-label {
    display: flex;
    justify-content: space-between;
    font-family: var(--font-display);
    font-size: 0.8125rem;
}

.progress-percent {
    color: var(--color-accent);
    font-weight: 600;
}

.progress-detail {
    color: var(--color-text-secondary);
}
```

#### Spinner

```css
.spinner {
    width: 20px;
    height: 20px;
    border: 2px solid var(--color-border-strong);
    border-top-color: var(--color-accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}
```

#### Stage Indicator

```css
.stage {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    font-family: var(--font-display);
    font-size: 0.8125rem;
    color: var(--color-text-tertiary);
    padding: var(--spacing-md);
    background-color: var(--color-bg-tertiary);
    border-radius: var(--radius-sm);
    border: 1px solid transparent;
    transition: all var(--transition-base);
}

.stage-indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--color-border-strong);
    transition: all var(--transition-base);
}

.stage.active {
    color: var(--color-text-primary);
    border-color: var(--color-accent-dim);
}

.stage.active .stage-indicator {
    background-color: var(--color-accent);
    box-shadow: 0 0 8px var(--color-accent-glow);
    animation: pingStage 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}

.stage.complete .stage-indicator {
    background-color: var(--color-success);
}
```

---

### Badges

#### Standard Badge

```css
.badge {
    display: inline-flex;
    align-items: center;
    padding: var(--spacing-xs) var(--spacing-sm);
    font-family: var(--font-display);
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: var(--radius-sm);
    text-transform: uppercase;
    letter-spacing: 0.02em;
}

.badge-accent {
    background-color: rgba(5, 5, 5, 0.85);
    backdrop-filter: blur(8px);
    border: 1px solid var(--color-accent-dim);
    color: var(--color-accent);
}

.badge-success {
    background-color: rgba(74, 222, 128, 0.15);
    backdrop-filter: blur(8px);
    border: 1px solid var(--color-success);
    color: var(--color-success);
}

.badge-error {
    background-color: rgba(248, 113, 113, 0.15);
    border: 1px solid var(--color-error);
    color: var(--color-error);
}
```

#### Positioned Badge (on cards)

```css
.badge-positioned {
    position: absolute;
    top: var(--spacing-sm);
    right: var(--spacing-sm);
}
```

---

### Toast Notifications

```css
.toast-container {
    position: fixed;
    bottom: var(--spacing-xl);
    right: var(--spacing-xl);
    z-index: 1000;
    display: flex;
    flex-direction: column;
    gap: var(--spacing-md);
}

.toast {
    background-color: var(--color-bg-elevated);
    border: 1px solid var(--color-border-strong);
    border-radius: var(--radius-md);
    padding: var(--spacing-md) var(--spacing-lg);
    min-width: 300px;
    box-shadow: var(--shadow-lg);
    animation: slideIn var(--transition-base) ease-out;
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
}

.toast.success {
    border-left: 3px solid var(--color-success);
}

.toast.error {
    border-left: 3px solid var(--color-error);
}

.toast.warning {
    border-left: 3px solid var(--color-warning);
}

.toast-message {
    font-family: var(--font-body);
    font-size: 0.875rem;
    color: var(--color-text-primary);
}

@keyframes slideIn {
    from {
        transform: translateX(400px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}
```

---

### Upload Areas

#### Standard Upload Area

```css
.upload-area {
    width: 100%;
    max-width: 700px;
    position: relative;
}

.upload-area::before {
    content: '';
    position: absolute;
    inset: -2px;
    background: linear-gradient(135deg, var(--color-accent-dim), transparent 50%, var(--color-accent-dim));
    border-radius: var(--radius-lg);
    opacity: 0;
    transition: opacity var(--transition-base);
}

.upload-area.drag-over::before {
    opacity: 1;
}

.upload-content {
    position: relative;
    background-color: var(--color-bg-secondary);
    border: 2px dashed var(--color-border-strong);
    border-radius: var(--radius-lg);
    padding: var(--spacing-3xl) var(--spacing-2xl);
    text-align: center;
    cursor: pointer;
    transition: all var(--transition-base);
}

.upload-content:hover {
    background-color: var(--color-bg-tertiary);
    border-color: var(--color-accent-dim);
}

.upload-area.drag-over .upload-content {
    background-color: var(--color-bg-elevated);
    border-color: var(--color-accent);
    border-style: solid;
    transform: scale(1.02);
}

.upload-icon {
    color: var(--color-accent);
    margin-bottom: var(--spacing-lg);
    animation: floatUpDown 3s ease-in-out infinite;
}

.upload-title {
    font-size: 1.5rem;
    font-weight: 600;
    color: var(--color-text-primary);
    margin-bottom: var(--spacing-sm);
}

.upload-subtitle {
    font-family: var(--font-body);
    font-size: 1rem;
    color: var(--color-text-secondary);
    margin-bottom: var(--spacing-lg);
}

.upload-specs {
    font-family: var(--font-display);
    font-size: 0.8125rem;
    color: var(--color-text-tertiary);
    padding-top: var(--spacing-md);
    border-top: 1px solid var(--color-border);
    display: inline-block;
}
```

#### Compact Upload Bar

```css
.compact-upload {
    position: relative;
    width: 100%;
    background-color: var(--color-bg-tertiary);
    border: 2px dashed var(--color-border-strong);
    border-radius: var(--radius-md);
    padding: var(--spacing-lg) var(--spacing-xl);
    cursor: pointer;
    transition: all var(--transition-base);
    overflow: hidden;
}

.compact-upload::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg,
        transparent 0%,
        var(--color-accent-glow) 50%,
        transparent 100%);
    opacity: 0;
    transition: opacity var(--transition-base);
}

.compact-upload:hover:not(.loading) {
    background-color: var(--color-bg-elevated);
    border-color: var(--color-accent-dim);
}

.compact-upload:hover:not(.loading)::before {
    opacity: 1;
}
```

---

## Layout Patterns

### Header

```css
.app-header {
    position: sticky;
    top: 0;
    z-index: 100;
    background-color: var(--color-bg-secondary);
    border-bottom: 1px solid var(--color-border);
    backdrop-filter: blur(12px);
}

.header-content {
    max-width: 1600px;
    margin: 0 auto;
    padding: var(--spacing-lg) var(--spacing-xl);
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.app-title {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    color: var(--color-text-primary);
}

.title-icon {
    color: var(--color-accent);
    font-size: 1.5rem;
    animation: pulse 2s ease-in-out infinite;
}
```

### Grid Layout

```css
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: var(--spacing-lg);
}

/* Responsive adjustments */
@media (max-width: 1024px) {
    .grid {
        grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
    }
}

@media (max-width: 768px) {
    .grid {
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: var(--spacing-md);
    }
}
```

### Steps/Feature Bar

```css
.steps-bar {
    background-color: var(--color-bg-secondary);
    border-bottom: 1px solid var(--color-border);
}

.steps-container {
    max-width: 1600px;
    margin: 0 auto;
    padding: var(--spacing-lg) var(--spacing-xl);
    display: flex;
    align-items: center;
    justify-content: center;
    gap: var(--spacing-xl);
}

.step-item {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    flex: 1;
    max-width: 350px;
}

.step-divider {
    width: 1px;
    height: 48px;
    background-color: var(--color-border-strong);
    flex-shrink: 0;
}

.feature-number {
    font-family: var(--font-display);
    font-size: 1.25rem;
    font-weight: 600;
    color: var(--color-accent);
    line-height: 1;
    flex-shrink: 0;
}
```

---

## Animation Library

### Keyframe Animations

```css
/* Fade In */
@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* Fade In Scale */
@keyframes fadeInScale {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

/* Slide Up (Modal) */
@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(40px) scale(0.96);
    }
    to {
        opacity: 1;
        transform: translateY(0) scale(1);
    }
}

/* Slide In (Toast) */
@keyframes slideIn {
    from {
        transform: translateX(400px);
        opacity: 0;
    }
    to {
        transform: translateX(0);
        opacity: 1;
    }
}

/* Pulse */
@keyframes pulse {
    0%, 100% {
        opacity: 1;
    }
    50% {
        opacity: 0.7;
    }
}

/* Float Up/Down */
@keyframes floatUpDown {
    0%, 100% {
        transform: translateY(0);
    }
    50% {
        transform: translateY(-10px);
    }
}

/* Float Up/Down Small */
@keyframes floatUpDownSmall {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-4px); }
}

/* Spin (Loader) */
@keyframes spin {
    to { transform: rotate(360deg); }
}

/* Ping (Stage Indicator) */
@keyframes pingStage {
    75%, 100% {
        transform: scale(1.5);
        opacity: 0;
    }
}
```

### Animation Usage Classes

```css
.animate-fade-in {
    animation: fadeIn var(--transition-slow) ease-out;
}

.animate-fade-in-scale {
    animation: fadeInScale var(--transition-slow) ease-out backwards;
}

.animate-pulse {
    animation: pulse 2s ease-in-out infinite;
}

.animate-float {
    animation: floatUpDown 3s ease-in-out infinite;
}

.animate-spin {
    animation: spin 0.8s linear infinite;
}
```

### Staggered Animation

Apply delay to child elements for cascading effect:

```css
.stagger-children > *:nth-child(1) { animation-delay: 0ms; }
.stagger-children > *:nth-child(2) { animation-delay: 50ms; }
.stagger-children > *:nth-child(3) { animation-delay: 100ms; }
.stagger-children > *:nth-child(4) { animation-delay: 150ms; }
.stagger-children > *:nth-child(5) { animation-delay: 200ms; }
/* Continue as needed... */
```

---

## Responsive Breakpoints

```css
/* Large tablets and small desktops */
@media (max-width: 1024px) {
    /* Adjust padding, grid columns, hide non-essential elements */
}

/* Tablets and large phones */
@media (max-width: 768px) {
    /* Stack layouts, full-width elements, simplified navigation */
}

/* Small phones */
@media (max-width: 480px) {
    /* Minimal padding, single column, compact controls */
}
```

### Responsive Patterns

```css
/* Responsive header */
@media (max-width: 768px) {
    .app-title {
        font-size: 1rem;
    }

    .header-info {
        display: none;
    }
}

/* Responsive buttons */
@media (max-width: 768px) {
    .btn {
        padding: 0.625rem 1.25rem;
        font-size: 0.8125rem;
    }
}

/* Responsive modals */
@media (max-width: 768px) {
    .modal {
        padding: 0;
    }

    .modal-content {
        max-height: 100vh;
        border-radius: 0;
        max-width: 100%;
    }
}
```

---

## CSS Variable Reference

### Complete Variable List

```css
:root {
    /* ===== COLORS ===== */

    /* Backgrounds */
    --color-bg-primary: #050505;
    --color-bg-secondary: #0d0d0d;
    --color-bg-tertiary: #151515;
    --color-bg-elevated: #1a1a1a;
    --color-bg-hover: #202020;

    /* Borders */
    --color-border-subtle: #252525;
    --color-border: #2a2a2a;
    --color-border-strong: #353535;

    /* Text */
    --color-text-primary: #e8e8e8;
    --color-text-secondary: #a0a0a0;
    --color-text-tertiary: #6a6a6a;

    /* Accent */
    --color-accent: #ffb347;
    --color-accent-bright: #ffc266;
    --color-accent-dim: #cc8f39;
    --color-accent-glow: rgba(255, 179, 71, 0.15);

    /* Semantic */
    --color-success: #4ade80;
    --color-error: #f87171;
    --color-warning: #fbbf24;

    /* ===== TYPOGRAPHY ===== */
    --font-display: 'IBM Plex Mono', monospace;
    --font-body: 'DM Sans', sans-serif;

    /* ===== SPACING ===== */
    --spacing-xs: 0.25rem;
    --spacing-sm: 0.5rem;
    --spacing-md: 1rem;
    --spacing-lg: 1.5rem;
    --spacing-xl: 2rem;
    --spacing-2xl: 3rem;
    --spacing-3xl: 4rem;

    /* ===== BORDERS ===== */
    --radius-sm: 2px;
    --radius-md: 4px;
    --radius-lg: 6px;

    /* ===== MOTION ===== */
    --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-base: 250ms cubic-bezier(0.4, 0, 0.2, 1);
    --transition-slow: 400ms cubic-bezier(0.4, 0, 0.2, 1);

    /* ===== SHADOWS ===== */
    --shadow-sm: 0 1px 3px rgba(0, 0, 0, 0.3);
    --shadow-md: 0 4px 12px rgba(0, 0, 0, 0.4);
    --shadow-lg: 0 8px 24px rgba(0, 0, 0, 0.5);
    --shadow-glow: 0 0 20px var(--color-accent-glow);
}
```

---

## Implementation Examples

### Example: Media Card Component

```html
<div class="media-card">
    <div class="media-card-image-container">
        <img src="frame-001.jpg" alt="Frame 1" class="media-card-image">
        <span class="badge badge-accent badge-positioned">+5 similar</span>
    </div>
    <div class="media-card-info">
        <span class="media-card-meta">Frame 1</span>
        <span class="media-card-timestamp">00:00:01</span>
    </div>
</div>
```

### Example: Button Group

```html
<div class="button-group">
    <button class="btn btn-primary">
        <svg><!-- download icon --></svg>
        Download Selected
    </button>
    <button class="btn btn-secondary">New Video</button>
    <button class="btn btn-icon btn-destructive" title="Clear">
        <svg><!-- x icon --></svg>
    </button>
</div>
```

### Example: Progress Section

```html
<div class="progress-container">
    <div class="progress-bar">
        <div class="progress-fill" style="width: 65%"></div>
    </div>
    <div class="progress-label">
        <span class="progress-percent">65%</span>
        <span class="progress-detail">Processing frame 130 of 200</span>
    </div>
</div>

<div class="stages">
    <div class="stage complete">
        <div class="stage-indicator"></div>
        <span>Extracting Frames</span>
    </div>
    <div class="stage active">
        <div class="stage-indicator"></div>
        <span>Analyzing Similarity</span>
    </div>
    <div class="stage">
        <div class="stage-indicator"></div>
        <span>Grouping Duplicates</span>
    </div>
</div>
```

### Example: Toast Notification (JavaScript)

```javascript
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.innerHTML = `<span class="toast-message">${message}</span>`;
    container.appendChild(toast);

    setTimeout(() => {
        toast.style.animation = 'slideIn var(--transition-base) ease-out reverse';
        setTimeout(() => toast.remove(), 250);
    }, 3000);
}
```

---

## Extending the System

### Adding New Colors

When adding a new semantic color, follow this pattern:

```css
:root {
    --color-info: #60a5fa;              /* Base */
    --color-info-bright: #93c5fd;       /* Hover/Light */
    --color-info-dim: #3b82f6;          /* Border/Dark */
    --color-info-glow: rgba(96, 165, 250, 0.15);  /* Glow */
}
```

### Creating New Components

1. Use existing CSS variables for consistency
2. Follow the established naming conventions
3. Include hover, active, focus, and disabled states
4. Add responsive breakpoints as needed
5. Include animations where appropriate

### Naming Conventions

- **Components**: `.component-name` (e.g., `.media-card`)
- **Variants**: `.component-name-variant` (e.g., `.btn-primary`)
- **States**: `.component-name.state` (e.g., `.btn.disabled`)
- **Child elements**: `.component-name-element` (e.g., `.media-card-image`)

---

*This design system is maintained for the Frame Maker project and can be adapted for any media-focused application requiring a cinematic, professional aesthetic.*
