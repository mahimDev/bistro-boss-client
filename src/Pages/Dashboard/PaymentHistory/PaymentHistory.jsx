import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import SectionTitle from '../../../Components/SectionTitle/SectionTitle';
const PaymentHistory = () => {
    const { user } = useAuth()
    const axiosSecure = useAxiosSecure()
    const { data: payment = [] } = useQuery({
        queryKey: ['payment', user?.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payment/${user?.email}`)
            return res.data
        }
    })
    console.log(payment)
    return (
        <div>
            <SectionTitle subTitle="at a " title="Payment history"></SectionTitle>
            <h1 className="text-4xl">Total Payment item : {payment?.length}</h1>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>
                                #
                            </th>
                            <th>name</th>
                            <th>transaction id</th>
                            <th>price</th>
                            <th>date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            payment?.map((item, i) =>
                                <tr key={item._id}>
                                    <th>
                                        {i + 1}
                                    </th>
                                    <td>
                                        {item.name}
                                    </td>
                                    <td>
                                        {item.transactionId}
                                    </td>
                                    <td> {item.price}</td>
                                    <th>
                                        {new Date(item.date).toLocaleDateString("en-GB")}
                                    </th>
                                </tr>
                            )
                        }


                    </tbody>

                </table>
            </div>

        </div>
    );
};

export default PaymentHistory;