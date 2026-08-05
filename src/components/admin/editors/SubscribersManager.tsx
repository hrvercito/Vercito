/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  Mail,
  Search,
  CheckCircle2,
  XCircle,
  Download,
  Trash2,
  RefreshCw,
  AlertCircle,
  Clock,
  ShieldCheck,
  UserX
} from 'lucide-react';

interface SubscriberItem {
  id: string;
  email: string;
  subscribedAt: string;
  date: string;
  time: string;
  status: 'Active' | 'Deactivated' | 'Unsubscribed';
}

export const SubscribersManager: React.FC = () => {
  const [subscribers, setSubscribers] = useState<SubscriberItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const adminToken = "vercito_admin_session_token_2026_verified";

  const fetchSubscribers = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/subscribers', {
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      const data = await res.json();
      if (data.success && Array.isArray(data.subscribers)) {
        setSubscribers(data.subscribers);
      }
    } catch (err) {
      console.error('Failed to fetch subscribers:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscribers();
  }, []);

  const handleToggleStatus = async (id: string, currentStatus: string) => {
    setActionLoadingId(id);
    const newStatus = currentStatus === 'Active' ? 'Deactivated' : 'Active';
    try {
      const res = await fetch('/api/admin/subscribers/status', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        setSubscribers((prev) =>
          prev.map((s) => (s.id === id ? { ...s, status: newStatus } : s))
        );
        setToastMsg(`Subscriber status updated to ${newStatus}`);
        setTimeout(() => setToastMsg(null), 3000);
      }
    } catch (err) {
      console.error('Failed to update status:', err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleDelete = async (id: string, email: string) => {
    if (!window.confirm(`Are you sure you want to permanently delete subscriber "${email}"?`)) {
      return;
    }
    setActionLoadingId(id);
    try {
      const res = await fetch(`/api/admin/subscribers/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${adminToken}`,
        },
      });
      const data = await res.json();
      if (data.success) {
        setSubscribers((prev) => prev.filter((s) => s.id !== id));
        setToastMsg(`Subscriber "${email}" deleted.`);
        setTimeout(() => setToastMsg(null), 3000);
      }
    } catch (err) {
      console.error('Failed to delete subscriber:', err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const handleExportCSV = () => {
    if (subscribers.length === 0) {
      alert('No subscribers to export.');
      return;
    }

    const headers = ['Subscriber ID', 'Email', 'Subscription Date', 'Subscription Time', 'Status', 'ISO Timestamp'];
    const rows = filteredSubscribers.map((s) => [
      `"${s.id}"`,
      `"${s.email}"`,
      `"${s.date}"`,
      `"${s.time}"`,
      `"${s.status}"`,
      `"${s.subscribedAt}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `VERCITO_Subscribers_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredSubscribers = subscribers.filter((s) => {
    const matchesSearch =
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'ALL' || s.status.toUpperCase() === statusFilter.toUpperCase();
    return matchesSearch && matchesStatus;
  });

  const activeCount = subscribers.filter((s) => s.status === 'Active').length;
  const deactivatedCount = subscribers.filter((s) => s.status !== 'Active').length;

  return (
    <div className="space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <Mail className="w-6 h-6 text-[#D4AF37]" />
            <h2 className="font-serif text-xl font-bold text-white">Email Subscribers Directory</h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Real-time newsletter & European intake notification subscribers from VERCITO website
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={fetchSubscribers}
            disabled={loading}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 text-xs font-semibold flex items-center gap-2 transition-all border border-white/10"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-[#D4AF37] ${loading ? 'animate-spin' : ''}`} />
            <span>Refresh</span>
          </button>

          <button
            onClick={handleExportCSV}
            className="px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C5A028] text-[#0B1F3A] text-xs font-bold flex items-center gap-2 hover:brightness-110 shadow-lg shadow-[#D4AF37]/20 transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {toastMsg && (
        <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-200 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toastMsg}</span>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Subscribers</p>
            <p className="text-2xl font-extrabold text-white mt-1">{subscribers.length}</p>
          </div>
          <div className="p-3 rounded-xl bg-blue-500/10 text-blue-400">
            <Mail className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Active Subscribers</p>
            <p className="text-2xl font-extrabold text-emerald-400 mt-1">{activeCount}</p>
          </div>
          <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/10 flex items-center justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Deactivated / Unsub</p>
            <p className="text-2xl font-extrabold text-amber-400 mt-1">{deactivatedCount}</p>
          </div>
          <div className="p-3 rounded-xl bg-amber-500/10 text-amber-400">
            <UserX className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-3.5 rounded-2xl border border-white/10">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search email or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-800 border border-white/10 text-xs text-white focus:outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['ALL', 'ACTIVE', 'DEACTIVATED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-[#D4AF37] text-[#0B1F3A]'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              {st === 'ALL' ? 'All Status' : st}
            </button>
          ))}
        </div>
      </div>

      {/* Table List */}
      <div className="rounded-2xl border border-white/10 overflow-hidden bg-slate-900/80">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs flex items-center justify-center gap-2">
            <RefreshCw className="w-4 h-4 animate-spin text-[#D4AF37]" />
            <span>Loading subscriber records from database...</span>
          </div>
        ) : filteredSubscribers.length === 0 ? (
          <div className="p-12 text-center text-slate-400 text-xs space-y-2">
            <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
            <p className="font-semibold text-slate-300">No subscriber records found.</p>
            <p>Subscribers who submit the footer email form will appear here in real-time.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-800/80 text-slate-300 font-bold border-b border-white/10">
                  <th className="p-3.5">Subscriber ID</th>
                  <th className="p-3.5">Email Address</th>
                  <th className="p-3.5">Subscription Date</th>
                  <th className="p-3.5">Subscription Time</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filteredSubscribers.map((sub) => {
                  const isActive = sub.status === 'Active';
                  const isActioning = actionLoadingId === sub.id;

                  return (
                    <tr key={sub.id} className="hover:bg-white/5 transition-colors">
                      <td className="p-3.5 font-mono text-[11px] text-[#D4AF37] font-semibold">
                        {sub.id}
                      </td>
                      <td className="p-3.5 font-bold text-white">
                        {sub.email}
                      </td>
                      <td className="p-3.5 text-slate-300">
                        {sub.date}
                      </td>
                      <td className="p-3.5 text-slate-400 font-mono text-[11px]">
                        {sub.time}
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase ${
                            isActive
                              ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                              : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              isActive ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'
                            }`}
                          />
                          {sub.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleToggleStatus(sub.id, sub.status)}
                            disabled={isActioning}
                            title={isActive ? 'Deactivate subscriber' : 'Activate subscriber'}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border transition-all ${
                              isActive
                                ? 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border-amber-500/20'
                                : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border-emerald-500/20'
                            }`}
                          >
                            {isActive ? 'Deactivate' : 'Activate'}
                          </button>

                          <button
                            onClick={() => handleDelete(sub.id, sub.email)}
                            disabled={isActioning}
                            title="Delete subscriber"
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 transition-all"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
