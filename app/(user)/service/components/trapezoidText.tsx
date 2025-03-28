import React from 'react';

const TrapezoidText = ({ text }: { text: string }) => {
  return (
    <div className="lg:w-4/12 w-10/12 mt-4">
      <h2 className=" ">
        {text}
      </h2>
    </div>
  );
};

export default TrapezoidText;

