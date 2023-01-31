import React from "react";
import CategoryChip from "./CategoryChip";

export default function Categories({ categories }) {
  return (
    <>
      <h1 className="font-sans uppercase font-medium mb-2">Categories</h1>
      {categories.map((category, idx) => (
        <CategoryChip
          key={idx}
          name={category.node.categoryTitle}
          slug={category.node.slug}
        />
      ))}
    </>
  );
}
