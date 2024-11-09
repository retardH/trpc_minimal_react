import Greeting from "./Greeting";
import RandomNumber from "./RandomNumber";
import Providers from "./Providers";
import Posts from "./Posts";

export default function App() {
  return (
    <Providers>
      <Greeting />
      <RandomNumber />
      <Posts />
    </Providers>
  );
}
