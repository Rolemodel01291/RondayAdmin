import React from "react";
import Link from "next/link";

const ConditionalLink = ({ children, className, onClick, isLink, ...rest }) => {
  return isLink ? (
    <Link {...rest}>
        <a onClick={onClick} className={className}>
        {children}
      </a>
    </Link>
  ) : (
      <div className={className}>{children}</div>
  );
};

export default ConditionalLink;
