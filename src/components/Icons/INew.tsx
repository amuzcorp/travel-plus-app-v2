import styled from 'styled-components';

const INew = () => {
  return <INewWrapper>NEW</INewWrapper>;
};

export default INew;

export const INewWrapper = styled.div`
  display: flex;
  width: 58px;
  height: 32px;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;

  flex-shrink: 0;

  border-radius: 6px;
  background: var(--new, #008a83);
  /* backdrop-filter: blur(5px); */

  color: var(--icon-text-primary, #e6e6e6);
  text-align: center;
  font-family: Poppins;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;

  & > :not(:last-child) {
    margin-right: 10px;
  }
`;
