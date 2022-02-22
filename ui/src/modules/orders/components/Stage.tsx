import React from 'react';
import { __ } from 'modules/common/utils';
import { IOrderItemInput } from '../types';
import StageItem from './StageItem';
import { Stages, StageContent, StageItems, KioskStageContent } from '../styles';
import EmptyState from 'modules/common/components/EmptyState';

type Props = {
  orientation: string;
  items: IOrderItemInput[];
  changeItemCount: (item: IOrderItemInput) => void;
  changeItemIsTake: (item: IOrderItemInput, value: boolean) => void;
  options: any;
  stageHeight?: number;
  type: string;
  mode: string;
};

export default class Stage extends React.Component<Props> {
  renderItems() {
    const {
      items,
      changeItemCount,
      changeItemIsTake,
      options,
      orientation,
      stageHeight,
      type,
      mode
    } = this.props;

    if (!items || items.length === 0) {
      return (
        <StageContent odd={false}>
          <EmptyState
            image="/images/actions/8.svg"
            text={__('Add some reservations')}
            size={'large'}
          />
        </StageContent>
      );
    }

    if (mode === 'kiosk') {
      return (
        <KioskStageContent>
          {items.map(i => (
            <StageItem
              orientation={orientation}
              item={i}
              key={`${i._id}`}
              changeItemCount={changeItemCount}
              changeItemIsTake={changeItemIsTake}
              color={options.colors.primary || ''}
              type={type}
              mode={mode}
            />
          ))}
        </KioskStageContent>
      );
    }

    return (
      <StageContent odd={true}>
        <StageItems
          height={stageHeight}
          innerWidth={window.innerWidth}
          color={options.colors.secondary}
        >
          {items.map(i => (
            <StageItem
              orientation={orientation}
              item={i}
              key={`${i._id}`}
              changeItemCount={changeItemCount}
              changeItemIsTake={changeItemIsTake}
              color={options.colors.primary || ''}
              type={type}
              mode={mode}
            />
          ))}
        </StageItems>
      </StageContent>
    );
  }

  render() {
    return <Stages>{this.renderItems()}</Stages>;
  }
}
