import React from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import Element from './ScrollMenuElement';
import useDrag from './useDrag';
import { LeftArrow, RightArrow } from './arrows';
import cn from 'classnames';

type scrollVisibilityApiType = React.ContextType<typeof VisibilityContext>;

interface Props {
  items: any[];
  ItemComponent: React.FC<any>;
  className?: string;
}

const HorizontalScroll: React.FC<Props> = ({
  items,
  ItemComponent,
  className,
}) => {
  const { dragStart, dragStop, dragMove, dragging } = useDrag();

  const handleDrag =
    ({ scrollContainer }: scrollVisibilityApiType) =>
    (ev: React.MouseEvent) =>
      dragMove(ev, (posDiff) => {
        if (scrollContainer.current) {
          scrollContainer.current.scrollLeft += posDiff;
        }
      });

  return (
    <div onMouseLeave={dragStop} className={cn('scroll-menu', className)}>
      <ScrollMenu
        onWheel={onWheel}
        onMouseDown={() => dragStart}
        onMouseUp={() => dragStop}
        onMouseMove={handleDrag}
        LeftArrow={LeftArrow}
        RightArrow={RightArrow}
      >
        {items.map((item, key) => (
          <Element
            itemId={key} // NOTE: itemId is required for track items
            key={key}
          >
            <ItemComponent {...item} />
          </Element>
        ))}
      </ScrollMenu>
    </div>
  );
};

function onWheel(apiObj: scrollVisibilityApiType, ev: React.WheelEvent): void {
  const isThouchpad = Math.abs(ev.deltaX) !== 0 || Math.abs(ev.deltaY) < 15;

  if (isThouchpad) {
    ev.stopPropagation();
    return;
  }

  if (ev.deltaY < 0) {
    apiObj.scrollPrev();
  } else if (ev.deltaY > 0) {
    apiObj.scrollNext();
  }
}

export default HorizontalScroll;
