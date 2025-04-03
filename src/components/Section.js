import React from 'react'

function Section({ className, children, style }) {
  return (
    <section className={` ${className}`}  style={style}>
      {children}
    </section>
  );
}

export default Section