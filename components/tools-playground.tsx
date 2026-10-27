"use client";

import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from "react";

type CommandEntry = { command: string; output: string };

const welcomeMessage = "A small simulated shell. Type help to see what it understands.";
const helpText = "Available commands:\n  help                         Show this list\n  pwd                          Show the sample location\n  ls                           List sample files\n  ls notes                     List sample notes\n  ls projects                  List sample projects\n  cat README.md                Read the sample README\n  cat notes/first-prompt.md    Read a sample note\n  echo <text>                  Print text in the simulator\n  clear                        Clear the terminal";
const files: Record<string, string> = {
  "README.md": "# Curious CLI\n\nThis tiny filesystem is a safe place to explore command-line ideas.",
  "notes/first-prompt.md": "Start with a role, add useful context, describe the task, and ask for the format you need.",
};
const completionOptions = ["help", "pwd", "ls", "ls notes", "ls projects", "cat README.md", "cat notes/first-prompt.md", "echo", "clear"];
const defaultPromptFields = {
  role: "A patient writing coach",
  context: "I'm writing a short project update for my team.",
  task: "Make this draft clearer and flag anything ambiguous.",
  format: "Return a revised version, then 3 brief notes.",
};

function simulateCommand(rawCommand: string) {
  const command = rawCommand.trim();
  if (command === "help") return helpText;
  if (command === "pwd") return "/home/curious";
  if (command === "ls") return "README.md  notes/  projects/";
  if (command === "ls notes") return "first-prompt.md";
  if (command === "ls projects") return "prompt-lab/";
  if (command.startsWith("cat ")) {
    const path = command.slice(4).trim();
    return files[path] ?? `cat: ${path || "(missing path)"}: file not found in the sample filesystem`;
  }
  if (command.startsWith("echo ")) return command.slice(5);
  if (command === "echo") return "";
  return `Command not found: ${command}. This simulator supports a small set of sample commands. Type help to see them.`;
}

