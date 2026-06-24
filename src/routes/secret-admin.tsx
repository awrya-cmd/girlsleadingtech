import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";

const ADMIN_EMAIL = "girlsleadingtech@gmail.com";
const ADMIN_PASSWORD = "@GLT123";
const SESSION_KEY = "glt-admin-session";

export const Route = createFileRoute("/secret-admin")({
  head: () => ({
    meta: [
      { title: "Admin — Girls Leading Tech" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: SecretAdminPage,
});

// ---------- Entity schemas ----------
type FieldDef = {
  key: string;
  label: string;
  type?: "text" | "textarea" | "url" | "date" | "number";
  required?: boolean;
  placeholder?: string;
  help?: string;
};

type EntityDef = {
  id: string;
  label: string;
  targetFile: string;
  arrayName: string;
  idPrefix: string;
  fields: FieldDef[];
};

const ENTITIES: EntityDef[] = [
  {
    id: "event",
    label: "Event",
    targetFile: "src/data/events-real.ts",
    arrayName: "realEvents",
    idPrefix: "evt",
    fields: [
      { key: "title", label: "Title", required: true },
      { key: "date", label: "Date (ISO YYYY-MM-DD)", type: "date", required: true },
      { key: "duration", label: "Duration", placeholder: "1h 20m" },
      { key: "status", label: "Status", placeholder: "upcoming | past | ongoing", required: true },
      { key: "category", label: "Category" },
      { key: "summary", label: "Summary", type: "textarea" },
      { key: "youtubeLink", label: "YouTube Link", type: "url" },
      { key: "registrationLink", label: "Registration Link", type: "url" },
      { key: "attendees", label: "Attendees", type: "number" },
      { key: "posterImage", label: "Poster Image URL", type: "url" },
      { key: "speakerName", label: "Speaker Name" },
      { key: "speakerDesignation", label: "Speaker Designation" },
      { key: "speakerCompany", label: "Speaker Company" },
      { key: "speakerLinkedin", label: "Speaker LinkedIn", type: "url" },
    ],
  },
  {
    id: "book",
    label: "Resource: Book",
    targetFile: "src/data/resources.ts",
    arrayName: "books",
    idPrefix: "book",
    fields: [
      { key: "title", label: "Title", required: true },
      { key: "author", label: "Author" },
      { key: "category", label: "Category", placeholder: "Self-Help / Productivity" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "image", label: "Cover Image URL", type: "url", help: "Use covers.openlibrary.org or similar" },
      { key: "link", label: "Link", type: "url" },
    ],
  },
  {
    id: "course",
    label: "Resource: Course",
    targetFile: "src/data/resources.ts",
    arrayName: "courses",
    idPrefix: "course",
    fields: [
      { key: "title", label: "Title", required: true },
      { key: "author", label: "Instructor / Provider" },
      { key: "category", label: "Category" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "link", label: "Link", type: "url" },
      { key: "image", label: "Image URL", type: "url" },
    ],
  },
  {
    id: "tool",
    label: "Resource: Tool",
    targetFile: "src/data/resources.ts",
    arrayName: "tools",
    idPrefix: "tool",
    fields: [
      { key: "title", label: "Title", required: true },
      { key: "category", label: "Category" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "link", label: "Link", type: "url" },
    ],
  },
  {
    id: "article",
    label: "Resource: Article",
    targetFile: "src/data/resources.ts",
    arrayName: "articles",
    idPrefix: "art",
    fields: [
      { key: "title", label: "Title", required: true },
      { key: "author", label: "Author" },
      { key: "category", label: "Category" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "link", label: "Link", type: "url" },
    ],
  },
  {
    id: "video",
    label: "Resource: Video",
    targetFile: "src/data/resources.ts",
    arrayName: "videos",
    idPrefix: "vid",
    fields: [
      { key: "title", label: "Title", required: true },
      { key: "author", label: "Creator" },
      { key: "category", label: "Category" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "link", label: "Link", type: "url" },
    ],
  },
  {
    id: "community",
    label: "Resource: Community",
    targetFile: "src/data/resources.ts",
    arrayName: "communities",
    idPrefix: "com",
    fields: [
      { key: "title", label: "Name", required: true },
      { key: "category", label: "Category" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "link", label: "Link", type: "url" },
    ],
  },
  {
    id: "program",
    label: "Resource: Program",
    targetFile: "src/data/resources.ts",
    arrayName: "programs",
    idPrefix: "prog",
    fields: [
      { key: "title", label: "Title", required: true },
      { key: "category", label: "Category" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "link", label: "Link", type: "url" },
    ],
  },
  {
    id: "roadmap",
    label: "Resource: Roadmap",
    targetFile: "src/data/resources.ts",
    arrayName: "roadmaps",
    idPrefix: "road",
    fields: [
      { key: "title", label: "Title", required: true },
      { key: "category", label: "Category" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "link", label: "Link", type: "url" },
    ],
  },
  {
    id: "interview",
    label: "Resource: Interview Prep",
    targetFile: "src/data/resources.ts",
    arrayName: "interviewPrep",
    idPrefix: "intp",
    fields: [
      { key: "title", label: "Title", required: true },
      { key: "category", label: "Category" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "link", label: "Link", type: "url" },
    ],
  },
  {
    id: "certification",
    label: "Resource: Certification",
    targetFile: "src/data/resources.ts",
    arrayName: "certifications",
    idPrefix: "cert",
    fields: [
      { key: "title", label: "Title", required: true },
      { key: "author", label: "Provider" },
      { key: "category", label: "Category" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "link", label: "Link", type: "url" },
    ],
  },
  {
    id: "team",
    label: "Human: Team Member",
    targetFile: "src/data/community.ts",
    arrayName: "team",
    idPrefix: "t",
    fields: [
      { key: "name", label: "Name", required: true },
      { key: "role", label: "Role" },
      { key: "city", label: "City" },
      { key: "state", label: "State" },
      { key: "linkedin", label: "LinkedIn URL", type: "url" },
      { key: "twitter", label: "Twitter URL", type: "url" },
      { key: "image", label: "Image URL", type: "url", help: "External URL only (local imports must be added manually)" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "status", label: "Status", placeholder: "current | past" },
    ],
  },
  {
    id: "mentor",
    label: "Human: Mentor",
    targetFile: "src/data/community.ts",
    arrayName: "mentors",
    idPrefix: "m",
    fields: [
      { key: "name", label: "Name", required: true },
      { key: "designation", label: "Designation", required: true },
      { key: "company", label: "Company", required: true },
      { key: "linkedin", label: "LinkedIn URL", type: "url" },
      { key: "image", label: "Image URL", type: "url" },
      { key: "city", label: "City" },
      { key: "state", label: "State" },
    ],
  },
  {
    id: "speaker",
    label: "Human: Speaker",
    targetFile: "src/data/community.ts",
    arrayName: "speakers",
    idPrefix: "s",
    fields: [
      { key: "name", label: "Name", required: true },
      { key: "designation", label: "Designation", required: true },
      { key: "company", label: "Company", required: true },
      { key: "linkedin", label: "LinkedIn URL", type: "url" },
      { key: "image", label: "Image URL", type: "url" },
    ],
  },
  {
    id: "contributor",
    label: "Human: Contributor",
    targetFile: "src/data/community.ts",
    arrayName: "contributors",
    idPrefix: "c",
    fields: [
      { key: "name", label: "Name", required: true },
      { key: "city", label: "City" },
      { key: "state", label: "State" },
      { key: "linkedin", label: "LinkedIn URL", type: "url" },
      { key: "image", label: "Image URL", type: "url" },
    ],
  },
  {
    id: "volunteer",
    label: "Human: Volunteer",
    targetFile: "src/data/community.ts",
    arrayName: "volunteers",
    idPrefix: "v",
    fields: [
      { key: "name", label: "Name", required: true },
      { key: "city", label: "City" },
      { key: "state", label: "State" },
      { key: "linkedin", label: "LinkedIn URL", type: "url" },
      { key: "image", label: "Image URL", type: "url" },
    ],
  },
  {
    id: "roleModel",
    label: "Role Model",
    targetFile: "src/data/role-models.ts",
    arrayName: "roleModels",
    idPrefix: "rm",
    fields: [
      { key: "name", label: "Name", required: true },
      { key: "domain", label: "Domain", required: true, placeholder: "Startup Founders" },
      { key: "role", label: "Role" },
      { key: "company", label: "Company" },
      { key: "location", label: "Location" },
      { key: "summary", label: "Summary", type: "textarea" },
      { key: "image", label: "Image URL", type: "url" },
    ],
  },
  {
    id: "personToFollow",
    label: "Person to Follow",
    targetFile: "src/data/community.ts",
    arrayName: "peopleToFollow",
    idPrefix: "ptf",
    fields: [
      { key: "name", label: "Name", required: true },
      { key: "domain", label: "Domain", required: true },
      { key: "summary", label: "Summary", type: "textarea" },
      { key: "linkedin", label: "LinkedIn URL", type: "url" },
      { key: "twitter", label: "Twitter URL", type: "url" },
      { key: "instagram", label: "Instagram URL", type: "url" },
      { key: "portfolio", label: "Portfolio URL", type: "url" },
      { key: "image", label: "Image URL", type: "url" },
    ],
  },
];

function slugify(s: string) {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 40);
}

function generateSnippet(entity: EntityDef, values: Record<string, string>) {
  const obj: Record<string, unknown> = {};
  const slug = slugify(values.name || values.title || "new-entry");
  const ts = Date.now().toString().slice(-5);
  obj.id = `${entity.idPrefix}-${slug}-${ts}`;
  for (const f of entity.fields) {
    const v = (values[f.key] ?? "").trim();
    if (!v) continue;
    if (f.type === "number") {
      const n = Number(v);
      if (!Number.isNaN(n)) obj[f.key] = n;
    } else {
      obj[f.key] = v;
    }
  }
  // pretty TS object
  const body = JSON.stringify(obj, null, 2);
  return body.replace(/"([a-zA-Z_][a-zA-Z0-9_]*)":/g, "$1:");
}

function SecretAdminPage() {
  const [authed, setAuthed] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined" && sessionStorage.getItem(SESSION_KEY) === "1") {
      setAuthed(true);
    }
  }, []);

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (email.trim() === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      sessionStorage.setItem(SESSION_KEY, "1");
      setAuthed(true);
      setLoginError("");
    } else {
      setLoginError("Invalid credentials.");
    }
  }

  function handleLogout() {
    sessionStorage.removeItem(SESSION_KEY);
    setAuthed(false);
    setEmail("");
    setPassword("");
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#fef9f4] px-4 pt-24 pb-12">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-md bg-white border-2 border-black rounded-2xl p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
        >
          <h1 className="text-2xl font-bold mb-1">Admin Access</h1>
          <p className="text-sm text-gray-600 mb-6">Restricted area.</p>
          <label className="block text-xs font-bold uppercase tracking-wider mb-1">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mb-4 px-3 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d955a4]"
            autoComplete="username"
          />
          <label className="block text-xs font-bold uppercase tracking-wider mb-1">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full mb-4 px-3 py-2 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-[#d955a4]"
            autoComplete="current-password"
          />
          {loginError && <p className="text-sm text-red-600 mb-3">{loginError}</p>}
          <button
            type="submit"
            className="w-full bg-[#d955a4] text-white font-bold py-2.5 rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition"
          >
            Sign in
          </button>
        </form>
      </div>
    );
  }

  return <AdminDashboard onLogout={handleLogout} />;
}

