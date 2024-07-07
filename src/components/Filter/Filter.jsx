import React, { useState } from 'react'
import styles from './Filter.module.css';

const Filter = ({applyFilter, resetFilter }) => {

  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilter = () => {
    applyFilter(startDate, endDate);
  };

  const handleResetFilter = () => {
      setStartDate('');
      setEndDate('');
      resetFilter();
  };

  return (
    <div className={styles.filter_wrapper}>
          <div className={styles.row}>
              <div className={styles.col_md_6}>
                  <div className={styles.form_group}>
                      <label>From</label>
                      <input type="date" 
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                  </div>                        
              </div>
              <div className={styles.col_md_6}>
                  <div className={styles.form_group}>
                      <label>To</label>
                      <input type="date" 
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                      />
                  </div>                        
              </div>
              <div className={styles.col_md_12}>
                <div className={`${styles.form_group} ${styles.text_center}`}>
                      <button className={styles.btn} onClick={handleFilter}>Filter</button>
                      <button className={`${styles.btn} ${styles.filter_btn}`} onClick={handleResetFilter}>Reset Filter</button>
                  </div>
              </div>
          </div>
      </div>
  )
}

export default Filter