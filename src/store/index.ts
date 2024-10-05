import { create } from "zustand";

type ILog = {
  note: string;
  hour: number;
  date: Date;
};

interface LogState {
  logs: {
    [key: string]: ILog;
  };
  log: ILog;
  setLog: (log: ILog) => void;
  setDate: (date: Date) => void;
  setLogs: (log: ILog, key: string) => void;
}

export const useLogStore = create<LogState>()((set) => ({
  log: {
    note: "",
    hour: 0,
    date: new Date(),
  },
  logs: {},
  setDate: (date: Date) => set((state) => ({ log: { ...state.log, date } })),
  setLog: (log: ILog) => set((state) => ({ log: { ...state.log, ...log } })),
  setLogs: (log: ILog, key: string) =>
    set((state) => ({ logs: { ...state.logs, [key]: log } })),
}));
