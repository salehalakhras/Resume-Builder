import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';


const ResumeDialog = ({ addResume }: { addResume: (name: string) => void }) => {

  const [newResumeName, setNewResumeName] = React.useState('');
    
    return (
      <Dialog>
        <DialogTrigger asChild>
          <Button className="w-full font-bold" >
            <Plus className="w-4 h-4 mr-2" /> New Resume
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Input
              placeholder="Resume Name"
              value={newResumeName}
              onChange={(e) => setNewResumeName(e.target.value)}
            />
            <Button
              onClick={() => {
                if (newResumeName) {
                  addResume(newResumeName);
                  setNewResumeName('');
                }
              }}
              className="w-full"
            >
              Create
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  export default ResumeDialog;