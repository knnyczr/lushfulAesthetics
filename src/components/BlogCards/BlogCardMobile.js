import React from "react";

export default function BlogCardMobile({
  facicalCategory,
  bodyCategory,
  sexualCategory,
}) {
  return (
    <>
      <FacialCards facialCards={facicalCategory} />
    </>
  );
}

const FacialCards = ({ facialCards }) => {
  return (
    <div>
      <div className="w-96 h-auto">
        <h1>Facial Aesthetic</h1>
        <div className="flex overflow-x-scroll">
          <div className="flex flex-nowrap snap-mandatory snap-x">
            {facialCards.map((facial, idx) => {
              let dateString = facial.datePosted;
              let date = new Date(dateString);
              let options = {
                month: "long",
                day: "numeric",
                year: "numeric",
              };
              let newDateFormat = date.toLocaleString("en-US", options);
              return (
                <>
                  <div
                    key={idx}
                    style={{
                      backgroundImage: `url(${facial.heroImage.url})`,
                      backgroundSize: `cover`,
                      backgroundRepeat: `no-repeat`,
                      backgroundPosition: `50% 50%`,
                    }}
                    className="bg-green-400 w-full h-[35rem]"
                  >
                    <div className="text-white">
                      <h3>{facial.title}</h3>
                      <p>{facial.intro}</p>
                      <p>Posted on {newDateFormat}</p>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
      <div>
        <h1>Body Aesthetic</h1>
      </div>
      <div>
        <h1>Sexual Enhancement</h1>
      </div>
    </div>
  );
};
