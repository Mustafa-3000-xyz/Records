import Search from "../Search/Search";
import Style from "./index.module.css";
// ==================================================== //
export default function Header() {
    return <header>
        <div className="bg-h1 p-3 text-center rounded-bottom-5">
            <h1 className="m-0">العمليات</h1>
        </div>

        <div className="d-flex justify-content-around">
            <div className={Style.arrow}></div>
            <div className={Style.arrow}></div>
        </div>

        <div className="text-center">
            <Search />
        </div>
    </header>
}
