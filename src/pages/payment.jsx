import React, {useEffect} from "react";
import { Card, Alert, Table, Button } from "flowbite-react"
import { useMutation, useQuery } from 'react-query'
import qr from "../assets/qr.png";
import alert from "../assets/error 1.png";
import { useNavigate, useParams } from "react-router-dom";
import { API } from "../config/api";


export default function Payment() {
    const { id } = useParams();
    const navigate = useNavigate();

    const { data: trans } = useQuery("transCache", async () => {
        const response = await API.get(`/payment/${id}`);
        return response.data.data;
    })
    
    
    const formatRupiah = (money) => {
        return new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(money);
    };

    const handlePay = useMutation(async (id) => {
        try {
            const response = await API.get(`/payment/${id}`);
            const token = response.data.data.token;
            console.log("ini token midtrans", token)

            window.snap.pay(token, {
                onSuccess: function (result) {
                   navigate("/");
                },
                onPending: function (result) {
                   console.log(result);
                },
                onError: function (result) {
                   console.log(result);
                },
                onClose: function () {
                   alert("you closed the popup without finishing the payment");
                },
             });
        } catch (error) {
            console.log(error)
        }
    }) 
    


    useEffect(() => {
        //change this to the script source you want to load, for example this is snap.js sandbox env
        const midtransScriptUrl = "https://app.sandbox.midtrans.com/snap/snap.js";
        //change this according to your client-key
        const myMidtransClientKey = "SB-Mid-client-N33OFW_2y15oyoxG";
      
        let scriptTag = document.createElement("script");
        scriptTag.src = midtransScriptUrl;
        // optional if you want to set script attribute
        // for example snap.js have data-client-key attribute
        scriptTag.setAttribute("data-client-key", myMidtransClientKey);
      
        document.body.appendChild(scriptTag);
        return () => {
          document.body.removeChild(scriptTag);
        };
      }, []);

      

    return (
        <>
            <div className="container mx-auto mt-4">
                <h2 className="font-bold text-3xl mb-4">Invoice</h2>
                <Card>
                    <div className="flex">
                        <div className="flex-[70%]">
                            <Card className="mb-5 bg-gray-400 flex">
                                <img className="w-10 h-10" src={alert} alt="" />
                                <h3 className="text-md font-medium text-black">
                                    PAY YOUR BILL
                                </h3>
                            </Card>
                            <div className="mb-5">
                                <Table>
                                    <Table.Head>
                                        <Table.HeadCell>No. Tanda Pengenal</Table.HeadCell>
                                        <Table.HeadCell>Nama Pemesanan</Table.HeadCell>
                                        <Table.HeadCell>No. Handphone</Table.HeadCell>
                                        <Table.HeadCell>EMail</Table.HeadCell>
                                    </Table.Head>
                                    <Table.Row>
                                        {/* <Table.Cell>{trans?.user.id}</Table.Cell>
                                        <Table.Cell>{trans?.user.fullname}</Table.Cell>
                                        <Table.Cell>{trans?.user.phone}</Table.Cell>
                                        <Table.Cell>{trans?.user.email}</Table.Cell> */}
                                    </Table.Row>
                                </Table>
                            </div>
                            <div>
                                <Card>
                                    <div className="flex justify-between">
                                        {/* <h5 className="font-bold">{trans?.ticket.name_train} (Adults) x {trans?.qty}</h5>
                                        <span className="font-bold">{formatRupiah(trans?.ticket.price)}</span> */}
                                    </div>
                                    <div className="flex justify-between bg-slate-200 p-2 rounded-md">
                                        {/* <h5 className="font-semibold text-lg">Total</h5>
                                        <h5 className="font-extrabold">{formatRupiah(trans?.total)}</h5> */}
                                    </div>
                                </Card>
                            </div>
                            <Button onClick={() => handlePay.mutate(trans.id)} gradientDuoTone="pinkToOrange" className="w-full mt-3">Pay Now</Button>
                        </div>
                        <div className="flex-[30%] ml-6">
                            <Card>
                                <div className="flex justify-between">
                                    <div>
                                        <h2 className="font-bold text-2xl">Kereta Api</h2>
                                        <h5 className="text-sm font-semibold">Saturday, 21 Februari 2020</h5>
                                    </div>
                                    <img src={qr} alt="" />
                                </div>
                                <div>
                                    {/* <h3 className="font-bold text-lg">{trans?.ticket.name_train}</h3>
                                    <h6 className="text-sm">{trans?.ticket.type_train}</h6> */}
                                </div>
                                <div className="flex justify-between">
                                    <div>
                                        <div className="mb-5">
                                            {/* <h6 className="font-bold text-lg">{trans?.ticket.start_time}</h6>
                                            <h6 className="text-sm">{trans?.ticket.start_date}</h6> */}
                                        </div>
                                        <div>
                                            {/* <h6 className="font-bold text-lg">{trans?.ticket.arrival_time}</h6>
                                            <h6 className="text-sm">{trans?.ticket.start_date}</h6> */}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="mb-5">
                                            {/* <h6 className="font-bold text-lg">{trans?.ticket.start_station.kota}</h6>
                                            <h6 className="text-sm">Stasiun {trans?.ticket.start_station.name}</h6> */}
                                        </div>
                                        <div>
                                            {/* <h6 className="font-bold text-lg">{trans?.ticket.destination_station.kota}</h6>
                                            <h6 className="text-sm">Stasiun {trans?.ticket.destination_station.name}</h6> */}
                                        </div>
                                    </div>

                                </div>
                            </Card>

                        </div>                        
                    </div>
                </Card>
            </div>
        </>
    )
}