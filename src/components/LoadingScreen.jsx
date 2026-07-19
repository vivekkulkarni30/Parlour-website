export default function LoadingScreen({ compact = false }) {
  return (
    <div className={compact ? 'loading loading--compact' : 'loading'}>
      <span className="spinner" />
      <p>Preparing your salon experience...</p>
    </div>
  );
}
