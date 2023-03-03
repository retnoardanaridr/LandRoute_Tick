import React, { useContext, useState } from "react";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { Card } from "flowbite-react";

import arow from "../assets/Arrow 5.png";
import { UserContext } from "../contexts/userContext";
import MyModal from "../components/modalAdd";

export default function TicketList() {
    const [isOpen, setIsOpen] = useState(false)
    const [state, _] = useContext(UserContext)

    let { data: tickets } = useQuery('ticketCache', async () => {
        const response = await API.get('/tickets');
        return response.data.data;
    })

    const formatRupiah = (money) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(money);
    };

    const HandleBuyying = async (id) => {
        try {
            const response = await API.post(`/create-trans/${id}`, {
                headers: {
                    Authorization: `Bearer ${state.user.token}`
                }
            })
            setIsOpen(true)
            console.log("ini beli", response.data.data)
            return response.data.data;
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {tickets?.map((item) => (
                <Card
                    key={item.id}
                    className="my-5 cursor-pointer"
                    onClick={() => HandleBuyying(item.id)}
                >
                    <div className="flex justify-between">
                        <div>
                            <h2 className="font-bold">{item.name_train}</h2>
                            <h4 className="text-sm font-serif">{item.type_train}</h4>
                        </div>
                        <div>
                            <h2 className="font-semibold">{item.start_time}</h2>
                            <h4 className="font-semibold">{item.start_station.name}</h4>
                        </div>
                        <div className="flex items-center justify-center">
                            <img src={arow} alt="" className="h-5 w-4" />
                        </div>
                        <div>
                            <h2 className="font-semibold">{item.arrival_time}</h2>
                            <h4 className="font-semibold">{item.destination_station.name}</h4>
                        </div>
                        <div>
                            <h2 className="font-semibold">5j 12 m</h2>
                        </div>
                        <div>
                            <h2 className="font-bold">{formatRupiah(item.price)}</h2>
                        </div>
                    </div>
                </Card>
            ))}

            {isOpen && (
                <MyModal
                    show={isOpen}
                    setShow={setIsOpen}
                    setIsOpen={setIsOpen}
                />
            )}
        </>
    )
}