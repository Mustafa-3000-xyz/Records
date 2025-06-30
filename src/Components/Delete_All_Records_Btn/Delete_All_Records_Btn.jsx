import { useRecoilState } from "recoil"
import Swal from "sweetalert2"
import Records_Copy_Atom from "../../Atoms/Records_Copy_Atom";
import { deleteRecord } from "../../../db";
import { useNavigate } from "react-router-dom";
// ==================================================== //
export default function Delete_All_Records_Btn() {
    let recordsCopyAtom = useRecoilState(Records_Copy_Atom)[0];
    
    let navigate = useNavigate();

    
    function handle_Delete_All_Records() {
        Swal.fire({
            title: 'تحذير ! ',
            text: 'هل تريد حقا حذف تلك السجلات ؟',
            icon: 'warning',
            confirmButtonText: "تمام",
            cancelButtonText: "لا اريد الحذف",
            confirmButtonColor: "red",
            cancelButtonColor: "#838383",
            showCancelButton: true,
        }).then(function (ele) {
            if (ele.isConfirmed == true) {
                let search = document.querySelector(".search-input");

                for (let i = 0; i < recordsCopyAtom.length; i++) {
                    deleteRecord(recordsCopyAtom[i].id);
                    navigate("/");
                    search.value = "";
                }
            }
        });
    }



    return <tr>
        <td className=" bg-transparent" colSpan={8} >
            <button onClick={handle_Delete_All_Records} className="btn btn-danger fs-5 w-75">حذف جميع تلك السجلات ؟!</button>
        </td>
    </tr>
}