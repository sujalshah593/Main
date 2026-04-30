/**
 * Renders trusted HTML authored in MongoDB seed content.
 * Avoid passing untrusted user HTML here.
 */
export default function RichHtml({ html, className = '' }) {
  if (!html) return null;
  return (
    <div
      className={`space-y-3 text-sm leading-relaxed text-slate-300 [&_h1]:text-xl [&_h1]:font-semibold [&_h1]:text-white [&_h2]:text-lg [&_h2]:font-semibold [&_h2]:text-slate-100 [&_li]:ml-5 [&_li]:list-disc [&_ol]:ml-5 [&_ol]:list-decimal [&_p]:text-slate-300 [&_strong]:text-slate-100 [&_ul]:ml-5 [&_ul]:list-disc ${className}`}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
