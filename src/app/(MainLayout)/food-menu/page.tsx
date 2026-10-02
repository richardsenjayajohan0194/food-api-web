import { ToastContainer } from "react-toastify";
import FoodMenu from "./_components/food-menu";
import { FoodMenuDialog } from "./_components/food-menu-dialog";

export default function FoodMenuPage() {
    return (
        <div className="p-2 space-y-4">
            <section id="header" className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold">Food Menu</h1>
                    <p className="text-gray-500">Manage menu, items, quantities</p>
                </div>
                <FoodMenuDialog />
            </section>
            <section id="content" className="flex">
                <FoodMenu/>
            </section>
            <ToastContainer/>
        </div>
    );
}