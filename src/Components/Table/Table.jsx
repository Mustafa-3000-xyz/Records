import Style from "./index.module.css";
import Add_Record_Btn from "../Add_Record_Btn/Add_Record_Btn";
import Records_Atom from "../../Atoms/Records_Atom";
import { useRecoilState } from "recoil";
import Records_Copy_Atom from "../../Atoms/Records_Copy_Atom";
import Delete_All_Records_Btn from "../Delete_All_Records_Btn/Delete_All_Records_Btn";
import Records_Pin from "./Records_Pin";
import Records_Not_Pin from "./Records_Not_Pin";
// ==================================================== //
export default function Table() {
    let recordsAtom = useRecoilState(Records_Atom)[0];
    let recordsCopyAtom = useRecoilState(Records_Copy_Atom)[0];

    return <>
        {
            recordsAtom.length <= 0 ? <div className=" text-center">
                <h2 className=" text-center mt-5">لا يوجد عمليات</h2>
                <Add_Record_Btn inTable={false} />
            </div>
                : <table className={`${Style.table} px-3`}>
                    <thead>
                        <tr>
                            <td className="bg-black text-light fs-5">إسم العملية</td>
                            <td className="bg-black text-light fs-5">إسم القطاع</td>
                            <td className="bg-black text-light fs-5">نوع الملف</td>
                            <td className="bg-black text-light fs-5">التاريخ</td>
                            <td colSpan={5} className=" bg-black text-light fs-5">أدوات</td>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            recordsCopyAtom.map(ele => ele.isThumbtack == true ? <Records_Pin key={ele.id} ele={ele} /> : "")
                        }

                        {
                            recordsCopyAtom.map(ele => ele.isThumbtack == false ? <Records_Not_Pin key={ele.id} ele={ele} /> : "")
                        }

                        <Add_Record_Btn inTable={true} />

                        {
                            recordsCopyAtom.length > 1 ? <Delete_All_Records_Btn /> : ""
                        }
                    </tbody>

                    <tfoot>
                        <tr>
                            <td className="text-end bg-dark text-light p-3 fs-5" colSpan={7}>عدد العمليات : <span>{recordsCopyAtom.length}</span></td>
                        </tr>
                    </tfoot>
                </table>
        }
    </>
}