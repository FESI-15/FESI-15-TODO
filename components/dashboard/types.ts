export interface DashboardTask {
  id: number;
  title: string;
  done?: boolean;
  note?: boolean;
  link?: boolean;
  favorite?: boolean;
  active?: boolean;
}

export interface DashboardGoal {
  id: number;
  title: string;
  progress: number;
  todos: DashboardTask[];
  dones: DashboardTask[];
}
