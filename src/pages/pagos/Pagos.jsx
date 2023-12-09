import TablaPagos from "../../components/TablaPagos";
import Dashboard from "../dashboard/Dashboard";

export default function Pagos() {
  return (
    <>
    <Dashboard />
    <div className="flex justify-center pt-10">
    <TablaPagos/>
    </div>
    
    </>
  )
}
