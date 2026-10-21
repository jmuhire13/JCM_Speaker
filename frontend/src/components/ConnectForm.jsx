import { useRef, useState } from 'react'
import Button from './Button'
import { connectForm, directContact, reply } from '../content/connect'
import { mailtoHref, submitEnquiry } from '../lib/submitEnquiry'

const empty = {
  name: '',
  email: '',
  phone: '',
  organisation: '',
  eventDate: '',
  audience: '',
  message: '',
  website: '',
}

// A simple shape check (something@something.something), not a promise the address exists.
const looksLikeEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.trim())

function validate(v) {
  const errors = {}
  if (!v.name.trim()) errors.name = 'Please tell us your name.'
  if (!looksLikeEmail(v.email)) errors.email = 'Please enter an email address we can reply to.'
  if (!v.organisation.trim()) errors.organisation = 'Please tell us the organisation.'
  if (!v.audience) errors.audience = 'Please choose who the audience is.'
  if (v.message.trim().length < 10) errors.message = 'Please tell us a little about your event.'
  return errors
}

const inputClass =
  'w-full border bg-white px-4 py-3 text-base text-ink placeholder:text-muted/70 focus:border-ink'

function Field({ id, label, error, hint, children }) {
  return (
    <div>
      <label htmlFor={id} className="text-ink block text-sm font-semibold">
        {label}
      </label>
      <div className="mt-2">{children}</div>
      {hint && (
        <p id={`${id}-hint`} className="text-muted mt-1.5 text-sm">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} role="alert" className="text-ember-deep mt-1.5 text-sm font-medium">
          {error}
        </p>
      )}
    </div>
  )
}

// The enquiry form. It checks the answers, sends them through lib/submitEnquiry.js, and never
// claims success unless the service confirmed it. If sending is not connected or fails, it
// offers an email with the visitor's answers already written in.
export default function ConnectForm() {
  const formRef = useRef(null)
  const [values, setValues] = useState(empty)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | success | not-connected | failed

  // Typing or choosing clears that field's error straight away.
  const set = (key) => (e) => {
    setValues((v) => ({ ...v, [key]: e.target.value }))
    setErrors((er) => (er[key] ? { ...er, [key]: undefined } : er))
  }
  const fieldProps = (key) => ({
    id: key,
    value: values[key],
    onChange: set(key),
    'aria-invalid': errors[key] ? 'true' : undefined,
    'aria-describedby': errors[key] ? `${key}-error` : undefined,
    className: `${inputClass} ${errors[key] ? 'border-ember-deep' : 'border-line-strong'}`,
  })

  async function onSubmit(e) {
    e.preventDefault()
    const found = validate(values)
    setErrors(found)
    if (Object.keys(found).length) {
      requestAnimationFrame(() => formRef.current?.querySelector('[aria-invalid="true"]')?.focus())
      return
    }
    if (values.website) {
      // A hidden field only automated programs fill in. Pretend it worked and send nothing.
      setStatus('success')
      return
    }
    setStatus('sending')
    const { website, ...enquiry } = values
    void website
    const result = await submitEnquiry(enquiry)
    setStatus(result.ok ? 'success' : result.reason === 'not-connected' ? 'not-connected' : 'failed')
  }

  const card = 'bg-cream text-ink rounded-[6px] p-6 shadow-2xl md:p-10'

  if (status === 'success') {
    return (
      <div className={card} role="status">
        <h2 className="font-hero text-5xl uppercase">Thank you.</h2>
        <p className="text-soft mt-4 text-lg leading-relaxed">
          Your request is on its way. {reply.promise}
        </p>
      </div>
    )
  }

  if (status === 'not-connected' || status === 'failed') {
    const { website, ...enquiry } = values
    void website
    return (
      <div className={card} role="alert">
        <h2 className="font-hero text-4xl uppercase md:text-5xl">
          {status === 'failed' ? 'That did not send.' : 'One more step.'}
        </h2>
        <p className="text-soft mt-4 text-lg leading-relaxed">
          {status === 'failed'
            ? 'Something went wrong, and we do not want to lose your message.'
            : 'Sending from this form is not switched on yet, and we do not want to lose your message.'}{' '}
          Open an email with everything you wrote already filled in, then press send.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-4">
          <a
            href={mailtoHref(directContact.email, enquiry)}
            className="bg-ink text-cream inline-block px-7 py-[18px] text-[15px] font-semibold"
          >
            Open my email
          </a>
          <button
            type="button"
            onClick={() => setStatus('idle')}
            className="decoration-ember text-[15px] font-medium underline underline-offset-4"
          >
            Go back and edit
          </button>
        </div>
        <p className="text-muted mt-5 text-sm">Or write to {directContact.email}.</p>
      </div>
    )
  }

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className={`${card} relative`}>
      <h2 className="font-display text-4xl tracking-wide uppercase md:text-5xl">{connectForm.title}</h2>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Field id="name" label={connectForm.fields.name} error={errors.name}>
          <input type="text" autoComplete="name" {...fieldProps('name')} />
        </Field>
        <Field id="email" label={connectForm.fields.email} error={errors.email}>
          <input type="email" autoComplete="email" {...fieldProps('email')} />
        </Field>
        <Field id="organisation" label={connectForm.fields.organisation} error={errors.organisation}>
          <input type="text" autoComplete="organization" {...fieldProps('organisation')} />
        </Field>
        <Field id="phone" label={connectForm.fields.phone}>
          <input type="tel" autoComplete="tel" {...fieldProps('phone')} />
        </Field>
        <Field id="eventDate" label={connectForm.fields.eventDate} hint={connectForm.fields.eventDateHint}>
          <input type="date" {...fieldProps('eventDate')} aria-describedby="eventDate-hint" />
        </Field>
        {/* Four choices are easier to pick as buttons than from a hidden dropdown. */}
        <fieldset>
          <legend className="text-ink block text-sm font-semibold">{connectForm.fields.audience}</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {connectForm.audienceOptions.map((o, i) => {
              const selected = values.audience === o
              return (
                <label
                  key={o}
                  className={`chip cursor-pointer border px-4 py-3 text-sm font-medium transition-colors select-none ${
                    selected
                      ? 'bg-green-deep text-cream border-green-deep'
                      : `bg-white text-ink hover:border-ink ${errors.audience ? 'border-ember-deep' : 'border-line-strong'}`
                  }`}
                >
                  <input
                    type="radio"
                    name="audience"
                    value={o}
                    checked={selected}
                    onChange={set('audience')}
                    id={i === 0 ? 'audience' : undefined}
                    aria-invalid={i === 0 && errors.audience ? 'true' : undefined}
                    aria-describedby={errors.audience ? 'audience-error' : undefined}
                    className="sr-only"
                  />
                  {o}
                </label>
              )
            })}
          </div>
          {errors.audience && (
            <p id="audience-error" role="alert" className="text-ember-deep mt-1.5 text-sm font-medium">
              {errors.audience}
            </p>
          )}
        </fieldset>
      </div>

      <div className="mt-6">
        <Field id="message" label={connectForm.fields.message} error={errors.message}>
          <textarea rows={5} {...fieldProps('message')} />
        </Field>
      </div>

      {/* Honeypot: invisible to people, tempting to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          Leave this empty
          <input type="text" tabIndex={-1} autoComplete="off" value={values.website} onChange={set('website')} />
        </label>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
        <Button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : connectForm.submit}
        </Button>
        <p className="text-muted max-w-xs text-sm">{connectForm.privacy}</p>
      </div>
    </form>
  )
}
