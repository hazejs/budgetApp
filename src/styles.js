import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 10px;
`;

export const UpperWrapper = styled.div`
  display: flex;
  padding: 0 21px;
`;

export const UpperContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const FlexItemLabel = styled.label`
  color: rgba(47, 59, 102, 1);
  margin-bottom: 10px;
`

export const H1 = styled.h1`
  font-size: 24px;
  margin: 0;
`;

export const BudgetBreakdown = styled.div`
  display: flex;
  flex-direction: column;
  background: rgba(245, 246, 250, 1);
  border: 1px solid rgba(178, 187, 213, 0.5);
  width: 100%;
  padding: 20px;
`;


export const PopUp = styled.div`
  top: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding: 10px;
  position: absolute;
  right: 15px;
  z-index: 9;
  width: 160px;
  height: 90px;
  box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
  border-radius: 6px;
  background: #fff;
`;

export const Dots = styled.div`
  font-size: 20px;
  justify-content: center;
  align-items: center;
  transform: rotate(90deg);
`;

export const H3 = styled.h3`
  font-size: 18px;
  margin: 0;
  margin-top: 10px;
`;

export const Description1 = styled.p`
  font-size: 14px;
  color: #99A4C2;
  margin-bottom: 0;
`;
export const Description2 = styled.p`
  margin-top: 5px;
  font-size: 14px;
  color: #99A4C2;
  margin-bottom: 55px;
`;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  flex: auto;
`;


export const DataInputs = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 25px 0px;
`;

export const Tabs = styled.div`
  display: flex;
`;

export const Arrow = styled.div`
  width: 0;
  height: 0;
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  margin-right: 15px;
  border-bottom: 10px solid black;
`;

export const Tab = styled.div`
  font-size: 20px;
  cursor: pointer;
  border-bottom: ${({ active }) => (active ? '2px solid #000' : 'none')};
  color: #000;
  font-weight: 600;
`;

export const Content = styled.div`
  padding: 20px;
`;

export const FlexItem = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 50px;
`;

export const ChannelRow = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 10px;
  border: 1px solid #ccc;
  margin-top: 5px;
  cursor: pointer;
  background: rgba(246, 247, 251, 1);
`;

export const Dropdown = styled.select`
  height: 40px;
  width: 200px;
  background-image: linear-gradient(to right, rgba(250, 250, 252, 1), rgba(255, 255, 255, 1));
`;

export const Input = styled.input`
  height: 35px;
  height: 34px;
  color: rgb(42, 53, 88);
`;

export const Button = styled.button`
 
`;

export const Action = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0 10px;
  background: ${({ remove }) => (remove ? 'rgba(253, 232, 234, 1)' : '#fff')};
  color: ${({ remove }) => (remove ? 'rgba(238, 32, 50, 1)' : '#000')};
`;

export const AddButton = styled.button`
  background-image: linear-gradient(to right, rgb(237 237 255), rgb(251 251 251));
  border: 0;
  height: 35px;
  box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
  cursor: pointer;
`;


export const ButtonTab = styled.button`
  height: 40px;
  width: 90px;
  border: 0;
  cursor: pointer;
  //   &:hover {
  //   color: ${({ button }) => (button === 'Equal' ? '#000' : '#fff')};
  //   background-color: ${({ button }) => (button === 'Equal' ? 'rgba(245, 246, 250, 1)' : '#fff')};
  //   transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;
  // }
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

export const Th = styled.th`
  color: rgba(151, 164, 200, 1);
  padding: 8px;
  font-size: 12px;
  &:first-child{
    background-image: linear-gradient(to right, rgba(169, 181, 210, 0.0001), rgba(112, 126, 167, 0.1345));
    border-right: 1px solid rgba(178, 187, 213, 1);
    text-align: left;
  } 
`;

export const Td = styled.td`
  text-align: center;
  padding: 8px;
  font-size: 14px;
  &:first-child{
    border-right: 1px solid rgba(178, 187, 213, 1);
    text-align: left;
    width: 300px;
    background-image: linear-gradient(to right, rgba(169, 181, 210, 0.0001), rgba(112, 126, 167, 0.1345));
  } 
`;

export const ExpandedRow = styled.div`
  padding: 0 30px 30px;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  justify-content: center;
`;

export const NameRow = styled.div`
  margin-top: 15px;
  display: flex;
  width: 100%;
  justify-content: flex-start;
`;

export const Col = styled.div`
  display: flex;
  flex-direction: column;
`;

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  width: 100%;
`;
export const ChannelRowContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid rgba(178, 187, 213, 0.5);
  border-right: 1px solid rgba(178, 187, 213, 0.5);
  border-left: 1px solid rgba(178, 187, 213, 0.5);
`;