import ServicesClient from './ServicesClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Engineering Services & Support | MB Engineering Works",
  description: "Discover our comprehensive engineering services, from customized design and manufacturing to 24/7 technical support and B2B consultations.",
  openGraph: {
    title: "Engineering Services & Support | MB Engineering Works",
    description: "Discover our comprehensive engineering services, from customized design and manufacturing to 24/7 technical support and B2B consultations.",
    url: "https://www.mbengineering.online/services",
    type: "website",
  },
};

export default function Page() {
  return <ServicesClient />;
}
