import { useEffect, useState } from 'react';

export default function Instructions({ fade = false }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onKey = (e) => { if (e.key.toLowerCase() === 'h') setVisible(v => !v); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  if (!visible) return null;
  return (
    <div className={`instructions ${fade ? 'fade' : ''}`}>
      <strong>Controls</strong><br/>
      Move: <kbd>A</kbd>/<kbd>D</kbd> · Jump: <kbd>W</kbd><br/>
      Press <kbd>H</kbd> to hide/show<br/>
      Press <kbd>R</kbd> to reset game
    </div>
  );
}
