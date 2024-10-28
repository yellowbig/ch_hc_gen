import { FooterProps } from "@/types/footer";
import { Link } from "@nextui-org/react";
import React from "react";

const LinkGroup: React.FC<FooterProps> = ({
  productTitle,
  productDescription,
  columns,
}) => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Product Introduction */}
        <div className="mb-8">
          <h2 className="text-xl text-gray-400 font-bold mb-4">
            {productTitle}
          </h2>
          <p className="text-gray-400 max-w-2xl">{productDescription}</p>
        </div>

        {/* Link Columns */}
        <div className="space-y-8">
          {columns.map((column, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold text-gray-400 mb-4">
                {column.title}
              </h3>
              <ul className={`${column.title === "Useful Links" ? "flex flex-wrap gap-4" : "space-y-2"}`}>
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex} className={column.title === "Useful Links" ? "min-w-[150px]" : ""}>
                    <Link
                      href={link.href}
                      title={link.title}
                      color="foreground"
                      underline="hover"
                      className="text-gray-400"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LinkGroup;
