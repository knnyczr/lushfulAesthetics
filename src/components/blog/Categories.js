import React from "react";
import CategoryChip from "./categoryChip";

export default function Categories({ categories }) {
  return (
    <>
      <h1 className="font-sans uppercase font-medium mb-2">Categories</h1>
      {categories.map((category) => (
        <CategoryChip
          name={category.node.categoryTitle}
          slug={category.node.slug}
        />
      ))}
    </>
  );
}
