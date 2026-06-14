import CategoryClient from './CategoryClient';
import type { Metadata } from 'next';

interface Props {
  params: Promise<{ categoryName: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { categoryName } = await params;
  const decodedCategory = decodeURIComponent(categoryName || '');
  const capitalizedCategory = decodedCategory
    .split(' ')
    .map(w => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');

  return {
    title: `${capitalizedCategory} | MB Engineering Works`,
    description: `Explore high-performance industrial converting and printing machinery in the ${decodedCategory} category by MB Engineering Works.`,
    openGraph: {
      title: `${capitalizedCategory} | MB Engineering Works`,
      description: `Explore high-performance industrial converting and printing machinery in the ${decodedCategory} category by MB Engineering Works.`,
      url: `https://www.mbengineering.online/categories/${categoryName}`,
      type: "website",
    },
  };
}

export default async function Page({ params }: Props) {
  const { categoryName } = await params;
  const decodedCategory = decodeURIComponent(categoryName || '');
  return <CategoryClient categoryName={decodedCategory} />;
}
