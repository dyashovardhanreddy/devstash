// Mock data for the dashboard UI. Replace with Prisma queries once the database is in place.
// `itemCount` values are display counts (matching the dashboard design), not derived from `items`.

export type ContentType = "TEXT" | "URL" | "FILE";

export interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
  isPro: boolean;
}

export interface ItemType {
  id: string;
  name: string;
  slug: string;
  icon: string;
  color: string;
  isSystem: boolean;
  itemCount: number;
}

export interface Collection {
  id: string;
  name: string;
  description: string;
  isFavorite: boolean;
  defaultTypeId: string;
  itemCount: number;
}

export interface Item {
  id: string;
  title: string;
  description: string;
  contentType: ContentType;
  content?: string;
  language?: string;
  url?: string;
  fileUrl?: string;
  fileName?: string;
  fileSize?: number;
  isFavorite: boolean;
  isPinned: boolean;
  itemTypeId: string;
  collectionIds: string[];
  tags: string[];
  createdAt: string;
  lastUsedAt: string | null;
}

export const currentUser: User = {
  id: "user_1",
  name: "John Doe",
  email: "john@example.com",
  image: null,
  isPro: false,
};

export const itemTypes: ItemType[] = [
  { id: "type_snippet", name: "snippet", slug: "snippets", icon: "Code", color: "#3b82f6", isSystem: true, itemCount: 24 },
  { id: "type_prompt", name: "prompt", slug: "prompts", icon: "Sparkles", color: "#8b5cf6", isSystem: true, itemCount: 18 },
  { id: "type_command", name: "command", slug: "commands", icon: "Terminal", color: "#f97316", isSystem: true, itemCount: 15 },
  { id: "type_note", name: "note", slug: "notes", icon: "StickyNote", color: "#fde047", isSystem: true, itemCount: 12 },
  { id: "type_file", name: "file", slug: "files", icon: "File", color: "#6b7280", isSystem: true, itemCount: 5 },
  { id: "type_image", name: "image", slug: "images", icon: "Image", color: "#ec4899", isSystem: true, itemCount: 3 },
  { id: "type_link", name: "link", slug: "links", icon: "Link", color: "#10b981", isSystem: true, itemCount: 8 },
];

export const collections: Collection[] = [
  {
    id: "col_react_patterns",
    name: "React Patterns",
    description: "Common React patterns and hooks",
    isFavorite: true,
    defaultTypeId: "type_snippet",
    itemCount: 12,
  },
  {
    id: "col_python_snippets",
    name: "Python Snippets",
    description: "Useful Python code snippets",
    isFavorite: false,
    defaultTypeId: "type_snippet",
    itemCount: 8,
  },
  {
    id: "col_context_files",
    name: "Context Files",
    description: "AI context files for projects",
    isFavorite: true,
    defaultTypeId: "type_file",
    itemCount: 5,
  },
  {
    id: "col_interview_prep",
    name: "Interview Prep",
    description: "Technical interview preparation",
    isFavorite: false,
    defaultTypeId: "type_note",
    itemCount: 24,
  },
  {
    id: "col_git_commands",
    name: "Git Commands",
    description: "Frequently used git commands",
    isFavorite: true,
    defaultTypeId: "type_command",
    itemCount: 15,
  },
  {
    id: "col_ai_prompts",
    name: "AI Prompts",
    description: "Curated AI prompts for coding",
    isFavorite: false,
    defaultTypeId: "type_prompt",
    itemCount: 18,
  },
];

