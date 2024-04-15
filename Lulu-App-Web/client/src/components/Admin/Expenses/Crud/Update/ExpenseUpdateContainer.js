import ExpenseUpdateForm from './ExpenseUpdateForm'
import { putUpdateExpense, getExpense } from "../../../../../services/ExpenseService";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { Spinner } from '@chakra-ui/react';

const ExpenseUpdateContainer = () => {

  const navigate = useNavigate();
  const { id } = useParams();
  const [ expense, setExpense ] = useState([] || null);
  const [ isLoading, setIsloading ] = useState(true);


  const loadExpense = async () => {
      if (id.toString().length > 0) {
          const res = await getExpense(id);
          if(res?.status === 200) { setExpense(res.data.expenseDetail); };
          setIsloading(false);
      }else {
          setIsloading(true);
      }
  };

  useEffect(() => {
    loadExpense();
  }, []);

  const updateExpense = async (body) => {
    if (id.toString().length > 0) {
      const res = await putUpdateExpense(id, body);
      if(res?.status === 200) { navigate('/admin/expense') }
      if(res?.status === 400) { console.error(res.data.message); }
    };
  };

  return (
      <>
        {isLoading ? ( <Spinner/> ) : ( 
          <ExpenseUpdateForm
              updateExpense={updateExpense}
              expense={expense}
          />
        )}
      </>
  )
}

export default ExpenseUpdateContainer
