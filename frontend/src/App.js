import LoginPage from "./login/LoginPage";
import HomePage from "./home/HomePage";

export default function App() {
  const isLoggedIn = () => true;

  return <>{isLoggedIn() ? <HomePage></HomePage> : <LoginPage></LoginPage>}</>;
}
