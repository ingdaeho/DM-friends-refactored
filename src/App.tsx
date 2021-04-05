import loadable from "@loadable/component";
import { Route, Switch } from "react-router-dom";

const SignUp = loadable(() => import("@pages/SignUp"));
const LogIn = loadable(() => import("@pages/LogIn"));
const Feed = loadable(() => import("@pages/Feed"));
const Cart = loadable(() => import("@pages/Cart"));

const App = () => {
  return (
    <Switch>
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={LogIn} />
      <Route path="/:userId/cart" component={Cart} />
      <Route path="/" component={Feed} />
    </Switch>
  );
};

export default App;
