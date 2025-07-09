export function LoadingSpinner() {
  return (
    <output
      aria-label="Carregando"
      className="flex items-center justify-center py-6"
    >
      <svg
        aria-hidden="true"
        fill="none"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
          fill="currentColor"
        />
      </svg>
    </output>
  );
}
