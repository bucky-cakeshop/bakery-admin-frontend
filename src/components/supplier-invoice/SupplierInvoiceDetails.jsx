import { useEffect, useState } from "react";
import { getSupplierInvoiceDetails } from '../../api/supplierInvoice.api'
import { deleteSupplierInvoiceDetail } from '../../api/supplierInvoiceDetail.api'
import SorteableTable from '../sortable-table/SorteableTable'
import { SupplierInvoiceDetailForm } from "./SupplierInvoiceDetailForm";
import { GoTrashcan } from 'react-icons/go'
import { toast } from 'react-hot-toast';
import moment from "moment";

export function SupplierInvoiceDetails({ supplierInvoiceId }) {
    const [supplierInvoiceDetails, setSupplierInvoiceDetails] = useState([]);

    async function loadSupplierInvoiceDetails() {
        const res = await getSupplierInvoiceDetails(supplierInvoiceId);
        setSupplierInvoiceDetails([...res.data]);
    }
    useEffect(() => {
        loadSupplierInvoiceDetails();
    }, [])

    async function removeItem(supplierInvoiceDetailId) {
        const accepted = window.confirm('Seguro de eliminar?');
        if (accepted) {
            const res = await deleteSupplierInvoiceDetail(supplierInvoiceDetailId);
            loadSupplierInvoiceDetails();
            toast.success('Detalle del comprobante eliminado', {
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
            render: (supplierInvoiceDetail) => supplierInvoiceDetail.ingredient_object.name,
            sortValue: (supplierInvoiceDetail) => supplierInvoiceDetail.ingredient_object.name
        },
        {
            label: 'Unidad de medida',
            render: (supplierInvoiceDetail) => supplierInvoiceDetail.measureUnit_object.title,
            sortValue: (supplierInvoiceDetail) => supplierInvoiceDetail.measureUnit_object.title
        },
        {
            label: 'Marca',
            render: (supplierInvoiceDetail) => supplierInvoiceDetail.make_object.name,
            sortValue: (supplierInvoiceDetail) => supplierInvoiceDetail.make_object.name
        },
        {
            label: 'Cantidad',
            render: (supplierInvoiceDetail) => supplierInvoiceDetail.quantity,
            sortValue: (supplierInvoiceDetail) => supplierInvoiceDetail.quantity
        },
        {
            label: 'Precio',
            render: (supplierInvoiceDetail) => supplierInvoiceDetail.price,
            sortValue: (supplierInvoiceDetail) => supplierInvoiceDetail.price
        },
        {
            label: 'Lote',
            render: (supplierInvoiceDetail) => supplierInvoiceDetail.batch,
            sortValue: (supplierInvoiceDetail) => supplierInvoiceDetail.batch
        },
        {
            label: 'Exp.',
            render: (supplierInvoiceDetail) => moment(supplierInvoiceDetail.expirationDate).format('DD/MM/YYYY'),
            sortValue: (supplierInvoiceDetail) => supplierInvoiceDetail.expirationDate
        },

        {
            label: 'Eliminar',
            render: (supplierInvoiceDetail) => <button className=" w-10" onClick={() => removeItem(supplierInvoiceDetail.id)} ><GoTrashcan /></button>,
        }

    ];

    const keyFn = (supplierInvoiceDetail) => {
        return supplierInvoiceDetail.id;
    }

    return (
        <div>
            <h1 className="font-bold text-2xl mb-4 mt-4">Ingredientes</h1>
            <SupplierInvoiceDetailForm supplierInvoiceId={supplierInvoiceId} detailsChanged={loadSupplierInvoiceDetails}></SupplierInvoiceDetailForm>
            <SorteableTable data={supplierInvoiceDetails} config={config} keyFn={keyFn}></SorteableTable>
        </div>
    )
}