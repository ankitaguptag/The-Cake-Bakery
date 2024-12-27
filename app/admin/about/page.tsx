import { Metadata } from 'next'
import AdminAbout from '../../../components/AdminAbout'

export const metadata: Metadata = {
  title: 'Manage About | Admin Dashboard',
  description: 'Manage the About section of your Cake-Bakery Shop website',
}

export default function AdminAboutPage() {
  return <AdminAbout />
}

