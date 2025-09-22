import { useState, useCallback, useMemo } from 'react';
import { Task, TaskFormData } from '@/types/Task';
import { useLocalStorage } from './useLocalStorage';

export function useTasks() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [isLoading, setIsLoading] = useState(false);

  // Create a new task
  const createTask = useCallback(async (taskData: TaskFormData) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const newTask: Task = {
      id: crypto.randomUUID(),
      ...taskData,
      isCompleted: false,
      createdAt: new Date()
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    setIsLoading(false);
    
    return newTask;
  }, [setTasks]);

  // Update an existing task
  const updateTask = useCallback(async (id: string, taskData: TaskFormData) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id 
          ? { ...task, ...taskData }
          : task
      )
    );
    
    setIsLoading(false);
  }, [setTasks]);

  // Delete a task
  const deleteTask = useCallback((id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, [setTasks]);

  // Toggle task completion
  const toggleTaskComplete = useCallback((id: string) => {
    setTasks(prevTasks => 
      prevTasks.map(task => 
        task.id === id 
          ? { ...task, isCompleted: !task.isCompleted }
          : task
      )
    );
  }, [setTasks]);

  // Get task statistics
  const taskStats = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter(task => task.isCompleted).length;
    const pending = total - completed;
    const overdue = tasks.filter(task => 
      !task.isCompleted && new Date() > task.dueDate
    ).length;

    return { total, completed, pending, overdue };
  }, [tasks]);

  // Sort tasks by priority and due date
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) => {
      // Completed tasks go to bottom
      if (a.isCompleted !== b.isCompleted) {
        return a.isCompleted ? 1 : -1;
      }

      // Sort by priority (High > Medium > Low)
      const priorityOrder = { High: 3, Medium: 2, Low: 1 };
      const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
      if (priorityDiff !== 0) return priorityDiff;

      // Sort by due date (earliest first)
      return a.dueDate.getTime() - b.dueDate.getTime();
    });
  }, [tasks]);

  return {
    tasks: sortedTasks,
    taskStats,
    isLoading,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskComplete
  };
}