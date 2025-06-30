import { useNavigate, useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil';
import Records_Atom from '../Atoms/Records_Atom';
import { useEffect, useState } from 'react';
import { editingRecord } from '../../db';
// ==================================================== //
export default function Editing_Record_Page() {
    let { id } = useParams();
    let recordsAtom = useRecoilState(Records_Atom)[0];
    let theRecord = recordsAtom.find(ele => ele.id == id);

    let navigate = useNavigate();
    let [valueNameInp, setValueNameInp] = useState("");
    let [valueSectorInp, setValueSectorInp] = useState("");
    let [valueFileInp, setValueFileInp] = useState("");
    let [copyValueFileInp, setCopyValueFileInp] = useState("");

    function handle_Back_Btn() {
        navigate("/");
    }

    function handle_Confirm() {
        let split = copyValueFileInp != "" ? copyValueFileInp.path.split(".") : "NAS";
        let splitLength = split.length;
        let resultType = split[splitLength - 1].toUpperCase();

        let obj = {
            id: theRecord.id,
            name: valueNameInp == "" ? theRecord.name : valueNameInp,
            sector: valueSectorInp == "" ? theRecord.sector : valueSectorInp,
            type: copyValueFileInp == "" ? theRecord.type : resultType,
            date: theRecord.date,
            file: copyValueFileInp == "" ? theRecord.file : copyValueFileInp,
            isThumbtack: theRecord.isThumbtack
        }

        editingRecord(obj);
        navigate("/");
    }

    useEffect(function () {
        if (valueFileInp != undefined) {
            setCopyValueFileInp(valueFileInp);
        }
    }, [valueFileInp]);


    return <section className=' position-relative h-vh d-flex flex-column justify-content-center align-items-center px-3'>

        <h1>تعديل العمليه الذي يكون اسمه : {theRecord.name}</h1>

        <div className=' mt-5 w-100 d-flex justify-content-center'>
            <input onChange={(e) => setValueNameInp(e.target.value)} className='w-50 p-1 fs-4 rounded-2 m-1' type="text" placeholder='إسم العمليه' />
            <input onChange={(e) => setValueSectorInp(e.target.value)} className='w-50 p-1 fs-4 rounded-2 m-1' type="text" placeholder='إسم القطاع' />


            <label style={{ backgroundColor: copyValueFileInp == "" ? "#838383" : "green" }} className='text-center mx-2 cursor-pointer px-4 py-2 text-light fs-4 rounded-3' htmlFor="fileInput">
                {copyValueFileInp == "" ? "إختر نوع الملف" : "تم الأختيار"}
            </label>
            <input accept=".pdf,.doc,.docx,.txt,.xls,.xlsx,.csv,.ppt,.pptx,.zip,.md" onChange={(e) => setValueFileInp(e.target.files[0])} type="file" id='fileInput' />
        </div>

        {
            copyValueFileInp != "" ?
                <div className=' mt-2'>
                    <span className=' fw-medium'>مسار الملف :</span>
                    <span> {copyValueFileInp.path} </span>
                </div>
                : ""
        }

        <div className='mt-5 w-100 d-flex gap-2 justify-content-center px-3'>
            <button disabled={copyValueFileInp != "" || valueNameInp != "" || valueSectorInp != "" ? false : true} onClick={handle_Confirm} className='w-50 bg-success p-2 rounded-2 text-light fs-5'>تأكيد</button>
            <button onClick={handle_Back_Btn} className='w-50 bg-danger p-2 rounded-2 text-light fs-5'>الرجوع</button>
        </div>
    </section>
}
