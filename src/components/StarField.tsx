const STARS = [
  { top: "51vh", left: "65vw", size: "2px", opacity: 0.34 },
  { top: "14vh", left: "2vw", size: "2px", opacity: 0.63 },
  { top: "69vh", left: "11vw", size: "3px", opacity: 0.3 },
  { top: "60vh", left: "52vw", size: "2px", opacity: 0.43 },
  { top: "26vh", left: "43vw", size: "3px", opacity: 0.52 },
  { top: "90vh", left: "31vw", size: "2px", opacity: 0.36 },
  { top: "96vh", left: "18vw", size: "3px", opacity: 0.43 },
  { top: "20vh", left: "15vw", size: "2px", opacity: 0.62 },
  { top: "35vh", left: "89vw", size: "2px", opacity: 0.35 },
  { top: "43vh", left: "34vw", size: "3px", opacity: 0.35 },
  { top: "83vh", left: "34vw", size: "2px", opacity: 0.42 },
  { top: "73vh", left: "58vw", size: "2px", opacity: 0.5 },
  { top: "5vh", left: "66vw", size: "2px", opacity: 0.47 },
  { top: "48vh", left: "46vw", size: "2px", opacity: 0.33 },
  { top: "57vh", left: "79vw", size: "2px", opacity: 0.42 },
  { top: "27vh", left: "33vw", size: "3px", opacity: 0.54 },
  { top: "66vh", left: "38vw", size: "2px", opacity: 0.44 },
  { top: "40vh", left: "14vw", size: "2px", opacity: 0.46 },
  { top: "79vh", left: "93vw", size: "2px", opacity: 0.36 },
  { top: "10vh", left: "76vw", size: "2px", opacity: 0.48 },
];

export function StarField() {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none">
      {STARS.map((star, i) => (
        <span
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
          }}
        />
      ))}
    </div>
  );
}
