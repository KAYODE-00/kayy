'use client';

import { useState, useEffect } from 'react';
import { Save, Plus, Trash2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function PortfolioAdmin() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState('about');
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState<string | null>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    fetch('/api/admin-auth')
      .then((res) => res.json())
      .then((auth) => {
        setAuthenticated(auth.authenticated);
        setCheckingAuth(false);
        if (!auth.authenticated) return null;
        return fetch('/api/portfolio-data');
      })
      .then(res => {
        if (!res) return;
        if (!res.ok) throw new Error('Unable to load portfolio data.');
        return res.json();
      })
      .then((loadedData) => loadedData && setData(loadedData))
      .catch((loadError: Error) => setError(loadError.message));
  }, []);

  const login = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoginError(null);
    const response = await fetch('/api/admin-auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    const result = await response.json();
    if (!response.ok) {
      setLoginError(result.error ?? 'Unable to sign in.');
      return;
    }
    setAuthenticated(true);
    setPassword('');
    window.location.reload();
  };

  const saveChanges = async () => {
    setSaving(true);
    const response = await fetch('/api/portfolio-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    setSaving(false);
    if (!response.ok) {
      setError('Unable to save portfolio data.');
      return;
    }
    alert('✅ All changes saved to data.ts successfully!');
  };

  const updateField = (section: string, field: string, value: any) => {
    setData((prev: any) => ({
      ...prev,
      [section]: { ...prev[section], [field]: value }
    }));
  };

  const collectionFields: Record<string, string[]> = {
    testimonials: ['name', 'role', 'text', 'avatar'],
    socials: ['name', 'url', 'iconLibrary', 'iconImport'],
    tools: ['name', 'iconLibrary', 'iconImport'],
    builds: ['value'],
    projects: ['title', 'type', 'image', 'description', 'github', 'live'],
    workExperience: ['name', 'role', 'text', 'avatar'],
  };

  const addItem = (section: string) => {
    const fields = collectionFields[section];
    const item = Object.fromEntries(fields.map((field) => [field, field === 'value' ? 'New item' : '']));
    setData({ ...data, [section]: [...(data[section] ?? []), item] });
  };

  const updateItem = (section: string, index: number, field: string, value: string) => {
    const items = [...(data[section] ?? [])];
    items[index] = section === 'builds' ? value : { ...items[index], [field]: value };
    setData({ ...data, [section]: items });
  };

  const removeItem = (section: string, index: number) => {
    setData({ ...data, [section]: data[section].filter((_: unknown, itemIndex: number) => itemIndex !== index) });
  };

  if (checkingAuth) return <div className="min-h-screen flex items-center justify-center text-sm">Checking admin access...</div>;
  if (!authenticated) return (
    <main className="min-h-screen bg-gray-950 px-4 text-white flex items-center justify-center">
      <form onSubmit={login} className="w-full max-w-xs rounded-xl bg-gray-900 p-5 sm:p-6">
        <h1 className="text-xl font-semibold">Admin login</h1>
        <p className="mt-1.5 text-xs text-gray-400">Enter your password to manage the portfolio.</p>
        <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} autoFocus required placeholder="Password" className="mt-4 w-full rounded-lg bg-gray-800 px-3 py-2.5 text-sm outline-none focus:ring-1 focus:ring-emerald-500" />
        {loginError && <p className="mt-2 text-xs text-red-400">{loginError}</p>}
        <button type="submit" className="mt-4 w-full rounded-lg bg-emerald-600 px-3 py-2.5 text-xs font-semibold hover:bg-emerald-700">Sign in</button>
      </form>
    </main>
  );
  if (error) return <div className="min-h-screen flex items-center justify-center px-4 text-center text-sm text-red-400">{error}</div>;
  if (!data?.about) return <div className="min-h-screen flex items-center justify-center text-sm">Loading Admin CMS...</div>;

  return (
    <div className="min-h-screen bg-gray-950 text-white pb-20">
      <div className="max-w-5xl mx-auto p-2 sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center mb-4 sm:mb-7 sticky top-0 bg-gray-950 py-2 sm:py-3 z-10 border-b border-gray-800">
          <div className="flex items-center gap-2 sm:gap-4">
            <Link href="/" className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-white">
              <ArrowLeft size={16} /> Back to Site
            </Link>
            <h1 className="text-lg sm:text-2xl font-bold tracking-tight">Portfolio CMS</h1>
          </div>
          <button
            onClick={saveChanges}
            disabled={saving}
            className="flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 px-2.5 sm:px-5 py-2 sm:py-2.5 rounded-lg text-[11px] sm:text-xs font-semibold disabled:opacity-70 transition"
          >
            <Save size={20} />
            {saving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap gap-1 mb-4 sm:mb-7 border-b border-gray-800 pb-2 sm:pb-3">
          {['about', 'stats', 'testimonials', 'socials', 'tools', 'builds', 'projects', 'workExperience'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl capitalize text-[11px] sm:text-xs font-medium transition-all ${activeTab === tab
                ? 'bg-white text-black' 
                : 'bg-gray-900 hover:bg-gray-800'}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* ABOUT */}
        {activeTab === 'about' && (
          <div className="bg-gray-900 rounded-xl sm:rounded-2xl p-3 sm:p-6 space-y-4 sm:space-y-6">
            <h2 className="text-lg sm:text-xl font-semibold">About Section</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              <div>
                <label className="text-sm text-gray-400 block mb-2">Name</label>
                <input value={data.about.name} onChange={(e) => updateField('about', 'name', e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-sm" />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-2">Page Title</label>
                <input value={data.about.pageTitle} onChange={(e) => updateField('about', 'pageTitle', e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-gray-400 block mb-2">Description</label>
                <textarea value={data.about.description} onChange={(e) => updateField('about', 'description', e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-sm h-32" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-gray-400 block mb-2">Mosaic Portrait Image</label>
                <input value={data.about.portraitImage ?? '/developer.PNG'} onChange={(e) => updateField('about', 'portraitImage', e.target.value)} placeholder="https://cdn.example.com/kayode-portrait.jpg or /developer.PNG" type="url" className="w-full bg-gray-800 p-3 rounded-xl text-sm" />
                <p className="mt-1 text-xs text-gray-500">Paste a CDN URL or a local public path such as /developer.PNG.</p>
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-gray-400 block mb-2">Hero Text</label>
                <textarea value={data.about.heroText ?? data.about.description} onChange={(e) => updateField('about', 'heroText', e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-sm h-32" />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-2">Sub Heading</label>
                <input value={data.about.subHeading} onChange={(e) => updateField('about', 'subHeading', e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-sm" />
              </div>
              <div>
                <label className="text-sm text-gray-400 block mb-2">Resume Text</label>
                <input value={data.about.resumeText} onChange={(e) => updateField('about', 'resumeText', e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-sm" />
              </div>
              {['aboutCardLabel', 'workSectionTitle', 'workCardLabel', 'stacksSectionTitle', 'testimonialsTitle', 'experienceSectionTitle', 'githubSectionTitle', 'resumeLabel'].map((field) => (
                <div key={field}>
                  <label className="text-sm text-gray-400 block mb-2">{field}</label>
                  <input value={data.about[field] ?? ''} onChange={(e) => updateField('about', field, e.target.value)} className="w-full bg-gray-800 p-3 rounded-xl text-sm" />
                </div>
              ))}
              <div>
                <label className="text-sm text-gray-400 block mb-2">Rotating Text Prefix</label>
                <input value={data.about.rotatingPrefix ?? 'He who'} onChange={(e) => updateField('about', 'rotatingPrefix', e.target.value)} placeholder="Example: He who" className="w-full bg-gray-800 p-3 rounded-xl text-sm" />
              </div>
              <div className="md:col-span-2">
                <label className="text-sm text-gray-400 block mb-2">Rotating Words</label>
                <input value={(data.about.rotatingWords ?? []).join(', ')} onChange={(e) => updateField('about', 'rotatingWords', e.target.value.split(',').map((word: string) => word.trim()).filter(Boolean))} placeholder="Example: codes, builds, designs" className="w-full bg-gray-800 p-3 rounded-xl text-sm" />
                <p className="mt-1 text-xs text-gray-500">Separate each word with a comma.</p>
              </div>
            </div>
          </div>
        )}

        {/* STATS */}
        {activeTab === 'stats' && (
          <div className="bg-gray-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8">
            <div className="flex flex-wrap justify-between gap-3 mb-5 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold">Stats</h2>
              <button onClick={() => setData({ ...data, stats: [...data.stats, { number: "0", label: "New Stat" }] })} className="flex items-center gap-2 bg-gray-800 px-3 py-2 text-sm rounded-xl hover:bg-gray-700">
                <Plus size={18} /> Add Stat
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
              {data.stats.map((stat: any, i: number) => (
                <div key={i} className="bg-gray-800 p-3 sm:p-4 rounded-2xl flex gap-2 sm:gap-3 items-end">
                  <div className="flex-1">
                    <input value={stat.number} onChange={(e) => {
                      const newStats = [...data.stats];
                      newStats[i].number = e.target.value;
                      setData({ ...data, stats: newStats });
                    }} className="w-full bg-gray-900 p-4 rounded-2xl" />
                  </div>
                  <div className="flex-1">
                    <input value={stat.label} onChange={(e) => {
                      const newStats = [...data.stats];
                      newStats[i].label = e.target.value;
                      setData({ ...data, stats: newStats });
                    }} className="w-full bg-gray-900 p-4 rounded-2xl" />
                  </div>
                  <button onClick={() => setData({ ...data, stats: data.stats.filter((_: any, idx: number) => idx !== i) })} className="p-4 text-red-500 hover:bg-red-950 rounded-2xl">
                    <Trash2 size={20} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {collectionFields[activeTab] && (
          <section className="bg-gray-900 rounded-2xl sm:rounded-3xl p-4 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5 sm:mb-6">
              <h2 className="text-lg sm:text-xl font-semibold capitalize">{activeTab}</h2>
              <button onClick={() => addItem(activeTab)} className="flex items-center gap-2 rounded-xl bg-gray-800 px-3 py-2 text-sm hover:bg-gray-700">
                <Plus size={16} /> Add
              </button>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              {(data[activeTab] ?? []).map((item: any, index: number) => (
                <div key={index} className="rounded-xl bg-gray-800 p-3 sm:p-4">
                  <div className="grid gap-3">
                    {collectionFields[activeTab].map((field) => (
                      <input
                        key={field}
                        value={field === 'value' ? item : item[field] ?? ''}
                        onChange={(event) => activeTab === 'builds'
                          ? updateItem('builds', index, 'value', event.target.value)
                          : updateItem(activeTab, index, field, event.target.value)}
                        placeholder={field === 'avatar' ? 'Emoji or https://cdn.example.com/avatar.jpg' : field === 'image' ? 'https://cdn.example.com/project.jpg or /project.png' : field === 'iconLibrary' ? 'react-icons/si or lucide-react' : field === 'iconImport' ? 'SiReact or Code2' : `Example ${field}`}
                        type={field === 'image' || field === 'avatar' ? 'url' : 'text'}
                        className="w-full rounded-lg bg-gray-900 px-3 py-2 text-sm outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    ))}
                  </div>
                  <button onClick={() => removeItem(activeTab, index)} className="mt-3 flex items-center gap-1 text-xs text-red-400 hover:text-red-300">
                    <Trash2 size={14} /> Remove
                  </button>
                </div>
              ))}
            </div>
          </section>
        )}

        <div className="mt-16 text-center text-gray-500">
          All edits are persisted to Neon. Image fields accept CDN URLs or local public paths.
        </div>
      </div>
    </div>
  );
}
