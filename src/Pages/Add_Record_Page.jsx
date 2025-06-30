import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { saveRecord } from '../../db.js';
// ==================================================== //
export default function Add_Record_Page() {
    let idObj = JSON.parse(localStorage.getItem("idObj")) || 0;

    let navigate = useNavigate();
    let [valueNameInp, setValueNameInp] = useState("");
    let [valueSectorInp, setValueSectorInp] = useState("");
    let [valueFileInp, setValueFileInp] = useState("");
    let [copyValueFileInp, setCopyValueFileInp] = useState("");

    function handle_Back_Btn() {
        if (copyValueFileInp != "" || valueNameInp != "") {
            Swal.fire({
                title: 'تحذير ! ',
                text: 'هل تريد الرجوع للصفحه الرئيسيه ؟',
                icon: 'warning',
                confirmButtonText: "تمام",
                cancelButtonText: "لا اريد الرجوع",
                confirmButtonColor: "red",
                cancelButtonColor: "#838383",
                showCancelButton: true,
            }).then(function (ele) {
                if (ele.isConfirmed == true) {
                    navigate("/");
                }
            })
        } else {
            navigate("/");
        }
    }

    function handle_Confirm() {
        idObj += 1;
        localStorage.setItem("idObj", idObj);

        let newDate = new Date();
        let theDate = `${newDate.getDate()}/${newDate.getMonth() + 1}/${newDate.getFullYear()}`;

        let split = copyValueFileInp.path.split(".");
        let splitLength = split.length;
        let resultType = split[splitLength - 1].toUpperCase();

        let obj = {
            id: idObj,
            name: valueNameInp,
            sector: valueSectorInp,
            type: resultType,
            date: theDate,
            file: copyValueFileInp,
            isThumbtack: false
        }

        saveRecord(obj);
        navigate("/");
    }

    useEffect(function () {
        if (valueFileInp != undefined) {
            setCopyValueFileInp(valueFileInp);
        }
    }, [valueFileInp]);


    return <section className='text-center h-vh d-flex flex-column justify-content-center align-items-center px-2'>
        <h1>إضافة عملية جديد</h1>

        <div className='mt-5 w-100 d-flex justify-content-center'>
            <input onChange={(e) => setValueNameInp(e.target.value)} className='w-50 p-1 fs-4 rounded-2 m-1' type="text" placeholder='إسم العمليه' />
            <input onChange={(e) => setValueSectorInp(e.target.value)} className='w-50 p-1 fs-4 rounded-2 m-1' type="text" placeholder='إسم القطاع' />


            <label style={{ backgroundColor: copyValueFileInp == "" ? "#838383" : "green" }} className='mx-2 cursor-pointer px-4 py-2 text-light fs-4 rounded-3' htmlFor="fileInput">
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
            <button disabled={copyValueFileInp != "" && valueNameInp != "" && valueSectorInp != "" ? false : true} onClick={handle_Confirm} className='w-50 bg-success p-2 rounded-2 text-light fs-5'>تأكيد</button>
            <button onClick={handle_Back_Btn} className='w-50 bg-danger p-2 rounded-2 text-light fs-5'>الرجوع</button>
        </div>
    </section>
}