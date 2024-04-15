import React, { useEffect, useState } from "react";
import ExpenseAdmin from "./ExpenseAdmin";
import { getExpenses, deleteExpense } from "../../../services/ExpenseService";
import { Spinner } from "@chakra-ui/react";

const ExpenseAdminContainer = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [expenses, setExpenses] = useState([] || null);

  const loadExpenses = async () => {
    const res = await getExpenses();
    if (res?.status === 200) {
      setExpenses(res.data.expenses);
    }
    setIsLoading(false);
  };

  const onClickDestroy = async (id) => {
    const res = await deleteExpense(id);
    if (res?.status === 200) {
      loadExpenses();
    }
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="spinner-container">
          <Spinner
            thickness="4px"
            speed="350ms"
            emptyColor="gray.200"
            color="violet.200"
            size="xl"
          />
        </div>
      ) : (
        <ExpenseAdmin expenses={expenses} onClickDestroy={onClickDestroy} />
      )}
    </>
  );
};

export default ExpenseAdminContainer;
