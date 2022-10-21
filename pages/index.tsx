import type { NextPage } from "next";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from "../components/Navbar";
import { decr, incr } from "../redux/store";

import { getUsers } from "../redux/store";

const Home: NextPage = () => {
  const data = useSelector((state) => state.data);

  const dispatch = useDispatch();

  console.log(data.users.users);

  return (
    <div>
      <h1>{data.counter.count}</h1>

      {data?.users &&
        data?.users?.map((post) => {
          console.log(post);
          return <h4>{post.login}</h4>;
        })}

      <button onClick={() => dispatch(incr(6))}>+</button>
      <button onClick={() => dispatch(decr(6))}>-</button>
      <button onClick={() => dispatch(getUsers())}>Get Users</button>
      <Navbar />
    </div>
  );
};

export default Home;