export const items: Item[] = [
  {
    id: "item_use_auth",
    title: "useAuth Hook",
    description: "Custom authentication hook for React applications",
    contentType: "TEXT",
    content: `export function useAuth() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    getSession().then((session) => setUser(session?.user ?? null));
  }, []);

  return { user, isAuthenticated: !!user };
}`,
    language: "typescript",
    isFavorite: true,
    isPinned: true,
    itemTypeId: "type_snippet",
    collectionIds: ["col_react_patterns", "col_interview_prep"],
    tags: ["react", "auth", "hooks"],
    createdAt: "2026-01-15T10:00:00.000Z",
    lastUsedAt: "2026-10-21T09:30:00.000Z",
  },
  {
    id: "item_api_error_handling",
    title: "API Error Handling Pattern",
    description: "Fetch wrapper with exponential backoff retry logic",
    contentType: "TEXT",
    content: `export async function fetchWithRetry(url: string, retries = 3): Promise<Response> {
  for (let attempt = 0; attempt < retries; attempt++) {
    const res = await fetch(url);
    if (res.ok) return res;
    await new Promise((r) => setTimeout(r, 2 ** attempt * 500));
  }
  throw new Error(\`Request failed after \${retries} attempts\`);
}`,
    language: "typescript",
    isFavorite: false,
    isPinned: true,
    itemTypeId: "type_snippet",
    collectionIds: ["col_react_patterns"],
    tags: ["api", "fetch", "error-handling"],
    createdAt: "2026-01-12T14:20:00.000Z",
    lastUsedAt: "2026-10-20T16:45:00.000Z",
  },
  {
    id: "item_compound_components",
    title: "Compound Components Notes",
    description: "When and how to use the compound component pattern",
    contentType: "TEXT",
    content: "# Compound Components\n\nShare implicit state between a parent and its children via context.",
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_note",
    collectionIds: ["col_react_patterns"],
    tags: ["react", "patterns"],
    createdAt: "2026-02-03T09:00:00.000Z",
    lastUsedAt: "2026-10-18T11:00:00.000Z",
  },
  {
    id: "item_react_docs",
    title: "React Docs",
    description: "Official React documentation",
    contentType: "URL",
    url: "https://react.dev",
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_link",
    collectionIds: ["col_react_patterns", "col_interview_prep"],
    tags: ["react", "docs"],
    createdAt: "2026-02-10T12:00:00.000Z",
    lastUsedAt: "2026-10-15T08:20:00.000Z",
  },
  {
    id: "item_python_dict_merge",
    title: "Merge Dictionaries",
    description: "Merge two dicts using the union operator",
    contentType: "TEXT",
    content: "merged = defaults | overrides",
    language: "python",
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_snippet",
    collectionIds: ["col_python_snippets"],
    tags: ["python", "dict"],
    createdAt: "2026-03-01T10:30:00.000Z",
    lastUsedAt: "2026-10-19T13:10:00.000Z",
  },
  {
    id: "item_python_venv",
    title: "Virtual Environment Setup",
    description: "Steps for creating and activating a venv",
    contentType: "TEXT",
    content: "python -m venv .venv\nsource .venv/bin/activate",
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_note",
    collectionIds: ["col_python_snippets"],
    tags: ["python", "setup"],
    createdAt: "2026-03-05T15:00:00.000Z",
    lastUsedAt: null,
  },
  {
    id: "item_claude_md",
    title: "CLAUDE.md Template",
    description: "Starter context file for AI coding assistants",
    contentType: "FILE",
    fileUrl: "https://example.com/files/claude-md-template.md",
    fileName: "CLAUDE.md",
    fileSize: 2048,
    isFavorite: true,
    isPinned: false,
    itemTypeId: "type_file",
    collectionIds: ["col_context_files"],
    tags: ["ai", "context"],
    createdAt: "2026-04-02T09:15:00.000Z",
    lastUsedAt: "2026-10-21T17:00:00.000Z",
  },
  {
    id: "item_context_guidelines",
    title: "Context File Guidelines",
    description: "What to include in project context files",
    contentType: "TEXT",
    content: "- Project overview\n- Coding standards\n- Current feature",
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_note",
    collectionIds: ["col_context_files", "col_ai_prompts"],
    tags: ["ai", "context"],
    createdAt: "2026-04-04T11:00:00.000Z",
    lastUsedAt: null,
  },
  {
    id: "item_big_o",
    title: "Big O Cheatsheet",
    description: "Time complexity of common data structure operations",
    contentType: "TEXT",
    content: "| Structure | Access | Search | Insert |\n| --- | --- | --- | --- |\n| Array | O(1) | O(n) | O(n) |",
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_note",
    collectionIds: ["col_interview_prep"],
    tags: ["algorithms", "interview"],
    createdAt: "2026-05-12T08:00:00.000Z",
    lastUsedAt: "2026-10-17T10:00:00.000Z",
  },
  {
    id: "item_mock_interview",
    title: "Mock Interview Prompt",
    description: "Have the AI run a technical mock interview",
    contentType: "TEXT",
    content: "Act as a senior engineer interviewing me for a frontend role. Ask one question at a time.",
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_prompt",
    collectionIds: ["col_interview_prep"],
    tags: ["interview", "ai"],
    createdAt: "2026-05-14T19:30:00.000Z",
    lastUsedAt: null,
  },
  {
    id: "item_git_undo",
    title: "Undo Last Commit",
    description: "Keep changes but remove the last commit",
    contentType: "TEXT",
    content: "git reset --soft HEAD~1",
    language: "bash",
    isFavorite: true,
    isPinned: false,
    itemTypeId: "type_command",
    collectionIds: ["col_git_commands"],
    tags: ["git"],
    createdAt: "2026-06-01T10:00:00.000Z",
    lastUsedAt: "2026-10-22T08:00:00.000Z",
  },
  {
    id: "item_git_branching",
    title: "Branching Strategy",
    description: "Feature branch workflow notes",
    contentType: "TEXT",
    content: "Create `feature/*` branches from main, merge back via PR, then delete the branch.",
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_note",
    collectionIds: ["col_git_commands"],
    tags: ["git", "workflow"],
    createdAt: "2026-06-03T14:00:00.000Z",
    lastUsedAt: null,
  },
  {
    id: "item_code_review_prompt",
    title: "Code Review Prompt",
    description: "Ask the AI for a focused code review",
    contentType: "TEXT",
    content: "Review this code for security issues, performance problems and logic errors. Be concise.",
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_prompt",
    collectionIds: ["col_ai_prompts"],
    tags: ["ai", "code-review"],
    createdAt: "2026-07-08T09:00:00.000Z",
    lastUsedAt: "2026-10-16T12:30:00.000Z",
  },
  {
    id: "item_refactor_prompt",
    title: "Refactor Prompt",
    description: "Refactor code for readability without changing behavior",
    contentType: "TEXT",
    content: "Refactor the following code for readability. Do not change its behavior.",
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_prompt",
    collectionIds: ["col_ai_prompts"],
    tags: ["ai", "refactor"],
    createdAt: "2026-07-10T13:00:00.000Z",
    lastUsedAt: null,
  },
  {
    id: "item_stream_response",
    title: "Stream AI Response",
    description: "Read a streamed response body chunk by chunk",
    contentType: "TEXT",
    content: `const reader = res.body!.getReader();
const decoder = new TextDecoder();
while (true) {
  const { done, value } = await reader.read();
  if (done) break;
  console.log(decoder.decode(value));
}`,
    language: "typescript",
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_snippet",
    collectionIds: ["col_ai_prompts"],
    tags: ["ai", "streaming"],
    createdAt: "2026-07-15T16:00:00.000Z",
    lastUsedAt: null,
  },
  {
    id: "item_docker_compose",
    title: "Start Docker Services",
    description: "Start all services in detached mode",
    contentType: "TEXT",
    content: "docker compose up -d",
    language: "bash",
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_command",
    collectionIds: [],
    tags: ["docker"],
    createdAt: "2026-08-01T10:00:00.000Z",
    lastUsedAt: "2026-10-21T07:45:00.000Z",
  },
  {
    id: "item_architecture_diagram",
    title: "Architecture Diagram",
    description: "High-level system architecture",
    contentType: "FILE",
    fileUrl: "https://example.com/images/architecture.png",
    fileName: "architecture.png",
    fileSize: 184320,
    isFavorite: false,
    isPinned: false,
    itemTypeId: "type_image",
    collectionIds: [],
    tags: ["architecture"],
    createdAt: "2026-08-20T12:00:00.000Z",
    lastUsedAt: null,
  },
];
