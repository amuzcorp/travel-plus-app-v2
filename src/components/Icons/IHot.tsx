import styled from "styled-components";

const IHot = () => {
  return <IHotWrapper>HOT</IHotWrapper>;
};

export default IHot;

export const IHotWrapper = styled.div`
  display: flex;
  width: 58px;
  height: 32px;
  padding: 4px 8px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  border-radius: 6px;
  background: var(--Hot, #bf4658);
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
