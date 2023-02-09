import React from 'react';
import logo from './logo.svg';
import { MapboxGl } from './components/MapboxGl';
import { PageHeader } from './components/PageHeader';
import './App.css';

function App() {
  return (
    <div className="App">
      <PageHeader
        title="ZHVI Explorer"
        icon="https://s.zillowstatic.com/pfs/static/z-logo-default.svg"
      />
      <MapboxGl/>
    </div>
  );
}

export default App;
