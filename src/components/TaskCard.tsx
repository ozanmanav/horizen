import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, Edit, Trash2, Clock } from "lucide-react";
import { TaskCardProps } from "@/types/Task";
import { format } from "date-fns";

const priorityColors = {
  High: "bg-red-100 text-red-800 border-red-200 hover:bg-red-200",
  Medium: "bg-yellow-100 text-yellow-800 border-yellow-200 hover:bg-yellow-200", 
  Low: "bg-green-100 text-green-800 border-green-200 hover:bg-green-200"
};

const priorityDotColors = {
  High: "bg-red-500",
  Medium: "bg-yellow-500",
  Low: "bg-green-500"
};

export const TaskCard = ({ task, onEdit, onDelete, onToggleComplete }: TaskCardProps) => {
  const isOverdue = new Date() > task.dueDate && !task.isCompleted;
  
  return (
    <Card className={`transition-all duration-200 hover:shadow-md ${
      task.isCompleted ? 'opacity-75 bg-muted/30' : ''
    } ${isOverdue ? 'border-red-200 bg-red-50/30' : ''}`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            <Checkbox
              checked={task.isCompleted}
              onCheckedChange={() => onToggleComplete(task.id)}
              className="mt-1 flex-shrink-0"
              aria-label={`Mark task "${task.title}" as ${task.isCompleted ? 'incomplete' : 'complete'}`}
            />
            <div className="flex-1 min-w-0">
              <h3 className={`font-semibold text-lg leading-tight ${
                task.isCompleted ? 'line-through text-muted-foreground' : ''
              }`}>
                {task.title}
              </h3>
              {task.description && (
                <p className={`text-sm mt-1 ${
                  task.isCompleted ? 'line-through text-muted-foreground' : 'text-muted-foreground'
                }`}>
                  {task.description}
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-1">
            <div className={`w-3 h-3 rounded-full ${priorityDotColors[task.priority]}`} 
                 title={`${task.priority} priority`} />
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0 pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className={priorityColors[task.priority]}>
            {task.priority} Priority
          </Badge>
          
          <div className={`flex items-center gap-1 text-sm ${
            isOverdue ? 'text-red-600 font-medium' : 'text-muted-foreground'
          }`}>
            {isOverdue ? <Clock className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
            <span>
              {isOverdue ? 'Overdue: ' : 'Due: '}
              {format(task.dueDate, 'MMM d, yyyy')}
            </span>
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="pt-0 flex justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(task)}
          className="hover:bg-blue-50 hover:border-blue-200"
          aria-label={`Edit task "${task.title}"`}
        >
          <Edit className="w-4 h-4 mr-1" />
          Edit
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDelete(task.id)}
          className="hover:bg-red-50 hover:border-red-200 hover:text-red-600"
          aria-label={`Delete task "${task.title}"`}
        >
          <Trash2 className="w-4 h-4 mr-1" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};