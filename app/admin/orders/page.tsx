import { AdminLayout } from '@/components/admin/AdminLayout';
import { OrderTable } from '@/components/admin/OrderTable';
import { PaymentViewer } from '@/components/admin/PaymentViewer';

export default function AdminOrdersPage() {
  return (
    <AdminLayout>
      <h1 className="font-heading text-4xl font-bold text-choc-800">Orders</h1>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1fr_360px]">
        <OrderTable />
        <PaymentViewer />
      </div>
    </AdminLayout>
  );
}
