Approach-->

I built the UI by first recreating the layout structure from the provided screenshot (top bar, left rail, center canvas, right panel) and then layering functionality incrementally.

ReactFlow (xyflow) is used for the central canvas to render nodes and edges with built-in support for drag, zoom, pan, selection, and keyboard deletion. The dotted background and controls come directly from ReactFlow to keep behavior predictable.

Server-like data (apps list and graphs) is handled via TanStack Query with mock APIs and simulated latency, allowing proper loading, error, and caching behavior without a real backend.

Client-side UI state (selected app, selected node, active inspector tab, mobile panel state) is managed using Zustand to avoid prop drilling and keep ReactFlow and the inspector in sync.

The Node Inspector edits node data by updating in-memory state, which immediately reflects in both the inspector and the canvas, matching the task requirement without adding unnecessary persistence.

Trade-offs -->

No backend persistence: The task did not require saving changes across reloads, so node edits are stored in-memory only. This keeps the solution simple and aligned with the assignment.

API data treated as read-only initially: When an API-provided node is edited, it is copied into local state before modification. This avoids mutating query cache data and keeps ownership of editable state clear.

Focus on correctness over extra features: Visual polish and advanced interactions were kept minimal to prioritize correctness, clarity, and clean architecture as requested.
