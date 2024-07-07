import React from 'react'
import styles from './TransactionItems.module.css';

const TransactionItems = ({transaction }) => {

  if (!transaction) {
    return null; 
  }

  return (
    <ul>
        <li>
            <div className={styles.list_trans}>            
                <div>
                  <p>
                      {transaction.description} 
                      <span className={styles.list_trans_category}>{transaction.category}</span>                      
                  </p>
                  <span className={styles.trans_date}>{transaction.date} </span>
                </div>
                <span className={`${styles.list_trans_amt} ${transaction.type === 'Income' ? styles.credit : styles.debit}`}>
                  {transaction.type === 'Income' ? '+' : '-'} ${Math.abs(Math.round(transaction.amount))}
                </span>                
            </div>
        </li>
    </ul>
  )
}

export default TransactionItems