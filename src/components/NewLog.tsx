"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MdAddCircle } from "react-icons/md";
import { DatePicker } from "./DatePicker";
import { useLogStore } from "@/store";
import { useToast } from "@/hooks/use-toast";
import dayjs from "dayjs";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export function NewLog() {
  const { toast } = useToast();

  const log = useLogStore((state) => state.log);
  const setLog = useLogStore((state) => state.setLog);
  const setLogs = useLogStore((state) => state.setLogs);

  const supabase = createClientComponentClient();

  const closeDialog = () => {
    document.getElementById("close-btn")?.click();
  };

  const validateLog = () => {
    if (!log.date || !log.hour || log.hour === 0) {
      throw "Date or Hour cannot be empty";
    } else if (log.hour >= 24) {
      throw "Please enter a valid hour";
    }
  };

  const submitLog = async () => {
    try {
      validateLog();
      const date = log.date as Date;

      const { error } = await supabase
        .from("logs")
        .upsert({ ...log, date: dayjs(date).format("YYYY-MM-DD") })
        .select("*")
        .single();

      if (!error) {
        setLogs(log, dayjs(log.date).format("YYYY-MM-DD"));
        toast({
          title: "Successfully created log",
          description: `${log.hour} hours in ${date.toDateString()}`,
        });
        closeDialog();
      } else {
        toast({
          variant: "destructive",
          title: "Failed to create log",
          description: error.message,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to create log",
        description: error as string,
      });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="w-full sm:w-72 border-dashed border py-3 flex items-center justify-center rounded-md cursor-pointer hover:border-solid">
          <MdAddCircle className="text-2xl" />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Log</DialogTitle>
          <DialogDescription>
            {"Track your productivity for each day!!"}
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="date" className="text-right">
              Date
            </Label>
            <DatePicker />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="hour" className="text-right">
              Hour
            </Label>
            <Input
              id="hour"
              type="number"
              className="col-span-3"
              value={log.hour}
              onChange={(e) =>
                setLog({
                  ...log,
                  hour: parseInt(e.target.value),
                })
              }
            />
          </div>

          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="note" className="text-right">
              Note
            </Label>
            <Input
              id="note"
              type="text"
              className="col-span-3"
              value={log.note}
              onChange={(e) =>
                setLog({
                  ...log,
                  note: e.target.value,
                })
              }
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={submitLog}>
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
