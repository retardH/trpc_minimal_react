import { trpc } from "./lib/trpc";

export default function Greeting() {
  const { data } = trpc.greeting.useQuery();
  return <div>Greeting {JSON.stringify(data)}</div>;
}
