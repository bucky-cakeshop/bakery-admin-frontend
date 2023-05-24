import { useEffect, useState } from "react";
import { getBuyOrderDetails } from '../../api/buyOrder.api'
import { deleteBuyOrderDetail } from '../../api/buyOrderDetail.api'
import SorteableTable from '../../components/sortable-table/SorteableTable'
import { BuyOrderDetailForm } from "./BuyOrderDetailForm";
import { GoTrashcan } from 'react-icons/go'
import { toast } from 'react-hot-toast';

export function BuyOrderDetails({ buyOrderId }) {
    const [buyOrderDetails, setBuyOrderDetails] = useState([]);

    async function loadBuyOrderDetails() {
        const res = await getBuyOrderDetails(buyOrderId);
        setBuyOrderDetails([...res.data]);
    }
    useEffect(() => {
        loadBuyOrderDetails();
    }, [])

    async function removeItem(buyOrderDetailId) {
        const accepted = window.confirm('Seguro de eliminar?');
        if (accepted) {
            const res = await deleteBuyOrderDetail(buyOrderDetailId);
            loadBuyOrderDetails();
            toast.success('Detalle de la orden de compra eliminado', {
                position: "bottom-right",
                style: {
                    background: "#101010",
                    color: "#fff"
                }
            })

        }
    }

    const config = [
        {
            label: 'Ingrediente',
            render: (buyOrderDetail) => buyOrderDetail.ingredient_object.name,
            sortValue: (buyOrderDetail) => buyOrderDetail.ingredient_object.name
        },
        {
            label: 'Unidad de medida',
            render: (buyOrderDetail) => buyOrderDetail.measureUnit_object.title,
            sortValue: (buyOrderDetail) => buyOrderDetail.measureUnit_object.title
        },
        {
            label: 'Marca',
            render: (buyOrderDetail) => buyOrderDetail.make_object.name,
            sortValue: (buyOrderDetail) => buyOrderDetail.make_object.name
        },
        {
            label: 'Cantidad',
            render: (buyOrderDetail) => buyOrderDetail.quantity,
            sortValue: (buyOrderDetail) => buyOrderDetail.quantity
        },
        {
            label: 'Precio',
            render: (buyOrderDetail) => buyOrderDetail.price,
            sortValue: (buyOrderDetail) => buyOrderDetail.price
        },
        {
            label: 'Lote',
            render: (buyOrderDetail) => buyOrderDetail.batch,
            sortValue: (buyOrderDetail) => buyOrderDetail.batch
        },
        {
            label: 'Exp.',
            render: (buyOrderDetail) => buyOrderDetail.expirationDate,
            sortValue: (buyOrderDetail) => buyOrderDetail.expirationDate
        },

        {
            label: 'Eliminar',
            render: (buyOrderDetail) => <button className=" w-10" onClick={() => removeItem(buyOrderDetail.id)} ><GoTrashcan /></button>,
        }

    ];

    const keyFn = (buyOrderDetail) => {
        return buyOrderDetail.id;
    }

    return (
        <div>
            <h1 className="font-bold text-2xl mb-4 mt-4">Ingredientes</h1>
            <BuyOrderDetailForm buyOrderId={buyOrderId} detailsChanged={loadBuyOrderDetails}></BuyOrderDetailForm>
            <SorteableTable data={buyOrderDetails} config={config} keyFn={keyFn}></SorteableTable>
        </div>
    )
}