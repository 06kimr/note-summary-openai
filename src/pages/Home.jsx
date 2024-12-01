import Main from "../components/Main"
import Sidebar from "../components/Sidebar"

 const Home = () => {
  return(
    <div className="flex h-screen border-[5px] text-white bg-gray-800">
      <Sidebar />
      <Main />
    </div>
  )
}
export default Home