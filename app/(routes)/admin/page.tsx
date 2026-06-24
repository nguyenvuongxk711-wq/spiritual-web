"use client";

import { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Play,
  RefreshCw,
  Database,
  Activity,
  Search,
  Save,
  AlertCircle,
  CheckCircle,
  Clock,
  Loader2,
  Upload,
  FileText,
} from "lucide-react";
import GlassCard from "../../components/GlassCard";
import HeroBackground from "../../components/HeroBackground";

const API_BASE = "http://localhost:8000";

interface Task {
  id: number;
  target_keyword: string;
  category: string;
  status: string;
  urls: string[];
  logs: any[];
  created_at: string;
  updated_at: string;
}

interface DataItem {
  id: number;
  category: string;
  keyword: string;
  final_content: string | null;
  ai_model_used: string | null;
  updated_at: string;
}

interface Source {
  id: number;
  domain_url: string;
  name: string;
  trust_score: number;
  urls: string[];
  created_at: string;
  updated_at: string;
}

export default function AdminPage() {
  const [keyword, setKeyword] = useState("");
  const [category, setCategory] = useState("Chính tinh");
  const [urls, setUrls] = useState("");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [dataItems, setDataItems] = useState<DataItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [selectedItem, setSelectedItem] = useState<DataItem | null>(null);
  const [editContent, setEditContent] = useState("");
  const [activeTab, setActiveTab] = useState<"crawler" | "data" | "logs" | "sources">("crawler");
  const [batchText, setBatchText] = useState("");
  const [batchFile, setBatchFile] = useState<File | null>(null);
  const [batchLoading, setBatchLoading] = useState(false);
  const [sources, setSources] = useState<Source[]>([]);
  const [sourceForm, setSourceForm] = useState({ domain_url: "", name: "", trust_score: 7.0, urls: "" });
  const [editingSource, setEditingSource] = useState<Source | null>(null);

  const addLog = useCallback((msg: string) => {
    setLogs((prev) => [`${new Date().toLocaleTimeString()} - ${msg}`, ...prev].slice(0, 100));
  }, []);

  const fetchTasks = useCallback(async () => {
    try {
      const r = await fetch(`${API_BASE}/api/scrape-tasks`);
      const items = await r.json();
      setTasks(items);
    } catch (e) {
      addLog("Không kết nối được API backend");
    }
  }, [addLog]);

  const fetchData = useCallback(async () => {
    try {
      const r = await fetch(`${API_BASE}/api/astrology-data`);
      const items = await r.json();
      setDataItems(items);
    } catch (e) {
      addLog("Không kết nối được API dữ liệu");
    }
  }, [addLog]);

  const fetchSources = useCallback(async () => {
    try {
      const r = await fetch(`${API_BASE}/api/sources`);
      const items = await r.json();
      setSources(items);
    } catch (e) {
      addLog("Không kết nối được API sources");
    }
  }, [addLog]);

  const saveSource = async () => {
    if (!sourceForm.domain_url || !sourceForm.name) return;
    try {
      const urlList = sourceForm.urls.split("\n").map((u) => u.trim()).filter((u) => u.startsWith("http"));
      if (editingSource) {
        await fetch(`${API_BASE}/api/sources/${editingSource.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...sourceForm, urls: urlList }),
        });
        addLog(`Đã cập nhật source: ${sourceForm.name}`);
      } else {
        await fetch(`${API_BASE}/api/sources`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...sourceForm, urls: urlList }),
        });
        addLog(`Đã thêm source: ${sourceForm.name}`);
      }
      setSourceForm({ domain_url: "", name: "", trust_score: 7.0, urls: "" });
      setEditingSource(null);
      fetchSources();
    } catch (e) {
      addLog("Lỗi lưu source");
    }
  };

  const deleteSource = async (id: number) => {
    if (!confirm("Xóa source này?")) return;
    try {
      await fetch(`${API_BASE}/api/sources/${id}`, { method: "DELETE" });
      addLog(`Đã xóa source ID ${id}`);
      fetchSources();
    } catch (e) {
      addLog("Lỗi xóa source");
    }
  };

  const editSource = (s: Source) => {
    setEditingSource(s);
    setSourceForm({
      domain_url: s.domain_url,
      name: s.name,
      trust_score: s.trust_score,
      urls: s.urls.join("\n"),
    });
  };

  useEffect(() => {
    fetchTasks();
    fetchData();
    fetchSources();
    const interval = setInterval(() => {
      fetchTasks();
      fetchData();
      fetchSources();
    }, 5000);
    return () => clearInterval(interval);
  }, [fetchTasks, fetchData, fetchSources]);

  const startScrape = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    addLog(`Gửi yêu cầu cào: ${keyword}`);
    try {
      const urlList = urls
        .split("\n")
        .map((u) => u.trim())
        .filter((u) => u.startsWith("http"));
      const r = await fetch(`${API_BASE}/api/scrape`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          keyword,
          category,
          urls: urlList.length > 0 ? urlList : undefined,
        }),
      });
      const result = await r.json();
      addLog(`Task đã tạo: ID ${result.id}`);
      setKeyword("");
      setUrls("");
    } catch (e) {
      addLog("Lỗi khi tạo task");
    } finally {
      setLoading(false);
    }
  };

  const saveContent = async () => {
    if (!selectedItem) return;
    try {
      await fetch(`${API_BASE}/api/astrology-data/${selectedItem.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ final_content: editContent }),
      });
      addLog(`Đã lưu nội dung ID ${selectedItem.id}`);
      fetchData();
    } catch (e) {
      addLog("Lỗi lưu nội dung");
    }
  };

  const handleBatchText = async () => {
    if (!batchText.trim()) return;
    setBatchLoading(true);
    addLog("Đang import từ text...");
    try {
      const r = await fetch(`${API_BASE}/api/batch/import-text`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: batchText, default_category: category }),
      });
      const items = await r.json();
      addLog(`Đã tạo ${items.length} task từ text`);
      setBatchText("");
      fetchTasks();
    } catch (e) {
      addLog("Lỗi import text");
    } finally {
      setBatchLoading(false);
    }
  };

  const handleBatchFile = async () => {
    if (!batchFile) return;
    setBatchLoading(true);
    addLog(`Đang upload file ${batchFile.name}...`);
    try {
      const formData = new FormData();
      formData.append("file", batchFile);
      formData.append("default_category", category);
      const r = await fetch(`${API_BASE}/api/batch/import-csv`, {
        method: "POST",
        body: formData,
      });
      const items = await r.json();
      addLog(`Đã tạo ${items.length} task từ file`);
      setBatchFile(null);
      fetchTasks();
    } catch (e) {
      addLog("Lỗi upload file");
    } finally {
      setBatchLoading(false);
    }
  };

  const statusColor = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "text-[var(--success)]";
      case "FAILED":
        return "text-[var(--danger)]";
      case "PROCESSING_AI":
        return "text-purple-400";
      case "SCRAPING":
        return "text-amber-400";
      default:
        return "text-[var(--text-muted)]";
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      <HeroBackground
        image="https://images.unsplash.com/photo-1532968967842-326318c7f83a?auto=format&fit=crop&w=1200&q=80"
        className="rounded-2xl border border-[var(--border)] mb-8"
      >
        <div className="px-4 py-10 text-center">
          <h1 className="font-display text-3xl font-bold text-[var(--text-primary)]">
            Admin <span className="text-gradient">Crawler & AI</span>
          </h1>
          <p className="mx-auto mt-2 max-w-xl text-sm text-[var(--text-muted)]">
            Cào dữ liệu tử vi từ nhiều nguồn, tổng hợp bằng AI và quản lý kho dữ liệu.
          </p>
        </div>
      </HeroBackground>

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap gap-2">
        {[
          { key: "crawler", label: "Crawler", icon: Activity },
          { key: "data", label: "Data Dictionary", icon: Database },
          { key: "sources", label: "Sources", icon: Search },
          { key: "logs", label: "Logs", icon: AlertCircle },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold transition-colors ${
                activeTab === tab.key
                  ? "bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/30"
                  : "border border-[var(--border)] text-[var(--text-secondary)] hover:bg-[var(--border-subtle)]"
              }`}
            >
              <Icon className="h-4 w-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {activeTab === "crawler" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <GlassCard>
              <h2 className="mb-4 font-display text-lg font-bold text-[var(--text-primary)]">Điều khiển crawler</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm text-[var(--text-secondary)]">Từ khóa / Tên sao</label>
                  <input
                    value={keyword}
                    onChange={(e) => setKeyword(e.target.value)}
                    placeholder="Ví dụ: Sao Tử Vi cung Mệnh"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)]/60"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-[var(--text-secondary)]">Phân loại</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-3 py-2 text-sm text-[var(--text-primary)] outline-none"
                  >
                    <option>Chính tinh</option>
                    <option>Phụ tinh</option>
                    <option>Vòng tràng sinh</option>
                    <option>Cung</option>
                    <option>Khác</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1 block text-sm text-[var(--text-secondary)]">Danh sách URL (mỗi dòng 1 URL)</label>
                  <textarea
                    value={urls}
                    onChange={(e) => setUrls(e.target.value)}
                    placeholder="https://tuvi.com/sao-tu-vi&#10;https://lichngaytot.com/sao-tu-vi"
                    rows={5}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)]/60"
                  />
                </div>
                <button
                  onClick={startScrape}
                  disabled={loading || !keyword.trim()}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2.5 text-sm font-bold text-[var(--surface)] transition-all hover:brightness-110 disabled:opacity-50"
                >
                  {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Play className="h-4 w-4" />}
                  Bắt đầu cào + AI
                </button>
              </div>
            </GlassCard>

            <GlassCard>
              <h2 className="mb-4 font-display text-lg font-bold text-[var(--text-primary)]">Import hàng loạt</h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm text-[var(--text-secondary)]">Import từ text (mỗi dòng 1 URL hoặc keyword|url)</label>
                  <textarea
                    value={batchText}
                    onChange={(e) => setBatchText(e.target.value)}
                    placeholder="Sao Tử Vi|https://lichngaytot.com/tu-vi/sao-tu-vi&#10;Sao Thiên Cơ|https://lichngaytot.com/tu-vi/sao-thien-co"
                    rows={4}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)]/60"
                  />
                  <button
                    onClick={handleBatchText}
                    disabled={batchLoading || !batchText.trim()}
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/30 px-4 py-2 text-sm font-bold text-[var(--accent)] transition-all hover:bg-[var(--accent)]/20 disabled:opacity-50"
                  >
                    {batchLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <FileText className="h-4 w-4" />}
                    Import từ text
                  </button>
                </div>
                <div className="border-t border-[var(--border)] pt-4">
                  <label className="mb-1 block text-sm text-[var(--text-secondary)]">Import từ CSV/TXT (cột: keyword, url)</label>
                  <input
                    type="file"
                    accept=".csv,.txt"
                    onChange={(e) => setBatchFile(e.target.files?.[0] || null)}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-3 py-2 text-sm text-[var(--text-primary)] outline-none"
                  />
                  <button
                    onClick={handleBatchFile}
                    disabled={batchLoading || !batchFile}
                    className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--accent)]/10 border border-[var(--accent)]/30 px-4 py-2 text-sm font-bold text-[var(--accent)] transition-all hover:bg-[var(--accent)]/20 disabled:opacity-50"
                  >
                    {batchLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Upload className="h-4 w-4" />}
                    Upload file
                  </button>
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-2">
            <GlassCard className="h-full">
              <h2 className="mb-4 font-display text-lg font-bold text-[var(--text-primary)]">Tiến trình</h2>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {tasks.length === 0 && (
                  <p className="text-sm text-[var(--text-muted)]">Chưa có task. Tạo task đầu tiên để theo dõi.</p>
                )}
                {tasks.map((task) => (
                  <div key={task.id} className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/30 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[var(--text-primary)]">{task.target_keyword}</span>
                          <span className="text-xs text-[var(--text-muted)]">({task.category})</span>
                        </div>
                        <div className="mt-1 text-xs text-[var(--text-muted)]">
                          ID {task.id} · {new Date(task.created_at).toLocaleString("vi-VN")}
                        </div>
                      </div>
                      <div className={`flex items-center gap-1 text-sm font-bold ${statusColor(task.status)}`}>
                        {task.status === "COMPLETED" ? <CheckCircle className="h-4 w-4" /> : task.status === "PENDING" ? <Clock className="h-4 w-4" /> : <Loader2 className="h-4 w-4 animate-spin" />}
                        {task.status}
                      </div>
                    </div>
                    {task.logs && task.logs.length > 0 && (
                      <div className="mt-3 rounded-lg border border-[var(--border)] bg-black/30 p-2 font-mono text-[11px] text-[var(--text-secondary)]">
                        {task.logs.slice(-5).map((log, i) => (
                          <div key={i}>
                            <span className="text-[var(--accent)]">[{log.time}]</span> {log.message}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {activeTab === "data" && (
        <div className="grid gap-6 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <GlassCard className="h-full">
              <h2 className="mb-4 font-display text-lg font-bold text-[var(--text-primary)]">Data Dictionary</h2>
              <div className="max-h-[600px] space-y-2 overflow-y-auto pr-1">
                {dataItems.length === 0 && <p className="text-sm text-[var(--text-muted)]">Chưa có dữ liệu.</p>}
                {dataItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setSelectedItem(item);
                      setEditContent(item.final_content || "");
                    }}
                    className={`w-full rounded-xl border p-3 text-left transition-colors ${
                      selectedItem?.id === item.id
                        ? "border-[var(--accent)]/50 bg-[var(--accent)]/10"
                        : "border-[var(--border)] bg-[var(--surface-elevated)]/30 hover:bg-[var(--border-subtle)]"
                    }`}
                  >
                    <div className="font-bold text-[var(--text-primary)]">{item.keyword}</div>
                    <div className="text-xs text-[var(--text-muted)]">{item.category} · {item.ai_model_used || "Chưa AI"}</div>
                  </button>
                ))}
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-3">
            <GlassCard className="h-full">
              {selectedItem ? (
                <>
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">{selectedItem.keyword}</h2>
                      <p className="text-xs text-[var(--text-muted)]">{selectedItem.category}</p>
                    </div>
                    <button
                      onClick={saveContent}
                      className="inline-flex items-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-bold text-[var(--surface)] hover:brightness-110"
                    >
                      <Save className="h-4 w-4" /> Lưu
                    </button>
                  </div>
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    rows={20}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 p-3 font-mono text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)]/60"
                  />
                </>
              ) : (
                <div className="flex h-64 items-center justify-center text-sm text-[var(--text-muted)]">
                  Chọn một mục để chỉnh sửa
                </div>
              )}
            </GlassCard>
          </div>
        </div>
      )}

      {activeTab === "sources" && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <GlassCard>
              <h2 className="mb-4 font-display text-lg font-bold text-[var(--text-primary)]">
                {editingSource ? "Sửa Source" : "Thêm Source"}
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="mb-1 block text-sm text-[var(--text-secondary)]">Domain URL</label>
                  <input
                    value={sourceForm.domain_url}
                    onChange={(e) => setSourceForm({ ...sourceForm, domain_url: e.target.value })}
                    placeholder="https://example.com"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)]/60"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-[var(--text-secondary)]">Tên</label>
                  <input
                    value={sourceForm.name}
                    onChange={(e) => setSourceForm({ ...sourceForm, name: e.target.value })}
                    placeholder="Tên nguồn"
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)]/60"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-[var(--text-secondary)]">Trust Score (0-10)</label>
                  <input
                    type="number"
                    step="0.1"
                    min="0"
                    max="10"
                    value={sourceForm.trust_score}
                    onChange={(e) => setSourceForm({ ...sourceForm, trust_score: parseFloat(e.target.value) || 0 })}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)]/60"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm text-[var(--text-secondary)]">URLs (mỗi dòng 1 URL)</label>
                  <textarea
                    value={sourceForm.urls}
                    onChange={(e) => setSourceForm({ ...sourceForm, urls: e.target.value })}
                    placeholder="https://example.com/page1&#10;https://example.com/page2"
                    rows={4}
                    className="w-full rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/50 px-3 py-2 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--accent)]/60"
                  />
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={saveSource}
                    className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--accent)] px-4 py-2 text-sm font-bold text-[var(--surface)] hover:brightness-110"
                  >
                    <Save className="h-4 w-4" />
                    {editingSource ? "Cập nhật" : "Thêm"}
                  </button>
                  {editingSource && (
                    <button
                      onClick={() => {
                        setEditingSource(null);
                        setSourceForm({ domain_url: "", name: "", trust_score: 7.0, urls: "" });
                      }}
                      className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:bg-[var(--border-subtle)]"
                    >
                      Hủy
                    </button>
                  )}
                </div>
              </div>
            </GlassCard>
          </div>

          <div className="lg:col-span-2">
            <GlassCard className="h-full">
              <h2 className="mb-4 font-display text-lg font-bold text-[var(--text-primary)]">Danh sách Sources</h2>
              <div className="max-h-[600px] space-y-3 overflow-y-auto pr-1">
                {sources.length === 0 && <p className="text-sm text-[var(--text-muted)]">Chưa có source nào.</p>}
                {sources.map((s) => (
                  <div key={s.id} className="rounded-xl border border-[var(--border)] bg-[var(--surface-elevated)]/30 p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <div className="font-bold text-[var(--text-primary)]">{s.name}</div>
                        <div className="text-xs text-[var(--text-muted)]">{s.domain_url}</div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => editSource(s)}
                          className="rounded-lg border border-[var(--border)] px-2 py-1 text-xs text-[var(--text-secondary)] hover:bg-[var(--border-subtle)]"
                        >
                          Sửa
                        </button>
                        <button
                          onClick={() => deleteSource(s.id)}
                          className="rounded-lg border border-red-500/30 px-2 py-1 text-xs text-red-400 hover:bg-red-500/10"
                        >
                          Xóa
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
                      <span>Trust: {s.trust_score}</span>
                      <span>·</span>
                      <span>{s.urls.length} URLs</span>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {activeTab === "logs" && (
        <GlassCard>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-[var(--text-primary)]">Logs</h2>
            <button onClick={() => setLogs([])} className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]">
              Xóa logs
            </button>
          </div>
          <div className="max-h-[600px] overflow-y-auto rounded-xl border border-[var(--border)] bg-black/40 p-4 font-mono text-xs text-[var(--text-secondary)]">
            {logs.length === 0 && <p className="text-[var(--text-muted)]">Chưa có log.</p>}
            {logs.map((log, i) => (
              <div key={i} className="py-0.5">
                <span className="text-[var(--accent)]">&gt;</span> {log}
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  );
}
