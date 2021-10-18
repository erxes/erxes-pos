import React from 'react';

export function withProps<IProps>(Wrapped: new (props: IProps) => React.Component<IProps>) {
  return class WithProps extends React.Component<IProps, {}> {
    render() {
      return <Wrapped {...this.props} />;
    }
  };
};
