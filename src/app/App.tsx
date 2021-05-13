import loadable from "@loadable/component";
import { Route, Switch } from "react-router-dom";

const SignUp = loadable(() => import("@features/users/SignUp"));
const LogIn = loadable(() => import("@features/users/LogIn"));
const Feed = loadable(() => import("@features/feed"));
const Cart = loadable(() => import("@features/cart"));

const App = () => {
  return (
    <Switch>
      <Route path="/signup" component={SignUp} />
      <Route path="/login" component={LogIn} />
      <Route path="/users/:userId/cart" component={Cart} />
      <Route path="/" component={Feed} />
    </Switch>
  );
};

export default App;
