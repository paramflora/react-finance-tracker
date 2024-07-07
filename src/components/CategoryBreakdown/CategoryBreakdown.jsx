import React, { useContext, useMemo } from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { TransactionContext } from '../../context/TransactionContext';
import styles from './CategoryBreakdown.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryBreakdown = () => {
    const { transactions } = useContext(TransactionContext);

    const expenseData = useMemo(() => {
        const categoryTotals = transactions.reduce((acc, transaction) => {
            if (transaction.type === 'Expense') {
                acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
            }
            return acc;
        }, {});

        const labels = Object.keys(categoryTotals);
        const data = Object.values(categoryTotals);

        return {
            labels,
            datasets: [
                {
                    label: ' $',
                    data,
                    backgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#FF9F40',
                        '#4BC0C0',
                        '#9966FF',
                        '#C9CBCF',
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB',
                        '#FFCE56',
                        '#FF9F40',
                        '#4BC0C0',
                        '#9966FF',
                        '#C9CBCF',
                    ],
                },
            ],
        };
    }, [transactions]);


    return (
        <div className={styles.category_breakdown_wrapper}>
            <h2>Expense Breakdown by Categories</h2>
            <Pie data={expenseData} />
        </div>
    );
};

export default CategoryBreakdown;
