import { useState, useEffect } from "react";

interface IProps {
  time: number;
  onEnd: Function;
}

const CountDown = (props: IProps) => {
  const { time, onEnd } = props;
  const [count, setCount] = useState(time || 60);

  useEffect(() => {
    const id = setInterval(() => {
      setCount((count) => {
        if (count === 0) {
          clearInterval(id);
          setTimeout(() => {
            onEnd && onEnd();
          }, 0);
          return count;
        }
        return count - 1;
      });
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [time, onEnd]);

  return <div className="text-[#909090]">{count}</div>;
};

export default CountDown;
