import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Star, CheckCircle2, MessageSquareText } from 'lucide-react';

export default function PracticalFeedback({ experimentId, experimentTitle }) {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    if (!message.trim()) {
      setError('Please enter your feedback message');
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // If no experimentId is provided (hardcoded page), we might need a different way 
      // or just skip the DB check if we modify the controller.
      // For now, we assume we have an ID or a valid string ID for the backend.
      const response = await fetch('/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          experimentId: experimentId || null,
          experimentTitle: experimentTitle,
          message,
          rating
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to submit feedback');
      }

      setIsSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="rounded-3xl border border-emerald-500/30 bg-[#7A1540] dark:bg-slate-900 text-white p-8 text-center shadow-2xl"
      >
        <div className="flex justify-center mb-4">
          <div className="p-3 rounded-full bg-emerald-500/20 text-emerald-400">
            <CheckCircle2 size={32} />
          </div>
        </div>
        <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
        <p className="text-lab-muted">Your feedback for <span className="text-emerald-400 font-semibold">{experimentTitle}</span> has been received.</p>
        <button 
          onClick={() => { setIsSubmitted(false); setRating(0); setMessage(''); }}
          className="mt-6 text-sm font-bold text-emerald-400 hover:underline"
        >
          Submit another response
        </button>
      </motion.div>
    );
  }

  return (
    <section className="mt-12 rounded-3xl border border-slate-700 bg-[#7A1540] dark:bg-slate-900 text-white p-8 shadow-2xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-500">
          <MessageSquareText size={22} />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">Experiment Feedback</h2>
          <p className="text-sm text-slate-400 font-medium">Help us improve the virtual lab experience.</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider block">
            How was your experience?
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onMouseEnter={() => setHoveredRating(star)}
                onMouseLeave={() => setHoveredRating(0)}
                onClick={() => setRating(star)}
                className="transition-all duration-200 transform hover:scale-110"
              >
                <Star
                  size={28}
                  className={`${
                    star <= (hoveredRating || rating)
                      ? 'fill-amber-500 text-amber-500 drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]'
                      : 'text-slate-700'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <label className="text-sm font-semibold text-gray-400 uppercase tracking-wider block">
            Your Comments
          </label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="What did you like? What could be improved?"
            className="w-full h-32 bg-[#7A1540] dark:bg-slate-800 text-white border border-slate-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-500 transition-colors resize-none placeholder:text-slate-600"
          />
        </div>

        {error && (
          <p className="text-sm text-rose-400 font-medium flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`flex items-center justify-center gap-2 px-8 py-3 rounded-xl font-bold transition-all ${
            isSubmitting
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-amber-500 hover:bg-amber-600 text-black hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]'
          }`}
        >
          {isSubmitting ? 'Submitting...' : 'Send Feedback'}
          <Send size={18} />
        </button>
      </form>
    </section>
  );
}
