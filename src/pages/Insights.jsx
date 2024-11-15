import React from "react";

const Insights = () => {
  return (
    <>
      <section
        className="w-full h-[500px] banner1 flex items-center justify-center -z-10 sticky top-0"
        style={{
          backgroundImage: `url(https://miro.medium.com/v2/resize:fit:828/format:webp/1*eYtze01BE5EzuxR_1qT9SA.jpeg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto w-[50%] text-white relative z-2 text-center text-5xl font-bold">
          Insights
        </div>
      </section>

      <section className="w-full md:px-24 px-5 md:py-16 py-12">
        <div className="container mx-auto text-white">PostLits</div>
      </section>
    </>
  );
};

export default Insights;
