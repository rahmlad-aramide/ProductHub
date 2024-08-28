import { NotificationProvider } from "@/app/contexts";
import EditProductForm from "./EditProduct";

export default function Home({ params }: { params: { id: string } }) {
  return (
    <NotificationProvider>
      <EditProductForm id={params.id} />
    </NotificationProvider>
  );
}
