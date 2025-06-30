import Style from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { deleteRecord, editingRecord } from "../../../db";
import Swal from "sweetalert2";
// ==================================================== //
export default function Records_Pin({ele}) {
    let navigate = useNavigate();

    function open_File(file) {
        let result = URL.createObjectURL(file);
        window.open(result);
    }

    function handle_Delete_Record(record) {
        Swal.fire({
            title: 'إنتبه ! ',
            text: `هل تريد حذف السجل الذي يكون اسمه ${record.name} ؟`,
            icon: 'warning',
            confirmButtonText: "تمام",
            cancelButtonText: "لا اريد الحذف",
            confirmButtonColor: "red",
            cancelButtonColor: "#838383",
            showCancelButton: true,
        }).then(function (ele) {
            if (ele.isConfirmed == true) {
                deleteRecord(record.id)
                navigate("/");
            }
        })
    }

    function handle_Editing_Record(id) {
        navigate(`/editing_record_page/${id}`);
    }

    function handle_Thumbtack(record) {
        let toggle = record.isThumbtack;

        if (toggle == false) {
            let newObj = { ...record, isThumbtack: true };
            editingRecord(newObj);
            navigate("/");

            toggle = true;
        } else {
            let newObj = { ...record, isThumbtack: false };
            editingRecord(newObj);
            navigate("/");

            toggle = false;
        }
    }


    return <tr data-id={ele.id}>
        <td style={{ backgroundColor: "coral" }} onClick={() => open_File(ele.file)} className="fw-bold cursor-pointer">{ele.name}</td>
        <td style={{ backgroundColor: "coral" }} onClick={() => open_File(ele.file)} className="fw-bold cursor-pointer">{ele.sector}</td>
        <td style={{ backgroundColor: "coral" }} onClick={() => open_File(ele.file)} className="fw-bold cursor-pointer">{ele.type}</td>
        <td style={{ backgroundColor: "coral" }} onClick={() => open_File(ele.file)} className="fw-bold cursor-pointer">{ele.date}</td>

        <td style={{ backgroundColor: "coral" }} onClick={() => handle_Editing_Record(ele.id)} id={Style.editing_btn} className={`cursor-pointer`}>
            <i className="fa-solid fa-pencil"></i>
        </td>

        <td style={{ backgroundColor: "coral" }} onClick={() => handle_Thumbtack(ele)} id={Style.thumbtack_btn} className="cursor-pointer">
            {
                ele.isThumbtack == false ?
                    <i className="fa-solid fa-thumbtack thumbtack-btn"></i> : <i className="fa-solid fa-thumb-tack-slash thumbtack-btn"></i>
            }
        </td>

        <td style={{ backgroundColor: "coral" }} onClick={() => handle_Delete_Record(ele)} id={Style.delete_btn} className="cursor-pointer">
            <i className="fa-solid fa-trash delete-btn "></i>
        </td>
    </tr>
}
