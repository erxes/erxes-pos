import styledTS from 'styled-components-ts';
import styled from 'styled-components';

export const TypeWrapper = styledTS<{ isPortrait?: boolean }>(styled.div)`
margin-top: ${props => (props.isPortrait ? '50px' : '20px')}; 

h2 {
  text-align: center;
  margin-bottom: 40px;
  font-size: ${props => props.isPortrait && '34px'};

  b {
    margin-left: 5px;
    color: #FF7800;
  }

  @media (max-width: 1250px) and (orientation:landscape) {
    font-size: 25px;
  }
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
    display: flex;
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

  &:hover {
    box-shadow: 0 6px 10px 1px rgba(136, 136, 136, 0.08);
  }

  &:nth-child(3) {
    margin-right: 0;
  }

  @media (max-width: 1250px) and (orientation:landscape) {
    padding: 20px;
  }
`;
