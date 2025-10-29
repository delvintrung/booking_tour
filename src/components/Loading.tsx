import { Spinner } from "./ui/spinner";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Spinner className="size-8" />
    </div>
  );
};

export default Loading;
