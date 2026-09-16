import { useId, useState } from "react";
import { Check, Copy } from "lucide-react";
import { LANGUAGES } from "../data/snippets";

export default function CodePanel({ algorithmId, snippets }) {
  const id = useId();
  const [lang, setLang] = useState("pseudo");
  const [copied, setCopied] = useState(false);
  const source = snippets[lang];
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(source);
    } catch {
      const area = document.createElement("textarea");
      area.value = source;
      area.setAttribute("readonly", "");
      area.style.position = "fixed";
      area.style.left = "-9999px";
      document.body.appendChild(area);
      area.select();
      document.execCommand("copy");
      document.body.removeChild(area);
    }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  return (
    <div className="code-panel">
      <div className="code-toolbar">
        <div
          role="tablist"
          aria-label="Lenguaje del código"
          className="language-switch"
        >
          {LANGUAGES.map((item, index) => (
            <button
              key={item.id}
              id={`${algorithmId}-${item.id}-lang`}
              type="button"
              role="tab"
              aria-selected={lang === item.id}
              aria-controls={`${id}-source`}
              tabIndex={lang === item.id ? 0 : -1}
              className={lang === item.id ? "active" : ""}
              onClick={() => setLang(item.id)}
              onKeyDown={(event) => {
                if (
                  !["ArrowLeft", "ArrowRight", "Home", "End"].includes(
                    event.key,
                  )
                ) {
                  return;
                }
                event.preventDefault();
                const next =
                  event.key === "Home"
                    ? 0
                    : event.key === "End"
                      ? LANGUAGES.length - 1
                      : event.key === "ArrowRight"
                        ? (index + 1) % LANGUAGES.length
                        : (index + LANGUAGES.length - 1) % LANGUAGES.length;
                setLang(LANGUAGES[next].id);
                event.currentTarget.parentElement
                  .querySelectorAll("button")
                  [next].focus();
              }}
            >
              {item.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="copy-code"
          onClick={copy}
          aria-label={copied ? "Código copiado" : "Copiar código"}
        >
          {copied ? <Check size={13} /> : <Copy size={13} />}
          {copied ? "Copiado" : "Copiar"}
        </button>
      </div>
      <pre className="code-block" id={`${id}-source`} tabIndex={0}>
        <code>
          {source.split("\n").map((line, i) => (
            <span className="code-line" key={`${lang}-${i}`}>
              <span>{i + 1}</span>
              {line || " "}
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
