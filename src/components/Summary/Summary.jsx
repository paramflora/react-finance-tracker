import React, { useContext }  from 'react'
import styles from './Summary.module.css';
import { TransactionContext  } from '../../context/TransactionContext';

const Summary = () => {

    const { transactions } = useContext(TransactionContext);

    //console.log(transactions);

    const income = transactions.filter(transaction => transaction.type === 'Income').reduce((acc, transaction) => acc + transaction.amount, 0);
    const expense = transactions.filter(transaction => transaction.type === 'Expense').reduce((acc, transaction) => acc + transaction.amount, 0);

    const balance = income - expense;

  return (
      <div className={styles.card_wrapper}>
          <div className={styles.row}>
              <div className={styles.col_md_4}>
                  <div className={styles.card}>
                      <div className={styles.card_content}>
                          <h2>Balance</h2>
                          <p>${Math.round(balance)}</p>
                      </div>
                  </div>
              </div>
      
              <div className={styles.col_md_4}>
                  <div className={styles.card}>
                      <div className={styles.card_content}>
                          <h2>Income</h2>
                          <p>+ ${Math.round(income)}</p>
                      </div>
                  </div>
              </div>

              <div className={styles.col_md_4}>
                  <div className={styles.card}>
                      <div className={styles.card_content}>
                          <h2>Expense</h2>
                          <p>- ${Math.round(expense)}</p>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Summary