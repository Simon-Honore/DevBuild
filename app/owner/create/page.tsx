import {
  Layout,
  LayoutContent,
  LayoutHeader,
  LayoutTitle,
} from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { CourseForm } from "@/features/courses/owner/form/course/CourseForm";
import { getRequiredAuthSession } from "@/lib/auth";

export default async function CourseCreatePage() {
  await getRequiredAuthSession();

  return (
    <Layout>
      <LayoutHeader>
        <LayoutTitle className="uppercase">Créer un cours</LayoutTitle>
      </LayoutHeader>
      <LayoutContent>
        <Card className="flex-[2]">
          <CardContent className="mt-6">
            <CourseForm />
          </CardContent>
        </Card>
      </LayoutContent>
    </Layout>
  );
}
