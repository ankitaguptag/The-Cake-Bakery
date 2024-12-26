import { Metadata } from 'next'
import AdminDashboard from '../../components/AdminDashboard'

export const metadata: Metadata = {
  title: 'Admin Dashboard | Cake-Bakery Shop',
  description: 'Manage your Cake-Bakery Shop website content',
}

export default function AdminPage() {
  return <AdminDashboard />
}

