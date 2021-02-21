import './App.css';
import Form from './components/Form';
import Card from './components/Card';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Card>
          <Form api='/count-hours' />
        </Card>
      </header>
    </div>
  );
}

export default App;
