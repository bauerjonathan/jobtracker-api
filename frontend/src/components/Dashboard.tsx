import { useEffect, useState } from "react";
import axios from "axios";

interface JobApplication {
  id: number;
  company: string;
  position: string;
  status: string;
  notes: string;
  appliedAt: string;
}

interface Props {
  token: string;
  onLogout: () => void;
}

const STATUS_COLORS: Record<string, string> = {
  APPLIED: "bg-blue-500",
  INTERVIEW: "bg-yellow-500",
  OFFER: "bg-green-500",
  REJECTED: "bg-red-500",
  WITHDRAWN: "bg-gray-500",
};

export default function Dashboard({ token, onLogout }: Props) {
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [company, setCompany] = useState("");
  const [position, setPosition] = useState("");
  const [status, setStatus] = useState("APPLIED");
  const [notes, setNotes] = useState("");
  const [appliedAt, setAppliedAt] = useState("");

  const api = axios.create({
    baseURL: "http://localhost:8080",
    headers: { Authorization: `Bearer ${token}` },
  });

  const fetchApplications = async () => {
    const res = await api.get("/api/applications");
    setApplications(res.data);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleCreate = async () => {
    await api.post("/api/applications", {
      company,
      position,
      status,
      notes,
      appliedAt,
    });
    setCompany("");
    setPosition("");
    setStatus("APPLIED");
    setNotes("");
    setAppliedAt("");
    setShowForm(false);
    fetchApplications();
  };

  const handleDelete = async (id: number) => {
    await api.delete(`/api/applications/${id}`);
    fetchApplications();
  };

  const handleStatusChange = async (app: JobApplication, newStatus: string) => {
    await api.put(`/api/applications/${app.id}`, { ...app, status: newStatus });
    fetchApplications();
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold">JobTracker</h1>
          <p className="text-gray-400 mt-1">
            {applications.length} Bewerbung
            {applications.length !== 1 ? "en" : ""}
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-semibold transition"
          >
            + Neue Bewerbung
          </button>
          <button
            onClick={onLogout}
            className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-gray-900 rounded-2xl p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Neue Bewerbung</h2>
          <div className="grid grid-cols-2 gap-4">
            <input
              className="bg-gray-800 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Unternehmen"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
            />
            <input
              className="bg-gray-800 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            />
            <select
              className="bg-gray-800 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="APPLIED">Applied</option>
              <option value="INTERVIEW">Interview</option>
              <option value="OFFER">Offer</option>
              <option value="REJECTED">Rejected</option>
              <option value="WITHDRAWN">Withdrawn</option>
            </select>
            <input
              className="bg-gray-800 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
              type="date"
              value={appliedAt}
              onChange={(e) => setAppliedAt(e.target.value)}
            />
            <input
              className="bg-gray-800 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 col-span-2"
              placeholder="Notizen (optional)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={handleCreate}
              className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold transition"
            >
              Speichern
            </button>
            <button
              onClick={() => setShowForm(false)}
              className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-lg transition"
            >
              Abbrechen
            </button>
          </div>
        </div>
      )}

      {/* Applications */}
      <div className="grid gap-4">
        {applications.length === 0 ? (
          <div className="text-center text-gray-500 py-20">
            Noch keine Bewerbungen. Leg eine an!
          </div>
        ) : (
          applications.map((app) => (
            <div
              key={app.id}
              className="bg-gray-900 rounded-2xl p-6 flex items-center justify-between"
            >
              <div>
                <h3 className="text-lg font-semibold">{app.company}</h3>
                <p className="text-gray-400">{app.position}</p>
                {app.appliedAt && (
                  <p className="text-gray-600 text-sm mt-1">{app.appliedAt}</p>
                )}
                {app.notes && (
                  <p className="text-gray-500 text-sm mt-1">{app.notes}</p>
                )}
              </div>
              <div className="flex items-center gap-3">
                <select
                  className={`${STATUS_COLORS[app.status]} text-white rounded-lg px-3 py-1 text-sm font-semibold outline-none cursor-pointer`}
                  value={app.status}
                  onChange={(e) => handleStatusChange(app, e.target.value)}
                >
                  <option value="APPLIED">Applied</option>
                  <option value="INTERVIEW">Interview</option>
                  <option value="OFFER">Offer</option>
                  <option value="REJECTED">Rejected</option>
                  <option value="WITHDRAWN">Withdrawn</option>
                </select>
                <button
                  onClick={() => handleDelete(app.id)}
                  className="text-gray-600 hover:text-red-400 transition text-xl"
                >
                  ✕
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}