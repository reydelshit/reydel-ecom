import SideBar from './components/SideBar';
import { Suspense } from 'react';
import Loading from './loading';
import { Separator } from '@/components/ui/separator';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const sideBarLinks = [
    {
      name: 'Products',
      link: '/admin/products',
    },
    {
      name: 'Sales Tracker',
      link: '/admin/tracker',
    },
    {
      name: 'Reviews & Ratings',
      link: '/admin/reviews-and-ratings',
    },
  ];

  return (
    <div className="flex flex-col">
      <div className="space-y-0.5 p-4">
        <h2 className="text-2xl font-bold tracking-tight">Admin</h2>
        <p className="text-muted-foreground">Manage everything!.</p>
      </div>
      <Separator />

      <div className="flex">
        <SideBar links={sideBarLinks} />
        <Suspense fallback={<Loading />}> {children}</Suspense>
      </div>
    </div>
  );
};

export default AdminLayout;
