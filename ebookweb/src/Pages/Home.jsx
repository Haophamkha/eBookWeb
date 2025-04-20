import Footer from "../Components/footer";
import Header from "../Components/header";
import Navbar from "../Components/navBar";
import News from "../Components/news";
import ReviewList from "../Components/reviewList";
import { BookSaleList } from "../Components/BookSaleList";
import  {BookOnSaleList } from "../Components/BookOnSaleList";
import { UtilitiesList } from "../Components/UtilitiesList";
import {RecommendedBookList} from "../Components/RecommendedBookList"
import {FeaturedProductList} from "../Components/FeaturedProductList"
import {LogoCard} from "../Components/LogoCard"
import { BookCarouselHandle } from "../Components/BookCarouselHandle";
import ShopDetail from "./shopDetail";
const HomePage = () => {
    return (
        <>   
        <BookCarouselHandle/>
        <LogoCard/>
        <RecommendedBookList/>
        <UtilitiesList/>
        <BookOnSaleList/>
        <FeaturedProductList/>
        <BookSaleList/>
        <ReviewList  />
        <News  />
        </>
        
    ) 
        
    
}

export default HomePage;