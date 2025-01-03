// https://i.ibb.co.com/g97G95k/banner2.jpg
import CoverSection from '../../Components/CoverSection/CoverSection'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../Hooks/useMenu';
import FoodCart from '../../Components/FoodCart/FoodCart';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
const Order = () => {
    const categories = ['dessert', 'pizza', 'salad', 'soup', 'drinks']
    const { category } = useParams()
    const initialIndex = categories.indexOf(category)
    const [tabIndex, setTabIndex] = useState(initialIndex)
    const [menu, loading] = useMenu()
    const drinks = menu.filter(item => item.category === "drinks")
    const dessert = menu.filter(item => item.category === "dessert")
    const soup = menu.filter(item => item.category === "soup")
    const salad = menu.filter(item => item.category === "salad")
    const pizza = menu.filter(item => item.category === "pizza")
    // console.log(menu)
    return (
        <div>
            <CoverSection
                img='https://i.ibb.co.com/g97G95k/banner2.jpg'
                title={'Order now'}
            />

            <Tabs
                defaultIndex={tabIndex}
            >
                <TabList>
                    <Tab>Dessert</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Salad</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Drinks</Tab>
                </TabList>
                <TabPanel >
                    <div className='grid lg:grid-cols-3 gap-5'>
                        {dessert?.map(food => <FoodCart key={food._id} food={food} ></FoodCart>)}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid lg:grid-cols-3 gap-5'>
                        {pizza?.map(food => <FoodCart key={food._id} food={food} ></FoodCart>)}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid lg:grid-cols-3 gap-5'>
                        {salad?.map(food => <FoodCart key={food._id} food={food} ></FoodCart>)}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid lg:grid-cols-3 gap-5'>
                        {soup?.map(food => <FoodCart key={food._id} food={food} ></FoodCart>)}
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid lg:grid-cols-3 gap-5'>
                        {drinks?.map(food => <FoodCart key={food._id} food={food} ></FoodCart>)}
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;