import { trpc } from "./lib/trpc";

export default function GreetingPage() {
  const greetingResult = trpc.greetings.useQuery({ name: "John Something" });

  const randomNumberResult = trpc.random.useQuery();

  return (
    <div className="w-full h-full text-center py-20">
      <h4 className="text-xl">{greetingResult.data?.text}</h4>
      <h4 className="text-xl mt-10">
        A Random Number : {randomNumberResult.data?.number}
      </h4>
    </div>
  );
}
