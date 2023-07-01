import type { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '@/redux/store';
import { increment, decrement } from '@/redux/slices/counterSlice';

const Home: NextPage = () => {
  const dispatch = useDispatch();
  const count = useSelector((state: RootState) => state.counter.value);

  const handleIncrement = () => {
    dispatch(increment());
  };

  const handleDecrement = () => {
    dispatch(decrement());
  };
  return (
    <main>
      {/* <h1>CrowdLaunch</h1> */}
      {/* <div>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleDecrement}>Decrement</button>
        <p>Count: {count}</p>
      </div> */}
    </main>
  );
};

export default Home;
