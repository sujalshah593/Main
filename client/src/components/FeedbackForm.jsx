import { useState } from 'react';
import { postFeedback } from '../api/labsApi.js';

export default function FeedbackForm({ experimentId }) {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);
  const [status, setStatus] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setStatus(null);
    try {
      await postFeedback({ experimentId, message, rating: Number(rating) });
      setStatus({ type: 'ok', text: 'Thank you — your feedback was recorded.' });
      setMessage('');
    } catch (err) {
      setStatus({ type: 'err', text: err?.response?.data?.message || 'Could not submit feedback.' });
    } finally {
      setSubmitting(false);
    }
  }

  return (
 <form
  onSubmit={handleSubmit}
  className="max-w-xl space-y-5 rounded-2xl bg-white/70 backdrop-blur-xl border border-white/30 shadow-lg p-6"
>
  <h2 className="text-lg font-semibold text-gray-800">🧪 Share Your Feedback</h2>

  <div>
    <label className="text-sm font-medium text-gray-700">Rating</label>
    <select
      value={rating}
      onChange={(e) => setRating(e.target.value)}
      className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-400"
    >
      {[5, 4, 3, 2, 1].map((n) => (
        <option key={n} value={n}>
          ⭐ {n}
        </option>
      ))}
    </select>
  </div>

  <div>
    <label className="text-sm font-medium text-gray-700">Comments</label>
    <textarea
      required
      rows={4}
      value={message}
      onChange={(e) => setMessage(e.target.value)}
      className="mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm shadow-sm focus:ring-2 focus:ring-indigo-400"
      placeholder="What did you learn? What can we improve?"
    />
  </div>

  {status && (
    <p
      className={`text-sm ${
        status.type === "ok" ? "text-green-500" : "text-red-500"
      }`}
    >
      {status.text}
    </p>
  )}

  <button
    type="submit"
    disabled={submitting}
    className="w-full rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-400 transition"
  >
    {submitting ? "Sending..." : "Submit Feedback"}
  </button>
</form>
  );
}
