import { Metadata } from 'next'
import AdminDashboard from '../../components/AdminDashboard'

export const metadata: Metadata = {
  title: 'Admin Dashboard | The Cake Shop',
  description: 'Manage your The Cake Shop website content',
}

export default function AdminPage() {
  return <AdminDashboard />
}

