import React, { useContext, useEffect, useState } from 'react'
import styles from './TransactionList.module.css';
import { TransactionContext  } from '../../context/TransactionContext';
import TransactionItems from '../TransactionItems/TransactionItems';
import Filter from '../Filter/Filter';
import Spinner from '../Spinner/Spinner';

const TransactionList = () => {

    const {transactions, fetchTransactions, loading, error} = useContext(TransactionContext);
    const [filteredTransactions, setFilteredTransactions] = useState([]);
    
    useEffect(() =>{
        fetchTransactions();
    }, [fetchTransactions]);

    const applyFilter = (startDate, endDate) => {
      const filtered = transactions.filter((transaction) => {
          const transactionDate = new Date(transaction.date);
          return transactionDate >= new Date(startDate) && transactionDate <= new Date(endDate);
      });
        setFilteredTransactions(filtered);
    };

  const resetFilter = () => {
    setFilteredTransactions([]);
  };

  const transactionsToDisplay = filteredTransactions.length > 0 ? filteredTransactions : transactions;

    if(loading) return <Spinner />;
    if(error) return <div>Error : {error}</div>;
    
  return (
    <div className={styles.add_transaction_wrapper}>
          <div className={styles.all_trans_heading}>
              <h2>Transactions</h2>
          </div>
          <Filter applyFilter={applyFilter} resetFilter={resetFilter}/>
          <div className={styles.trans_list_content}>              
              {transactionsToDisplay.map((transaction, index) => (
                <TransactionItems key={index} transaction={transaction}/>
              ))}
          </div>
      </div>
  )
}

export default TransactionList