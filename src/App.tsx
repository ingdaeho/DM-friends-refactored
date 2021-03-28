import loadable from "@loadable/component";
import { Route, Switch } from "react-router-dom";

const SignUp = loadable(() => import("@pages/SignUp"));
const LogIn = loadable(() => import("@pages/LogIn"));

const App = () => {
  return (
    <Switch>
      <Route path="/signup" component={SignUp}></Route>
      <Route path="/login" component={LogIn}></Route>
    </Switch>
  );
};

export default App;
