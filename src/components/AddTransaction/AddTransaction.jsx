import React, {useContext, useState} from 'react'
import styles from './AddTransaction.module.css';
import { TransactionContext } from '../../context/TransactionContext';

const AddTransaction = () => {
    const { addTransaction } = useContext(TransactionContext);
    const[description, setDescription] = useState('');
    const[amount, setAmount] = useState('');
    const[type, setType] = useState('Income');
    const[category, setCategory] = useState('');

    const categoriesConfig = {
        Income: ['Salary', 'Bonus', 'Gift','Other'],
        Expense: ['Shopping', 'Utilities', 'Entertainment','Transport', 'Other'],
    }

    const handleSubmit = (e) =>{
        e.preventDefault();
        if(description && amount && category && type){
            addTransaction({
                id: Math.floor(Math.random() * 1000),
                type,
                amount: parseFloat(amount),
                category,
                date: new Date().toISOString().slice(0, 10),
                description,                 
            });
            
            setDescription('');
            setAmount('');
            setCategory('');
        }
        else {
            console.error('Category is required.'); // Log an error if category is empty
        }
    }

    return (
    <div className={styles.add_transaction_wrapper}>
        <div className={styles.form_title}>
            <h2>Add Transaction</h2>
        </div>
        <form className={styles.row} onSubmit={handleSubmit}>
            <div className={styles.col_md_6}>
                <div className={styles.form_group}>
                    <label>Description</label>
                    <input type="text" 
                        value={description} 
                        onChange={(e) => setDescription(e.target.value)} 
                        required
                    />
                </div>
            </div>
            <div className={styles.col_md_6}>
                <div className={styles.form_group}>
                    <label>Type</label>
                    <select
                        value={type} 
                        onChange={(e) => {setType(e.target.value); setCategory('');}}                         
                    >
                        <option>Income</option>
                        <option>Expense</option>
                    </select>
                </div>
            </div>
            <div className={styles.col_md_6}>
                <div className={styles.form_group}>
                    <label>Category</label>
                    <select
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)} 
                        required={type !== ''}                      
                    >
                        <option value="">Select</option>
                    {
                        categoriesConfig[type].map((catVal) =>(
                            <option key={catVal} value={catVal}>{catVal}</option>
                        ))
                    }
                    </select>
                </div>
            </div>
            <div className={styles.col_md_6}>
                <div className={styles.form_group}>
                    <label>Amount</label>
                    <input type="number" 
                        value={amount} 
                        onChange={(e) => setAmount(e.target.value)} 
                        required
                    />
                </div>
            </div>            
            <div className={styles.col_md_12}>
              <div className={`${styles.form_group} ${styles.text_center}`}>
                    <button className={styles.btn} type='submit'>Add</button>
                </div>
            </div>
          </form>
      </div>
  )
}

export default AddTransaction