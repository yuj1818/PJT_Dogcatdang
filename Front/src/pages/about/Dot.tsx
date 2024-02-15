interface DotProps {
  num: number;
  currentPage: number;
}

interface DotsProps {
  currentPage: number;
}

const Dot = ({ num, currentPage }: DotProps) => {
  return (
    <div
      style={{
        width: 10,
        height: 10,
        border: "1px solid black",
        borderRadius: 999,
        backgroundColor: currentPage === num ? "black" : "transparent",
        transitionDuration: "0.5s",
        transition: "background-color 0.5s",
      }}
    ></div>
  );
};

const Dots = ({ currentPage }: DotsProps) => {
  return (
    <div style={{ position: "fixed", top: "50%", right: 100 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          alignItems: "center",
          width: 1,
          height: 80,
        }}
      >
        <Dot num={1} currentPage={currentPage}></Dot>
        <Dot num={2} currentPage={currentPage}></Dot>
        <Dot num={3} currentPage={currentPage}></Dot>
      </div>
    </div>
  );
};

export default Dots;
