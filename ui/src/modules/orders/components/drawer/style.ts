import styledTS from 'styled-components-ts';
import styled from 'styled-components';

export const TypeWrapper = styledTS<{ isPortrait?: boolean }>(styled.div)`
margin-top: ${props => (props.isPortrait ? '50px' : '20px')};
text-align: center;

h2 {
  margin-bottom:  ${props => (props.isPortrait ? '20px' : '')};
  font-size: ${props => props.isPortrait && '34px'};

  b {
    margin-left: 5px;
    color: #FF7800;
  }

  @media (max-width: 1250px) and (orientation:landscape) {
    font-size: 25px;
  }
}

h4 {
  padding-bottom: 20px;
  border-bottom: 1px dashed #cccc;
  font-weight: 300;
}
`;

export const Cards = styledTS<{ color?: string; isPortrait?: boolean }>(
  styled.div
)`
display: flex;
flex-wrap: wrap;
justify-content: center;
p {
  color: ${props => props.color && props.color};
  font-size: ${props => (props.isPortrait ? '35px' : '18px')};
  font-weight: 500;
  @media (max-width: 1250px) and (orientation:landscape) {
    line-height: 22px;
    font-size: 16px;
  }
}

.activeCard {
  border: 1px solid #FF7800;
}
`;

export const Card = styledTS<{ isPortrait?: boolean }>(styled.div)`
  border: 1px solid #ddd;
  border-radius: 16px;
  padding: 40px 40px 30px;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: ${props => (props.isPortrait ? '46%' : '32%')};
  margin: 0 10px 20px 0;
  flex-shrink: 0;
  cursor: pointer;
  transition: all ease 0.3s;

  > div {
    height: 150px;
    align-items: center;
    justify-content: center;
    > img {
      max-height: ${props => (props.isPortrait ? '250px' : '150px')};
      max-width: ${props => (props.isPortrait ? '250px' : '150px')};
      margin-bottom: 30px;
      @media (max-width: 1250px) and (orientation:landscape) {
        max-height: 80px;
        max-width: 80px;
        margin-bottom: 20px;
      }
    }
    @media (max-width: 1250px) and (orientation:landscape) {
      height: 80px;
    }
  }

  span {
    position: absolute;
    margin-top: -40px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  &:hover {
    box-shadow: 0 6px 10px 1px rgba(136, 136, 136, 0.08);
  }

  &:nth-child(3) {
    margin-right: 0;
  }

  @media (max-width: 1250px) and (orientation:landscape) {
    padding: 30px 30px 15px;
  }
`;
