import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Plus } from "lucide-react";

interface EmptyStateProps {
  onCreateTask: () => void;
}

export const EmptyState = ({ onCreateTask }: EmptyStateProps) => {
  return (
    <Card className="border-dashed border-2 border-muted-foreground/25">
      <CardContent className="flex flex-col items-center justify-center py-16 px-6 text-center">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mb-4">
          <CheckCircle2 className="w-8 h-8 text-muted-foreground" />
        </div>
        
        <h3 className="text-xl font-semibold mb-2">No tasks yet</h3>
        <p className="text-muted-foreground mb-6 max-w-sm">
          Get started by creating your first task. Stay organized and boost your productivity!
        </p>
        
        <Button onClick={onCreateTask} className="bg-primary hover:bg-primary/90">
          <Plus className="w-4 h-4 mr-2" />
          Create Your First Task
        </Button>
      </CardContent>
    </Card>
  );
};