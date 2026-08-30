# Design System & Styling Guidelines (`USES.md`)

This project strictly utilizes **Semantic Utility Tokens** linked to central CSS variables in `app/globals.css`.

## 1. Core Rule: No Hardcoded Utility Colors

Do **NOT** use hardcoded color values (e.g., `bg-white`, `bg-gray-900`, `text-black`, `border-gray-200`) anywhere in your components. Always use semantic tokens so themes update across light and dark modes instantly.

---

## 2. Utility Class Reference Table

### Layout & Surfaces

| Element              | Class to Use                                                          | Description               |
| :------------------- | :-------------------------------------------------------------------- | :------------------------ |
| **Page Root**        | `bg-background text-foreground`                                       | Main page body canvas     |
| **Header / Nav**     | `bg-header text-header-foreground border-header-border`               | Sticky or top navigation  |
| **Sidebar**          | `bg-sidebar text-sidebar-foreground border-sidebar-border`            | App side navigation       |
| **Card / Container** | `bg-card text-card-foreground border-card-border hover:bg-card-hover` | Content container surface |

---

### Typography Hierarchy

| Level           | Class to Use       | Use Case                                                   |
| :-------------- | :----------------- | :--------------------------------------------------------- |
| **Title**       | `text-title`       | Main Page Titles, Card Titles, Dialog Headers (`h1`, `h2`) |
| **Subtitle**    | `text-subtitle`    | Section Subheaders, Important Labels (`h3`, `h4`)          |
| **Description** | `text-description` | Paragraph text, card body copy, descriptions               |
| **Caption**     | `text-caption`     | Timestamps, metadata, footnotes, legal text                |

---

### Buttons & Interactive Surfaces

| Intent                | Class to Use                                                   |
| :-------------------- | :------------------------------------------------------------- |
| **Primary Action**    | `bg-primary text-primary-foreground hover:bg-primary/90`       |
| **Secondary Action**  | `bg-secondary text-secondary-foreground hover:bg-secondary/80` |
| **Muted Action**      | `bg-muted text-muted-foreground hover:bg-muted/80`             |
| **Interactive Hover** | `hover:bg-accent hover:text-accent-foreground`                 |

---

### Status & Feedback States

| Status          | Background & Text                    | Border                  |
| :-------------- | :----------------------------------- | :---------------------- |
| **Success**     | `bg-success/10 text-success`         | `border-success/30`     |
| **Warning**     | `bg-warning/10 text-warning`         | `border-warning/30`     |
| **Destructive** | `bg-destructive/10 text-destructive` | `border-destructive/30` |
| **Info**        | `bg-info/10 text-info`               | `border-info/30`        |

---

## 3. Real Example Usage

```tsx
import { Button } from "@/components/ui/button";

export function DashboardExample() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="sticky top-0 z-50 flex h-16 items-center justify-between border-b border-header-border bg-header backdrop-blur-md px-6 text-header-foreground">
        <span className="text-lg font-bold text-title">App Brand</span>
        <Button size="sm">New Project</Button>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-extrabold text-title">
            System Overview
          </h1>
          <h2 className="text-lg font-semibold text-subtitle mt-1">
            Analytics & Usage
          </h2>
          <p className="text-description mt-2">
            This card automatically switches color palettes without modifying
            component code.
          </p>
        </div>

        {/* Card Component */}
        <div className="rounded-xl border border-card-border bg-card p-6 text-card-foreground shadow-sm transition-colors hover:bg-card-hover space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-title">API Quota</h3>
            <span className="rounded-full bg-success/10 border border-success/30 px-3 py-1 text-xs font-semibold text-success">
              Active
            </span>
          </div>

          <p className="text-sm text-description">
            You have used 82% of your monthly token allocation.
          </p>

          <span className="block text-xs text-caption">
            Last updated 2 minutes ago
          </span>
        </div>
      </main>
    </div>
  );
}
```
