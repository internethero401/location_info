import { useState } from "react";
import Location from "./components/Location";
import Login from "./components/Login";

function App() {
  // trueならlogin画面, falseならLocataion画面
  const [flag, setFlag] = useState(true)
  // nameにしてるがemail
  const [loginEmail, setLoginEmail] = useState('')

  return (
    <div>
      {flag? <Login setFlag={setFlag} loginEmail={loginEmail} setLoginEmail={setLoginEmail} /> : <Location setFlag={setFlag} loginEmail={loginEmail} setLoginEmail={setLoginEmail} />}
    </div>
  );
}

export default App;