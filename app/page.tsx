import { ListWorkspace } from '@/components/list-workspace';

export default async function HomePage({ searchParams }: { searchParams: Promise<{ template?: string }> }) {
  const params = await searchParams;
  return <ListWorkspace initialTemplateKey={params.template} />;
}
