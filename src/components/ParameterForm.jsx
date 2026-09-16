import { useId, useState } from "react";

const LINE_FIELDS = [
  ["x1", "X inicial", 16],
  ["y1", "Y inicial", 14],
  ["x2", "X final", 16],
  ["y2", "Y final", 14],
];
const CIRCLE_FIELDS = [
  ["cx", "Centro X", 16],
  ["cy", "Centro Y", 14],
  ["radius", "Radio", 7],
];

export default function ParameterForm({ mode, parameters, onApply }) {
  const id = useId();
  const [draft, setDraft] = useState(parameters);
  const [error, setError] = useState("");
  const fields = mode === "circle" ? CIRCLE_FIELDS : LINE_FIELDS;
  const submit = (event) => {
    event.preventDefault();
    const values = Object.fromEntries(
      fields.map(([key]) => [key, Number(draft[key])]),
    );
    if (
      fields.some(
        ([key, , max]) =>
          draft[key] === "" ||
          !Number.isInteger(values[key]) ||
          values[key] < 0 ||
          values[key] > max,
      )
    ) {
      setError(
        "Introduce coordenadas enteras dentro de los límites indicados.",
      );
      return;
    }
    if (mode === "circle") {
      const { cx, cy, radius } = values;
      if (
        cx - radius < 0 ||
        cx + radius > 16 ||
        cy - radius < 0 ||
        cy + radius > 14
      ) {
        setError(
          "El círculo debe caber en la cuadrícula. Reduce el radio o mueve el centro.",
        );
        return;
      }
    }
    setError("");
    onApply(values);
  };
  return (
    <form className="parameter-form" onSubmit={submit}>
      <div className="parameter-fields">
        {fields.map(([key, label, max]) => (
          <label key={key} htmlFor={`${id}-${key}`}>
            <span>{label}</span>
            <input
              id={`${id}-${key}`}
              type="number"
              min="0"
              max={max}
              step="1"
              required
              value={draft[key]}
              onChange={(e) => {
                setDraft((d) => ({ ...d, [key]: e.target.value }));
                setError("");
              }}
              aria-describedby={`${id}-help${error ? ` ${id}-error` : ""}`}
            />
          </label>
        ))}
      </div>
      <p id={`${id}-help`} className="parameter-help">
        X: 0–16 · Y: 0–14{mode === "circle" ? " · Radio: 0–7" : ""}
      </p>
      {error && (
        <p className="parameter-error" id={`${id}-error`} role="alert">
          {error}
        </p>
      )}
      <button type="submit" className="button secondary apply-parameters">
        Aplicar y reiniciar
      </button>
    </form>
  );
}
