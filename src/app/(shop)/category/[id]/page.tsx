import { ProductGrid, Title } from "@/components";
import { Category } from "@/interfaces";
import { initialData } from "@/seed/seed";
import { notFound } from "next/navigation";

const SeedProducts = initialData.products;

interface Props {
  params: Promise<{
    id: Category;
  }>;
}

export default async function CategoryPage({ params }: Props) {
  const { id } = await params;
  const products = SeedProducts.filter((product) => product.gender === id);

  const labels: Record<Category, string> = {
    men: "para hombres",
    women: "para mujeres",
    kid: "para niños",
    unisex: "para todos",
  };

  // if (id === "kids") {
  //   notFound();
  // }

  return (
    <>
      <Title title={`Articulos ${labels[id]}`} subtitle="Todos los productos" classname="mb-2" />
      <ProductGrid products={products} />
    </>
  );
}
