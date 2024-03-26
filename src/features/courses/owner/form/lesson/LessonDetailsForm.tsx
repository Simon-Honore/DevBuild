"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useZodForm,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { lessonActionEditDetails } from "./lesson.action";
import { LESSON_STATE, LessonDetailSchema } from "./lesson.schema";

export type LessonDetailFormProps = {
  defaultValue: LessonDetailSchema & {
    id: string;
  };
};

export const LessonDetail = ({ defaultValue }: LessonDetailFormProps) => {
  const form = useZodForm({
    schema: LessonDetailSchema,
    defaultValues: defaultValue,
  });
  const router = useRouter();

  return (
    <Form
      form={form}
      className="flex flex-col gap-4"
      onSubmit={async (values) => {
        const { data, serverError } = await lessonActionEditDetails({
          lessonId: defaultValue.id,
          data: values,
        });

        if (data) {
          toast.success(data.message);
          router.push(`/writing-space/my-courses/${data.lesson.courseId}`);
          router.refresh();
          return;
        }

        toast.error("Some error occurred", {
          description: serverError,
        });
        return;
      }}
    >
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Nom</FormLabel>
            <FormControl>
              <Input placeholder="NextReact" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="state"
        render={({ field }) => (
          <FormItem>
            <FormLabel>État</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionner un état" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {LESSON_STATE.map((state) => (
                  <SelectItem value={state} className="capitalize " key={state}>
                    {state === "DRAFT" ? "Brouillon" : "Publié"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Submit</Button>
    </Form>
  );
};
