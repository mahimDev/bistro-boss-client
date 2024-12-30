// https://i.ibb.co.com/g97G95k/banner2.jpg
import CoverSection from '../../Components/CoverSection/CoverSection'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import useMenu from '../../Hooks/useMenu';
import FoodCart from '../../Components/FoodCart/FoodCart';
const Order = () => {
    const [menu] = useMenu()
    const offered = menu.filter(item => item.category === "offered")
    const dessert = menu.filter(item => item.category === "dessert")
    const soup = menu.filter(item => item.category === "soup")
    const salad = menu.filter(item => item.category === "salad")
    const pizza = menu.filter(item => item.category === "pizza")
    console.log(soup)
    return (
        <div>
            <CoverSection
                img='https://i.ibb.co.com/g97G95k/banner2.jpg'
                title={'Order now'}
            />

            <Tabs>
                <TabList>
                    <Tab>Dessert</Tab>
                    <Tab>Pizza</Tab>
                    <Tab>Salad</Tab>
                    <Tab>Soup</Tab>
                    <Tab>Drinks</Tab>
                </TabList>
                <TabPanel >
                    <div className='grid lg:grid-cols-3 gap-5'>
                        {dessert.map(food => <FoodCart key={food._id} food={food} ></FoodCart>)}
                    </div>
                </TabPanel>
                <TabPanel>
                    <h2>Any content 2</h2>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default Order;