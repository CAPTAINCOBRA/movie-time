import { useCallback, useState } from "react";

const Counter = () => {
  const [count, setCount] = useState(0);
  const handleRelatedUpdate = useCallback(() => {
    setCount(count + 2);
  }, [count]);

  const handleUpdate = useCallback(() => {
    setCount(count + 1);
    handleRelatedUpdate();
  }, [count]);

  console.log("Count: ", count);
  return (
    <>
      <strong>Count: </strong>
      {count}
      <br />
      <button onClick={handleUpdate}>Click Me</button>
    </>
  );
};

export default Counter;
