import React from 'react';
import {
  Close,
  Content,
  DialogProps,
  Overlay,
  Portal,
  Root,
  Trigger,
} from '@radix-ui/react-dialog';
import Button from '../Button';
import Xmark from 'icons/Xmark';

const Dialog = ({
  children,
  trigger,
  hideClose,
  maxWidth,
  ...rest
}: DialogProps & {
  trigger?: React.ReactNode;
  hideClose?: boolean;
  maxWidth?: number | string;
}) => (
  <Root {...rest}>
    <Trigger asChild>{trigger}</Trigger>
    <Portal>
      <Overlay className="dialog-overlay" />
      <Content className="dialog-content" style={{ maxWidth: maxWidth || 450 }}>
        {children}
        {!hideClose && (
          <Close asChild>
            <Button className="dialog-close" variant="ghost">
              <Xmark />
            </Button>
          </Close>
        )}
      </Content>
    </Portal>
  </Root>
);

export default Dialog;
