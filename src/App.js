import AddTransaction from './components/AddTransaction/AddTransaction';
import CategoryBreakdown from './components/CategoryBreakdown/CategoryBreakdown';
import Summary from './components/Summary/Summary';
import TransactionList from './components/TransactionList/TransactionList';
import { TransactionProvider } from './context/TransactionContext';

function App() {
  return (
    <TransactionProvider>
      <div className="container">
          <div className="heading_wrapper">
              <h2 className="heading_title">
                  Finance Tracker
              </h2>
          </div>
          <Summary/>
          <AddTransaction/>
          <TransactionList/>
          <CategoryBreakdown/>
      </div>
    </TransactionProvider>
  );
}

export default App;