export function ToolsPlayground() {
  const terminalOutput = useRef<HTMLDivElement>(null);
  const [command, setCommand] = useState("");
  const [entries, setEntries] = useState<CommandEntry[]>([]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const [savedDraft, setSavedDraft] = useState("");
  const [completionStatus, setCompletionStatus] = useState("");
  const [promptFields, setPromptFields] = useState(defaultPromptFields);
  const [copyStatus, setCopyStatus] = useState("");

  const promptPreview = [
    `Role: ${promptFields.role.trim() || "[add a role]"}`,
    `Context: ${promptFields.context.trim() || "[add context]"}`,
    `Task: ${promptFields.task.trim() || "[describe the task]"}`,
    `Format: ${promptFields.format.trim() || "[choose an output format]"}`,
  ].join("\n\n");

  useEffect(() => {
    const output = terminalOutput.current;
    if (output) output.scrollTop = output.scrollHeight;
  }, [entries]);

  function runCommand(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextCommand = command.trim();
    if (!nextCommand) return;

    setCommandHistory((currentHistory) => (currentHistory[currentHistory.length - 1] === nextCommand ? currentHistory : [...currentHistory, nextCommand]).slice(-30));
    setHistoryIndex(null);
    setSavedDraft("");
    setCompletionStatus("");
    if (nextCommand === "clear") {
      setEntries([]);
    } else {
      setEntries((currentEntries) => [...currentEntries, { command: nextCommand, output: simulateCommand(nextCommand) }].slice(-40));
    }
    setCommand("");
  }

  function handleCommandKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "ArrowUp" && commandHistory.length > 0) {
      event.preventDefault();
      const nextIndex = historyIndex === null ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
      if (historyIndex === null) setSavedDraft(command);
      setHistoryIndex(nextIndex);
      setCommand(commandHistory[nextIndex]);
      setCompletionStatus("");
      return;
    }

    if (event.key === "ArrowDown" && historyIndex !== null) {
      event.preventDefault();
      if (historyIndex >= commandHistory.length - 1) {
        setHistoryIndex(null);
        setCommand(savedDraft);
      } else {
        const nextIndex = historyIndex + 1;
        setHistoryIndex(nextIndex);
        setCommand(commandHistory[nextIndex]);
      }
      setCompletionStatus("");
      return;
    }

    if (event.key === "Tab") {
      event.preventDefault();
      const prefix = command.trimStart();
      const matches = completionOptions.filter((option) => option.startsWith(prefix));
      if (matches.length === 1) {
        setCommand(matches[0]);
        setCompletionStatus("");
      } else if (matches.length > 1) {
        const commonPrefix = matches.reduce((shared, option) => {
          let index = 0;
          while (index < shared.length && shared[index] === option[index]) index += 1;
          return shared.slice(0, index);
        });
        if (commonPrefix.length > prefix.length) {
          setCommand(commonPrefix);
          setCompletionStatus("");
        } else {
          setCompletionStatus(`Suggestions: ${matches.join(" · ")}`);
        }
      } else {
        setCompletionStatus("No matching commands. Type help to see supported commands.");
      }
    }
  }

  function resetTerminal() {
    setEntries([]);
    setCommand("");
    setCommandHistory([]);
    setHistoryIndex(null);
    setSavedDraft("");
    setCompletionStatus("");
  }

  async function copyPrompt() {
    try {
      await navigator.clipboard.writeText(promptPreview);
      setCopyStatus("Prompt copied.");
    } catch {
      setCopyStatus("Clipboard access is unavailable in this browser.");
    }
  }

  function updatePromptField(field: keyof typeof promptFields, value: string) {
    setPromptFields((currentFields) => ({ ...currentFields, [field]: value }));
    setCopyStatus("");
  }

  function resetPrompt() {
    setPromptFields(defaultPromptFields);
    setCopyStatus("");
  }

  return (
    <div className="tools-grid">
      <section className="tool-panel terminal-tool" aria-labelledby="terminal-title">
        <div className="tool-panel-heading">
          <div><span className="eyebrow">01 / Explore</span><h2 id="terminal-title">A tiny terminal</h2></div>
          <button className="text-button" type="button" onClick={resetTerminal}>Reset</button>
        </div>
        <p className="tool-intro">Practice a few familiar commands in a pretend filesystem. Nothing runs on your device or a server.</p>
        <div className="sim-terminal">
          <div className="sim-terminal-bar"><span /><span /><span /><small>curious-shell</small></div>
          <div ref={terminalOutput} className="sim-terminal-screen" role="log" aria-live="polite" aria-label="Simulated terminal output">
            {entries.length === 0 ? <p className="terminal-welcome">{welcomeMessage}</p> : entries.map((entry, index) => (
              <div className="terminal-entry" key={`${entry.command}-${index}`}>
                <p className="terminal-command-line"><span aria-hidden="true">›</span> {entry.command}</p>
                {entry.output && <pre>{entry.output}</pre>}
              </div>
            ))}
          </div>
          <form className="sim-terminal-form" onSubmit={runCommand}>
            <label className="sr-only" htmlFor="terminal-command">Enter a simulated command</label>
            <span aria-hidden="true">›</span>
            <input id="terminal-command" autoComplete="off" spellCheck={false} maxLength={200} value={command} onChange={(event) => { setCommand(event.target.value); setCompletionStatus(""); }} onKeyDown={handleCommandKeyDown} placeholder="Try ls or help" />
            <button type="submit">Run</button>
          </form>
        </div>
        <div className="command-chips" aria-label="Example commands">
          {["help", "pwd", "ls", "cat README.md"].map((example) => <button type="button" key={example} onClick={() => { setCommand(example); setCompletionStatus(""); }}>{example}</button>)}
        </div>
        <p className="terminal-hint" aria-live="polite">{completionStatus || "Use ↑ and ↓ for history, Tab for suggestions."}</p>
        <p className="tool-footnote">This is a visual simulator with a small command allowlist, not a real shell.</p>
      </section>

      <section className="tool-panel prompt-tool" aria-labelledby="prompt-title">
        <div className="tool-panel-heading">
          <div><span className="eyebrow">02 / Shape an idea</span><h2 id="prompt-title">Prompt lab</h2></div>
          <span className="tool-mark" aria-hidden="true">✳</span>
        </div>
        <p className="tool-intro">Give your request a little structure. Edit any field and copy the prompt when it feels ready.</p>
        <div className="prompt-fields">
          <label>Role<input value={promptFields.role} onChange={(event) => updatePromptField("role", event.target.value)} /></label>
          <label>Context<textarea rows={2} value={promptFields.context} onChange={(event) => updatePromptField("context", event.target.value)} /></label>
          <label>Task<textarea rows={2} value={promptFields.task} onChange={(event) => updatePromptField("task", event.target.value)} /></label>
          <label>Format<input value={promptFields.format} onChange={(event) => updatePromptField("format", event.target.value)} /></label>
        </div>
        <div className="prompt-preview-heading"><h3>Your prompt</h3><span>LIVE PREVIEW</span></div>
        <pre className="prompt-preview">{promptPreview}</pre>
        <div className="prompt-actions"><button className="button button-dark" type="button" onClick={copyPrompt}>Copy prompt <span aria-hidden="true">↗</span></button><button className="text-button prompt-reset" type="button" onClick={resetPrompt}>Reset example</button><span className="copy-status" aria-live="polite">{copyStatus}</span></div>
      </section>
    </div>
  );
}
