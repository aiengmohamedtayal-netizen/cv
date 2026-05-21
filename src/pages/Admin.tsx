import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LogIn, MessageSquare, LogOut, Loader2, CheckCircle2, Clock, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export default function Admin() {
  const [token, setToken] = useState(localStorage.getItem("admin_token"));
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  const [stats, setStats] = useState({ total: 0, new: 0, pending: 0, completed: 0 });
  const [requests, setRequests] = useState<any[]>([]);
  const [initialLoad, setInitialLoad] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    if (token) {
      fetchData();
    }
  }, [token]);

  const fetchData = async () => {
    try {
      const [statsRes, reqsRes] = await Promise.all([
        fetch("/api/stats", { headers: { Authorization: `Bearer ${token}` } }),
        fetch("/api/requests", { headers: { Authorization: `Bearer ${token}` } })
      ]);
      
      if (statsRes.status === 401 || reqsRes.status === 401) {
        handleLogout();
        return;
      }
      
      const statsData = await statsRes.json();
      const reqsData = await reqsRes.json();
      
      setStats(statsData);
      setRequests(reqsData);
    } catch (err) {
      toast.error("Failed to load dashboard data");
    } finally {
      setInitialLoad(false);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Login failed");
      
      localStorage.setItem("admin_token", data.token);
      setToken(data.token);
      toast.success("Welcome back");
    } catch (err: any) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setToken(null);
    navigate("/");
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/requests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status })
      });
      fetchData();
      toast.success("Status updated");
    } catch (err) {
      toast.error("Update failed");
    }
  };

  const deleteReq = async (id: string) => {
    if (!confirm("Delete this request forever?")) return;
    try {
      await fetch(`/api/requests/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchData();
      toast.success("Request deleted");
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-background relative overflow-hidden">
        <div className="absolute inset-0 -z-10 grid-overlay" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md glass-strong rounded-3xl p-8"
        >
          <div className="text-center mb-8">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 text-primary-glow mb-4">
              <LogIn size={20} />
            </div>
            <h1 className="font-display text-2xl font-bold">Admin Portal</h1>
            <p className="text-sm text-muted-foreground mt-2">Sign in to manage requests</p>
          </div>
          
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required
                className="w-full rounded-xl bg-background/40 border border-foreground/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none px-4 py-3 text-sm transition"
              />
            </div>
            <div>
              <input
                type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required
                className="w-full rounded-xl bg-background/40 border border-foreground/10 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 outline-none px-4 py-3 text-sm transition"
              />
            </div>
            <button disabled={loading} className="btn-magnetic w-full justify-center disabled:opacity-60">
              {loading ? <Loader2 className="animate-spin" size={18} /> : "Sign In"}
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden p-6 lg:p-12">
      <div className="absolute inset-0 -z-10 grid-overlay" />
      <div className="absolute top-0 right-0 h-[600px] w-[600px] rounded-full bg-primary/5 blur-[120px] animate-drift pointer-events-none" />
      
      <div className="max-w-6xl mx-auto">
        <header className="flex items-center justify-between mb-12 glass rounded-2xl p-4 px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20 text-primary-glow">
              <MessageSquare size={18} />
            </div>
            <div>
              <h1 className="font-display font-semibold">Workspace Overview</h1>
              <div className="text-xs text-muted-foreground font-mono">Status: Online</div>
            </div>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-destructive transition">
            <LogOut size={16} /> Logout
          </button>
        </header>

        {initialLoad ? (
          <div className="flex justify-center py-20"><Loader2 className="animate-spin text-primary" size={32} /></div>
        ) : (
          <>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {[
                { label: "Total Requests", value: stats.total, color: "text-foreground" },
                { label: "New (Unread)", value: stats.new, color: "text-primary-glow" },
                { label: "Pending", value: stats.pending, color: "text-yellow-400" },
                { label: "Completed", value: stats.completed, color: "text-emerald-400" }
              ].map((s, i) => (
                <motion.div 
                  key={s.label} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
                  className="glass rounded-2xl p-6"
                >
                  <div className="text-sm text-muted-foreground font-mono mb-2">{s.label}</div>
                  <div className={`font-display text-3xl font-bold ${s.color}`}>{s.value}</div>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="glass-strong rounded-3xl p-6 overflow-x-auto">
              <h2 className="font-display text-xl font-semibold mb-6">Recent Inquiries</h2>
              {requests.length === 0 ? (
                <div className="text-center py-10 text-muted-foreground">No requests found</div>
              ) : (
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-border/50 text-muted-foreground font-mono text-xs uppercase tracking-wider">
                      <th className="pb-3 font-medium">Date</th>
                      <th className="pb-3 font-medium">Client</th>
                      <th className="pb-3 font-medium">Subject</th>
                      <th className="pb-3 font-medium">Status</th>
                      <th className="pb-3 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border/50">
                    {requests.map((r) => (
                      <tr key={r.id} className="group hover:bg-white/5 transition-colors">
                        <td className="py-4 font-mono text-muted-foreground">{new Date(r.createdAt).toLocaleDateString()}</td>
                        <td className="py-4">
                          <div className="font-medium text-foreground">{r.name}</div>
                          <div className="text-muted-foreground text-xs">{r.email}</div>
                        </td>
                        <td className="py-4">
                          <div className="font-medium">{r.subject}</div>
                          <div className="text-muted-foreground text-xs truncate max-w-xs">{r.message}</div>
                        </td>
                        <td className="py-4">
                          <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-mono border ${
                            r.status === 'جديد' ? 'bg-primary/10 text-primary border-primary/20' :
                            r.status === 'قيد المراجعة' ? 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20' :
                            'bg-emerald-400/10 text-emerald-400 border-emerald-400/20'
                          }`}>
                            {r.status === 'جديد' ? 'NEW' : r.status === 'قيد المراجعة' ? 'PENDING' : 'DONE'}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => updateStatus(r.id, 'قيد المراجعة')} title="Mark Pending" className="p-1.5 rounded bg-background/50 text-yellow-400 hover:bg-yellow-400/20 transition"><Clock size={14} /></button>
                            <button onClick={() => updateStatus(r.id, 'تم التواصل')} title="Mark Done" className="p-1.5 rounded bg-background/50 text-emerald-400 hover:bg-emerald-400/20 transition"><CheckCircle2 size={14} /></button>
                            <button onClick={() => deleteReq(r.id)} title="Delete" className="p-1.5 rounded bg-background/50 text-destructive hover:bg-destructive/20 transition"><Trash2 size={14} /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}
