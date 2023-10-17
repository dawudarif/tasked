import LeftPanel from './Panels/LeftPanel/LeftPanel';
import MainPanel from './Panels/MainPanel';
import { useState } from 'react';

const HomeWrapper = () => {
  const [selected, setSelected] = useState('dashboard');

  const handleSelect = (name: string) => {
    setSelected(name);
  };

  return (
    <>
      <LeftPanel setSelected={handleSelect} selected={selected} />
      <MainPanel selected={selected} />
    </>
  );
};

export default HomeWrapper;
