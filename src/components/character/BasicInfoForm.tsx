
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Control } from 'react-hook-form';
import { CharacterFormValues } from './types';

interface BasicInfoFormProps {
  control: Control<CharacterFormValues>;
}

const BasicInfoForm = ({ control }: BasicInfoFormProps) => {
  return (
    <div className="space-y-4">
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Character Name</FormLabel>
            <FormControl>
              <Input placeholder="Enter a unique character name" {...field} />
            </FormControl>
            <FormDescription>
              Names must be unique in the game world
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={control}
        name="bio"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Bio</FormLabel>
            <FormControl>
              <Textarea 
                placeholder="Enter a short bio for your character" 
                className="resize-none"
                {...field} 
              />
            </FormControl>
            <FormDescription>
              Optional background story for your character
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default BasicInfoForm;
