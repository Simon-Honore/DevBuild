"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Textarea } from "@/components/ui/textarea";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createCourseAction, editCourseAction } from "./course.action";
import { CourseFormSchema } from "./course.schema";

export type CourseFormProps = {
  defaultValue?: CourseFormSchema & {
    id: string;
  };
};

export const COURSE_STATE = ["DRAFT", "PUBLISHED"] as const;

export const CourseForm = ({ defaultValue }: CourseFormProps) => {
  const form = useZodForm({
    schema: CourseFormSchema,
    defaultValues: defaultValue,
  });
  const router = useRouter();

  return (
    <Form
      form={form}
      className="flex flex-col gap-4"
      onSubmit={async (values) => {
        const { data, serverError } = defaultValue?.id
          ? await editCourseAction({
              courseId: defaultValue.id,
              data: values,
            })
          : await createCourseAction(values);

        if (data) {
          toast.success(data.message);
          router.push(`/writing-space/my-courses/${data.course.id}`);
          router.refresh();
          return;
        }

        toast.error("Une erreur est survenue", {
          description: serverError,
        });
        return;
      }}
    >
      <FormField
        control={form.control}
        name="image"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Image</FormLabel>
            <FormControl>
              <Input placeholder="https://googleimage.com" {...field} />
            </FormControl>
            <FormDescription>
              Hébergement et utilisation d&apos;une image. Vous pouvez{" "}
              <Link href="https://imgur.com">Imgur</Link> pour héberger votre
              image.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
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
        name="presentation"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Presentation</FormLabel>
            <FormControl>
              <Textarea placeholder="## Some title" {...field} />
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
                {COURSE_STATE.map((state) => (
                  <SelectItem value={state} className="capitalize" key={state}>
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
