import { trpc } from "./lib/trpc";

export default function RandomNumber() {
  const { data } = trpc.random.useQuery();
  return <div>RandomNumber : {data?.number}</div>;
}
