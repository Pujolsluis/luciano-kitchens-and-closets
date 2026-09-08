'use client';

import { type ReactNode, useEffect, useState } from 'react';

const isEditableTarget = (target: EventTarget | null) =>
  target instanceof HTMLElement &&
  (target.isContentEditable ||
    target.tagName === 'INPUT' ||
    target.tagName === 'TEXTAREA' ||
    target.tagName === 'SELECT');

export function StagingControls({ children }: { children: ReactNode }) {
  const [cleanPreview, setCleanPreview] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === '`' && !isEditableTarget(event.target)) {
        event.preventDefault();
        setCleanPreview((current) => !current);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="staging-controls" data-clean-preview={cleanPreview || undefined}>
      <div className="staging-review-chrome">{children}</div>
    </div>
  );
}
