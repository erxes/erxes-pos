import type { FC, ReactNode } from 'react';

export type IProps = {
  children?: ReactNode;
};

export type IComponent = FC<IProps>;
