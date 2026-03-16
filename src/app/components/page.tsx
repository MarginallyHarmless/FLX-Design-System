import Link from "next/link";
import { componentRegistry } from "@/lib/components-data/registry";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

const statusVariant: Record<string, "default" | "secondary" | "outline" | "destructive"> = {
  stable: "default",
  beta: "secondary",
  deprecated: "destructive",
  planned: "outline",
};

export default function ComponentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Components</h1>
        <p className="mt-2 text-muted-foreground">
          Browse all available design system components. Each page includes
          interactive previews, props documentation, usage guidelines, and
          accessibility information.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {componentRegistry.map((component) => (
          <Link
            key={component.slug}
            href={`/components/${component.slug}`}
            className="group"
          >
            <Card className="h-full transition-shadow group-hover:ring-2 group-hover:ring-primary/20">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{component.name}</CardTitle>
                  <Badge variant={statusVariant[component.status] ?? "outline"}>
                    {component.status}
                  </Badge>
                </div>
                <CardDescription>{component.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <span className="text-xs text-muted-foreground group-hover:text-primary">
                  View component &rarr;
                </span>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
