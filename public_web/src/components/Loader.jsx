import "./loader.css";

export default function Loader() {

  const text = "Loading...";
  const rings = 2;
  const ringSectors = 30;

  return (
    <div className="preloader">
      {Array.from({ length: rings }).map((_, rIndex) => (
        <div key={rIndex} className="preloader__ring">
          {Array.from({ length: ringSectors }).map((_, sIndex) => (
            <div key={sIndex} className="preloader__sector">
              {text[sIndex] || ""}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
