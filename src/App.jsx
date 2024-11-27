import Navbar from './Components/Navbar'
import Home from './Pages/Home/Home'
import RegistrationForm from './Pages/Registration/index';
import LoginForm from './Pages/Login/index';

function App() {
  const { page: current_page } = useSelector(state => state);

  return (
    <>
      <Navbar />
      {current_page === "register" ? <RegistrationForm />
        : current_page === "login" ? <LoginForm />
          : <Home />
      }
    </>
  )
}

export default App