function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [activeId, setActiveId] = useState(ENTITIES[0].id);
  const entity = ENTITIES.find((e) => e.id === activeId)!;
  const [values, setValues] = useState<Record<string, string>>({});
  const [snippet, setSnippet] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setValues({});
    setSnippet("");
    setCopied(false);
  }, [activeId]);

  function setField(k: string, v: string) {
    setValues((prev) => ({ ...prev, [k]: v }));
  }

  function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    const missing = entity.fields.find((f) => f.required && !(values[f.key] ?? "").trim());
    if (missing) {
      alert(`Please fill: ${missing.label}`);
      return;
    }
    setSnippet(generateSnippet(entity, values));
    setCopied(false);
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(snippet + ",");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // noop
    }
  }

  return (
    <div className="min-h-screen bg-[#fef9f4] pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
            <p className="text-sm text-gray-600 mt-1">
              Generate copy-paste snippets for the team to add to data files.
            </p>
          </div>
          <button
            onClick={onLogout}
            className="px-4 py-2 text-xs font-bold uppercase border-2 border-black rounded-lg bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition"
          >
            Logout
          </button>
        </div>

        <div className="bg-[#FFF8EF] border-2 border-black rounded-2xl p-4 mb-6 text-xs leading-relaxed shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <strong>How it works:</strong> Pick an entity, fill the form, click <em>Generate</em>, copy the snippet, and ask your team (or Antigravity) to paste it into the <code>{"<arrayName>"}</code> array inside the indicated file. Commit & push → Vercel will redeploy automatically. No backend needed.
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
          {/* Sidebar */}
          <aside className="bg-white border-2 border-black rounded-2xl p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] h-fit">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500 px-2 py-1">
              Entity Type
            </p>
            <div className="flex flex-col gap-1 max-h-[70vh] overflow-y-auto">
              {ENTITIES.map((e) => (
                <button
                  key={e.id}
                  onClick={() => setActiveId(e.id)}
                  className={`text-left text-sm px-3 py-2 rounded-lg border-2 transition ${
                    activeId === e.id
                      ? "bg-[#d955a4] text-white border-black font-bold"
                      : "border-transparent hover:bg-pink-50 hover:border-black"
                  }`}
                >
                  {e.label}
                </button>
              ))}
            </div>
          </aside>

          {/* Form + snippet */}
          <main className="space-y-6">
            <form
              onSubmit={handleGenerate}
              className="bg-white border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            >
              <h2 className="text-xl font-bold">{entity.label}</h2>
              <p className="text-xs text-gray-600 mt-1 mb-4">
                Target file: <code className="bg-gray-100 px-1.5 py-0.5 rounded">{entity.targetFile}</code>{" "}
                · Append to array <code className="bg-gray-100 px-1.5 py-0.5 rounded">{entity.arrayName}</code>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {entity.fields.map((f) => (
                  <div key={f.key} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
                    <label className="block text-xs font-bold uppercase tracking-wider mb-1">
                      {f.label}
                      {f.required && <span className="text-red-500"> *</span>}
                    </label>
                    {f.type === "textarea" ? (
                      <textarea
                        value={values[f.key] ?? ""}
                        onChange={(ev) => setField(f.key, ev.target.value)}
                        placeholder={f.placeholder}
                        rows={3}
                        className="w-full px-3 py-2 border-2 border-black rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#d955a4]"
                      />
                    ) : (
                      <input
                        type={f.type ?? "text"}
                        value={values[f.key] ?? ""}
                        onChange={(ev) => setField(f.key, ev.target.value)}
                        placeholder={f.placeholder}
                        className="w-full px-3 py-2 border-2 border-black rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#d955a4]"
                      />
                    )}
                    {f.help && <p className="text-[11px] text-gray-500 mt-1">{f.help}</p>}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  type="submit"
                  className="bg-[#d955a4] text-white font-bold px-5 py-2.5 rounded-lg border-2 border-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition"
                >
                  Generate snippet
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setValues({});
                    setSnippet("");
                  }}
                  className="px-5 py-2.5 rounded-lg border-2 border-black bg-white font-bold shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition"
                >
                  Reset
                </button>
              </div>
            </form>

            {snippet && (
              <div className="bg-[#0f172a] border-2 border-black rounded-2xl p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-xs text-green-300 font-bold uppercase tracking-wider">
                    Snippet ready · paste into {entity.arrayName}
                  </p>
                  <button
                    onClick={handleCopy}
                    className="text-xs font-bold px-3 py-1.5 rounded-lg bg-white text-black border-2 border-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.4)]"
                  >
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
                <pre className="text-xs text-green-100 overflow-x-auto whitespace-pre-wrap">
{snippet},
                </pre>
                <p className="text-[11px] text-gray-400 mt-3">
                  Open <code className="bg-white/10 px-1 rounded">{entity.targetFile}</code>, find{" "}
                  <code className="bg-white/10 px-1 rounded">export const {entity.arrayName}</code>, and paste this object at the end of the array (before the closing <code>]</code>).
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
