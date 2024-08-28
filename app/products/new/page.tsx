import { NotificationProvider } from "@/app/contexts";
import NewProductForm from "./NewProduct";

export default function Home(){
  return (
    <NotificationProvider>
      <NewProductForm />  
    </NotificationProvider>
  )
}