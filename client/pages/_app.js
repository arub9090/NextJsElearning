import 'bootstrap/dist/css/bootstrap.min.css'
import 'antd/dist/antd.css'
import '../public/css/style.css'
import TopNav from '../component/TopNav'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function MyApp({Component, pageProps}) {
  return (
    <>
    <ToastContainer position='top-center'/>
    <TopNav />
    <Component {...pageProps} />
    </>
  )
}
export default MyApp