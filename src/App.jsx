import { Route, Routes, useLocation } from "react-router-dom";
import Header from "./Components/Header/Header";
import Table from "./Components/Table/Table";
import Add_Record_Page from "./Pages/Add_Record_Page";
import { useRecoilState } from "recoil";
import Records_Atom from "./Atoms/Records_Atom";
import { getAllRecords, deleteAllRecords } from "../db";
import { useEffect } from "react";
import Records_Copy_Atom from "./Atoms/Records_Copy_Atom";
import Editing_Record_Page from "./Pages/Editing_Record_Page";
// ==================================================== //
function App() {
  let location = useLocation();
  let [recordsAtom , setRecordsAtom] = useRecoilState(Records_Atom);
  let setRecordsCopyAtom = useRecoilState(Records_Copy_Atom)[1];


  let fetch = async function () {
    let result = await getAllRecords()
    setRecordsAtom(result);
    setRecordsCopyAtom(result);
  }

  useEffect(function () {
    fetch()
  }, [location]);


  if (!JSON.parse(localStorage.getItem("idObj"))) {
    deleteAllRecords();
  }

  return <>
    <Routes>
      <Route path="/" element={<>
        <Header />
        <hr />
        <Table />
      </>} />

      <Route path="/add_record_page" element={<Add_Record_Page />} />
      <Route path="/editing_record_page/:id" element={<Editing_Record_Page />} />
    </Routes>
  </>

}

export default App;