export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: 'High' | 'Medium' | 'Low';
  isCompleted: boolean;
  dueDate: Date;
  createdAt: Date;
}

export type Priority = 'High' | 'Medium' | 'Low';

export type TaskFormData = {
  title: string;
  description: string;
  priority: Priority;
  dueDate: Date;
};

export interface TaskCardProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

export interface TaskFormProps {
  task?: Task;
  onSubmit: (taskData: TaskFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}