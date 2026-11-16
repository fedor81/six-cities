import './spinner.css';

type SpinnerProps = {
  label?: string;
};

function Spinner({ label = 'Загрузка предложений…' }: SpinnerProps): JSX.Element {
  return (
    <div className="spinner" role="status" aria-live="polite">
      <span className="spinner__circle" aria-hidden="true" />
      <span className="spinner__label">{label}</span>
    </div>
  );
}

export default Spinner;
