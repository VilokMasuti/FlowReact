# App Graph Builder

## Tech Stack

- **React 18** + **Next.js 14** (App Router)
- **TypeScript** (strict mode enabled)
- **ReactFlow** (@xyflow/react) - Interactive node-based graph visualization
- **shadcn/ui** - Beautiful, accessible UI components
- **TanStack Query** - Server state management with caching
- **Zustand** - Lightweight client state management
- **Tailwind CSS** - Utility-first styling

## Features

### Layout

- **Top Bar**: App selector dropdown, actions, and user avatar
- **Left Rail**: Icon-based navigation sidebar with colored icons
- **Right Panel**: Apps list with search + Node inspector
- **Center Canvas**: ReactFlow graph with dotted background

### Responsive Design

- Desktop: Fixed right panel (320px width)
- Mobile: Right panel becomes a slide-over drawer (controlled via Zustand)

### ReactFlow Graph

- Drag and reposition nodes
- Click to select nodes
- Delete nodes with `Delete` or `Backspace` keys
- Zoom and pan (built-in ReactFlow controls)
- Fit View button (top-right corner)
- Add Node button to create new service nodes

### Node Inspector (Right Panel)

- **Status Badge**: Success (green), Degraded (yellow), Error (red)
- **Two Tabs**: Config and Runtime
- **Config Tab**: Editable name, description, type, and provider fields
- **Runtime Tab**: CPU, Memory, Disk, Region metrics + synced slider/input (0-100)

### Data Fetching (TanStack Query)

- `GET /apps` - Fetches list of applications
- `GET /apps/:appId/graph` - Fetches nodes and edges for selected app
- Loading states with skeleton UI
- Error states with retry functionality
- Automatic caching and refetching

### State Management (Zustand)

Minimal state stored in Zustand:

- `selectedAppId` - Currently selected application
- `selectedNodeId` - Currently selected node on canvas
- `isMobilePanelOpen` - Mobile drawer open state
- `activeInspectorTab` - Active tab in node inspector ("config" | "runtime")

## Project Structure

