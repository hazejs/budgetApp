import React, { useEffect, useState } from 'react';
import { Action, AddButton, BudgetBreakdown, ButtonContainer, ButtonTab, ChannelRow, ChannelRowContainer, Col, Container, Content, DataInputs, Description1, Description2, Dots, Dropdown, ExpandedRow, FlexItem, FlexItemLabel, GridContainer, H1, H3, Input, NameRow, PopUp, Row, Tab, Table, Tabs, Td, Th, UpperContainer, UpperWrapper } from './styles';
import { FaArrowRight } from "react-icons/fa6";
import { DESCRIPTION1, DESCRIPTION2, MAIN_TITLE, SUBTITLE } from './consts';


const App = () => {
  const [activeTab, setActiveTab] = useState('budget');
  const [channels, setChannels] = useState([]);

  const handleArrowClick = (index) => {
    toggleExpand(index);
  };

  const getArrowStyle = (bool) => {
    return {
      left: 20,
      position: 'absolute',
      top: '50%',
      bottom: '50%',
      transform: `translate(-50%, -50%) ${bool ? 'rotate(90deg)' : ''}`,
      transition: 'transform 0.5s ease',
    }
  }

  useEffect(() => {
    const storedChannels = localStorage.getItem('channels');
    if (storedChannels) {
      setChannels(JSON.parse(storedChannels));
    } else {
      const defaultChannels = [
        {
          name: 'New Channel',
          baselineBudget: 0,
          frequency: 'Monthly',
          allocation: 'Equal',
          expanded: true,
          monthlyBudget: Array(12).fill(0),
        },
      ];
      setChannels(defaultChannels);
      localStorage.setItem('channels', JSON.stringify(defaultChannels));
    }
  }, []);

  const updateLocalStorage = channels => {
    localStorage.setItem('channels', JSON.stringify(channels));
  };

  const toggleTab = tab => {
    setActiveTab(tab);
  };

  const addChannel = () => {
    const newChannels = channels.map((channel, i) => ({
      ...channel,
      expanded: false,
    }));
    
    const newChannel = {
      name: 'New Channel',
      baselineBudget: 0,
      frequency: 'Monthly',
      allocation: 'Equal',
      expanded: true,
      monthlyBudget: Array(12).fill(0),
    };
    const updatedChannels = [...newChannels, newChannel];
    setChannels(updatedChannels);
    updateLocalStorage(updatedChannels);
  };

  const toggleExpand = index => {
    const updatedChannels = channels.map((channel, i) => ({
      ...channel,
      expanded: i === index ? !channel.expanded : false,
    }));
    setChannels(updatedChannels);
    updateLocalStorage(updatedChannels);
  };

  const editChannelName = (index, newName) => {
    const updatedChannels = [...channels];
    updatedChannels[index].name = newName;
    setChannels(updatedChannels);
    updateLocalStorage(updatedChannels);
  };

  const removeChannel = index => {
    const updatedChannels = [...channels];
    updatedChannels.splice(index, 1);
    setChannels(updatedChannels);
    updateLocalStorage(updatedChannels);
  };

  const handleChange = (index, field, value) => {
   
    const updatedChannels = [...channels];
    updatedChannels[index][field] = value;

    if (field === 'baselineBudget') {
      if (updatedChannels[index].allocation === 'Equal') {
        if (updatedChannels[index].frequency === 'Annually') {
          const annualBudget = updatedChannels[index].baselineBudget;
          updatedChannels[index].monthlyBudget = Array(12).fill(0);
          updatedChannels[index].monthlyBudget[0] = annualBudget;
        } else if (updatedChannels[index].frequency === 'Quarterly') {
          const quarterlyBudget = updatedChannels[index].baselineBudget;
          updatedChannels[index].monthlyBudget = Array(12).fill(0);
          for (let i = 0; i < 12; i += 3) {
            updatedChannels[index].monthlyBudget[i] = quarterlyBudget / 4;
          }
        } else {
          const baselineBudget = updatedChannels[index].baselineBudget;
          updatedChannels[index].monthlyBudget = Array(12).fill(baselineBudget / 12);
        }
      } else {
        const totalBudget = updatedChannels[index].monthlyBudget.reduce((acc, curr) => acc + Number(curr), 0);
        updatedChannels[index].baselineBudget = totalBudget;
      }
    }

    if (field === 'frequency') {
      if (value === 'Annually') {
        const annualBudget = updatedChannels[index].baselineBudget;
        updatedChannels[index].monthlyBudget = Array(12).fill(0);
        updatedChannels[index].monthlyBudget[0] = annualBudget;
      } else if (value === 'Quarterly') {
        const quarterlyBudget = updatedChannels[index].baselineBudget;
        updatedChannels[index].monthlyBudget = Array(12).fill(0);
        for (let i = 0; i < 12; i += 3) {
          updatedChannels[index].monthlyBudget[i] = quarterlyBudget / 4;
        }
      } else {
        const baselineBudget = updatedChannels[index].baselineBudget;
        updatedChannels[index].monthlyBudget = Array(12).fill(baselineBudget / 12);
      }
    }

    setChannels(updatedChannels);
    updateLocalStorage(updatedChannels);
  };

  const handleMonthlyBudgetChange = (channelIndex, monthIndex, value) => {
    const updatedChannels = [...channels];
    const baselineBudget = updatedChannels[channelIndex].baselineBudget;
    const totalBudget = updatedChannels[channelIndex].monthlyBudget.reduce((acc, curr, index) => {
      if (index !== monthIndex) {
        acc += Number(curr);
      }
      return acc;
    }, 0);

    if (!isNaN(value) && value !== '') {
      if (baselineBudget - totalBudget >= Number(value)) {
        updatedChannels[channelIndex].monthlyBudget[monthIndex] = value;
      } else {
        updatedChannels[channelIndex].monthlyBudget[monthIndex] = baselineBudget - totalBudget;
      }
    }

    setChannels(updatedChannels);
    updateLocalStorage(updatedChannels);
  };

  const handleEditClicked = (index) => {
    const updatedChannels = channels.map((channel, i) => ({
      ...channel,
      isPopupOpen: i === index ? !channel.isPopupOpen : false,
      expanded: i === index ? !channel.expanded : false,
    }));
    setChannels(updatedChannels);
    updateLocalStorage(updatedChannels);
  }

  const handleRemoveClicked = (index) => {
    const updatedChannels = channels.map((channel, i) => ({
      ...channel,
      isPopupOpen: i === index ? !channel.isPopupOpen : false,
    }));
    setChannels(updatedChannels);
    updateLocalStorage(updatedChannels);
    removeChannel(index)
  }
  

  return (
    <>
      <Container>
        <UpperWrapper>
          <UpperContainer>
            <H1>{MAIN_TITLE}</H1>
            <H3>{SUBTITLE}</H3>
            <Description1>{DESCRIPTION1}</Description1>
            <Description2>{DESCRIPTION2}</Description2>
            <Tabs>
              <Tab style={{marginRight: 15}} active={activeTab === 'budget'} onClick={() => toggleTab('budget')}>
                Tab 1
              </Tab>
              <Tab active={activeTab === 'current'} onClick={() => toggleTab('current')}>
                Tab 2
              </Tab>
            </Tabs>
          </UpperContainer>

          <ButtonContainer>
            <AddButton onClick={addChannel}>+ Add Channel</AddButton>
          </ButtonContainer>
        </UpperWrapper>
        
        <Content>
          {activeTab === 'budget' && (
            <>
              {channels.map((channel, index) => (
                <ChannelRowContainer key={index} active={channel.expanded}>
                  <ChannelRow expanded={channel.expanded}>
                    <FaArrowRight onClick={() => {handleArrowClick(index)}} style={getArrowStyle(channel.expanded)}/>
                    <div style={{width: '50%', marginLeft: 30}} onClick={() => toggleExpand(index)}>
                      {channel.name}
                    </div>
                    <Dots onClick={() => {
                        const updatedChannels = channels.map((channel, i) => ({
                          ...channel,
                          isPopupOpen: i === index ? !channel.isPopupOpen : false,
                        }));
                        setChannels(updatedChannels);
                        updateLocalStorage(updatedChannels);
                    }}>
                      ... 
                    </Dots>
                    {channel.isPopupOpen && 
                      <PopUp>
                        <Action onClick={() => {handleEditClicked(index)}}>Edit</Action>
                        <Action remove={true} onClick={() => {handleRemoveClicked(index)}}>Remove</Action>
                      </PopUp>
                    }
                    
                  </ChannelRow>
                  {channel.expanded && (
                    <ExpandedRow>
                      <NameRow>
                        <Col>
                          <FlexItem>
                            <FlexItemLabel>Name:</FlexItemLabel>
                            <Input
                              type="text"
                              value={channel.name}
                              onChange={e => editChannelName(index, e.target.value)}
                            />
                          </FlexItem>
                        </Col>
                      </NameRow>
                      <DataInputs>
                        <FlexItem>
                          <FlexItemLabel>Frequency:</FlexItemLabel>
                          <Dropdown
                            value={channel.frequency}
                            onChange={e => handleChange(index, 'frequency', e.target.value)}
                          >
                            <option value="Annually">Annually</option>
                            <option value="Monthly">Monthly</option>
                            <option value="Quarterly">Quarterly</option>
                          </Dropdown>
                        </FlexItem>
                        <FlexItem>
                          <FlexItemLabel>Baseline Budget:</FlexItemLabel>
                          <Input
                            type="number"
                            value={channel.baselineBudget}
                            onChange={e => handleChange(index, 'baselineBudget', e.target.value)}
                            style={{ width: 190 }}
                            step="0.01"
                          />
                        </FlexItem>
                        <FlexItem>
                          <FlexItemLabel>Allocation:</FlexItemLabel>
                          <div>
                            <ButtonTab
                              button={'Equal'}
                              onClick={() => handleChange(index, 'allocation', 'Equal')}
                              disabled={channel.allocation === 'Equal'}
                            >
                              Equal
                            </ButtonTab>
                            <ButtonTab
                              button={'Manual'}
                              onClick={() => handleChange(index, 'allocation', 'Manual')}
                              disabled={channel.allocation === 'Manual'}
                            >
                              Manual
                            </ButtonTab>
                          </div>
                        </FlexItem>
                      </DataInputs>
                      <Row>
                        <BudgetBreakdown>
                          <H1>Budget Breakdown</H1>
                          <Description1 marginBotton={false}>By default your budget wii equally devided throughout the year. You can manually change the budget allocation, either now or later.</Description1>
                          {channel.allocation === 'Manual' && (
                            <GridContainer>
                              {channel.monthlyBudget.map((budget, monthIndex) => (
                                <Col key={monthIndex}>
                                  <label>
                                    {new Date().toLocaleString('default', { month: 'short' }).toUpperCase()}{' '}
                                    {new Date().getFullYear()}
                                  </label>
                                  <Input
                                    type="number"
                                    value={budget}
                                    onChange={e => handleMonthlyBudgetChange(index, monthIndex, e.target.value)}
                                    style={{ color: '#2A3558' }}
                                    step="0.01"
                                  />
                                </Col>
                              ))}
                            </GridContainer>
                          )}
                          {channel.allocation === 'Equal' && (
                            <GridContainer>
                              {channel.monthlyBudget.map((budget, monthIndex) => (
                                <Col key={monthIndex}>
                                  <label>
                                    {new Date(new Date().getFullYear(), monthIndex, 1).toLocaleString('default', {
                                      month: 'short',
                                    })}
                                  </label>
                                  <Input
                                    type="number"
                                    value={budget}
                                    disabled
                                    style={{ color: '#99A4C2' }}
                                    step="0.01"
                                  />
                                </Col>
                              ))}
                            </GridContainer>
                          )}
                        </BudgetBreakdown>
                        
                      </Row>
                    </ExpandedRow>
                  )}
                </ChannelRowContainer>
              ))}
            </>
          )}
          {activeTab === 'current' && (
            <>
              <h2>Current Year View</h2>
              <Table>
                <thead>
                  <tr>
                    <Th>Channel</Th>
                    {Array.from({ length: 12 }).map((_, index) => (
                      <Th key={index}>
                        {new Date(new Date().getFullYear(), index, 1).toLocaleString('default', { month: 'short' })}
                      </Th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {channels.map((channel, index) => (
                    <tr key={index}>
                      <Td>{channel.name}</Td>
                        {channel.monthlyBudget.map((budget, monthIndex) => (
                      <Td key={monthIndex}>{budget}</Td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Content>
      </Container>
    </>
  );
};

export default App;
