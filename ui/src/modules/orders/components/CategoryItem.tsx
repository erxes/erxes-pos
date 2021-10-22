import React from 'react';
import styled from 'styled-components';

const Category = styled.div`
  background-color: #ddd;
  border: 1px solid #fff;
`;

export default function CategoryItem(props: any) {
  const { name } = props;

  return (
    <Category>{name}</Category>
  )
};
