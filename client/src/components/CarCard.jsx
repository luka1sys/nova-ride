const Cart = ({ car }) => {
    return (
        <div className="w-[50px] fixed border overflow-hidden flex flex-col border-gray-200 h-[100px] rounded-bl-[10px] bg-white rounded-tl-[10px] top-[300px] absolute right-[0px] ">
            <div className=" flex cursor-pointer justify-center items-center h-[50%]">
                <img width="35px" src="/users-group-two-rounded-svgrepo-com.svg" alt="" />


            </div>
            <hr className="border border-gray-200" />
            <div className=" h-[50%] flex justify-center items-center cursor-pointer ">
                <img width="30px" src="/shop-cart-svgrepo-com.svg" alt="" />
            </div>
            
        </div>
    )
}
export default Cart;