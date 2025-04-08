import React from 'react'

function Section({ className, children, style, ref }) {
  return (
    <section ref={ref} className={` ${className}`}  style={style}>
      {children}
    </section>
  );
}

export default Section