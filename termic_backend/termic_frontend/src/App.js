import { Container } from 'react-bootstrap'
import Header from "./components/Header";
import Footer from "./components/Footer";
import  HomeScreen from './screens/HomeScreen'
import { HashRouter as Router,Route,Routes } from 'react-router-dom'
import  ProductScreen from './screens/ProductScreen'
import  CartScreen from './screens/CartScreen'
import  LoginScreen from './screens/LoginScreen'
import  RegisterScreen from './screens/RegisterScreen'
import  ProfileScreen from './screens/ProfileScreen'
import  ShippingScreen from './screens/ShippingScreen'
import  PaymentScreen from './screens/PaymentScreen'
import  PlaceOrderScreen from './screens/PlaceOrderScreen'
import  OrderScreen from './screens/OrderScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import ProductListScreen from './screens/ProductListScreen'
import ProductEditScreen from './screens/ProductEditScreen'
import OrderListScreen from './screens/OrderListScreen'
import SellerScreen from './screens/SellerScreen'
import SellerDetailsScreen from './screens/SellerDetailsScreen';
import MyOrders from './screens/MyOrders'


function App() {
  return (
    <Router >
      <Header />
        <main>
          <Container fluid>
            <Routes>
              <Route  path='/' Component={HomeScreen} exact />
              <Route  path='/product/:id' Component={ ProductScreen } />
              <Route  path='/cart/:id?' Component={ CartScreen } />
              <Route  path='/login' Component={ LoginScreen } />
              <Route  path='/register' Component={ RegisterScreen } />
              <Route  path='/profile' Component={ ProfileScreen } />
              <Route  path='/shipping' Component={ ShippingScreen } />
              <Route  path='/payment' Component={ PaymentScreen} />
              <Route  path='/placeorder' Component={ PlaceOrderScreen } />
              <Route  path='/order/:id' Component={ OrderScreen } />
              <Route  path='/admin/product/:id/edit' Component={ ProductEditScreen } />
              <Route  path='/product/:id/edit' Component={ ProductEditScreen } />

              
              <Route  path='/admin/userlist' Component={ UserListScreen } />
              <Route  path='/admin/users/:id/edit' Component={ UserEditScreen } />
              <Route  path='/admin/productlist' Component={ ProductListScreen} />
              <Route  path='/productlist' Component={ ProductListScreen} />
              <Route  path='/admin/orderlist' Component={ OrderListScreen } />
              <Route  path='/seller' Component={ SellerScreen } />
              <Route  path='/seller/details' Component={ SellerDetailsScreen } />

              <Route  path='/seller/myorders' Component={ MyOrders } />

            </Routes>
          </Container>  
        </main>
      <Footer />
    </Router>
  );
}

export default App;



