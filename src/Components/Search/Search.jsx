import { useRecoilState } from "recoil"
import Records_Atom from "../../Atoms/Records_Atom"
import Records_Copy_Atom from "../../Atoms/Records_Copy_Atom"
// ==================================================== //
export default function Search() {
    let recordsAtom = useRecoilState(Records_Atom)[0];
    let setRecordsCopyAtom = useRecoilState(Records_Copy_Atom)[1];

    function handle_Search(e) {
        let textInp = e.target.value.toLowerCase();
        let arr = [];

        recordsAtom.forEach(ele => {
            if (ele.name.toLowerCase().includes(textInp) || ele.sector.toLowerCase().includes(textInp)) {
                arr.push(ele);
            }
        });

        setRecordsCopyAtom(arr);
    }


    return <div className="container">
        <input onChange={handle_Search} type="text" className="form-control search-input fs-4" placeholder="البحث" />
    </div>
}