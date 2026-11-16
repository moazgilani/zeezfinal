import { FormEvent, useState } from 'react';
import { Check, Loader2 } from 'lucide-react';
import Header from '../components/Header';
import bookingImage from '../content/projects/rebero-mansion-rooftop/01.jpg';

type SubmissionState = 'idle' | 'submitting' | 'success' | 'error';

const inputClass = 'w-full border border-primary/20 bg-transparent px-4 py-3 font-outfit text-sm text-primary outline-none transition-colors placeholder:text-primary/35 focus:border-primary/60';

function BookCall() {
  const [submissionState, setSubmissionState] = useState<SubmissionState>('idle');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmissionState('submitting');

    try {
      const formData = new FormData(event.currentTarget);
      const response = await fetch('/__forms.html', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData as never).toString(),
      });

      if (!response.ok) throw new Error('Unable to submit form');
      event.currentTarget.reset();
      setSubmissionState('success');
    } catch {
      setSubmissionState('error');
    }
  };

  return (
    <div className="min-h-screen bg-secondary">
      <Header />
      <main className="px-6 pb-24 sm:px-8 sm:pb-32">
        <div className="mx-auto grid max-w-7xl overflow-hidden border border-primary/10 lg:grid-cols-2">
          <div className="min-h-[24rem] lg:min-h-[44rem]">
            <img
              src={bookingImage}
              alt="Warm, considered interior by Zeez Creations"
              className="h-full w-full object-cover"
            />
          </div>

          <section className="flex items-center px-6 py-14 sm:px-12 lg:px-16">
            <div className="w-full max-w-lg">
              <p className="mb-5 font-outfit text-xs uppercase tracking-[0.2em] text-primary/45">Start a conversation</p>
              <h1 className="font-argent text-4xl leading-[1.05] text-primary sm:text-5xl">
                Let’s Design Something Beautiful
              </h1>
              <p className="mt-5 max-w-md font-outfit text-base leading-relaxed text-primary/60">
                Book a complimentary discovery call with our team. Tell us a little about your project and we’ll be in touch to find a time that works for you.
              </p>

              {submissionState === 'success' ? (
                <div className="mt-10 border border-primary/15 bg-primary/[0.03] p-7">
                  <Check className="mb-4 text-primary" size={24} strokeWidth={1.5} />
                  <h2 className="font-argent text-2xl text-primary">Thank you for reaching out.</h2>
                  <p className="mt-3 font-outfit text-sm leading-relaxed text-primary/60">
                    Your request has been received. We’ll be in touch soon to arrange your call.
                  </p>
                </div>
              ) : (
                <form
                  name="book-a-call"
                  method="POST"
                  data-netlify="true"
                  netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="mt-10 space-y-5"
                >
                  <input type="hidden" name="form-name" value="book-a-call" />
                  <input type="hidden" name="subject" value="New book-a-call request from %{formName} (%{submissionId})" />
                  <p className="hidden" aria-hidden="true">
                    <label>Don’t fill this out: <input name="bot-field" /></label>
                  </p>
                  <label className="block">
                    <span className="mb-2 block font-outfit text-xs uppercase tracking-[0.13em] text-primary/60">Name</span>
                    <input className={inputClass} name="name" type="text" autoComplete="name" placeholder="Your full name" required />
                  </label>
                  <label className="block">
                    <span className="mb-2 block font-outfit text-xs uppercase tracking-[0.13em] text-primary/60">Email</span>
                    <input className={inputClass} name="email" type="email" autoComplete="email" placeholder="Your email address" required />
                  </label>
                  <label className="block">
                    <span className="mb-2 block font-outfit text-xs uppercase tracking-[0.13em] text-primary/60">Phone</span>
                    <input className={inputClass} name="phone" type="tel" autoComplete="tel" placeholder="Your phone number" />
                  </label>
                  <label className="block">
                    <span className="mb-2 block font-outfit text-xs uppercase tracking-[0.13em] text-primary/60">Project type</span>
                    <select className={inputClass} name="project-type" defaultValue="" required>
                      <option value="" disabled>Select a project type</option>
                      <option>Interior design</option>
                      <option>Furniture & decor</option>
                      <option>Commercial space</option>
                      <option>Other</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="mb-2 block font-outfit text-xs uppercase tracking-[0.13em] text-primary/60">Preferred date</span>
                    <input className={inputClass} name="preferred-date" type="date" required />
                  </label>
                  <label className="block">
                    <span className="mb-2 block font-outfit text-xs uppercase tracking-[0.13em] text-primary/60">Tell us about your project</span>
                    <textarea className={`${inputClass} min-h-28 resize-y`} name="project-details" placeholder="Location, scope, and anything else you’d like to share" />
                  </label>

                  {submissionState === 'error' && (
                    <p className="font-outfit text-sm text-red-700">Something went wrong. Please try again or contact us directly.</p>
                  )}

                  <button
                    type="submit"
                    disabled={submissionState === 'submitting'}
                    className="flex w-full items-center justify-center gap-2 bg-primary px-6 py-4 font-outfit text-sm tracking-wide text-secondary transition-opacity hover:opacity-85 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {submissionState === 'submitting' && <Loader2 size={17} className="animate-spin" />}
                    {submissionState === 'submitting' ? 'Sending request…' : 'Request a Call'}
                  </button>
                </form>
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

export default BookCall;

