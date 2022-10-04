import { useRef, useEffect, useState, createRef } from 'react';
import SimpleBar from 'simplebar-react';
import { IComponent } from 'modules/types';

const Scroll: IComponent = ({ children }) => {
  const [offset, setoffset] = useState(0);
  const ref = useRef<any>(null);
  const scrollableNodeRef = createRef();

  useEffect(() => {
    const scrollElement = (ref || {}).current;
    if (scrollElement && scrollableNodeRef.current) {
      scrollElement.recalculate();
      const scrollbarHeight = scrollElement.axis.y.scrollbar.size;
      // setoffset(352 / 2 - 30);
      // console.log(
      //   scrollbarHeight,
      //   scrollElement,
      //   scrollableNodeRef.current.clientHeight
      // );
    }
  });
  return (
    <>
      {/* <style>
        {`
          .kiosk
          .kiosk-products 
          .simplebar-vertical {
             top: -${offset}px;
             right: initial;
             bottom: -${704}px;
             background: black;
           }
        `}
      </style> */}
      <SimpleBar ref={ref} scrollableNodeProps={{ ref: scrollableNodeRef }}>
        {children}
      </SimpleBar>
    </>
  );
};

export default Scroll;
