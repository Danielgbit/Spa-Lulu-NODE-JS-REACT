import ExpenseCreateForm from './ExpenseCreateForm'
import { postCreateExpense } from "../../../../../services/ExpenseService";
import { useNavigate } from "react-router-dom";

const ExpenseCreateContainer = () => {

    const navigate = useNavigate();

    const createExpense = async (body) => {
        const res = await postCreateExpense(body);
        if(res?.status === 201) { navigate('/admin/expense') }
        if(res?.status === 400) { console.error(res.data.message); }
    };

  return <ExpenseCreateForm
            createExpense={createExpense}
        />
}

export default ExpenseCreateContainer