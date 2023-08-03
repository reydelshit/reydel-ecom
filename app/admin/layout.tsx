import SideBar from './components/SideBar';
import { Suspense } from 'react';
import Loading from './loading';

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
      name: 'Product Tracker',
      link: '/admin/tracker',
    },
    {
      name: 'Reviews & Ratings',
      link: '/admin/reviews-and-ratings',
    },
  ];

  return (
    <div className="flex">
      <SideBar links={sideBarLinks} />
      <Suspense fallback={<Loading />}> {children}</Suspense>
    </div>
  );
};

export default AdminLayout;
