import { authOptions } from '@/lib/AuthOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user?.role != 'ADMIN') {
    redirect('/dashboard');
  }

  //   console.log(session?.user?.role);

  //   ## possible features
  // add products
  // product tracker
  // categorized the products
  // product visibility
  // search products
  // user reviews and rating
  // bulk product actions

  return (
    <div>
      <h1>Admin Page</h1>
    </div>
  );
};

export default AdminPage;
