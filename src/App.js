import { Banner } from './components/Banner'
import './components/LoginForm'
import { LoginForm } from './components/LoginForm'
import { StatusBox } from './components/StatusBox'

function App() {
  let state = {
    authUser:localStorage.getItem("username"),
    authPass:localStorage.getItem("postingKey"),
    ipfs: null,
    client: null,
  }

  return (
    <div className="App">
      <Banner/>
      <StatusBox/>
      <LoginForm state={state}/>
    </div>
  );
}

export default App;
