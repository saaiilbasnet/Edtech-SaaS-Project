import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { setName } from "@/lib/store/userSlice";

export default function Home() {

  // using dispatch

      const name = "Saaiil";
      const dispatch = useAppDispatch();
      dispatch(setName(name));

      // using selector

      const data = useAppSelector((store)=> store.userSlice)
      console.log(data.name);
      


  return (

    <h1>This is HomePage</h1>

  );
}
