export type Topic = "AI Tips" | "AI Tools" | "CLI Tools";

export type ArticleBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; text: string }
  | { type: "list"; items: string[] }
  | { type: "code"; label: string; code: string };

export type ArticleSummary = {
  slug: string;
  title: string;
  excerpt: string;
  topic: Topic;
  readTime: number;
  tags: string[];
  icon: string;
};

export type Article = ArticleSummary & {
  date: string;
  featured?: boolean;
  blocks: ArticleBlock[];
};

export const topics: { name: Topic; eyebrow: string; description: string; icon: string; color: string }[] = [
  { name: "AI Tips", eyebrow: "Think better", description: "Small shifts for getting more useful answers from AI.", icon: "✳", color: "peach" },
  { name: "AI Tools", eyebrow: "Find your flow", description: "A practical look at tools worth adding to your toolkit.", icon: "◈", color: "lavender" },
  { name: "CLI Tools", eyebrow: "Make it happen", description: "Bring AI and automation closer to your terminal.", icon: "⌘", color: "mint" },
];

export function topicSlug(topic: Topic) {
  return topic.toLowerCase().replaceAll(" ", "-");
}

export function getTopic(slug: string) {
  return topics.find((topic) => topicSlug(topic.name) === slug);
}

export const articles: Article[] = [
  {
    slug: "prompts-that-get-better-answers",
    title: "Prompts that get better answers",
    excerpt: "A simple structure for giving an AI the context it needs to do its best work.",
    topic: "AI Tips", readTime: 5, date: "2026-10-21", tags: ["Prompting", "Getting started"], featured: true, icon: "✳",
    blocks: [
      { type: "paragraph", text: "A good prompt is less like a magic spell and more like a clear brief. Give the model a job, the context it needs, and a useful shape for the answer." },
      { type: "heading", text: "Try this four-part brief" },
      { type: "list", items: ["Role: what kind of help do you need?", "Context: what should it know about your situation?", "Task: what should it do, specifically?", "Format: what should a useful answer look like?"] },
      { type: "code", label: "A prompt starter", code: "You are a patient writing coach.\n\nContext: I'm writing a short project update for my team.\nTask: Make this draft clearer and flag anything ambiguous.\nFormat: Return a revised version, then 3 brief notes." },
      { type: "heading", text: "Give it a way to check its work" },
      { type: "paragraph", text: "Add one sentence about what matters most: accuracy, brevity, warmth, or a specific audience. If the first answer misses, point to what to change instead of starting over. Treat the conversation as a draft you can refine." },
    ],
  },
  {
    slug: "use-ai-to-learn-something-new",
    title: "Use AI as a patient tutor",
    excerpt: "Turn a topic you find intimidating into a low-pressure, interactive lesson.",
    topic: "AI Tips", readTime: 4, date: "2026-10-18", tags: ["Learning", "Prompts"], icon: "↗",
    blocks: [
      { type: "paragraph", text: "AI can make a good study partner: available whenever you are, happy to explain the same idea in a few different ways, and quick to make practice questions." },
      { type: "heading", text: "Ask for a conversation, not a lecture" },
      { type: "code", label: "Tutor prompt", code: "Teach me the basics of [topic].\nAsk what I already know first. Explain one idea at a time,\nuse a real-world example, then ask me a question\nto check my understanding before moving on." },
      { type: "paragraph", text: "For important facts, ask for sources you can verify. Use the lesson to build understanding, then check details against trusted references." },
    ],
  },
  {
    slug: "make-ai-summaries-more-useful",
    title: "Make AI summaries actually useful",
    excerpt: "Tell the model what you need the summary for, and the details worth keeping.",
    topic: "AI Tips", readTime: 3, date: "2026-10-14", tags: ["Productivity", "Writing"], icon: "≋",
    blocks: [
      { type: "paragraph", text: "A one-size-fits-all summary often leaves out the exact thing you were looking for. Add a purpose and a few guardrails to get something you can use." },
      { type: "code", label: "A more focused request", code: "Summarize this for someone preparing for a project meeting.\nKeep decisions, open questions, and owners.\nUse bullets and include a short section for next steps.\nIf the source doesn't say, mark it as unknown." },
      { type: "paragraph", text: "When the source matters, ask for section names or short quotes alongside each key point. That makes it easier to check the summary against the original." },
    ],
  },
  {
    slug: "choose-the-right-ai-tool",
    title: "Choose the right AI tool for the job",
    excerpt: "A calmer way to compare chatbots, coding assistants, and creative tools.",
    topic: "AI Tools", readTime: 6, date: "2026-10-20", tags: ["Tools", "Workflow"], featured: true, icon: "◈",
    blocks: [
      { type: "paragraph", text: "The best tool is the one that fits the task you actually have. Before comparing feature lists, decide what you need it to help you do." },
      { type: "heading", text: "Start with your workflow" },
      { type: "list", items: ["Writing and research: look for strong file handling and source links.", "Coding: check how it works with your editor, terminal, and existing code.", "Images and design: compare control over style, edits, and commercial terms.", "Everyday questions: prioritize speed, clarity, and accessibility."] },
      { type: "heading", text: "Test with a real task" },
      { type: "paragraph", text: "Use the same representative task with each tool. Notice the quality of the first result, how easy it is to correct, and whether the workflow fits your privacy needs. Plans and features change, so check the current terms before committing." },
    ],
  },
  {
    slug: "build-a-personal-ai-workflow",
    title: "Build a personal AI workflow",
    excerpt: "Connect the small repetitive tasks where AI saves time without adding busywork.",
    topic: "AI Tools", readTime: 5, date: "2026-10-16", tags: ["Workflow", "Automation"], icon: "⤴",
    blocks: [
      { type: "paragraph", text: "A useful AI workflow does not need to be complicated. Start with one task you repeat often, then decide where a model can help and where you want to stay in control." },
      { type: "list", items: ["Capture the raw input in one reliable place.", "Use AI to draft, sort, or summarize it.", "Review the result before it goes anywhere important.", "Save the prompt that worked so you can reuse it."] },
      { type: "paragraph", text: "Keep private or sensitive information out of a service unless you understand its data controls. Review your workflow every few weeks: remove steps that create more work than they save." },
    ],
  },
  {
    slug: "ask-your-terminal-for-a-hand",
    title: "Ask your terminal for a hand",
    excerpt: "Use a command-line AI assistant to understand unfamiliar commands before you run them.",
    topic: "CLI Tools", readTime: 5, date: "2026-10-19", tags: ["Terminal", "Safety"], featured: true, icon: "⌘",
    blocks: [
      { type: "paragraph", text: "CLI assistants can translate plain language into shell commands, explain output, and help you find your way around a codebase. They are useful collaborators, but their suggestions still deserve a quick review." },
      { type: "heading", text: "A safe first loop" },
      { type: "list", items: ["Describe the task and your operating system.", "Ask for the command and a plain-language explanation.", "Review every flag and path before running it.", "Start with a read-only command when possible."] },
      { type: "code", label: "Example request", code: "Find the 10 largest files under the current folder.\nShow me a read-only command for PowerShell and\nexplain what each part does." },
      { type: "paragraph", text: "Commands that delete files, change permissions, install software, or send data elsewhere need extra care. Check that the command targets the location you intended before confirming it." },
    ],
  },
  {
    slug: "a-friendlier-git-diff",
    title: "Read a code change before you commit",
    excerpt: "A quick terminal habit that helps you catch accidental changes early.",
    topic: "CLI Tools", readTime: 3, date: "2026-10-12", tags: ["Git", "Developer basics"], icon: "⌁",
    blocks: [
      { type: "paragraph", text: "Before saving a change in Git, look at the diff: the exact lines that changed. It is one of the simplest ways to spot a debug print, an unrelated file, or a missing detail." },
      { type: "code", label: "Inspect your changes", code: "git status --short\ngit diff --" },
      { type: "paragraph", text: "The first command shows which files changed. The second shows the unstaged edits inside them. If anything looks unexpected, you can investigate before creating a commit." },
    ],
  },
  {
    slug: "let-ai-explain-a-codebase",
    title: "Let AI help you explore a codebase",
    excerpt: "Get oriented in an unfamiliar project with questions that lead to useful next steps.",
    topic: "CLI Tools", readTime: 4, date: "2026-10-09", tags: ["Coding", "Getting started"], icon: "⌘",
    blocks: [
      { type: "paragraph", text: "When you open a project for the first time, start by asking for a map, not a rewrite. A short explanation of the entry points and data flow gives you a better sense of where to look." },
      { type: "code", label: "Ask for an orientation", code: "Please inspect this project and explain:\n1. How to run it locally\n2. The main entry points\n3. Where the core feature logic lives\nCite file paths and don't change anything." },
      { type: "paragraph", text: "Check the suggested paths yourself and follow up with one focused question at a time. Keeping the first pass read-only helps you build confidence before making changes." },
    ],
  },
];

export function getArticle(slug: string) {
  return articles.find((article) => article.slug === slug);
}

export function getArticleSummaries(): ArticleSummary[] {
  return articles.map(({ slug, title, excerpt, topic, readTime, tags, icon }) => ({
    slug,
    title,
    excerpt,
    topic,
    readTime,
    tags,
    icon,
  }));
}
