import React, { useState } from "react";
import { Table } from "flowbite-react"
import action from "../assets/search 1.png";
import edit from "../assets/action.png";
import del from "../assets/trash 1.png";
import ModalDetailTicket from "./detail";
import EditModal from "../components/editModal";
import FooterBar from "../components/footer";

export default function ListTransaction() {
    const [modal, setModal] = useState(false)
    const [editMod, setEditMod] = useState(false)

    return(
        <div>
            <div className="container mx-auto mt-10">
                <div>
                    <h3 className="font-bold text-2xl mb-5">List Transaction</h3>
                        <Table>
                            <Table.Head>
                                <Table.HeadCell>No</Table.HeadCell>
                                <Table.HeadCell>Users</Table.HeadCell>
                                <Table.HeadCell>Tiket</Table.HeadCell>
                                <Table.HeadCell>Status Payment</Table.HeadCell>
                                <Table.HeadCell>Action</Table.HeadCell>
                            </Table.Head>
                            <Table.Row>
                                <Table.Cell>1</Table.Cell>
                                <Table.Cell>Anto</Table.Cell>
                                <Table.Cell>Surabaya - Jakarta</Table.Cell>
                                <Table.Cell>Pending</Table.Cell>
                                <Table.Cell>
                                    <div className="flex justify-between">
                                        <img className="cursor-pointer" onClick={()=> setModal(true)} src={action} alt="" />
                                        <img className="cursor-pointer" onClick={()=> setEditMod(true)} src={edit} alt="" />
                                        <img className="cursor-pointer" src={del} alt="" />
                                    </div>
                                </Table.Cell>
                            </Table.Row>
                        </Table>
                        {modal && (
                            <ModalDetailTicket
                            show={modal}
                            setShow={setModal}
                            />
                        )}
                        {editMod && (
                            <EditModal 
                            show={editMod}
                            setShow={setEditMod}
                            />
                        )}
                </div>
            </div>
                <FooterBar />
        </div>
    )
}