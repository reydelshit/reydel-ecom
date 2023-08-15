import { authOptions } from '@/lib/AuthOptions';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const AdminPage = async () => {
  const session = await getServerSession(authOptions);

  if (session?.user?.role != 'ADMIN') {
    redirect('/');
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
      {/* <Overview /> */}
      <h1>rerere</h1>
    </div>
  );
};

export default AdminPage;
