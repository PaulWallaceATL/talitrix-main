import React from "react";

type BaseProps = {
  label: string;
  name: string;
  required?: boolean;
  hint?: string;
  className?: string;
};

const fieldClass =
  "w-full px-5 py-4 bg-white/[0.04] border border-border-gray rounded-xl text-white placeholder:text-white/30 focus:outline-none focus:border-primary focus:bg-white/[0.06] transition-colors";

export const TextField = ({
  label,
  name,
  required,
  hint,
  type = "text",
  placeholder,
  className,
}: BaseProps & {
  type?: string;
  placeholder?: string;
}) => (
  <label className={`flex flex-col gap-2 ${className ?? ""}`}>
    <span className="text-xs uppercase tracking-widest text-white/60">
      {label}
      {required && <span className="text-primary"> *</span>}
    </span>
    <input
      name={name}
      type={type}
      required={required}
      placeholder={placeholder}
      className={fieldClass}
    />
    {hint && <span className="text-xs text-white/40">{hint}</span>}
  </label>
);

export const TextArea = ({
  label,
  name,
  required,
  hint,
  placeholder,
  className,
  rows = 5,
}: BaseProps & {
  placeholder?: string;
  rows?: number;
}) => (
  <label className={`flex flex-col gap-2 ${className ?? ""}`}>
    <span className="text-xs uppercase tracking-widest text-white/60">
      {label}
      {required && <span className="text-primary"> *</span>}
    </span>
    <textarea
      name={name}
      required={required}
      placeholder={placeholder}
      rows={rows}
      className={fieldClass}
    />
    {hint && <span className="text-xs text-white/40">{hint}</span>}
  </label>
);

export const SelectField = ({
  label,
  name,
  required,
  hint,
  options,
  className,
}: BaseProps & { options: { value: string; label: string }[] }) => (
  <label className={`flex flex-col gap-2 ${className ?? ""}`}>
    <span className="text-xs uppercase tracking-widest text-white/60">
      {label}
      {required && <span className="text-primary"> *</span>}
    </span>
    <select
      name={name}
      required={required}
      className={`${fieldClass} appearance-none bg-[length:14px] bg-[right_1.25rem_center] bg-no-repeat`}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23f87a13' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'/></svg>\")",
      }}
    >
      <option value="" className="bg-background">
        Select…
      </option>
      {options.map((opt) => (
        <option key={opt.value} value={opt.value} className="bg-background">
          {opt.label}
        </option>
      ))}
    </select>
    {hint && <span className="text-xs text-white/40">{hint}</span>}
  </label>
);

export const SubmitButton = ({
  children,
  loading,
}: {
  children: React.ReactNode;
  loading?: boolean;
}) => (
  <button
    type="submit"
    disabled={loading}
    className="w-full sm:w-auto px-10 py-5 rounded-full bg-white/15 hover:bg-primary/40 backdrop-blur-md transition-colors border border-white/15 text-base disabled:opacity-50"
    style={{
      boxShadow:
        "0px 19px 65.2px rgba(248, 122, 19, 0.25), inset -3px -1px 10.9px rgba(255, 255, 255, 0.29), inset 0px 0px 2px #ffffff",
    }}
  >
    {loading ? "Submitting…" : children}
  </button>
);
