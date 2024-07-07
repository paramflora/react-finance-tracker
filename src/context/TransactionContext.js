import React, {createContext, useCallback, useState} from "react";

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) =>{
    const [transactions, setTransactions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchTransactions  = useCallback(
        async()=>{
            setLoading(true);
            setError(null);
    
            try{

                //await new Promise((resolve) => setTimeout(resolve, 1000));
                //console.log("Fetching transactions...");
                const response = await fetch('http://localhost:5000/transactions');
                //console.log("Response received:", response);
                if(!response.ok){
                    throw new Error("Network response is not OK");
                }
                const data = await response.json();
                setTransactions(data);
            }
            catch(err){
                setError(err.message);
            }
            finally{
                setLoading(false);
            }
        }, []
    );

    const addTransaction = async(transaction) =>{
        setError(null);
        try{
            const response = await fetch('http://localhost:5000/transactions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transaction),
            });
            if(!response.ok){
                throw new Error("Network response is not OK");
            }
            const data = await response.json();
            setTransactions((prevTransactions) => [...prevTransactions,data]);
        }
        catch(err){
            setError(err.message);
        }
    };

    const filterTransactions  = (startDate, endDate) =>{
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        const filtered = transactions.filter((transaction) => {
            const transactionDate = new Date(transaction.date);
            if(start && end){
                return transactionDate >= start && transactionDate <= end;
            }
            else if(start){
                return transactionDate >= start;
            }
            else if(end){
                return transactionDate >= end;
            }
            return true;
        });

        //console.log("Filtered Transactions:", filtered);

        return filtered;
    }

    return(
        <TransactionContext.Provider value={{transactions, addTransaction, fetchTransactions, loading, error, filterTransactions}}>
            {children}
        </TransactionContext.Provider>
    )

}