``
├── 📁 public
│ ├── 🖼️ galang.jpg
│ ├── 🖼️ go.jpg
│ ├── 🖼️ java.webp
│ ├── 🖼️ javaa.png
│ ├── 🖼️ node.png
│ ├── 🖼️ py.jpg
│ ├── 🖼️ ruby.png
│ └── 🖼️ vite.svg
├── 📁 src
│ ├── 📁 assets
│ │ └── 🖼️ react.svg
│ ├── 📁 components
│ │ ├── 📁 Canvas
│ │ │ ├── 📄 GraphCanvas.tsx
│ │ │ └── 📄 ServiceNode.tsx
│ │ ├── 📁 Inspector
│ │ │ └── 📄 Inspector.tsx
│ │ ├── 📁 apps
│ │ │ └── 📄 AppsList.tsx
│ │ ├── 📁 layout
│ │ │ ├── 📄 AppLayout.tsx
│ │ │ ├── 📄 Leftbar.tsx
│ │ │ ├── 📄 Rightpanel.tsx
│ │ │ └── 📄 TopBar.tsx
│ │ └── 📁 ui
│ │ ├── 📄 accordion.tsx
│ │ ├── 📄 alert-dialog.tsx
│ │ ├── 📄 alert.tsx
│ │ ├── 📄 aspect-ratio.tsx
│ │ ├── 📄 avatar.tsx
│ │ ├── 📄 badge.tsx
│ │ ├── 📄 breadcrumb.tsx
│ │ ├── 📄 button-group.tsx
│ │ ├── 📄 button.tsx
│ │ ├── 📄 calendar.tsx
│ │ ├── 📄 card.tsx
│ │ ├── 📄 carousel.tsx
│ │ ├── 📄 chart.tsx
│ │ ├── 📄 checkbox.tsx
│ │ ├── 📄 collapsible.tsx
│ │ ├── 📄 command.tsx
│ │ ├── 📄 context-menu.tsx
│ │ ├── 📄 dialog.tsx
│ │ ├── 📄 drawer.tsx
│ │ ├── 📄 dropdown-menu.tsx
│ │ ├── 📄 empty.tsx
│ │ ├── 📄 field.tsx
│ │ ├── 📄 form.tsx
│ │ ├── 📄 hover-card.tsx
│ │ ├── 📄 input-group.tsx
│ │ ├── 📄 input-otp.tsx
│ │ ├── 📄 input.tsx
│ │ ├── 📄 item.tsx
│ │ ├── 📄 kbd.tsx
│ │ ├── 📄 label.tsx
│ │ ├── 📄 menubar.tsx
│ │ ├── 📄 navigation-menu.tsx
│ │ ├── 📄 pagination.tsx
│ │ ├── 📄 popover.tsx
│ │ ├── 📄 progress.tsx
│ │ ├── 📄 radio-group.tsx
│ │ ├── 📄 resizable.tsx
│ │ ├── 📄 scroll-area.tsx
│ │ ├── 📄 select.tsx
│ │ ├── 📄 separator.tsx
│ │ ├── 📄 sheet.tsx
│ │ ├── 📄 sidebar.tsx
│ │ ├── 📄 skeleton.tsx
│ │ ├── 📄 slider.tsx
│ │ ├── 📄 sonner.tsx
│ │ ├── 📄 spinner.tsx
│ │ ├── 📄 switch.tsx
│ │ ├── 📄 table.tsx
│ │ ├── 📄 tabs.tsx
│ │ ├── 📄 textarea.tsx
│ │ ├── 📄 toggle-group.tsx
│ │ ├── 📄 toggle.tsx
│ │ └── 📄 tooltip.tsx
│ ├── 📁 hooks
│ │ ├── 📄 use-apps.ts
│ │ ├── 📄 use-graph.ts
│ │ └── 📄 use-mobile.ts
│ ├── 📁 lib
│ │ ├── 📄 mock-api.ts
│ │ └── 📄 utils.ts
│ ├── 📁 providers
│ │ └── 📄 QueryProvider.tsx
│ ├── 📁 store
│ │ └── 📄 store.ts
│ ├── 📁 types
│ │ └── 📄 graph.ts
│ ├── 📄 App.tsx
│ ├── 🎨 index.css
│ └── 📄 main.tsx
├── ⚙️ .eslintrc.cjs
├── ⚙️ .gitignore
├── ⚙️ .prettierrc
├── 📝 README.md
├── ⚙️ components.json
├── 📄 eslint.config.js
├── 🌐 index.html
├── ⚙️ package-lock.json
├── ⚙️ package.json
├── ⚙️ tsconfig.app.json
├── ⚙️ tsconfig.json
├── ⚙️ tsconfig.node.json
└── 📄 vite.config.ts

````

## Working Features Checklist

- Layout with top bar, left rail, right panel, dotted canvas
- Responsive design - right panel becomes mobile drawer
- ReactFlow with 3+ nodes and 2+ edges per app
- Drag nodes to reposition
- Click to select nodes
- Delete selected nodes with Delete/Backspace
- Zoom and pan controls
- Fit View button
- Add Node button
- App selector dropdown in top bar
- Apps list with search functionality
- Node inspector with status badge
- Inspector tabs (Config/Runtime)
- Synced slider and numeric input (0-100)
- Editable name and description fields
- TanStack Query with loading states
- TanStack Query with error states and retry
- TanStack Query caching
- Zustand state for selectedAppId
- Zustand state for selectedNodeId
- Zustand state for isMobilePanelOpen
- Zustand state for activeInspectorTab
- TypeScript strict mode
- Different node types (service/database) with same styling

## Mock API

The app uses an in-memory mock API with simulated network latency:

- `fetchApps()` - 500ms delay, returns 5 sample applications
- `fetchGraph(appId)` - 400ms delay, returns nodes/edges for the app

Each app has a predefined graph, with fallback to a default graph for apps without specific data.

## Getting Started

1. Install dependencies:

   ```bash
   npm install
````

2. Run the development server:

   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Keyboard Shortcuts

- `Delete` / `Backspace` - Delete selected node(s)

## Notes

- The app uses a dark theme by default
- All data is mock/in-memory - no backend required
- Node positions are persisted in ReactFlow state during the session
- Newly added nodes are tracked locally and merged with API data
