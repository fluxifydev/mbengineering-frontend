import MachinesClient from './MachinesClient';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Industrial Machinery Catalog | MB Engineering Works",
  description: "Explore our lineup of high-performance converting, slitting, and printing machinery. Custom B2B precision engineering solutions designed for global industrial leadership.",
  openGraph: {
    title: "Industrial Machinery Catalog | MB Engineering Works",
    description: "Explore our lineup of high-performance converting, slitting, and printing machinery. Custom B2B precision engineering solutions designed for global industrial leadership.",
    url: "https://www.mbengineering.online/machines",
    type: "website",
  },
};

export default function Page() {
  return <MachinesClient />;
}
