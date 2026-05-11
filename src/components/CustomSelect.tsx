"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

export type CustomSelectOption = { value: string; label: string };

type Props = {
  name: string;
  options: CustomSelectOption[];
  required?: boolean;
  defaultValue?: string;
  placeholder?: string;
  ariaLabel?: string;
};

export default function CustomSelect({
  name,
  options,
  required,
  defaultValue = "",
  placeholder = "Select…",
  ariaLabel,
}: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(defaultValue);
  const [activeIndex, setActiveIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const optionRefs = useRef<Array<HTMLLIElement | null>>([]);

  // Type-to-search buffer (resets after 600ms of no typing)
  const searchBufferRef = useRef("");
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const listboxId = useId();

  const selected = options.find((o) => o.value === value) ?? null;

  const closeAndFocus = useCallback(() => {
    setOpen(false);
    requestAnimationFrame(() => buttonRef.current?.focus());
  }, []);

  const select = useCallback(
    (opt: CustomSelectOption) => {
      setValue(opt.value);
      setOpen(false);
      requestAnimationFrame(() => buttonRef.current?.focus());
    },
    [],
  );

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [open]);

  // When opening, set the active option to the currently selected one
  // (or the first option) and move focus into the listbox.
  useEffect(() => {
    if (!open) return;
    const idx = options.findIndex((o) => o.value === value);
    setActiveIndex(idx >= 0 ? idx : 0);
    requestAnimationFrame(() => listRef.current?.focus());
  }, [open, options, value]);

  // Keep the active option scrolled into view
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    optionRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  const focusOptionByChar = useCallback(
    (char: string) => {
      if (searchTimeoutRef.current) clearTimeout(searchTimeoutRef.current);
      searchBufferRef.current = (searchBufferRef.current + char).toLowerCase();
      const buf = searchBufferRef.current;
      const startIdx = activeIndex >= 0 ? activeIndex : 0;
      // Search forward from current, then wrap.
      const ordered = [
        ...options.slice(startIdx + (buf.length === 1 ? 1 : 0)),
        ...options.slice(0, startIdx + (buf.length === 1 ? 1 : 0)),
      ];
      const match = ordered.find((o) => o.label.toLowerCase().startsWith(buf));
      if (match) {
        const idx = options.findIndex((o) => o.value === match.value);
        setActiveIndex(idx);
      }
      searchTimeoutRef.current = setTimeout(() => {
        searchBufferRef.current = "";
      }, 600);
    },
    [activeIndex, options],
  );

  const onKeyDown = (e: KeyboardEvent<HTMLElement>) => {
    if (!open) {
      if (e.key === "ArrowDown" || e.key === "ArrowUp" || e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        setOpen(true);
      }
      return;
    }

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setActiveIndex((i) => Math.min(options.length - 1, i + 1));
        break;
      case "ArrowUp":
        e.preventDefault();
        setActiveIndex((i) => Math.max(0, i - 1));
        break;
      case "Home":
        e.preventDefault();
        setActiveIndex(0);
        break;
      case "End":
        e.preventDefault();
        setActiveIndex(options.length - 1);
        break;
      case "Enter":
      case " ": {
        e.preventDefault();
        const opt = options[activeIndex];
        if (opt) select(opt);
        break;
      }
      case "Escape":
        e.preventDefault();
        closeAndFocus();
        break;
      case "Tab":
        setOpen(false);
        break;
      default:
        if (e.key.length === 1 && /\S/.test(e.key)) {
          focusOptionByChar(e.key);
        }
    }
  };

  return (
    <div ref={containerRef} className="relative">
      {/*
        Visually-hidden mirrored input keeps native form submission and
        HTML5 `required` validation working. On invalid we open the
        dropdown instead of letting the browser show a tooltip pointing
        at an invisible element.
      */}
      <input
        type="text"
        tabIndex={-1}
        aria-hidden
        readOnly
        required={required}
        name={name}
        value={value}
        onInvalid={(e) => {
          e.preventDefault();
          setOpen(true);
          requestAnimationFrame(() => buttonRef.current?.focus());
        }}
        className="sr-only"
      />

      <button
        ref={buttonRef}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-label={ariaLabel}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKeyDown}
        className={`w-full flex items-center justify-between gap-3 px-5 py-4 bg-white/[0.04] border rounded-xl text-left text-white focus:outline-none transition-colors ${
          open
            ? "border-primary bg-white/[0.06]"
            : "border-border-gray hover:bg-white/[0.05] focus:border-primary"
        }`}
      >
        <span className={selected ? "text-white" : "text-white/30"}>
          {selected ? selected.label : placeholder}
        </span>
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#f87a13"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={`shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          aria-hidden
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <ul
          ref={listRef}
          id={listboxId}
          role="listbox"
          tabIndex={-1}
          aria-activedescendant={
            activeIndex >= 0 ? `${listboxId}-opt-${activeIndex}` : undefined
          }
          onKeyDown={onKeyDown}
          className="absolute z-30 left-0 right-0 mt-2 max-h-64 overflow-y-auto rounded-xl border border-border-gray bg-[#0a0a0a]/95 backdrop-blur-md shadow-[0_20px_60px_rgba(0,0,0,0.6)] focus:outline-none p-1"
        >
          {options.map((opt, i) => {
            const isSelected = opt.value === value;
            const isActive = i === activeIndex;
            return (
              <li
                key={opt.value}
                ref={(el) => {
                  optionRefs.current[i] = el;
                }}
                id={`${listboxId}-opt-${i}`}
                role="option"
                aria-selected={isSelected}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => select(opt)}
                className={`px-4 py-3 rounded-lg text-sm cursor-pointer flex items-center justify-between gap-3 transition-colors ${
                  isActive
                    ? "bg-primary/15 text-white"
                    : "text-white/85 hover:bg-white/5"
                }`}
              >
                <span>{opt.label}</span>
                {isSelected && (
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#f87a13"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
