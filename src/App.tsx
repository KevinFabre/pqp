import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Movies from "./components/Movies";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Movies />
    </QueryClientProvider>
  );
}

export default App;
