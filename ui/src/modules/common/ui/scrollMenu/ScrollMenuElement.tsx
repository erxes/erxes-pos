import React from 'react';
import { VisibilityContext } from 'react-horizontal-scrolling-menu';

export default function Element({
  children,
  itemId
}: {
  children: any;
  itemId: string | number;
}) {
  return (
    <div
      role="button"
      tabIndex={0}
      //   className="card"
    >
      {children}
    </div>
  );
}
