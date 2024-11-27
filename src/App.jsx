import Navbar from './Components/Navbar'
import Home from './Pages/Home/Home'
import ErrorBoundary from './Components/ErrorBoundary'
import { useDispatch, useSelector } from 'react-redux'
import RegistrationForm from './Pages/Registration/index';
import LoginForm from './Pages/Login/index';
import app from "./Firebase/firebase";
import { getDatabase, ref, get } from "firebase/database";
import { setUserData } from "./Redux/slice";
import { useEffect } from 'react';

function App() {
  const { page: current_page, userData } = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    fetchUserData();
  }, [])

  const fetchUserData = async () => {
    const db = getDatabase(app);
    const tableRef = ref(db, "users");
    const snapshot = await get(tableRef)
    if (snapshot.exists()) {
      const initialData = snapshot.val();
      const keys = Object.keys(initialData);
      const finalData = keys.map(record_id => {
        return { ...initialData[record_id], id: record_id }
      })
      dispatch(setUserData(finalData));
    } else {
      message.error("Error Fetching Data")
    }
  }
  return (
    <ErrorBoundary>
      <Navbar />
      {current_page === "register" ? <RegistrationForm />
        : current_page === "login" ? <LoginForm />
          : <Home />
      }
    </ErrorBoundary>
  )
}

export default App
