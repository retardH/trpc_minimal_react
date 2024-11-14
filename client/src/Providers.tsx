import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { FC, PropsWithChildren } from "react";
import { trpc } from "./lib/trpc";
import { httpBatchLink } from "@trpc/client";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const trpcClient = trpc.createClient({
  links: [
    httpBatchLink({
      url: "http://localhost:2022/trpc",
    }),
  ],
});
const Providers: FC<PropsWithChildren> = ({ children }) => {
  // const [queryClient] = useState(

  //   () =>
  //     new QueryClient({
  //       defaultOptions: {
  //         queries: {
  //           refetchOnWindowFocus: false,
  //         },
  //       },
  //     })
  // );
  // const [trpcClient] = useState(() =>
  //   trpc.createClient({
  //     links: [
  //       httpBatchLink({
  //         url: "http://localhost:2022/trpc",
  //       }),
  //     ],
  //   })
  // );
  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  );
};

export default Providers;
