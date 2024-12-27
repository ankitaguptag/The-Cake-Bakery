import AdminNavbar from '../../components/AdminNavbar';
import { getServerSession } from 'next-auth';
import { authConfig } from '@/auth.config';
import { redirect } from 'next/navigation';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authConfig);
  console.log('Provided credentials:', session);
  if (!session) {
    redirect('/login'); // Redirect to login if no session
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <main className="p-4">{children}</main>
    </div>
  );
}
