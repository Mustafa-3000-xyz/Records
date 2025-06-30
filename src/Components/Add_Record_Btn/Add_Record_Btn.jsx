import { useNavigate } from "react-router-dom";
import Records_Atom from "../../Atoms/Records_Atom";
import { useRecoilState } from "recoil";
// ==================================================== //
export default function Add_Record_Btn({ inTable }) {
    let navegate = useNavigate();
    let recordsAtom = useRecoilState(Records_Atom)[0];


    function handle_Btn() {
        navegate("/add_record_page");
    }


    return <>
        {
            inTable == false ? <button onClick={handle_Btn} className="w-75 mt-4 btn btn-outline-success fs-2">+</button>
                : <tr>

                    <td onClick={handle_Btn} className=" bg-transparent" colSpan={8} >
                        <button className="w-100 btn btn-outline-success fs-2">+</button>
                    </td>
                </tr>
        }
    </>
}