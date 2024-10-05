import { Button } from "./ui/button";
import { FcSynchronize } from "react-icons/fc";

export default function () {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-1">
        <FcSynchronize className="text-xl" />
        <h1 className="font-bold">LogSync</h1>
      </div>
      <Button>Logout</Button>
    </div>
  );
}
